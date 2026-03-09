import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, MapPin, TrendingUp, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const CATEGORIES = [
  { key: "all", label: "Todos" },
  { key: "inmobiliario", label: "Inmobiliario" },
  { key: "agro", label: "Agro" },
  { key: "renta_fija", label: "Renta Fija" },
  { key: "energía", label: "Energía" },
];

const RISK_COLORS: Record<string, string> = {
  bajo: "bg-green-500/20 text-green-400 border-green-500/30",
  medio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  alto: "bg-red-500/20 text-red-400 border-red-500/30",
};

const Marketplace = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"yield" | "price" | "progress">("yield");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("marketplace_assets")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      setAssets(data || []);
      setLoading(false);
    };
    fetchAssets();
  }, []);

  const filtered = assets
    .filter((a) => category === "all" || a.category === category)
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.location_city?.toLowerCase().includes(search.toLowerCase()) ||
        a.location_country?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "yield") return b.expected_yield - a.expected_yield;
      if (sortBy === "price") return a.token_price - b.token_price;
      return b.sold_tokens / b.total_tokens - a.sold_tokens / a.total_tokens;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold">Marketplace</h1>
        <p className="text-muted-foreground">Explora activos tokenizados y diversifica tu portafolio</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, ciudad o país..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <Button
              key={c.key}
              size="sm"
              variant={category === c.key ? "default" : "outline"}
              onClick={() => setCategory(c.key)}
              className="text-xs"
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Ordenar:</span>
        {[
          { key: "yield" as const, label: "Mayor rendimiento" },
          { key: "price" as const, label: "Menor precio" },
          { key: "progress" as const, label: "Más vendido" },
        ].map((s) => (
          <Button
            key={s.key}
            size="sm"
            variant={sortBy === s.key ? "secondary" : "ghost"}
            onClick={() => setSortBy(s.key)}
            className="text-xs"
          >
            {s.label}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="glass border-border animate-pulse h-80" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No se encontraron activos con esos filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((asset) => {
            const progress = Math.round((asset.sold_tokens / asset.total_tokens) * 100);
            return (
              <Card
                key={asset.id}
                className="glass border-border overflow-hidden cursor-pointer hover:border-primary/50 transition-all group"
                onClick={() => navigate(`/dashboard/marketplace/${asset.id}`)}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={asset.image_url}
                    alt={asset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="outline" className={RISK_COLORS[asset.risk_level] || ""}>
                      {asset.risk_level}
                    </Badge>
                    <Badge variant="outline" className="bg-card/80 backdrop-blur-sm border-border">
                      {asset.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-display font-bold text-lg leading-tight">{asset.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {asset.location_city}, {asset.location_country}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Precio</p>
                      <p className="font-display font-bold text-sm">${asset.token_price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rend.</p>
                      <p className="font-display font-bold text-sm text-green-400">{asset.expected_yield}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Red</p>
                      <p className="font-display font-bold text-sm">{asset.blockchain_network}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Financiado</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
