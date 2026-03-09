import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const IssuerCompliance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance</h1>
        <p className="text-muted-foreground">Estado regulatorio y documentación</p>
      </div>
      <Card>
        <CardContent className="p-12 text-center">
          <ShieldCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">Centro de Compliance</h3>
          <p className="text-muted-foreground">El estado de cumplimiento de tus tokens aparecerá aquí</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuerCompliance;
