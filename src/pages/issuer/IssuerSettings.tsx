import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const IssuerSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Ajustes de tu cuenta de emisor</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user?.email || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>ID de Usuario</Label>
              <Input value={user?.id || ''} disabled className="font-mono text-xs" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información del Emisor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nombre de la Empresa</Label>
              <Input placeholder="Tu empresa S.A. de C.V." />
            </div>
            <div className="space-y-2">
              <Label>RFC / Tax ID</Label>
              <Input placeholder="ABC123456XYZ" />
            </div>
            <div className="space-y-2">
              <Label>País de Registro</Label>
              <Input placeholder="México" />
            </div>
            <div className="space-y-2">
              <Label>Teléfono de Contacto</Label>
              <Input placeholder="+52 55 1234 5678" />
            </div>
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerSettings;
