import { Hexagon, Smartphone, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [ethPrice] = useState("$3,847.22");
  const [btcPrice] = useState("$97,234.50");
  const [platformStatus] = useState<"online" | "maintenance">("online");

  return (
    <footer className="bg-secondary/30 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-3 rounded-lg bg-muted/30 border border-border text-xs">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">BTC: <span className="text-foreground font-medium">{btcPrice}</span></span>
            <span className="text-muted-foreground">ETH: <span className="text-foreground font-medium">{ethPrice}</span></span>
          </div>
          <div className="flex items-center gap-2">
            {platformStatus === "online" ? (
              <><Wifi className="w-3 h-3 text-green-400" /><span className="text-green-400">Plataforma Online</span></>
            ) : (
              <><WifiOff className="w-3 h-3 text-yellow-400" /><span className="text-yellow-400">Mantenimiento</span></>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Hexagon className="w-7 h-7 text-accent" />
              <span className="font-display text-lg font-bold">TOKENIZA</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              La plataforma líder de tokenización de activos reales en Hispanoamérica.
            </p>
            {/* App Store badges */}
            <div className="flex gap-2 mt-4">
              <a href="#" className="block px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs hover:bg-muted transition-colors">
                <Smartphone className="w-4 h-4 inline mr-1" /> App Store
              </a>
              <a href="#" className="block px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs hover:bg-muted transition-colors">
                <Smartphone className="w-4 h-4 inline mr-1" /> Play Store
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/dashboard/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link></li>
              <li><Link to="/academia" className="hover:text-foreground transition-colors">Academia</Link></li>
              <li><Link to="/calculadora" className="hover:text-foreground transition-colors">Calculadora</Link></li>
              <li><Link to="/empresas" className="hover:text-foreground transition-colors">Para Empresas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre Nosotros</a></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Prensa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Términos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Regulación</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-semibold mb-4 text-sm">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Recibe las mejores oportunidades de inversión.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 h-9 rounded-md bg-input border border-border px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <Button size="sm" className="gradient-gold text-accent-foreground font-semibold">
                OK
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 TOKENIZA LATAM. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">Telegram</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
