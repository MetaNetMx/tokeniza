import { ShieldCheck, FileCode, KeyRound, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: ShieldCheck, title: "KYC/AML", desc: "Verificación de identidad y anti-lavado conforme a regulaciones locales e internacionales." },
  { icon: FileCode, title: "Smart Contracts Auditados", desc: "Contratos inteligentes auditados por firmas líderes de seguridad blockchain." },
  { icon: KeyRound, title: "Multi-firma", desc: "Custodia de activos con esquema multi-firma para máxima seguridad." },
  { icon: ShieldAlert, title: "Seguro Digital", desc: "Cobertura de seguro para activos tokenizados y fondos custodiados." },
];

const countries = ["Argentina", "México", "Chile", "Colombia", "Brasil", "España", "Perú", "Uruguay", "Costa Rica", "Panamá"];

const RegulationSecurity = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Confianza</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Regulación y Seguridad</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tu inversión protegida con los más altos estándares de seguridad y cumplimiento regulatorio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Jurisdictions map placeholder */}
        <div className="glass rounded-2xl p-8 max-w-3xl mx-auto text-center">
          <h3 className="font-display text-xl font-bold mb-6">Jurisdicciones Soportadas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {countries.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegulationSecurity;
