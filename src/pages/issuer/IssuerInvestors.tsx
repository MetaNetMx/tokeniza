import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const IssuerInvestors = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inversores</h1>
        <p className="text-muted-foreground">Lista de inversores en tus activos</p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Sin inversores aún</h3>
          <p className="text-muted-foreground">Los inversores aparecerán aquí cuando inviertan en tus tokens</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerInvestors;
