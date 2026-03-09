import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Coins, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: any;
}

const STEPS = ["Cantidad", "Confirmar", "Resultado"];

const InvestmentModal = ({ open, onOpenChange, asset }: Props) => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = quantity * asset.token_price;
  const minTokens = Math.ceil(asset.min_investment / asset.token_price);
  const maxTokens = asset.total_tokens - asset.sold_tokens;

  const handleInvest = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Insert into portfolio
      const { error: portfolioErr } = await supabase.from("portfolios").insert({
        user_id: user.id,
        asset_name: asset.name,
        asset_type: asset.asset_type,
        token_symbol: asset.token_symbol,
        token_name: asset.token_name,
        quantity,
        purchase_price: asset.token_price,
        current_price: asset.token_price,
        yield_rate: asset.expected_yield,
      });
      if (portfolioErr) throw portfolioErr;

      // Insert transaction
      const { error: txErr } = await supabase.from("transactions").insert({
        user_id: user.id,
        type: "investment",
        amount: total,
        asset_name: asset.name,
        description: `Compra de ${quantity} tokens ${asset.token_symbol}`,
        currency: "USD",
        status: "completed",
      });
      if (txErr) throw txErr;

      setSuccess(true);
      setStep(2);
      toast.success("¡Inversión realizada con éxito!");
    } catch (err: any) {
      toast.error(err.message || "Error al procesar la inversión");
      setStep(2);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(0);
      setQuantity(minTokens || 1);
      setSuccess(false);
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md glass border-border">
        <DialogHeader>
          <DialogTitle className="font-display">Invertir en {asset.name}</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-4">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {/* Step 0: Quantity */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Cantidad de tokens</label>
              <Input
                type="number"
                min={minTokens}
                max={maxTokens}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(minTokens, Math.min(maxTokens, parseInt(e.target.value) || minTokens)))}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mín: {minTokens} tokens · Máx: {maxTokens.toLocaleString()} tokens disponibles
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Precio por token</span>
                <span>${asset.token_price}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Cantidad</span>
                <span>{quantity}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="font-display">${total.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => setStep(1)} disabled={quantity < minTokens}>
              Continuar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {/* Step 1: Confirm */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 space-y-3">
              <h4 className="font-display font-semibold">Resumen de inversión</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Activo</span>
                  <span>{asset.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token</span>
                  <span>{asset.token_symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cantidad</span>
                  <span>{quantity} tokens</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Red</span>
                  <span>{asset.blockchain_network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rendimiento esperado</span>
                  <span className="text-green-400">{asset.expected_yield}%</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total a invertir</span>
                  <span className="font-display text-lg">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Al confirmar, aceptas los términos y condiciones de inversión. Los rendimientos pasados no garantizan resultados futuros.
            </p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                Atrás
              </Button>
              <Button className="flex-1 gradient-blue-cyan text-primary-foreground" onClick={handleInvest} disabled={loading}>
                {loading ? "Procesando..." : "Confirmar Inversión"}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Result */}
        {step === 2 && (
          <div className="text-center space-y-4 py-4">
            {success ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
                <h3 className="font-display text-xl font-bold">¡Inversión Exitosa!</h3>
                <p className="text-muted-foreground text-sm">
                  Has adquirido {quantity} tokens de {asset.token_symbol} por ${total.toLocaleString()}.
                  Los tokens se reflejarán en tu portafolio.
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
                <h3 className="font-display text-xl font-bold">Error en la Inversión</h3>
                <p className="text-muted-foreground text-sm">
                  No se pudo procesar tu inversión. Por favor, intenta nuevamente.
                </p>
              </>
            )}
            <Button className="w-full" onClick={handleClose}>
              {success ? "Ver mi Portafolio" : "Cerrar"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
