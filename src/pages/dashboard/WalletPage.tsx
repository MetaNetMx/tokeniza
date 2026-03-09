import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const wallets = [
  { currency: "USDT", balance: 1250.00, address: "0x742d35Cc6634C0532...a1b2c3" },
  { currency: "USDC", balance: 340.50, address: "0x892e45Dd7745D0643...d4e5f6" },
  { currency: "ETH", balance: 0.45, address: "0x123f56Ee8856E0754...g7h8i9" },
];

const history = [
  { type: "Depósito", currency: "USDT", amount: "+500.00", date: "05 Mar 2026", status: "Completado" },
  { type: "Retiro", currency: "USDC", amount: "-200.00", date: "01 Mar 2026", status: "Completado" },
  { type: "Depósito", currency: "ETH", amount: "+0.25", date: "25 Feb 2026", status: "Completado" },
  { type: "Depósito", currency: "USDT", amount: "+750.00", date: "20 Feb 2026", status: "Completado" },
];

const WalletPage = () => {
  const { toast } = useToast();

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr);
    toast({ title: "Dirección copiada" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Wallet</h1>
          <p className="text-muted-foreground">Gestiona tus balances y movimientos</p>
        </div>
        <div className="flex gap-2">
          <Button className="gradient-gold text-accent-foreground font-semibold gap-2">
            <ArrowDownToLine className="w-4 h-4" /> Depositar
          </Button>
          <Button variant="outline" className="gap-2">
            <ArrowUpFromLine className="w-4 h-4" /> Retirar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {wallets.map((w) => (
          <Card key={w.currency} className="glass border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{w.currency}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-2xl font-bold mb-3">
                {w.currency === "ETH" ? w.balance.toFixed(4) : `$${w.balance.toLocaleString()}`}
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded flex-1 truncate">{w.address}</code>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => copyAddress(w.address)}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="font-display">Historial</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3">Tipo</th>
                  <th className="text-left py-3">Moneda</th>
                  <th className="text-right py-3">Monto</th>
                  <th className="text-right py-3">Fecha</th>
                  <th className="text-right py-3">Estado</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3">{h.type}</td>
                    <td>{h.currency}</td>
                    <td className={`text-right font-medium ${h.amount.startsWith("+") ? "text-green-400" : ""}`}>{h.amount}</td>
                    <td className="text-right text-muted-foreground">{h.date}</td>
                    <td className="text-right"><span className="text-xs px-2 py-0.5 rounded bg-green-400/10 text-green-400">{h.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletPage;
