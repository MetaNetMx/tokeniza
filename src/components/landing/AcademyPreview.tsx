import { BookOpen, PlayCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const courses = [
  { icon: BookOpen, title: "Tokenización 101", desc: "Aprende los fundamentos de la tokenización de activos reales.", level: "Principiante", duration: "2h" },
  { icon: PlayCircle, title: "Blockchain para Inversores", desc: "Entiende cómo funciona la tecnología detrás de tus inversiones.", level: "Intermedio", duration: "3h" },
  { icon: Award, title: "Análisis de Activos RWA", desc: "Domina el análisis de activos reales tokenizados para maximizar retornos.", level: "Avanzado", duration: "5h" },
];

const AcademyPreview = () => {
  return (
    <section id="academia" className="py-20 md:py-28 mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Educación</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Academia TOKENIZA</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Educación gratuita para que inviertas con conocimiento y confianza.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {courses.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <c.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="px-2 py-0.5 rounded bg-secondary">{c.level}</span>
                <span>{c.duration}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="gradient-gold text-accent-foreground font-semibold hover:opacity-90">
            Acceder a Academia Gratuita
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AcademyPreview;
