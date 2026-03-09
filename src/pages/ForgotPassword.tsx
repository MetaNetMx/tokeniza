import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hexagon, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex mesh-gradient">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Hexagon className="w-8 h-8 text-accent" />
              <span className="font-display text-2xl font-bold">TOKENIZA</span>
            </Link>
            <h1 className="font-display text-3xl font-bold mb-2">Recuperar contraseña</h1>
            <p className="text-muted-foreground">Te enviaremos un enlace para restablecer tu contraseña</p>
          </div>

          {sent ? (
            <div className="glass rounded-2xl p-8 text-center">
              <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="font-display text-xl font-bold mb-2">Revisa tu email</h2>
              <p className="text-muted-foreground mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Volver al login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="glass rounded-2xl p-8 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 bg-input" required />
                </div>
              </div>
              <Button type="submit" className="w-full gradient-gold text-accent-foreground font-semibold" disabled={loading}>
                {loading ? "Enviando..." : "Enviar enlace de recuperación"}
              </Button>
              <p className="text-center text-sm">
                <Link to="/login" className="text-primary hover:underline">Volver al login</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
