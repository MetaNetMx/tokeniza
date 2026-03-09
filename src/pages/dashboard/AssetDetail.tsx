import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, MapPin, TrendingUp, Shield, FileText, Globe, Calendar, Coins, ExternalLink } from "lucide-react";
import InvestmentModal from "@/components/marketplace/InvestmentModal";

const RISK_COLORS: Record<string, string> = {
  bajo: "bg-green-500/20 text-green-400 border-green-500/30",
  medio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  alto: "bg-red-500/20 text-red-400 border-red-500/30",
};

const AssetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [investOpen, setInvestOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("marketplace_assets")
        .select("*")
        .eq("id", id)
        .single();
      setAsset(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground">Cargando...</div>;
  }

  if (!asset) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Activo no encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard/marketplace")}>
          Volver al Marketplace
        </Button>
      </div>
    );
  }

  const progress = Math.round((asset.sold_tokens / asset.total_tokens) * 100);
  const available = asset.total_tokens - asset.sold_tokens;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/marketplace")} className="gap-2">
        <ArrowLeft className="w-4 h-4" /> Volver al Marketplace
      </Button>

      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <img src={asset.image_url} alt={asset.name} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge variant="outline" className={RISK_COLORS[asset.risk_level] || ""}>
                Riesgo {asset.risk_level}
              </Badge>
              <Badge variant="outline" className="bg-card/80 backdrop-blur-sm border-border">
                {asset.category}
              </Badge>
            </div>
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">{asset.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="w-4 h-4" />
              <span>{asset.location_address}</span>
            </div>
          </div>
        </div>

        {/* Investment card */}
        <Card className="glass border-border h-fit">
          <CardHeader>
            <CardTitle className="font-display text-lg">Invertir</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Precio por token</p>
                <p className="font-display text-xl font-bold">${asset.token_price}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rendimiento esperado</p>
                <p className="font-display text-xl font-bold text-green-400">{asset.expected_yield}%</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tokens disponibles</p>
                <p className="font-display font-semibold">{available.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Inversión mínima</p>
                <p className="font-display font-semibold">${asset.min_investment}</p>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progreso de financiamiento</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {asset.sold_tokens.toLocaleString()} / {asset.total_tokens.toLocaleString()} tokens vendidos
              </p>
            </div>

            <Button className="w-full gradient-blue-cyan text-primary-foreground font-semibold" size="lg" onClick={() => setInvestOpen(true)}>
              <Coins className="w-4 h-4 mr-2" /> Invertir Ahora
            </Button>
            <p className="text-[10px] text-center text-muted-foreground">
              Distribución: {asset.distribution_frequency} · Red: {asset.blockchain_network}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border overflow-x-auto">
          <TabsTrigger value="resumen" className="gap-1"><FileText className="w-3 h-3" /> Resumen</TabsTrigger>
          <TabsTrigger value="financiero" className="gap-1"><TrendingUp className="w-3 h-3" /> Financiero</TabsTrigger>
          <TabsTrigger value="blockchain" className="gap-1"><Globe className="w-3 h-3" /> Blockchain</TabsTrigger>
          <TabsTrigger value="ubicacion" className="gap-1"><MapPin className="w-3 h-3" /> Ubicación</TabsTrigger>
          <TabsTrigger value="documentos" className="gap-1"><Shield className="w-3 h-3" /> Documentos</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Descripción del Activo</h3>
              <p className="text-muted-foreground leading-relaxed">{asset.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <InfoItem label="Tipo de activo" value={asset.asset_type} />
                <InfoItem label="Categoría" value={asset.category} />
                <InfoItem label="Nivel de riesgo" value={asset.risk_level} />
                <InfoItem label="Distribución" value={asset.distribution_frequency} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financiero">
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Información Financiera</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <InfoItem label="Precio por token" value={`$${asset.token_price}`} />
                <InfoItem label="Rendimiento anual esperado" value={`${asset.expected_yield}%`} />
                <InfoItem label="Inversión mínima" value={`$${asset.min_investment}`} />
                <InfoItem label="Total tokens" value={asset.total_tokens.toLocaleString()} />
                <InfoItem label="Tokens vendidos" value={asset.sold_tokens.toLocaleString()} />
                <InfoItem label="Capitalización total" value={`$${(asset.total_tokens * asset.token_price).toLocaleString()}`} />
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="font-display font-semibold mb-2">Proyección de rendimientos</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">1 año</p>
                    <p className="font-display font-bold text-green-400">{asset.expected_yield}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">3 años</p>
                    <p className="font-display font-bold text-green-400">{(asset.expected_yield * 2.8).toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">5 años</p>
                    <p className="font-display font-bold text-green-400">{(asset.expected_yield * 4.5).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Información Blockchain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Red" value={asset.blockchain_network} />
                <InfoItem label="Símbolo del token" value={asset.token_symbol} />
                <InfoItem label="Nombre del token" value={asset.token_name} />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Contrato</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono bg-muted/50 px-2 py-1 rounded">{asset.contract_address}</code>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="font-display font-semibold mb-2">Estándar del token</h4>
                <p className="text-muted-foreground text-sm">
                  Token ERC-20 compatible, emitido en la red {asset.blockchain_network}. 
                  Cumple con estándares de seguridad y auditorías de smart contracts verificadas.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ubicacion">
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Ubicación del Activo</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem label="Ciudad" value={asset.location_city} />
                <InfoItem label="País" value={asset.location_country} />
                <InfoItem label="Dirección" value={asset.location_address} />
              </div>
              <div className="h-64 rounded-lg bg-muted/50 flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">{asset.location_address}</p>
                  <p className="text-xs">{asset.location_city}, {asset.location_country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentos">
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-bold text-lg">Documentos Legales</h3>
              <div className="space-y-3">
                {["Prospecto de inversión", "Contrato de tokenización", "Auditoría Smart Contract", "Reporte de valoración"].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm">{doc}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      <ExternalLink className="w-3 h-3" /> Ver
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Todos los documentos han sido verificados y están disponibles para su revisión antes de invertir.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <InvestmentModal
        open={investOpen}
        onOpenChange={setInvestOpen}
        asset={asset}
      />
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-display font-semibold capitalize">{value}</p>
  </div>
);

export default AssetDetail;
