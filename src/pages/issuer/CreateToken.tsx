import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

import StepAssetType from "@/components/issuer/wizard/StepAssetType";
import StepAssetInfo from "@/components/issuer/wizard/StepAssetInfo";
import StepFinancial from "@/components/issuer/wizard/StepFinancial";
import StepBlockchain from "@/components/issuer/wizard/StepBlockchain";
import StepCompliance from "@/components/issuer/wizard/StepCompliance";
import StepDistribution from "@/components/issuer/wizard/StepDistribution";
import StepReview from "@/components/issuer/wizard/StepReview";

export interface WizardData {
  // Step 1
  assetType: string;
  // Step 2
  projectName: string;
  description: string;
  assetDetails: Record<string, any>;
  // Step 3
  assetValuation: number;
  percentageTokenized: number;
  tokenName: string;
  tokenSymbol: string;
  tokenPrice: number;
  totalTokens: number;
  minInvestment: number;
  maxInvestment: number;
  estimatedYield: number;
  distributionFrequency: string;
  tokenType: string;
  projectDurationMonths: number;
  roundCloseDate: string;
  // Step 4
  blockchainNetwork: string;
  tokenStandard: string;
  kycRequired: boolean;
  allowedCountries: string[];
  lockupPeriodDays: number;
  transferable: boolean;
  whitelistEnabled: boolean;
  // Step 5
  jurisdictionCountry: string;
  legalVehicle: string;
  requiresLegalAdvisory: boolean;
  // Step 6
  distributionRules: { investors: number; issuer: number; reserve: number; platform: number };
  distributionMethod: string;
}

const STEPS = [
  { label: "Tipo de Activo", shortLabel: "Tipo" },
  { label: "Información", shortLabel: "Info" },
  { label: "Estructura Financiera", shortLabel: "Finanzas" },
  { label: "Blockchain", shortLabel: "Chain" },
  { label: "Compliance", shortLabel: "Legal" },
  { label: "Distribución", shortLabel: "Distrib." },
  { label: "Revisión", shortLabel: "Revisar" },
];

const defaultData: WizardData = {
  assetType: '',
  projectName: '',
  description: '',
  assetDetails: {},
  assetValuation: 0,
  percentageTokenized: 100,
  tokenName: '',
  tokenSymbol: '',
  tokenPrice: 10,
  totalTokens: 1000,
  minInvestment: 50,
  maxInvestment: 0,
  estimatedYield: 0,
  distributionFrequency: 'mensual',
  tokenType: 'revenue_share',
  projectDurationMonths: 12,
  roundCloseDate: '',
  blockchainNetwork: 'Polygon',
  tokenStandard: 'ERC-20',
  kycRequired: true,
  allowedCountries: [],
  lockupPeriodDays: 0,
  transferable: false,
  whitelistEnabled: false,
  jurisdictionCountry: '',
  legalVehicle: 'spv',
  requiresLegalAdvisory: false,
  distributionRules: { investors: 70, issuer: 15, reserve: 10, platform: 5 },
  distributionMethod: 'automatic',
};

const CreateToken = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>(defaultData);
  const [saving, setSaving] = useState(false);

  const updateData = (partial: Partial<WizardData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const handleSave = async (status: 'draft' | 'review' | 'published') => {
    if (!user) return;
    setSaving(true);
    try {
      const emissionAmount = data.assetValuation * (data.percentageTokenized / 100);
      const payload = {
        issuer_id: user.id,
        asset_type: data.assetType,
        project_name: data.projectName,
        description: data.description,
        asset_details: data.assetDetails,
        asset_valuation: data.assetValuation,
        percentage_tokenized: data.percentageTokenized,
        emission_amount: emissionAmount,
        token_name: data.tokenName,
        token_symbol: data.tokenSymbol,
        token_price: data.tokenPrice,
        total_tokens: data.totalTokens,
        min_investment: data.minInvestment,
        max_investment: data.maxInvestment || null,
        estimated_yield: data.estimatedYield,
        distribution_frequency: data.distributionFrequency,
        token_type: data.tokenType,
        project_duration_months: data.projectDurationMonths,
        round_close_date: data.roundCloseDate || null,
        blockchain_network: data.blockchainNetwork,
        token_standard: data.tokenStandard,
        kyc_required: data.kycRequired,
        allowed_countries: data.allowedCountries,
        lockup_period_days: data.lockupPeriodDays,
        transferable: data.transferable,
        whitelist_enabled: data.whitelistEnabled,
        jurisdiction_country: data.jurisdictionCountry,
        legal_vehicle: data.legalVehicle,
        requires_legal_advisory: data.requiresLegalAdvisory,
        distribution_rules: data.distributionRules,
        distribution_method: data.distributionMethod,
        status,
        wizard_step: currentStep + 1,
        ...(status === 'review' ? { submitted_at: new Date().toISOString() } : {}),
        ...(status === 'published' ? { published_at: new Date().toISOString() } : {}),
      };

      const { error } = await supabase.from('issuer_tokens').insert(payload);
      if (error) throw error;

      const msgs: Record<string, string> = {
        draft: 'Borrador guardado exitosamente',
        review: 'Token enviado a revisión',
        published: 'Token publicado exitosamente',
      };
      toast.success(msgs[status]);
      navigate('/emisor');
    } catch (err: any) {
      toast.error('Error al guardar: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const stepComponents = [
    <StepAssetType data={data} onChange={updateData} />,
    <StepAssetInfo data={data} onChange={updateData} />,
    <StepFinancial data={data} onChange={updateData} />,
    <StepBlockchain data={data} onChange={updateData} />,
    <StepCompliance data={data} onChange={updateData} />,
    <StepDistribution data={data} onChange={updateData} />,
    <StepReview data={data} onSave={handleSave} saving={saving} />,
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Crear Nuevo Token</h1>
        <p className="text-muted-foreground">Sigue los pasos para tokenizar tu activo</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center">
            <button
              onClick={() => i <= currentStep && setCurrentStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                i === currentStep
                  ? 'bg-primary text-primary-foreground font-medium'
                  : i < currentStep
                  ? 'bg-primary/10 text-primary cursor-pointer'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {i < currentStep ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs font-medium">
                  {i + 1}
                </span>
              )}
              <span className="hidden md:inline">{step.label}</span>
              <span className="md:hidden">{step.shortLabel}</span>
            </button>
            {i < STEPS.length - 1 && <div className="w-4 h-px bg-border mx-1" />}
          </div>
        ))}
      </div>

      {/* Current Step */}
      <Card className="p-6">{stepComponents[currentStep]}</Card>

      {/* Navigation */}
      {currentStep < 6 && (
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleSave('draft')} disabled={saving || !data.assetType}>
              Guardar Borrador
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(6, currentStep + 1))}
              disabled={currentStep === 0 && !data.assetType}
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateToken;
