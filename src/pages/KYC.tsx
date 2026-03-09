import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hexagon, User, FileText, Camera, Landmark, CheckCircle2, ArrowRight, ArrowLeft, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { title: "Datos Personales", icon: User },
  { title: "Documento de ID", icon: FileText },
  { title: "Selfie de Verificación", icon: Camera },
  { title: "Origen de Fondos", icon: Landmark },
  { title: "Confirmación", icon: CheckCircle2 },
];

const KYC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    first_name: "", last_name: "", date_of_birth: "", nationality: "",
    document_type: "dni", document_number: "", phone: "",
    fund_source: "", fund_amount: "",
  });

  const progress = ((step + 1) / steps.length) * 100;

  const updateField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleNext = async () => {
    if (step < steps.length - 2) {
      setStep(step + 1);
      return;
    }

    if (step === steps.length - 2) {
      // Submit KYC
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: form.first_name,
          last_name: form.last_name,
          date_of_birth: form.date_of_birth || null,
          nationality: form.nationality,
          document_type: form.document_type,
          document_number: form.document_number,
          phone: form.phone,
          kyc_status: "in_review",
          kyc_step: 5,
        })
        .eq("user_id", user?.id!);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        setStep(step + 1);
        // Simulate approval after 2 seconds
        setTimeout(async () => {
          await supabase.from("profiles").update({ kyc_status: "approved" }).eq("user_id", user?.id!);
        }, 2000);
      }
      setLoading(false);
      return;
    }

    // Final step — go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen mesh-gradient px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Hexagon className="w-8 h-8 text-accent mx-auto mb-3" />
          <h1 className="font-display text-2xl font-bold">Verificación de Identidad (KYC)</h1>
          <p className="text-muted-foreground text-sm mt-1">Completa tu verificación para invertir</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2 mb-4" />
          <div className="flex justify-between">
            {steps.map((s, i) => (
              <div key={s.title} className={`flex flex-col items-center gap-1 ${i <= step ? "text-accent" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? "gradient-gold text-accent-foreground" : "bg-secondary"} ${i === step ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""}`}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="text-xs hidden sm:block">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="glass rounded-2xl p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold mb-4">Datos Personales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input value={form.first_name} onChange={(e) => updateField("first_name", e.target.value)} placeholder="Juan" className="bg-input" required />
                </div>
                <div className="space-y-2">
                  <Label>Apellido</Label>
                  <Input value={form.last_name} onChange={(e) => updateField("last_name", e.target.value)} placeholder="Pérez" className="bg-input" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de nacimiento</Label>
                  <Input type="date" value={form.date_of_birth} onChange={(e) => updateField("date_of_birth", e.target.value)} className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label>Nacionalidad</Label>
                  <Select value={form.nationality} onValueChange={(v) => updateField("nationality", v)}>
                    <SelectTrigger className="bg-input"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                    <SelectContent>
                      {["Argentina", "México", "Colombia", "Chile", "España", "Perú", "Uruguay", "Brasil", "Otro"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de documento</Label>
                  <Select value={form.document_type} onValueChange={(v) => updateField("document_type", v)}>
                    <SelectTrigger className="bg-input"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dni">DNI / Cédula</SelectItem>
                      <SelectItem value="passport">Pasaporte</SelectItem>
                      <SelectItem value="license">Licencia de conducir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Número de documento</Label>
                  <Input value={form.document_number} onChange={(e) => updateField("document_number", e.target.value)} placeholder="12345678" className="bg-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+54 11 1234-5678" className="bg-input" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold mb-4">Documento de Identidad</h2>
              <p className="text-muted-foreground text-sm mb-6">Sube fotos claras del frente y dorso de tu documento.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Frente del documento", "Dorso del documento"].map((label) => (
                  <div key={label} className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG o PDF · Max 10MB</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold mb-4">Selfie de Verificación</h2>
              <p className="text-muted-foreground text-sm mb-6">Toma una selfie sosteniendo tu documento junto a tu rostro.</p>
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium">Tomar selfie o subir foto</p>
                <p className="text-xs text-muted-foreground mt-1">Asegúrate de que tu rostro y el documento sean claramente visibles</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold mb-4">Declaración de Origen de Fondos</h2>
              <div className="space-y-2">
                <Label>Origen principal de tus fondos</Label>
                <Select value={form.fund_source} onValueChange={(v) => updateField("fund_source", v)}>
                  <SelectTrigger className="bg-input"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salario / Empleo</SelectItem>
                    <SelectItem value="business">Negocio propio</SelectItem>
                    <SelectItem value="investments">Inversiones previas</SelectItem>
                    <SelectItem value="savings">Ahorros</SelectItem>
                    <SelectItem value="inheritance">Herencia</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Monto estimado a invertir (USD)</Label>
                <Select value={form.fund_amount} onValueChange={(v) => updateField("fund_amount", v)}>
                  <SelectTrigger className="bg-input"><SelectValue placeholder="Selecciona" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_1k">Menos de $1,000</SelectItem>
                    <SelectItem value="1k_10k">$1,000 - $10,000</SelectItem>
                    <SelectItem value="10k_50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k_plus">Más de $50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-accent-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">¡Verificación Enviada!</h2>
              <p className="text-muted-foreground mb-2">Tu solicitud está siendo revisada.</p>
              <p className="text-sm text-accent font-semibold">Estado: En Revisión → Aprobado</p>
              <p className="text-xs text-muted-foreground mt-4">Esto normalmente toma entre 1-24 horas. Te notificaremos por email.</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            {step > 0 && step < 4 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Anterior
              </Button>
            )}
            <div className="ml-auto">
              <Button onClick={handleNext} className="gradient-gold text-accent-foreground font-semibold gap-2" disabled={loading}>
                {step === 4 ? "Ir al Dashboard" : step === 3 ? "Enviar Verificación" : "Siguiente"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYC;
