import { WizardData } from "@/pages/issuer/CreateToken";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LEGAL_VEHICLES, complianceCheck } from "@/lib/tokenEngine";
import { ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const REQUIRED_DOCS = [
  { id: 'title', label: 'Escritura o título de propiedad' },
  { id: 'appraisal', label: 'Avalúo independiente' },
  { id: 'prospectus', label: 'Prospecto de inversión' },
  { id: 'legal_opinion', label: 'Dictamen legal' },
  { id: 'insurance', label: 'Póliza de seguro' },
];

const StepCompliance = ({ data, onChange }: Props) => {
  const compliance = complianceCheck({
    issuerCountry: data.jurisdictionCountry || 'MX',
    investorCountry: data.jurisdictionCountry || 'MX',
    assetType: data.assetType,
    investmentAmount: data.minInvestment,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Compliance y Legal</h2>
        <p className="text-muted-foreground text-sm">Configura los aspectos legales y regulatorios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>País de Jurisdicción Principal</Label>
          <Input
            value={data.jurisdictionCountry}
            onChange={(e) => onChange({ jurisdictionCountry: e.target.value })}
            placeholder="MX, US, ES..."
          />
        </div>
        <div className="space-y-2">
          <Label>Tipo de Vehículo Legal</Label>
          <Select value={data.legalVehicle} onValueChange={(v) => onChange({ legalVehicle: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {LEGAL_VEHICLES.map(v => <SelectItem key={v.id} value={v.id}>{v.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Document checklist */}
      <div className="space-y-3">
        <Label className="text-sm uppercase tracking-wider text-muted-foreground">Documentos Legales Requeridos</Label>
        <div className="grid gap-2">
          {REQUIRED_DOCS.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                </div>
                <span className="text-sm">{doc.label}</span>
              </div>
              <Badge variant="outline" className="text-xs">Pendiente</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-lg border">
        <div>
          <div className="font-medium text-sm">Requiere asesoría legal de TOKENIZA</div>
          <div className="text-xs text-muted-foreground">Nuestro equipo legal te guiará en el proceso</div>
        </div>
        <Switch checked={data.requiresLegalAdvisory} onCheckedChange={(v) => onChange({ requiresLegalAdvisory: v })} />
      </div>

      {/* Auto compliance check */}
      <div className="rounded-xl border p-4 space-y-3">
        <h3 className="font-semibold flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Checklist Regulatorio Automático
        </h3>
        {compliance.requirements.map((req, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{req}</span>
          </div>
        ))}
        {compliance.warnings.map((warn, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--warning))]">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{warn}</span>
          </div>
        ))}
        {!compliance.allowed && (
          <div className="p-3 bg-destructive/10 rounded-lg text-destructive text-sm font-medium">
            ⚠️ Esta configuración no está permitida según las regulaciones vigentes
          </div>
        )}
      </div>
    </div>
  );
};

export default StepCompliance;
