import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Qué es la tokenización de activos reales?", a: "La tokenización es el proceso de convertir los derechos de propiedad de un activo real (inmuebles, arte, commodities, etc.) en tokens digitales en una blockchain. Cada token representa una fracción del activo, permitiendo invertir desde montos pequeños." },
  { q: "¿Cuánto es la inversión mínima?", a: "Puedes comenzar a invertir desde $10 USD en la mayoría de nuestros activos tokenizados. Cada activo puede tener un monto mínimo diferente según su naturaleza y regulación." },
  { q: "¿Cómo recibo mis rendimientos?", a: "Los rendimientos (rentas, dividendos, intereses) se distribuyen automáticamente a tu wallet de forma proporcional a tus tokens. Puedes retirar a tu cuenta bancaria o reinvertir." },
  { q: "¿Es seguro invertir en TOKENIZA?", a: "Sí. Operamos bajo marcos regulatorios de múltiples jurisdicciones, nuestros smart contracts son auditados, utilizamos custodia multi-firma y contamos con seguros digitales para los activos." },
  { q: "¿Puedo vender mis tokens en cualquier momento?", a: "Sí. Nuestro mercado secundario opera 24/7, permitiéndote vender tus tokens a otros inversores cuando lo desees, sujeto a la liquidez disponible." },
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos tarjetas de crédito/débito, transferencias bancarias locales, USDT, USDC, Bitcoin y Ethereum. Los métodos disponibles pueden variar según tu país." },
  { q: "¿Necesito conocimientos técnicos de blockchain?", a: "No. TOKENIZA simplifica todo el proceso. No necesitas tener una wallet ni entender blockchain. Nuestra academia gratuita te enseña todo lo que necesitas saber." },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-accent uppercase tracking-widest">Ayuda</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">Preguntas Frecuentes</h2>
        </div>

        <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-xl px-6 border-none">
              <AccordionTrigger className="text-left font-display font-semibold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
