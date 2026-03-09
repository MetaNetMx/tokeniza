import { WizardData } from "@/pages/issuer/CreateToken";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { calculateTokenomics, estimateGasCost } from "@/lib/tokenEngine";
import { Save, Send, Rocket, Clock, DollarSign, Shield } from "lucide-react";

interface Props {
  data: WizardData;
  onSave: (status: 'draft' | 'review' | 'published') => void;
  saving: boolean;
}

const StepReview = ({ data, onSave, saving }: Props) => {
  const tokenomics = calculateTokenomics({
    assetValuation: data.assetValuation,
    percentageToTokenize: data.percentageTokenized,
    desiredTokenPrice: data.tokenPrice,
  });
  const gas = estimateGasCost(data.blockchainNetwork, data.tokenStandard);
  const platformFee = tokenomics.emissionAmount * 0.02; // 2% platform fee

  const sections = [
    {
      title: 'Tipo de Activo',
      items: [{ label: 'Tipo', value: data.assetType }],
    },
    {
      title: 'Información del Activo',
      items: [
        { label: 'Proyecto', value: data.projectName },
        { label: 'Descripción', value: data.description?.substring(0, 100) + (data.description?.length > 100 ? '...' : '') },
      ],
    },
    {
      title: 'Estructura Financiera',
      items: [
        { label: 'Valoración', value: `$${data.assetValuation.toLocaleString()}` },
        { label: 'Emisión', value: `$${tokenomics.emissionAmount.toLocaleString()} (${data.percentageTokenized}%)` },
        { label: 'Token', value: `${data.tokenName} (${data.tokenSymbol})` },
        { label: 'Precio/Token', value: `$${data.tokenPrice}` },
        { label: 'Total Tokens', value: tokenomics.totalTokens.toLocaleString() },
        { label: 'Yield Estimado', value: `${data.estimatedYield}% anual` },
        { label: 'Duración', value: `${data.projectDurationMonths} meses` },
      ],
    },
    {
      title: 'Blockchain',
      items: [
        { label: 'Red', value: data.blockchainNetwork },
        { label: 'Estándar', value: data.tokenStandard },
        { label: 'KYC Requerido', value: data.kycRequired ? 'Sí' : 'No' },
        { label: 'Transferible', value: data.transferable ? 'Sí' : 'No' },
        { label: 'Lock-up', value: `${data.lockupPeriodDays} días` },
      ],
    },
    {
      title: 'Compliance',
      items: [
        { label: 'Jurisdicción', value: data.jurisdictionCountry || 'No especificada' },
        { label: 'Vehículo Legal', value: data.legalVehicle },
        { label: 'Asesoría TOKENIZA', value: data.requiresLegalAdvisory ? 'Sí' : 'No' },
      ],
    },
    {
      title: 'Distribución',
      items: [
        { label: 'Inversores', value: `${data.distributionRules.investors}%` },
        { label: 'Emisor', value: `${data.distributionRules.issuer}%` },
        { label: 'Reserva', value: `${data.distributionRules.reserve}%` },
        { label: 'Plataforma', value: `${data.distributionRules.platform}%` },
        { label: 'Método', value: data.distributionMethod === 'automatic' ? 'Automático' : 'Manual' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Revisión y Publicación</h2>
        <p className="text-muted-foreground text-sm">Revisa toda la información antes de publicar</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1">
                  {section.items.map((item, j) => (
                    <div key={j} className="flex justify-between text-sm py-1">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-right max-w-[60%] truncate">{item.value || '-'}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cost estimation + actions */}
        <div className="space-y-4">
          <Card className="border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Estimación de Costos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fee de plataforma (2%)</span>
                <span className="font-medium">${platformFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas blockchain</span>
                <span className="font-medium">${gas.estimatedGasUSD.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Costos legales (est.)</span>
                <span className="font-medium">{data.requiresLegalAdvisory ? '$2,500' : '$0'}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total estimado</span>
                <span>${(platformFee + gas.estimatedGasUSD + (data.requiresLegalAdvisory ? 2500 : 0)).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" /> Timeline Estimado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {[
                { label: 'Creación', time: 'Completado' },
                { label: 'Revisión interna', time: '1-3 días hábiles' },
                { label: 'Deploy del contrato', time: `~${gas.estimatedTimeMinutes} min` },
                { label: 'Listado en marketplace', time: 'Inmediato post-deploy' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[hsl(var(--success))]' : 'bg-muted-foreground'}`} />
                  <span className="text-muted-foreground">{step.label}:</span>
                  <span className="font-medium">{step.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => onSave('draft')}
              disabled={saving}
            >
              <Save className="w-4 h-4" /> Guardar como Borrador
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={() => onSave('review')}
              disabled={saving}
            >
              <Send className="w-4 h-4" /> Enviar a Revisión
            </Button>
            <Button
              className="w-full gap-2 gradient-gold text-accent-foreground font-semibold"
              onClick={() => onSave('published')}
              disabled={saving}
            >
              <Rocket className="w-4 h-4" /> Publicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReview;
