import { WizardData } from "@/pages/issuer/CreateToken";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  data: WizardData;
  onChange: (partial: Partial<WizardData>) => void;
}

const FIELDS_BY_TYPE: Record<string, { key: string; label: string; type?: string; placeholder?: string }[]> = {
  inmueble: [
    { key: 'address', label: 'Dirección', placeholder: 'Calle y número' },
    { key: 'city', label: 'Ciudad' },
    { key: 'country', label: 'País' },
    { key: 'sqm', label: 'Metros cuadrados (m²)', type: 'number' },
    { key: 'property_type', label: 'Tipo (residencial/comercial/industrial)' },
    { key: 'year_built', label: 'Año de construcción', type: 'number' },
    { key: 'occupancy', label: 'Ocupación actual (%)' , type: 'number' },
    { key: 'monthly_income', label: 'Ingresos mensuales actuales (USD)', type: 'number' },
    { key: 'appraisal', label: 'Avalúo (USD)', type: 'number' },
  ],
  commodity: [
    { key: 'commodity_type', label: 'Tipo de commodity' },
    { key: 'quantity', label: 'Cantidad', type: 'number' },
    { key: 'warehouse_location', label: 'Ubicación del almacén' },
    { key: 'certifications', label: 'Certificaciones' },
    { key: 'provider', label: 'Proveedor' },
  ],
  art: [
    { key: 'artist', label: 'Artista' },
    { key: 'technique', label: 'Técnica' },
    { key: 'dimensions', label: 'Dimensiones' },
    { key: 'year', label: 'Año', type: 'number' },
    { key: 'certificate', label: 'Certificado de autenticidad' },
  ],
  debt: [
    { key: 'issuer_entity', label: 'Entidad emisora' },
    { key: 'interest_rate', label: 'Tasa de interés (%)', type: 'number' },
    { key: 'maturity', label: 'Vencimiento (meses)', type: 'number' },
    { key: 'credit_rating', label: 'Calificación crediticia' },
  ],
  equity: [
    { key: 'company_name', label: 'Nombre de la empresa' },
    { key: 'sector', label: 'Sector' },
    { key: 'revenue', label: 'Ingresos anuales (USD)', type: 'number' },
    { key: 'employees', label: 'Número de empleados', type: 'number' },
  ],
  ip: [
    { key: 'ip_type', label: 'Tipo (patente/marca/copyright)' },
    { key: 'registration_number', label: 'Número de registro' },
    { key: 'annual_royalties', label: 'Regalías anuales (USD)', type: 'number' },
  ],
  sports: [
    { key: 'athlete_or_club', label: 'Atleta o Club' },
    { key: 'sport', label: 'Deporte' },
    { key: 'contract_value', label: 'Valor del contrato (USD)', type: 'number' },
    { key: 'contract_end', label: 'Fin del contrato' },
  ],
  other: [
    { key: 'custom_type', label: 'Tipo de activo personalizado' },
    { key: 'custom_details', label: 'Detalles adicionales' },
  ],
};

const StepAssetInfo = ({ data, onChange }: Props) => {
  const typeFields = FIELDS_BY_TYPE[data.assetType] || FIELDS_BY_TYPE['other'];

  const updateDetail = (key: string, value: any) => {
    onChange({ assetDetails: { ...data.assetDetails, [key]: value } });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Información del Activo</h2>
        <p className="text-muted-foreground text-sm">Completa los datos de tu activo</p>
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre del Proyecto *</Label>
            <Input
              value={data.projectName}
              onChange={(e) => onChange({ projectName: e.target.value })}
              placeholder="Ej: Torre Residencial Polanco"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Descripción Detallada</Label>
          <Textarea
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Describe tu activo, su potencial de inversión y características principales..."
            rows={4}
          />
        </div>
      </div>

      {/* Dynamic fields by asset type */}
      <div>
        <h3 className="font-medium mb-3 text-sm uppercase tracking-wider text-muted-foreground">
          Detalles específicos — {data.assetType || 'selecciona tipo'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {typeFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label>{field.label}</Label>
              <Input
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                value={data.assetDetails[field.key] || ''}
                onChange={(e) => updateDetail(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepAssetInfo;
