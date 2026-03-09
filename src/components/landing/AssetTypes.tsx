import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Wheat, Palette, FileText, Briefcase, Lightbulb, Trophy } from "lucide-react";

const types = [
  {
    id: "inmuebles", label: "Inmuebles", icon: Building2,
    title: "Bienes Raíces Tokenizados",
    desc: "Invierte en propiedades comerciales y residenciales premium en CDMX, Buenos Aires, Santiago y más. Recibe rentas mensuales proporcionales a tus tokens.",
    examples: ["Departamentos de lujo", "Oficinas corporativas", "Centros comerciales", "Desarrollos turísticos"],
    yield: "8-15%",
  },
  {
    id: "commodities", label: "Commodities", icon: Wheat,
    title: "Materias Primas Tokenizadas",
    desc: "Accede a soja, litio, cobre, esmeraldas y más commodities de la región con respaldo físico real.",
    examples: ["Soja y granos", "Litio argentino", "Cobre chileno", "Esmeraldas colombianas"],
    yield: "10-18%",
  },
  {
    id: "arte", label: "Arte", icon: Palette,
    title: "Arte y Coleccionables",
    desc: "Co-invierte en obras de arte latinoamericano, desde maestros como Botero y Rivera hasta artistas emergentes.",
    examples: ["Pintura contemporánea", "Esculturas", "Arte digital NFT", "Fotografía de autor"],
    yield: "6-12%",
  },
  {
    id: "deuda", label: "Deuda", icon: FileText,
    title: "Instrumentos de Deuda",
    desc: "Bonos corporativos y gubernamentales tokenizados con rendimientos fijos y pagos periódicos.",
    examples: ["Bonos corporativos", "Pagarés PyME", "Deuda soberana", "Factoring tokenizado"],
    yield: "7-11%",
  },
  {
    id: "equity", label: "Equity", icon: Briefcase,
    title: "Capital de Empresas",
    desc: "Invierte en startups y empresas en crecimiento de LATAM. Participa en rondas de inversión desde montos accesibles.",
    examples: ["Startups FinTech", "AgTech", "HealthTech", "E-commerce regional"],
    yield: "15-30%",
  },
  {
    id: "ip", label: "Propiedad Intelectual", icon: Lightbulb,
    title: "Propiedad Intelectual",
    desc: "Invierte en patentes, regalías musicales, licencias de software y otros activos intangibles con flujo de caja.",
    examples: ["Patentes farmacéuticas", "Regalías musicales", "Licencias de software", "Marcas registradas"],
    yield: "12-20%",
  },
  {
    id: "deportivo", label: "Deportivo", icon: Trophy,
    title: "Derechos Deportivos",
    desc: "Fan tokens y derechos económicos de jugadores, clubes y eventos deportivos en la región.",
    examples: ["Fan tokens de clubes", "Derechos de jugadores", "Eventos deportivos", "Merchandising tokenizado"],
    yield: "5-15%",
  },
];

const AssetTypes = () => {
  return (
    <section id="marketplace" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Diversidad</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Tipos de Activos</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Diversifica tu portafolio con 7 categorías de activos reales tokenizados.
          </p>
        </div>

        <Tabs defaultValue="inmuebles" className="max-w-4xl mx-auto">
          <TabsList className="flex flex-wrap h-auto bg-secondary/50 p-1 gap-1 mb-8">
            {types.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5">
                <t.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {types.map((t) => (
            <TabsContent key={t.id} value={t.id}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-blue-cyan flex items-center justify-center">
                    <t.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{t.title}</h3>
                    <span className="text-sm text-accent font-semibold">Rendimiento: {t.yield} anual</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{t.desc}</p>
                <div className="grid grid-cols-2 gap-3">
                  {t.examples.map((ex) => (
                    <div key={ex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default AssetTypes;
