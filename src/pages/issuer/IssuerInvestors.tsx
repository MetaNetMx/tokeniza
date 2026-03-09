import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, DollarSign, TrendingUp, Coins } from "lucide-react";
import { format } from "date-fns";

interface Investment {
  id: string;
  investor_id: string;
  token_id: string;
  tokens_purchased: number;
  amount_invested: number;
  status: string;
  invested_at: string;
  token?: { project_name: string; token_symbol: string; token_price: number };
}

const IssuerInvestors = () => {
  const { user } = useAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchInvestments = async () => {
      // Get issuer's tokens first
      const { data: tokens } = await supabase
        .from("issuer_tokens")
        .select("id, project_name, token_symbol, token_price")
        .eq("issuer_id", user.id);

      if (!tokens || tokens.length === 0) {
        setLoading(false);
        return;
      }

      const tokenIds = tokens.map((t) => t.id);
      const { data: invData } = await supabase
        .from("token_investments")
        .select("*")
        .in("token_id", tokenIds)
        .order("invested_at", { ascending: false });

      const tokenMap = Object.fromEntries(tokens.map((t) => [t.id, t]));
      const enriched = (invData || []).map((inv) => ({
        ...inv,
        token: tokenMap[inv.token_id],
      }));

      setInvestments(enriched);
      setLoading(false);
    };
    fetchInvestments();
  }, [user]);

  const uniqueInvestors = new Set(investments.map((i) => i.investor_id)).size;
  const totalInvested = investments.reduce((s, i) => s + i.amount_invested, 0);
  const totalTokensSold = investments.reduce((s, i) => s + i.tokens_purchased, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inversores</h1>
        <p className="text-muted-foreground">Inversiones recibidas en tus activos tokenizados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inversores Únicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" /> {uniqueInvestors}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Capital Recibido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[hsl(var(--success))]" /> ${totalInvested.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tokens Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Coins className="w-5 h-5 text-accent" /> {totalTokensSold.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Inversiones</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : investments.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Sin inversiones aún</h3>
              <p className="text-muted-foreground">Las inversiones aparecerán aquí cuando inversores compren tus tokens</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Inversor</TableHead>
                  <TableHead className="text-right">Tokens</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {investments.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-medium">
                      {inv.token?.project_name ?? "—"}
                      <span className="text-xs text-muted-foreground ml-1">({inv.token?.token_symbol})</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground font-mono">
                      {inv.investor_id.slice(0, 8)}…
                    </TableCell>
                    <TableCell className="text-right">{inv.tokens_purchased}</TableCell>
                    <TableCell className="text-right font-medium">${inv.amount_invested.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={inv.status === "active" ? "default" : "secondary"}>
                        {inv.status === "active" ? "Activa" : inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(inv.invested_at), "dd/MM/yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerInvestors;
