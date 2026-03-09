import { Search, UserCheck, Wallet, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Search, title: "Elige tu Activo", desc: "Explora inmuebles, arte, commodities y más en nuestro marketplace regulado." },
  { icon: UserCheck, title: "Verificación KYC", desc: "Completa tu verificación de identidad en minutos. Seguro y conforme a regulaciones." },
  { icon: Wallet, title: "Invierte con Cripto o Fiat", desc: "Deposita con tarjeta, transferencia bancaria, USDT, USDC o Bitcoin." },
  { icon: TrendingUp, title: "Recibe Rendimientos", desc: "Gana dividendos, rentas y apreciación de capital de tus tokens automáticamente." },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Proceso</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
            Cómo Funciona
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            En 4 simples pasos, comienza a invertir en activos reales tokenizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}

              <div className="w-20 h-20 rounded-2xl gradient-blue-cyan flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-9 h-9 text-primary-foreground" />
              </div>

              <span className="text-xs text-accent font-bold mb-2 block">PASO {i + 1}</span>
              <h3 className="font-display text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
