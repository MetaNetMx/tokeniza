import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Eye, MoreVertical, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const IssuerAssets = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('issuer_tokens')
      .select('*')
      .eq('issuer_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setTokens(data || []);
        setLoading(false);
      });
  }, [user]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
      published: 'default',
      review: 'secondary',
      draft: 'outline',
    };
    const labels: Record<string, string> = {
      published: 'Publicado',
      review: 'En Revisión',
      draft: 'Borrador',
    };
    return <Badge variant={variants[status] || 'outline'}>{labels[status] || status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis Activos Tokenizados</h1>
          <p className="text-muted-foreground">Gestiona todos tus tokens emitidos</p>
        </div>
        <Link to="/emisor/create">
          <Button>Crear Nuevo Token</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-muted animate-pulse rounded" />)}
            </div>
          ) : tokens.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-semibold mb-2">Sin activos tokenizados</h3>
              <p className="text-muted-foreground mb-4">Crea tu primer token para empezar</p>
              <Link to="/emisor/create"><Button>Crear Token</Button></Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Proyecto</TableHead>
                  <TableHead>Token</TableHead>
                  <TableHead>Emisión</TableHead>
                  <TableHead>Vendido</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map(token => {
                  const soldPct = token.total_tokens > 0 ? (token.sold_tokens / token.total_tokens * 100).toFixed(1) : 0;
                  return (
                    <TableRow key={token.id}>
                      <TableCell>
                        <div className="font-medium">{token.project_name}</div>
                        <div className="text-xs text-muted-foreground">{token.asset_type}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">{token.token_symbol}</div>
                      </TableCell>
                      <TableCell>${(token.emission_amount || 0).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${soldPct}%` }} />
                          </div>
                          <span className="text-xs">{soldPct}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-[hsl(var(--success))]">
                          <TrendingUp className="w-3 h-3" />
                          {token.estimated_yield}%
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(token.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> Ver detalle</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Distribuir rendimientos</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerAssets;
