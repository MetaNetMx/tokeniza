import { WizardData } from "@/pages/issuer/CreateToken";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BLOCKCHAIN_NETWORKS, TOKEN_STANDARDS, estimateGasCost } from "@/lib/tokenEngine";
import { Fuel } from "lucide-react";

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const StepBlockchain = ({ data, onChange }: Props) => {
  const gas = estimateGasCost(data.blockchainNetwork, data.tokenStandard);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Configuración Blockchain</h2>
        <p className="text-muted-foreground text-sm">Selecciona la red y estándar para tu token</p>
      </div>

      {/* Network Selection */}
      <div className="space-y-3">
        <Label>Red Blockchain</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {BLOCKCHAIN_NETWORKS.map((net) => (
            <button
              key={net.id}
              onClick={() => onChange({ blockchainNetwork: net.id })}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                data.blockchainNetwork === net.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: net.color }} />
              <div className="font-medium text-sm">{net.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Token Standard */}
      <div className="space-y-3">
        <Label>Estándar del Token</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {TOKEN_STANDARDS.map((std) => (
            <button
              key={std.id}
              onClick={() => onChange({ tokenStandard: std.id })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                data.tokenStandard === std.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
              }`}
            >
              <div className="font-semibold">{std.id}</div>
              <div className="text-xs text-muted-foreground mt-1">{std.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Restrictions */}
      <div className="space-y-4">
        <Label className="text-sm uppercase tracking-wider text-muted-foreground">Restricciones</Label>
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium text-sm">Solo inversores verificados KYC</div>
              <div className="text-xs text-muted-foreground">Los inversores deben completar verificación</div>
            </div>
            <Switch checked={data.kycRequired} onCheckedChange={(v) => onChange({ kycRequired: v })} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium text-sm">Transferibilidad en mercado secundario</div>
              <div className="text-xs text-muted-foreground">Permite la venta de tokens entre inversores</div>
            </div>
            <Switch checked={data.transferable} onCheckedChange={(v) => onChange({ transferable: v })} />
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium text-sm">Whitelist de wallets</div>
              <div className="text-xs text-muted-foreground">Solo wallets aprobadas pueden participar</div>
            </div>
            <Switch checked={data.whitelistEnabled} onCheckedChange={(v) => onChange({ whitelistEnabled: v })} />
          </div>
          <div className="p-3 rounded-lg border space-y-2">
            <Label className="text-sm">Periodo de lock-up (días)</Label>
            <Input type="number" value={data.lockupPeriodDays || ''} onChange={(e) => onChange({ lockupPeriodDays: Number(e.target.value) })} placeholder="0 = sin lock-up" />
          </div>
        </div>
      </div>

      {/* Gas Estimator */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="p-4 flex items-center gap-4">
          <Fuel className="w-8 h-8 text-accent" />
          <div>
            <div className="font-semibold text-sm">Estimación de Gas para Deploy</div>
            <div className="text-xs text-muted-foreground">
              {data.blockchainNetwork} · {data.tokenStandard}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-lg font-bold">${gas.estimatedGasUSD.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">~{gas.estimatedTimeMinutes} min</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepBlockchain;
