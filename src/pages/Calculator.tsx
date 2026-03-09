import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { Calculator as CalcIcon, TrendingUp, Building2, Coins, Wheat, ChevronRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const ASSET_TYPES = [
  { value: "inmueble", label: "Inmueble", icon: Building2, avgYield: 8 },
  { value: "commodity", label: "Commodity", icon: Wheat, avgYield: 6 },
  { value: "deuda", label: "Deuda/Bono", icon: Coins, avgYield: 10 },
  { value: "equity", label: "Equity", icon: TrendingUp, avgYield: 12 },
];

const Calculator = () => {
  const [investment, setInvestment] = useState(10000);
  const [assetType, setAssetType] = useState("inmueble");
  const [annualYield, setAnnualYield] = useState(8);
  const [years, setYears] = useState(5);

  const selectedAsset = ASSET_TYPES.find(a => a.value === assetType);
  const INFLATION_RATE = 4.5;
  const BANK_RATE = 2.5;

  // Calculate compound growth
  const calculateGrowth = (principal: number, rate: number, years: number) => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      const value = principal * Math.pow(1 + rate / 100, year);
      data.push({
        year,
        value: Math.round(value),
      });
    }
    return data;
  };

  const tokenizedGrowth = calculateGrowth(investment, annualYield, years);
  const bankGrowth = calculateGrowth(investment, BANK_RATE, years);
  const inflationAdjusted = calculateGrowth(investment, -INFLATION_RATE, years);

  const chartData = tokenizedGrowth.map((item, index) => ({
    year: `Año ${item.year}`,
    "Tokenizado": item.value,
    "Depósito Bancario": bankGrowth[index].value,
    "Ajustado por Inflación": inflationAdjusted[index].value,
  }));

  const finalValue = tokenizedGrowth[tokenizedGrowth.length - 1].value;
  const totalReturn = finalValue - investment;
  const percentageReturn = ((finalValue / investment - 1) * 100).toFixed(1);

  const tableData = tokenizedGrowth.slice(1).map((item, index) => ({
    year: index + 1,
    startBalance: index === 0 ? investment : tokenizedGrowth[index].value,
    earnings: item.value - tokenizedGrowth[index].value,
    endBalance: item.value,
    cumulative: item.value - investment,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <CalcIcon className="w-8 h-8 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold">Calculadora de Inversión</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simula el crecimiento de tu inversión en activos tokenizados y compáralo con alternativas tradicionales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Panel */}
            <Card className="glass border-border">
              <CardHeader>
                <CardTitle className="font-display">Configura tu Simulación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Amount */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Monto a Invertir (USD)
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger>
                          <Info className="w-3 h-3 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>El capital inicial que deseas invertir</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    type="number"
                    value={investment}
                    onChange={(e) => setInvestment(Math.max(100, parseInt(e.target.value) || 0))}
                    min={100}
                  />
                  <div className="flex gap-2">
                    {[1000, 5000, 10000, 50000].map(amount => (
                      <Button
                        key={amount}
                        variant={investment === amount ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInvestment(amount)}
                        className="flex-1 text-xs"
                      >
                        ${amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Asset Type */}
                <div className="space-y-2">
                  <Label>Tipo de Activo</Label>
                  <Select value={assetType} onValueChange={(v) => {
                    setAssetType(v);
                    const asset = ASSET_TYPES.find(a => a.value === v);
                    if (asset) setAnnualYield(asset.avgYield);
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label} (~{type.avgYield}% anual)
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Yield */}
                <div className="space-y-2">
                  <Label className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      Rendimiento Anual Estimado
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Rendimiento anual esperado del activo</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </span>
                    <span className="text-primary font-bold">{annualYield}%</span>
                  </Label>
                  <Slider
                    value={[annualYield]}
                    onValueChange={([v]) => setAnnualYield(v)}
                    min={1}
                    max={20}
                    step={0.5}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Years */}
                <div className="space-y-2">
                  <Label className="flex items-center justify-between">
                    <span>Plazo de Inversión</span>
                    <span className="text-primary font-bold">{years} años</span>
                  </Label>
                  <Slider
                    value={[years]}
                    onValueChange={([v]) => setYears(v)}
                    min={1}
                    max={20}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 año</span>
                    <span>20 años</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Inversión Inicial</p>
                    <p className="font-display text-xl font-bold">${investment.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="glass border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Valor Final</p>
                    <p className="font-display text-xl font-bold text-green-400">${finalValue.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="glass border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Ganancia Total</p>
                    <p className="font-display text-xl font-bold text-green-400">+${totalReturn.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="glass border-border">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-muted-foreground">Retorno Total</p>
                    <p className="font-display text-xl font-bold text-green-400">+{percentageReturn}%</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart & Table Tabs */}
              <Tabs defaultValue="chart" className="w-full">
                <TabsList className="w-full justify-start bg-card border border-border">
                  <TabsTrigger value="chart">Gráfico de Crecimiento</TabsTrigger>
                  <TabsTrigger value="table">Tabla Año por Año</TabsTrigger>
                  <TabsTrigger value="comparison">Comparación</TabsTrigger>
                </TabsList>

                <TabsContent value="chart">
                  <Card className="glass border-border">
                    <CardContent className="p-6">
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={12}
                            tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="Tokenizado" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={3}
                            dot={{ fill: "hsl(var(--primary))" }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Depósito Bancario" 
                            stroke="#94a3b8" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Ajustado por Inflación" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            strokeDasharray="3 3"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="table">
                  <Card className="glass border-border overflow-hidden">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="p-3 text-left">Año</th>
                              <th className="p-3 text-right">Balance Inicial</th>
                              <th className="p-3 text-right">Ganancias</th>
                              <th className="p-3 text-right">Balance Final</th>
                              <th className="p-3 text-right">Ganancia Acumulada</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row) => (
                              <tr key={row.year} className="border-t border-border">
                                <td className="p-3">{row.year}</td>
                                <td className="p-3 text-right">${row.startBalance.toLocaleString()}</td>
                                <td className="p-3 text-right text-green-400">+${row.earnings.toLocaleString()}</td>
                                <td className="p-3 text-right font-medium">${row.endBalance.toLocaleString()}</td>
                                <td className="p-3 text-right text-green-400">+${row.cumulative.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison">
                  <Card className="glass border-border">
                    <CardContent className="p-6 space-y-6">
                      <h3 className="font-display font-semibold">Comparación de Rendimientos a {years} años</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart 
                          data={[
                            { name: "Tokenizado", value: finalValue, fill: "hsl(var(--primary))" },
                            { name: "Depósito Bancario", value: bankGrowth[bankGrowth.length - 1].value, fill: "#64748b" },
                            { name: "Dinero sin invertir (inflación)", value: inflationAdjusted[inflationAdjusted.length - 1].value, fill: "#ef4444" },
                          ]}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                          <YAxis dataKey="name" type="category" width={150} />
                          <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div className="text-center p-4 rounded-lg bg-primary/10">
                          <p className="text-sm text-muted-foreground">Con Tokenización</p>
                          <p className="font-display text-2xl font-bold text-primary">${finalValue.toLocaleString()}</p>
                          <p className="text-xs text-green-400">+{((finalValue / investment - 1) * 100).toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-muted/50">
                          <p className="text-sm text-muted-foreground">En el Banco</p>
                          <p className="font-display text-2xl font-bold">${bankGrowth[bankGrowth.length - 1].value.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">+{((bankGrowth[bankGrowth.length - 1].value / investment - 1) * 100).toFixed(1)}%</p>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-red-500/10">
                          <p className="text-sm text-muted-foreground">Sin Invertir</p>
                          <p className="font-display text-2xl font-bold">${inflationAdjusted[inflationAdjusted.length - 1].value.toLocaleString()}</p>
                          <p className="text-xs text-red-400">{((inflationAdjusted[inflationAdjusted.length - 1].value / investment - 1) * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* CTA */}
              <Card className="glass border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
                <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-semibold">¿Listo para empezar a invertir?</h3>
                    <p className="text-sm text-muted-foreground">
                      Explora activos con rendimientos de hasta {annualYield}% anual.
                    </p>
                  </div>
                  <Link to={`/dashboard/marketplace?yield=${annualYield}`}>
                    <Button className="gradient-blue-cyan text-primary-foreground whitespace-nowrap">
                      Explorar Activos <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
