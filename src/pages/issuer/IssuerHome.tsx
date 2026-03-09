import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Package, Users, DollarSign, TrendingUp } from "lucide-react";

const IssuerHome = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from('issuer_tokens')
        .select('*')
        .eq('issuer_id', user.id)
        .order('created_at', { ascending: false });
      setTokens(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const published = tokens.filter(t => t.status === 'published');
  const drafts = tokens.filter(t => t.status === 'draft');
  const totalRaised = published.reduce((s, t) => s + (t.sold_tokens * t.token_price), 0);
  const totalInvestors = 0; // Will come from token_investments later

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel del Emisor</h1>
          <p className="text-muted-foreground">Gestiona y crea activos tokenizados</p>
        </div>
        <Link to="/emisor/create">
          <Button className="gap-2 gradient-gold text-accent-foreground font-semibold">
            <PlusCircle className="w-4 h-4" />
            Crear Nuevo Token
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Activos Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" /> {published.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Borradores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drafts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Capital Recaudado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[hsl(var(--success))]" />
              ${totalRaised.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inversores Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" /> {totalInvestors}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent tokens */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Activos Tokenizados</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1,2,3].map(i => <div key={i} className="h-16 bg-muted animate-pulse rounded" />)}
            </div>
          ) : tokens.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sin activos tokenizados</h3>
              <p className="text-muted-foreground mb-4">Crea tu primer token para empezar a recaudar capital</p>
              <Link to="/emisor/create">
                <Button>Crear Primer Token</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.map(token => (
                <div key={token.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{token.project_name}</div>
                      <div className="text-sm text-muted-foreground">{token.token_symbol} · {token.asset_type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">${(token.token_price * token.total_tokens).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">{token.sold_tokens}/{token.total_tokens} tokens</div>
                    </div>
                    <Badge variant={token.status === 'published' ? 'default' : token.status === 'review' ? 'secondary' : 'outline'}>
                      {token.status === 'draft' ? 'Borrador' : token.status === 'review' ? 'En Revisión' : token.status === 'published' ? 'Publicado' : token.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerHome;
