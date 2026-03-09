import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  { id: "TXN-001", type: "buy", desc: "Compra - Torre Reforma 115", amount: "$250.00", currency: "USDT", date: "08 Mar 2026", status: "completed" },
  { id: "TXN-002", type: "dividend", desc: "Dividendo - Soja Pampa 2025", amount: "+$42.80", currency: "USDC", date: "07 Mar 2026", status: "completed" },
  { id: "TXN-003", type: "buy", desc: "Compra - FC Tigres Token", amount: "$75.00", currency: "USDT", date: "05 Mar 2026", status: "completed" },
  { id: "TXN-004", type: "deposit", desc: "Depósito", amount: "+$500.00", currency: "USDT", date: "03 Mar 2026", status: "completed" },
  { id: "TXN-005", type: "dividend", desc: "Dividendo - Bono Corp LATAM", amount: "+$18.30", currency: "USDC", date: "01 Mar 2026", status: "completed" },
  { id: "TXN-006", type: "buy", desc: "Compra - Colección Rivera", amount: "$200.00", currency: "USDC", date: "28 Feb 2026", status: "completed" },
  { id: "TXN-007", type: "withdraw", desc: "Retiro a cuenta bancaria", amount: "-$100.00", currency: "USD", date: "25 Feb 2026", status: "completed" },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  buy: { label: "Compra", color: "bg-primary/10 text-primary" },
  sell: { label: "Venta", color: "bg-destructive/10 text-destructive" },
  dividend: { label: "Dividendo", color: "bg-green-400/10 text-green-400" },
  deposit: { label: "Depósito", color: "bg-accent/10 text-accent" },
  withdraw: { label: "Retiro", color: "bg-muted text-muted-foreground" },
};

const Transactions = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Transacciones</h1>
        <p className="text-muted-foreground">Historial completo de movimientos</p>
      </div>

      <Card className="glass border-border">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left py-3">ID</th>
                  <th className="text-left py-3">Tipo</th>
                  <th className="text-left py-3">Descripción</th>
                  <th className="text-right py-3">Monto</th>
                  <th className="text-right py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const typeInfo = typeLabels[t.type];
                  return (
                    <tr key={t.id} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3 text-muted-foreground font-mono text-xs">{t.id}</td>
                      <td><span className={`text-xs px-2 py-0.5 rounded ${typeInfo.color}`}>{typeInfo.label}</span></td>
                      <td>{t.desc}</td>
                      <td className={`text-right font-medium ${t.amount.startsWith("+") ? "text-green-400" : ""}`}>{t.amount}</td>
                      <td className="text-right text-muted-foreground">{t.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
