import { WizardData } from "@/pages/issuer/CreateToken";
import { ASSET_TYPES } from "@/lib/tokenEngine";
import { Building2, Gem, Palette, FileText, TrendingUp, Lightbulb, Trophy, Plus } from "lucide-react";

const iconMap: Record<string, any> = {
  Building2, Gem, Palette, FileText, TrendingUp, Lightbulb, Trophy, Plus,
};

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const StepAssetType = ({ data, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">¿Qué tipo de activo deseas tokenizar?</h2>
        <p className="text-muted-foreground text-sm">Selecciona la categoría que mejor describa tu activo</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ASSET_TYPES.map((type) => {
          const Icon = iconMap[type.icon] || Plus;
          const selected = data.assetType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onChange({ assetType: type.id })}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all text-center hover:border-primary/50 ${
                selected ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 'border-border bg-card'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${selected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="font-semibold">{type.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepAssetType;
