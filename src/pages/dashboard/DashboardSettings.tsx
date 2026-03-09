import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DashboardSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  const handleSave = async () => {
    if (!profile || !user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({
      display_name: profile.display_name,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone,
    }).eq("user_id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil actualizado" });
    }
    setLoading(false);
  };

  if (!profile) return null;

  const kycColors: Record<string, string> = {
    pending: "bg-muted text-muted-foreground",
    in_progress: "bg-accent/10 text-accent",
    in_review: "bg-primary/10 text-primary",
    approved: "bg-green-400/10 text-green-400",
    rejected: "bg-destructive/10 text-destructive",
  };

  const kycLabels: Record<string, string> = {
    pending: "Pendiente",
    in_progress: "En progreso",
    in_review: "En revisión",
    approved: "Aprobado",
    rejected: "Rechazado",
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Gestiona tu perfil y verificación</p>
      </div>

      <Card className="glass border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Estado KYC</CardTitle>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${kycColors[profile.kyc_status]}`}>
              {kycLabels[profile.kyc_status]}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          {profile.kyc_status === "pending" && (
            <Button onClick={() => navigate("/kyc")} className="gradient-gold text-accent-foreground font-semibold">
              Iniciar Verificación KYC
            </Button>
          )}
          {profile.kyc_status === "approved" && (
            <p className="text-sm text-green-400">✓ Tu identidad ha sido verificada exitosamente.</p>
          )}
        </CardContent>
      </Card>

      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="font-display">Datos del Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input value={profile.first_name || ""} onChange={(e) => setProfile({ ...profile, first_name: e.target.value })} className="bg-input" />
            </div>
            <div className="space-y-2">
              <Label>Apellido</Label>
              <Input value={profile.last_name || ""} onChange={(e) => setProfile({ ...profile, last_name: e.target.value })} className="bg-input" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Nombre para mostrar</Label>
            <Input value={profile.display_name || ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} className="bg-input" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled className="bg-input opacity-60" />
          </div>
          <div className="space-y-2">
            <Label>Teléfono</Label>
            <Input value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="bg-input" />
          </div>
          <Button onClick={handleSave} className="gradient-gold text-accent-foreground font-semibold" disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
