import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hexagon, Mail, Lock, Eye, EyeOff, User, Wallet, Building2, TrendingUp, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const COUNTRIES = [
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "PE", name: "Perú", flag: "🇵🇪" },
  { code: "EC", name: "Ecuador", flag: "🇪🇨" },
  { code: "UY", name: "Uruguay", flag: "🇺🇾" },
  { code: "PY", name: "Paraguay", flag: "🇵🇾" },
  { code: "BO", name: "Bolivia", flag: "🇧🇴" },
  { code: "VE", name: "Venezuela", flag: "🇻🇪" },
  { code: "PA", name: "Panamá", flag: "🇵🇦" },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
  { code: "GT", name: "Guatemala", flag: "🇬🇹" },
  { code: "DO", name: "Rep. Dominicana", flag: "🇩🇴" },
  { code: "HN", name: "Honduras", flag: "🇭🇳" },
  { code: "SV", name: "El Salvador", flag: "🇸🇻" },
  { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
  { code: "CU", name: "Cuba", flag: "🇨🇺" },
  { code: "PR", name: "Puerto Rico", flag: "🇵🇷" },
  { code: "ES", name: "España", flag: "🇪🇸" },
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
];

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"inversor" | "emisor">("inversor");
  const [country, setCountry] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast({ title: "Error", description: "Debes aceptar los términos y condiciones", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Error", description: "Las contraseñas no coinciden", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "Error", description: "La contraseña debe tener al menos 6 caracteres", variant: "destructive" });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          full_name: fullName,
          account_type: accountType,
          country: country,
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast({ title: "Error al registrarse", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "¡Cuenta creada!", description: "Revisa tu email para confirmar tu cuenta." });
      navigate("/login");
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: "google" | "apple") => {
    const { error } = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: "Error", description: String(error), variant: "destructive" });
    }
  };

  const handleWalletConnect = async () => {
    setWalletLoading(true);
    try {
      // Check if MetaMask is available
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        if (accounts && accounts.length > 0) {
          toast({ 
            title: "Wallet Conectada", 
            description: `${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)} conectada exitosamente` 
          });
        }
      } else {
        toast({ 
          title: "MetaMask no detectado", 
          description: "Instala MetaMask para conectar tu wallet", 
          variant: "destructive" 
        });
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "No se pudo conectar la wallet", variant: "destructive" });
    } finally {
      setWalletLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 mesh-gradient">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <Hexagon className="w-8 h-8 text-accent" />
              <span className="font-display text-2xl font-bold">TOKENIZA</span>
            </Link>
            <h1 className="font-display text-3xl font-bold mb-2">Crea tu cuenta</h1>
            <p className="text-muted-foreground">Empieza a invertir en activos reales tokenizados</p>
          </div>

          <form onSubmit={handleRegister} className="glass rounded-2xl p-6 space-y-4">
            {/* Account Type Selector */}
            <div className="space-y-2">
              <Label>Tipo de cuenta</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAccountType("inversor")}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    accountType === "inversor"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <TrendingUp className={`w-6 h-6 ${accountType === "inversor" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">Inversor</span>
                  <span className="text-xs text-muted-foreground">Compra tokens</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("emisor")}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    accountType === "emisor"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <Building2 className={`w-6 h-6 ${accountType === "emisor" ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm font-medium">Emisor</span>
                  <span className="text-xs text-muted-foreground">Tokeniza activos</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="name" placeholder="Juan Pérez" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 bg-input" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-input" required />
              </div>
            </div>

            {/* Country Selector */}
            <div className="space-y-2">
              <Label>País de residencia</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="bg-input">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Selecciona tu país" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Mín. 6 chars" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10 bg-input" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Repite" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 bg-input" required />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                Acepto los{" "}
                <a href="#" className="text-primary hover:underline">Términos y Condiciones</a>{" "}
                y la{" "}
                <a href="#" className="text-primary hover:underline">Política de Privacidad</a>{" "}
                de TOKENIZA. Entiendo los riesgos asociados a inversiones en activos digitales.
              </label>
            </div>

            <Button type="submit" className="w-full gradient-gold text-accent-foreground font-semibold" disabled={loading || !acceptTerms}>
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>

            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">o continúa con</span>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button type="button" variant="outline" className="w-full gap-1 text-xs" onClick={() => handleSocialLogin("google")}>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </Button>
              <Button type="button" variant="outline" className="w-full gap-1 text-xs" onClick={() => handleSocialLogin("apple")}>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </Button>
              <Button type="button" variant="outline" className="w-full gap-1 text-xs" onClick={handleWalletConnect} disabled={walletLoading}>
                <Wallet className="w-4 h-4 shrink-0" />
                {walletLoading ? "..." : "Wallet"}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">Iniciar sesión</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right side - Visual */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-md"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Hexagon className="w-24 h-24 text-accent mx-auto" />
            </motion.div>
            
            <h2 className="font-display text-4xl font-bold">
              El futuro de la inversión es <span className="gradient-text">digital</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Accede a activos reales tokenizados desde $50 USD. Inmuebles, commodities, arte y más.
            </p>
            
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">$10M+</p>
                <p className="text-xs text-muted-foreground">Activos Tokenizados</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">5,000+</p>
                <p className="text-xs text-muted-foreground">Inversores</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-primary">8.5%</p>
                <p className="text-xs text-muted-foreground">Rendimiento Prom.</p>
              </div>
            </div>

            {/* Floating cards */}
            <div className="relative mt-8">
              <motion.div
                animate={{ x: [0, 10, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="glass rounded-xl p-4 max-w-xs mx-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Torre Santa Fe</p>
                    <p className="text-xs text-muted-foreground">+8.7% rendimiento anual</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
