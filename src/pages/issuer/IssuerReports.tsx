import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const IssuerReports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reportes</h1>
        <p className="text-muted-foreground">Análisis y métricas de tus activos</p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Reportes próximamente</h3>
          <p className="text-muted-foreground">Las métricas y reportes estarán disponibles cuando tengas activos publicados</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerReports;
