import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, TrendingUp, TrendingDown, Download, Eye } from "lucide-react";
import { toast } from "sonner";

interface UserToken {
  id: string;
  token_name: string;
  token_symbol: string;
  quantity: number;
  purchase_price: number;
  current_price: number;
  yield_rate: number;
  asset_name: string;
  asset_type: string;
  purchase_date: string;
}

const TABS = [
  { value: "all", label: "Todos" },
  { value: "real_estate", label: "Inmobiliarios" },
  { value: "commodities", label: "Commodities" },
  { value: "art", label: "Arte" },
];

const TokensPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tokens, setTokens] = useState<UserToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTokens(data || []);
      } catch (error) {
        console.error('Error fetching tokens:', error);
        toast.error('Error cargando tus tokens');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTokens();
  }, [user]);

  const filteredTokens = useMemo(() => {
    if (activeTab === "all") return tokens;
    return tokens.filter((t) => t.asset_type === activeTab);
  }, [tokens, activeTab]);

  const totalValue = useMemo(
    () => tokens.reduce((sum, t) => sum + t.quantity * t.current_price, 0),
    [tokens]
  );
  const totalInvested = useMemo(
    () => tokens.reduce((sum, t) => sum + t.quantity * t.purchase_price, 0),
    [tokens]
  );
  const totalGainLoss = totalValue - totalInvested;
  const avgYield =
    tokens.length > 0
      ? tokens.reduce((sum, t) => sum + t.yield_rate, 0) / tokens.length
      : 0;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(amount);

  const formatPercentage = (value: number) =>
    `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;

  const pnlColor = (v: number) =>
    v >= 0 ? 'text-[hsl(var(--success))]' : 'text-destructive';

  const getPerformanceVariant = (value: number): "default" | "destructive" | "secondary" => {
    if (value > 0) return "default";
    if (value < 0) return "destructive";
    return "secondary";
  };

  const renderTokensTable = (list: UserToken[]) => {
    if (list.length === 0) {
      return (
        <div className="text-center py-12">
          <Coins className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tienes tokens aún</h3>
          <p className="text-muted-foreground mb-4">
            Explora el marketplace para invertir en activos tokenizados
          </p>
          <Button onClick={() => navigate('/dashboard/marketplace')}>Ver Marketplace</Button>
        </div>
      );
    }

    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Activo</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio Compra</TableHead>
              <TableHead>Precio Actual</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>P&L</TableHead>
              <TableHead>Rendimiento</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((token) => {
              const val = token.quantity * token.current_price;
              const inv = token.quantity * token.purchase_price;
              const pnl = val - inv;
              const pnlPct = inv > 0 ? (pnl / inv) * 100 : 0;

              return (
                <TableRow key={token.id}>
                  <TableCell className="font-medium">
                    <div className="font-semibold">{token.token_symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.token_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{token.asset_name}</div>
                    <Badge variant="outline" className="text-xs">
                      {token.asset_type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{token.quantity.toLocaleString()}</TableCell>
                  <TableCell>{formatCurrency(token.purchase_price)}</TableCell>
                  <TableCell>{formatCurrency(token.current_price)}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(val)}</TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${pnlColor(pnl)}`}>
                      {pnl >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <div>
                        <div className="font-medium">{formatCurrency(Math.abs(pnl))}</div>
                        <div className="text-xs">({formatPercentage(pnlPct)})</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPerformanceVariant(token.yield_rate)}>
                      {formatPercentage(token.yield_rate)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Coins className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Mis Tokens</h1>
            <p className="text-muted-foreground">Gestiona tus activos tokenizados</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Coins className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Mis Tokens</h1>
            <p className="text-muted-foreground">Gestiona tus activos tokenizados</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground mt-1">{tokens.length} tokens en portafolio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">P&L Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold flex items-center gap-2 ${pnlColor(totalGainLoss)}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              {formatCurrency(Math.abs(totalGainLoss))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalGainLoss >= 0 ? 'Ganancia' : 'Pérdida'} no realizada
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rendimiento Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{formatPercentage(avgYield)}</div>
            <p className="text-xs text-muted-foreground mt-1">Rendimiento anualizado</p>
          </CardContent>
        </Card>
      </div>

      {/* Tokens Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Tokens</CardTitle>
          <CardDescription>Lista detallada de todos tus activos tokenizados</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              {TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
              ))}
            </TabsList>
            {TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {renderTokensTable(filteredTokens)}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokensPage;
