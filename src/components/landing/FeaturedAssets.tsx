import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Palette, Wheat, FileText, Briefcase, Trophy, Lightbulb, Gem } from "lucide-react";
import { motion } from "framer-motion";

const assets = [
  { name: "Torre Reforma 115", location: "CDMX, México", type: "Inmueble", icon: Building2, yield: 12.5, min: 10, progress: 78, badge: "Popular" },
  { name: "Colección Rivera", location: "Buenos Aires, Argentina", type: "Arte", icon: Palette, yield: 8.2, min: 25, progress: 45, badge: "Nuevo" },
  { name: "Soja Pampa 2025", location: "Córdoba, Argentina", type: "Commodity", icon: Wheat, yield: 15.0, min: 50, progress: 92, badge: "Casi lleno" },
  { name: "Bono Corp LATAM", location: "Santiago, Chile", type: "Deuda", icon: FileText, yield: 9.8, min: 100, progress: 60, badge: null },
  { name: "Startup FinTech MX", location: "Monterrey, México", type: "Equity", icon: Briefcase, yield: 22.0, min: 200, progress: 35, badge: "Alto retorno" },
  { name: "FC Tigres Token", location: "Monterrey, México", type: "Deportivo", icon: Trophy, yield: 6.5, min: 15, progress: 88, badge: "Fan Token" },
  { name: "Patente BioTech", location: "São Paulo, Brasil", type: "IP", icon: Lightbulb, yield: 18.0, min: 75, progress: 52, badge: null },
  { name: "Esmeraldas Boyacá", location: "Bogotá, Colombia", type: "Commodity", icon: Gem, yield: 11.3, min: 30, progress: 67, badge: "Exclusivo" },
];

const FeaturedAssets = () => {
  return (
    <section id="activos" className="py-20 md:py-28 mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Marketplace</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Activos Destacados</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Descubre oportunidades de inversión tokenizada en toda Latinoamérica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assets.map((asset, i) => (
            <motion.div
              key={asset.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl overflow-hidden hover:border-primary/50 transition-all group cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="h-36 bg-gradient-to-br from-secondary to-muted relative flex items-center justify-center">
                <asset.icon className="w-12 h-12 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                {asset.badge && (
                  <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs">
                    {asset.badge}
                  </Badge>
                )}
              </div>

              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{asset.type} · {asset.location}</p>
                <h3 className="font-display font-semibold text-sm mb-3 group-hover:text-primary transition-colors">
                  {asset.name}
                </h3>

                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Rendimiento</span>
                  <span className="text-accent font-bold">{asset.yield}% anual</span>
                </div>
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-muted-foreground">Mín. inversión</span>
                  <span className="font-semibold">${asset.min}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Financiado</span>
                    <span>{asset.progress}%</span>
                  </div>
                  <Progress value={asset.progress} className="h-1.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAssets;
