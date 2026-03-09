import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Coins, DollarSign, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockChartData = [
  { month: "Ene", value: 1200 }, { month: "Feb", value: 1350 },
  { month: "Mar", value: 1580 }, { month: "Abr", value: 1420 },
  { month: "May", value: 1680 }, { month: "Jun", value: 1950 },
  { month: "Jul", value: 2100 }, { month: "Ago", value: 2350 },
];

const mockActivity = [
  { type: "dividend", desc: "Dividendo - Torre Reforma 115", amount: "+$24.50", date: "Hace 2 horas" },
  { type: "buy", desc: "Compra - Soja Pampa 2025", amount: "-$150.00", date: "Hace 1 día" },
  { type: "dividend", desc: "Dividendo - Bono Corp LATAM", amount: "+$18.30", date: "Hace 3 días" },
  { type: "deposit", desc: "Depósito USDT", amount: "+$500.00", date: "Hace 5 días" },
];

const DashboardHome = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => {
      setProfile(data);
    });
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">
          Hola, {profile?.first_name || profile?.display_name || "Inversor"} 👋
        </h1>
        <p className="text-muted-foreground">Resumen de tu portafolio de inversión</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            <DollarSign className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">$2,350.00</p>
            <p className="text-xs text-green-400">+12.5% este mes</p>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rendimientos</CardTitle>
            <TrendingUp className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">$342.80</p>
            <p className="text-xs text-green-400">+$42.80 este mes</p>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tokens Activos</CardTitle>
            <Coins className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">En 3 categorías</p>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Próx. Dividendo</CardTitle>
            <Calendar className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="font-display text-2xl font-bold">$56.20</p>
            <p className="text-xs text-muted-foreground">En 5 días</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="font-display">Valor del Portafolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", color: "hsl(var(--foreground))" }}
                />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activity */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="font-display">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{a.desc}</p>
                  <p className="text-xs text-muted-foreground">{a.date}</p>
                </div>
                <span className={`text-sm font-semibold ${a.amount.startsWith("+") ? "text-green-400" : "text-foreground"}`}>
                  {a.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
