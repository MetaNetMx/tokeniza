import { useMemo } from "react";
import { WizardData } from "@/pages/issuer/CreateToken";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { simulateDistribution } from "@/lib/tokenEngine";

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const COLORS = {
  investors: 'hsl(var(--primary))',
  issuer: 'hsl(var(--accent))',
  reserve: 'hsl(var(--cyan))',
  platform: 'hsl(var(--muted-foreground))',
};

const StepDistribution = ({ data, onChange }: Props) => {
  const rules = data.distributionRules;

  const updateRule = (key: string, value: number) => {
    const newRules = { ...rules, [key]: value };
    // Auto-adjust platform to keep total at 100
    const total = newRules.investors + newRules.issuer + newRules.reserve + newRules.platform;
    if (total !== 100 && key !== 'platform') {
      newRules.platform = Math.max(0, 100 - newRules.investors - newRules.issuer - newRules.reserve);
    }
    onChange({ distributionRules: newRules });
  };

  const total = rules.investors + rules.issuer + rules.reserve + rules.platform;

  // Simulate a distribution
  const sim = useMemo(() => {
    const monthlyRevenue = data.assetValuation * (data.estimatedYield / 100) / 12;
    return simulateDistribution({
      periodRevenue: monthlyRevenue,
      rules,
      totalTokens: data.totalTokens || 1000,
      holdersCount: 50,
    });
  }, [data.assetValuation, data.estimatedYield, rules, data.totalTokens]);

  // Donut segments
  const segments = [
    { key: 'investors', label: 'Inversores', pct: rules.investors, color: COLORS.investors },
    { key: 'issuer', label: 'Emisor', pct: rules.issuer, color: COLORS.issuer },
    { key: 'reserve', label: 'Reserva', pct: rules.reserve, color: COLORS.reserve },
    { key: 'platform', label: 'Plataforma', pct: rules.platform, color: COLORS.platform },
  ];

  // Build SVG donut
  let accumulated = 0;
  const donutParts = segments.map((seg) => {
    const start = accumulated;
    accumulated += seg.pct;
    const startAngle = (start / 100) * 360 - 90;
    const endAngle = (accumulated / 100) * 360 - 90;
    const largeArc = seg.pct > 50 ? 1 : 0;
    const r = 40;
    const cx = 50, cy = 50;
    const x1 = cx + r * Math.cos((startAngle * Math.PI) / 180);
    const y1 = cy + r * Math.sin((startAngle * Math.PI) / 180);
    const x2 = cx + r * Math.cos((endAngle * Math.PI) / 180);
    const y2 = cy + r * Math.sin((endAngle * Math.PI) / 180);
    return { ...seg, d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z` };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Distribución de Rendimientos</h2>
        <p className="text-muted-foreground text-sm">Configura cómo se repartirán los ingresos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders */}
        <div className="space-y-5">
          {[
            { key: 'investors', label: '% Inversores (holders)' },
            { key: 'issuer', label: '% Emisor / Administrador' },
            { key: 'reserve', label: '% Reserva / Mantenimiento' },
            { key: 'platform', label: '% TOKENIZA (comisión)' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">{label}</Label>
                <span className="text-sm font-bold">{(rules as any)[key]}%</span>
              </div>
              <Slider
                value={[(rules as any)[key]]}
                onValueChange={([v]) => updateRule(key, v)}
                min={0} max={100} step={1}
              />
            </div>
          ))}
          {total !== 100 && (
            <div className="text-destructive text-sm font-medium">
              ⚠️ El total debe sumar 100% (actual: {total}%)
            </div>
          )}

          <div className="space-y-2 pt-2">
            <Label>Método de Distribución</Label>
            <Select value={data.distributionMethod} onValueChange={(v) => onChange({ distributionMethod: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="automatic">Automático vía smart contract</SelectItem>
                <SelectItem value="manual">Manual con aprobación</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Donut chart + preview */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg viewBox="0 0 100 100" className="w-48 h-48">
              {donutParts.map((part) => (
                <path key={part.key} d={part.d} fill={part.color} opacity={0.85} />
              ))}
              <circle cx="50" cy="50" r="22" fill="hsl(var(--card))" />
              <text x="50" y="48" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="8" fontWeight="bold">
                {total}%
              </text>
              <text x="50" y="56" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="4">
                Total
              </text>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {segments.map(seg => (
              <div key={seg.key} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                <span>{seg.label}: {seg.pct}%</span>
              </div>
            ))}
          </div>

          {/* Simulation */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="text-sm font-semibold">Simulación Mensual</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>Ingreso total: <span className="font-medium">${sim.totalToDistribute.toLocaleString()}</span></div>
                <div>Por token: <span className="font-medium">${sim.amountPerToken.toFixed(4)}</span></div>
                <div>A inversores: <span className="font-medium">{sim.breakdown.investors.toLocaleString()}</span></div>
                <div>A emisor: <span className="font-medium">{sim.breakdown.issuer.toLocaleString()}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StepDistribution;
