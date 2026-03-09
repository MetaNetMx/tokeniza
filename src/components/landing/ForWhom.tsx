import { TrendingUp, Building } from "lucide-react";
import { motion } from "framer-motion";

const ForWhom = () => {
  return (
    <section className="py-20 md:py-28 mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Audiencia</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">¿Para Quién es TOKENIZA?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="w-14 h-14 rounded-xl gradient-blue-cyan flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Inversores</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Invierte desde $10 en activos antes exclusivos</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Diversifica en inmuebles, arte, commodities y más</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Recibe rendimientos automáticos en tu wallet</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Liquidez 24/7 en mercado secundario</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Sin intermediarios costosos</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-6">
              <Building className="w-7 h-7 text-accent-foreground" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4">Propietarios y Empresas</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Tokeniza tu activo y accede a capital global</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Fracciona cualquier activo real en tokens</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Marco legal y regulatorio incluido</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Dashboard de gestión completo</li>
              <li className="flex items-start gap-2"><span className="text-accent mt-1">✦</span> Soporte técnico y legal dedicado</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForWhom;
