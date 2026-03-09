import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, Shield, Bell, Wallet, Globe, Trash2, Camera, 
  CheckCircle, Clock, AlertCircle, ExternalLink, Plus
} from "lucide-react";

const UserSettings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    phone: "",
    avatar_url: "",
    kyc_status: "pending",
  });
  const [notifications, setNotifications] = useState({
    email_investments: true,
    email_dividends: true,
    email_news: false,
    push_investments: true,
    push_dividends: true,
    push_news: false,
  });
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (data) {
        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          display_name: data.display_name || "",
          phone: data.phone || "",
          avatar_url: data.avatar_url || "",
          kyc_status: data.kyc_status || "pending",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          display_name: profile.display_name,
          phone: profile.phone,
          avatar_url: profile.avatar_url,
        })
        .eq("user_id", user.id);

      if (error) throw error;
      toast.success("Perfil actualizado correctamente");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    toast.error("Esta función requiere confirmación adicional. Contacta a soporte.");
  };

  const KYC_STATUS_CONFIG = {
    pending: { color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock, label: "Pendiente" },
    approved: { color: "bg-green-500/20 text-green-400 border-green-500/30", icon: CheckCircle, label: "Aprobado" },
    rejected: { color: "bg-red-500/20 text-red-400 border-red-500/30", icon: AlertCircle, label: "Rechazado" },
  };

  const kycConfig = KYC_STATUS_CONFIG[profile.kyc_status as keyof typeof KYC_STATUS_CONFIG] || KYC_STATUS_CONFIG.pending;
  const KycIcon = kycConfig.icon;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Configuración</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start bg-card border border-border overflow-x-auto">
          <TabsTrigger value="profile" className="gap-1"><User className="w-4 h-4" /> Perfil</TabsTrigger>
          <TabsTrigger value="security" className="gap-1"><Shield className="w-4 h-4" /> Seguridad</TabsTrigger>
          <TabsTrigger value="kyc" className="gap-1"><CheckCircle className="w-4 h-4" /> KYC</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1"><Bell className="w-4 h-4" /> Notificaciones</TabsTrigger>
          <TabsTrigger value="wallets" className="gap-1"><Wallet className="w-4 h-4" /> Wallets</TabsTrigger>
          <TabsTrigger value="preferences" className="gap-1"><Globe className="w-4 h-4" /> Preferencias</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-display">Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback className="text-2xl">
                      {profile.first_name?.[0] || user?.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <p className="font-medium">{profile.display_name || user?.email}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    value={profile.first_name}
                    onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Apellido</Label>
                  <Input
                    value={profile.last_name}
                    onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nombre de Usuario</Label>
                  <Input
                    value={profile.display_name}
                    onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>URL de Avatar</Label>
                <Input
                  value={profile.avatar_url}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-display">Seguridad de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Cambiar Contraseña</p>
                    <p className="text-sm text-muted-foreground">Actualiza tu contraseña regularmente</p>
                  </div>
                  <Button variant="outline">Cambiar</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Autenticación de Dos Factores (2FA)</p>
                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">Sesiones Activas</p>
                    <p className="text-sm text-muted-foreground">Gestiona dispositivos conectados</p>
                  </div>
                  <Button variant="outline">Ver</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-display">Verificación de Identidad (KYC)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${kycConfig.color}`}>
                  <KycIcon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Estado de Verificación</p>
                  <Badge variant="outline" className={kycConfig.color}>
                    {kycConfig.label}
                  </Badge>
                </div>
                {profile.kyc_status !== "approved" && (
                  <Button>Completar KYC</Button>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Documentos Verificados</h4>
                <div className="space-y-2">
                  {["Documento de Identidad", "Comprobante de Domicilio", "Selfie de Verificación"].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <span className="text-sm">{doc}</span>
                      {profile.kyc_status === "approved" ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-display">Preferencias de Notificación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Email</h4>
                {[
                  { key: "email_investments", label: "Nuevas inversiones y confirmaciones" },
                  { key: "email_dividends", label: "Dividendos y rendimientos" },
                  { key: "email_news", label: "Noticias y actualizaciones" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="font-semibold">Push</h4>
                {[
                  { key: "push_investments", label: "Nuevas inversiones y confirmaciones" },
                  { key: "push_dividends", label: "Dividendos y rendimientos" },
                  { key: "push_news", label: "Noticias y actualizaciones" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
              </div>

              <Button>Guardar Preferencias</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Wallets Tab */}
        <TabsContent value="wallets">
          <Card className="glass border-border">
            <CardHeader>
              <CardTitle className="font-display">Wallets Conectadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="font-medium">MetaMask</p>
                      <p className="text-xs text-muted-foreground font-mono">0x1234...5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Principal
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full gap-2">
                <Plus className="w-4 h-4" /> Conectar Nueva Wallet
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-6">
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-display">Idioma y Región</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-destructive/50">
              <CardHeader>
                <CardTitle className="font-display text-destructive flex items-center gap-2">
                  <Trash2 className="w-5 h-5" /> Zona de Peligro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Esta acción es irreversible. Se eliminarán todos tus datos, inversiones y configuraciones.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Eliminar Cuenta
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
