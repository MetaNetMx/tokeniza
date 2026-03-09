import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const mockPortfolio = [
  { name: "Torre Reforma 115", type: "Inmueble", symbol: "TRF", qty: 25, value: 750, yield: 12.5, color: "hsl(var(--primary))" },
  { name: "Soja Pampa 2025", type: "Commodity", symbol: "SJP", qty: 10, value: 500, yield: 15.0, color: "hsl(var(--accent))" },
  { name: "Colección Rivera", type: "Arte", symbol: "CRV", qty: 8, value: 400, yield: 8.2, color: "hsl(var(--cyan))" },
  { name: "Bono Corp LATAM", type: "Deuda", symbol: "BCL", qty: 5, value: 500, yield: 9.8, color: "#8B5CF6" },
  { name: "FC Tigres Token", type: "Deportivo", symbol: "FCT", qty: 15, value: 200, yield: 6.5, color: "#EC4899" },
];

const pieData = mockPortfolio.map((p) => ({ name: p.type, value: p.value }));
const COLORS = mockPortfolio.map((p) => p.color);

const Portfolio = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Mi Portafolio</h1>
        <p className="text-muted-foreground">Distribución y rendimiento de tus inversiones</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Pie chart */}
        <Card className="glass border-border md:col-span-1">
          <CardHeader>
            <CardTitle className="font-display text-lg">Distribución</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {mockPortfolio.map((p) => (
                <div key={p.symbol} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                    <span>{p.type}</span>
                  </div>
                  <span className="font-medium">${p.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="glass border-border md:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Mis Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-3">Token</th>
                    <th className="text-left py-3">Tipo</th>
                    <th className="text-right py-3">Cantidad</th>
                    <th className="text-right py-3">Valor</th>
                    <th className="text-right py-3">Rendimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolio.map((p) => (
                    <tr key={p.symbol} className="border-b border-border/50 hover:bg-muted/20">
                      <td className="py-3">
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.symbol}</p>
                        </div>
                      </td>
                      <td><Badge variant="secondary" className="text-xs">{p.type}</Badge></td>
                      <td className="text-right">{p.qty}</td>
                      <td className="text-right font-medium">${p.value.toLocaleString()}</td>
                      <td className="text-right text-green-400 font-semibold">{p.yield}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
