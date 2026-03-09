import { useMemo } from "react";
import { WizardData } from "@/pages/issuer/CreateToken";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateTokenomics, DISTRIBUTION_FREQUENCIES, TOKEN_TYPES } from "@/lib/tokenEngine";

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const StepFinancial = ({ data, onChange }: Props) => {
  const tokenomics = useMemo(
    () => calculateTokenomics({
      assetValuation: data.assetValuation,
      percentageToTokenize: data.percentageTokenized,
      desiredTokenPrice: data.tokenPrice,
    }),
    [data.assetValuation, data.percentageTokenized, data.tokenPrice]
  );

  // Sync calculated values
  const emissionAmount = tokenomics.emissionAmount;
  const calculatedTokens = tokenomics.totalTokens;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Estructura Financiera</h2>
        <p className="text-muted-foreground text-sm">Configura la tokenomics de tu emisión</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valoración Total del Activo (USD) *</Label>
              <Input
                type="number"
                value={data.assetValuation || ''}
                onChange={(e) => onChange({ assetValuation: Number(e.target.value) })}
                placeholder="1,000,000"
              />
            </div>
            <div className="space-y-2">
              <Label>Porcentaje a Tokenizar: {data.percentageTokenized}%</Label>
              <Slider
                value={[data.percentageTokenized]}
                onValueChange={([v]) => onChange({ percentageTokenized: v })}
                min={1} max={100} step={1}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre del Token *</Label>
              <Input value={data.tokenName} onChange={(e) => onChange({ tokenName: e.target.value })} placeholder="TOKENIZA-RE01" />
            </div>
            <div className="space-y-2">
              <Label>Símbolo del Token *</Label>
              <Input value={data.tokenSymbol} onChange={(e) => onChange({ tokenSymbol: e.target.value.toUpperCase() })} placeholder="TKZ01" maxLength={8} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Precio por Token (USD)</Label>
              <Input type="number" value={data.tokenPrice || ''} onChange={(e) => onChange({ tokenPrice: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Inversión Mínima (USD)</Label>
              <Input type="number" value={data.minInvestment || ''} onChange={(e) => onChange({ minInvestment: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Inversión Máxima (USD)</Label>
              <Input type="number" value={data.maxInvestment || ''} onChange={(e) => onChange({ maxInvestment: Number(e.target.value) })} placeholder="Sin límite" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rendimiento Estimado Anual (%)</Label>
              <Input type="number" value={data.estimatedYield || ''} onChange={(e) => onChange({ estimatedYield: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Frecuencia de Distribución</Label>
              <Select value={data.distributionFrequency} onValueChange={(v) => onChange({ distributionFrequency: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DISTRIBUTION_FREQUENCIES.map(f => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Tipo de Token</Label>
              <Select value={data.tokenType} onValueChange={(v) => onChange({ tokenType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TOKEN_TYPES.map(t => <SelectItem key={t.id} value={t.id}>{t.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Duración del Proyecto (meses)</Label>
              <Input type="number" value={data.projectDurationMonths || ''} onChange={(e) => onChange({ projectDurationMonths: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Cierre</Label>
              <Input type="date" value={data.roundCloseDate} onChange={(e) => onChange({ roundCloseDate: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div>
          <Card className="sticky top-6 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Preview del Marketplace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                Imagen del activo
              </div>
              <div>
                <h3 className="font-bold">{data.projectName || 'Nombre del Proyecto'}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{data.description || 'Descripción...'}</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{data.assetType || 'Tipo'}</Badge>
                <Badge variant="outline">{data.tokenSymbol || 'SYM'}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground text-xs">Precio/Token</div>
                  <div className="font-semibold">${data.tokenPrice || 0}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Emisión</div>
                  <div className="font-semibold">${emissionAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Tokens</div>
                  <div className="font-semibold">{calculatedTokens.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Yield</div>
                  <div className="font-semibold text-[hsl(var(--success))]">{data.estimatedYield}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepFinancial;
