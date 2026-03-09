import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileText } from "lucide-react";
import { complianceCheck } from "@/lib/tokenEngine";

const REQUIRED_DOCS = [
  { id: "title", label: "Escritura o título de propiedad" },
  { id: "appraisal", label: "Avalúo independiente" },
  { id: "prospectus", label: "Prospecto de inversión" },
  { id: "legal_opinion", label: "Dictamen legal" },
  { id: "insurance", label: "Póliza de seguro" },
];

const IssuerCompliance = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("issuer_tokens")
        .select("*")
        .eq("issuer_id", user.id)
        .order("created_at", { ascending: false });
      setTokens(data || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const getComplianceScore = (token: any) => {
    let score = 0;
    if (token.kyc_required) score += 20;
    if (token.jurisdiction_country) score += 20;
    if (token.legal_vehicle) score += 20;
    if (token.token_standard === "ERC-1400" || token.token_standard === "ERC-3643") score += 20;
    if (token.status === "published") score += 20;
    return score;
  };

  const overallScore = tokens.length > 0
    ? Math.round(tokens.reduce((s, t) => s + getComplianceScore(t), 0) / tokens.length)
    : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-3xl font-bold">Compliance</h1></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance</h1>
        <p className="text-muted-foreground">Estado regulatorio y documentación de tus activos</p>
      </div>

      {/* Overall score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">Puntaje General de Compliance</span>
                <span className="text-lg font-bold">{overallScore}%</span>
              </div>
              <Progress value={overallScore} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {tokens.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <ShieldCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">Sin activos para revisar</h3>
            <p className="text-muted-foreground">Crea un token para ver su estado de compliance</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {tokens.map((token) => {
            const score = getComplianceScore(token);
            const compliance = complianceCheck({
              issuerCountry: token.jurisdiction_country || "MX",
              investorCountry: token.jurisdiction_country || "MX",
              assetType: token.asset_type,
              investmentAmount: token.min_investment,
            });

            return (
              <Card key={token.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      {token.project_name}
                      <span className="text-xs text-muted-foreground font-normal">({token.token_symbol})</span>
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={score >= 80 ? "default" : score >= 40 ? "secondary" : "destructive"}>
                        {score}%
                      </Badge>
                      <Badge variant="outline">{token.status === "draft" ? "Borrador" : token.status === "published" ? "Publicado" : token.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={score} className="h-1.5" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      {token.kyc_required ? <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))]" /> : <XCircle className="w-4 h-4 text-destructive" />}
                      <span>KYC Requerido</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {token.jurisdiction_country ? <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))]" /> : <XCircle className="w-4 h-4 text-destructive" />}
                      <span>Jurisdicción: {token.jurisdiction_country || "No definida"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {token.legal_vehicle ? <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))]" /> : <XCircle className="w-4 h-4 text-destructive" />}
                      <span>Vehículo Legal: {token.legal_vehicle?.toUpperCase() || "No definido"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(token.token_standard === "ERC-1400" || token.token_standard === "ERC-3643") ? <CheckCircle2 className="w-4 h-4 text-[hsl(var(--success))]" /> : <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))]" />}
                      <span>Estándar: {token.token_standard}</span>
                    </div>
                  </div>

                  {compliance.requirements.length > 0 && (
                    <div className="border-t pt-3 mt-2 space-y-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Requisitos Regulatorios</span>
                      {compliance.requirements.slice(0, 4).map((req, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {compliance.warnings.length > 0 && (
                    <div className="space-y-1">
                      {compliance.warnings.map((warn, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--warning))]">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IssuerCompliance;
