import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  { name: "María García", country: "México", role: "Inversora", quote: "Con TOKENIZA invertí en un departamento en Polanco por solo $50. Recibo rentas cada mes directamente en mi wallet. ¡Increíble!", rating: 5 },
  { name: "Carlos Mendoza", country: "Argentina", role: "Empresario", quote: "Tokenicé mi bodega en Mendoza y levanté capital de inversores de 8 países en solo 3 semanas. La plataforma es impecable.", rating: 5 },
  { name: "Ana Sofía Reyes", country: "Colombia", role: "Inversora", quote: "La academia me enseñó todo sobre tokenización. Ahora tengo un portafolio diversificado en 5 tipos de activos.", rating: 5 },
  { name: "Roberto Flores", country: "Chile", role: "Inversor", quote: "El rendimiento de mis tokens de cobre chileno superó mis expectativas. La transparencia de la plataforma genera confianza.", rating: 5 },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Comunidad</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Lo Que Dicen Nuestros Inversores</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 text-center relative min-h-[280px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-foreground mb-6 italic leading-relaxed">
                  "{t.quote}"
                </blockquote>
                <div>
                  <p className="font-display font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role} · {t.country}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-8">
              <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <Button variant="outline" size="icon" onClick={next} className="rounded-full">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
