import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, Zap, Users, TrendingUp, Globe, ChevronRight, Check, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { toast } from "sonner";
import { useState } from "react";

const BENEFITS = [
  {
    icon: Globe,
    title: "Alcance Global",
    description: "Accede a inversores de todo el mundo sin intermediarios tradicionales."
  },
  {
    icon: Zap,
    title: "Rapidez",
    description: "Tokeniza tu activo en semanas, no meses. Proceso simplificado de inicio a fin."
  },
  {
    icon: Shield,
    title: "Cumplimiento Regulatorio",
    description: "Framework legal robusto que cumple con regulaciones de múltiples jurisdicciones."
  },
  {
    icon: Users,
    title: "Base de Inversores",
    description: "Más de 50,000 inversores verificados listos para participar en tu proyecto."
  },
  {
    icon: TrendingUp,
    title: "Liquidez",
    description: "Mercado secundario activo que permite a tus inversores comerciar tokens."
  },
  {
    icon: Building2,
    title: "Soporte Completo",
    description: "Equipo dedicado de expertos legales, técnicos y financieros."
  }
];

const PROCESS_STEPS = [
  { step: 1, title: "Contacto Inicial", description: "Evaluamos tu activo y definimos la estructura ideal" },
  { step: 2, title: "Due Diligence", description: "Verificación legal, valuación y documentación" },
  { step: 3, title: "Tokenización", description: "Creación del smart contract y emisión de tokens" },
  { step: 4, title: "Listado", description: "Publicación en marketplace y captación de inversores" },
];

const PLANS = [
  {
    name: "Startup",
    price: "$2,500",
    period: "/mes",
    description: "Para empresas que comienzan a tokenizar",
    features: [
      "1 activo tokenizado",
      "Hasta $500K en emisión",
      "Soporte por email",
      "Dashboard básico",
      "Reportes mensuales"
    ],
    cta: "Comenzar",
    popular: false
  },
  {
    name: "Business",
    price: "$5,000",
    period: "/mes",
    description: "Para empresas en crecimiento",
    features: [
      "Hasta 5 activos tokenizados",
      "Hasta $5M en emisión",
      "Soporte prioritario 24/7",
      "Dashboard avanzado",
      "Reportes semanales",
      "API de integración",
      "Gestor de cuenta dedicado"
    ],
    cta: "Elegir Business",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Solución a medida para grandes corporaciones",
    features: [
      "Activos ilimitados",
      "Sin límite de emisión",
      "Soporte enterprise",
      "White-label disponible",
      "Integraciones personalizadas",
      "SLA garantizado",
      "Equipo legal dedicado"
    ],
    cta: "Contactar",
    popular: false
  }
];

const TESTIMONIALS = [
  {
    quote: "TOKENIZA nos permitió abrir nuestra cartera inmobiliaria a miles de pequeños inversores. El proceso fue sorprendentemente simple.",
    author: "Carlos Martínez",
    role: "CEO, Grupo Inmobiliario MX",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  },
  {
    quote: "En 3 semanas teníamos nuestro proyecto tokenizado y recaudando inversión. El equipo de soporte fue excepcional.",
    author: "Ana Rodríguez",
    role: "CFO, AgroToken SA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  }
];

const Empresas = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    assetType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Gracias! Un asesor se contactará contigo pronto.");
    setFormData({ name: "", company: "", email: "", phone: "", assetType: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="container mx-auto max-w-6xl relative">
            <div className="text-center space-y-6">
              <Badge variant="outline" className="px-4 py-1">
                Para Empresas
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                Tokeniza tus activos con <span className="gradient-text">TOKENIZA</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                La plataforma líder en Latinoamérica para convertir activos reales en tokens digitales. 
                Accede a capital global de forma simple y regulada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="gradient-blue-cyan text-primary-foreground">
                  Agendar Demo <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Ver Casos de Éxito
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">¿Por qué elegir TOKENIZA?</h2>
              <p className="text-muted-foreground">Beneficios exclusivos para emisores</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, index) => (
                <Card key={index} className="glass border-border hover:border-primary/50 transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Proceso Simplificado</h2>
              <p className="text-muted-foreground">De activo físico a token digital en 4 pasos</p>
            </div>
            <div className="space-y-6">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step.step} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 pb-6 border-l-2 border-primary/30 pl-6 ml-6 relative">
                    <div className="absolute -left-[25px] top-0 w-3 h-3 rounded-full bg-primary" />
                    <h3 className="font-display font-semibold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Planes para Emisores</h2>
              <p className="text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <Card 
                  key={plan.name} 
                  className={`glass border-border relative overflow-hidden ${
                    plan.popular ? "border-primary ring-2 ring-primary/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg">
                      Más Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="font-display">
                      <span className="text-xl">{plan.name}</span>
                      <div className="mt-2">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground text-base">{plan.period}</span>
                      </div>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? "gradient-blue-cyan text-primary-foreground" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, index) => (
                <Card key={index} className="glass border-border">
                  <CardContent className="p-6 space-y-4">
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-bold">Contáctanos</h2>
                <p className="text-muted-foreground">
                  ¿Tienes un activo que quieres tokenizar? Completa el formulario y un asesor 
                  especializado se pondrá en contacto contigo.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>empresas@tokeniza.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <span>+52 3323437338</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <a href="https://wa.me/523323437338" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      WhatsApp: +52 3323437338
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Ciudad de México, México</span>
                  </div>
                </div>
              </div>

              <Card className="glass border-border">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm">Nombre</label>
                        <Input 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm">Empresa</label>
                        <Input 
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Email</label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Teléfono</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Tipo de Activo</label>
                      <Input 
                        placeholder="Ej: Inmueble comercial, Commodity, etc."
                        value={formData.assetType}
                        onChange={(e) => setFormData({...formData, assetType: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Mensaje</label>
                      <Textarea 
                        placeholder="Cuéntanos sobre tu proyecto..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-blue-cyan text-primary-foreground">
                      Enviar Solicitud
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Empresas;
