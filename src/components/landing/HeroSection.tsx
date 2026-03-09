import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Tokenizados", value: 47, prefix: "$", suffix: "M" },
  { label: "Inversores", value: 12500, prefix: "", suffix: "" },
  { label: "Países", value: 18, prefix: "", suffix: "" },
  { label: "Activos", value: 64, prefix: "", suffix: "" },
];

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.max(1, Math.floor(value / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  const formatted = count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 1 : 1)}K` : count.toString();
  const display = count >= 1000 && value < 100000 ? formatted : count.toLocaleString("es-MX");

  return (
    <span className="font-display text-3xl md:text-4xl font-bold gradient-text">
      {prefix}{display}{suffix}
    </span>
  );
}

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center mesh-gradient overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Regulado en múltiples jurisdicciones LATAM</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Tokeniza Cualquier{" "}
            <span className="gradient-text">Activo Real.</span>
            <br />
            Invierte Desde{" "}
            <span className="text-accent">$10.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            La plataforma líder de tokenización en Hispanoamérica. Accede a inmuebles, arte, commodities y más con tecnología blockchain, de forma simple y regulada.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" className="gradient-gold text-accent-foreground font-semibold text-base px-8 hover:opacity-90">
              Empieza a Invertir
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary text-base px-8">
              Tokeniza tu Activo
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 glass rounded-2xl p-8 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
