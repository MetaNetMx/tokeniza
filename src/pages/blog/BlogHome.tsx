import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogArticles, categoryColors, categoryNames } from "@/data/blogData";
import { Calendar, Clock, User, Search, Mail, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const BlogHome = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredArticles = blogArticles.filter(article => {
    const matchesFilter = !filter || article.category === filter;
    const matchesSearch = !search || 
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("¡Gracias por suscribirte!");
      setEmail("");
    }
  };

  const categories = Object.keys(categoryNames);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-3xl md:text-4xl font-bold">Blog de TOKENIZA</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Noticias, análisis y educación sobre tokenización de activos reales en Latinoamérica
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(null)}
          >
            Todos
          </Button>
          {categories.map(cat => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(cat)}
            >
              {categoryNames[cat]}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Articles Grid */}
        <div className="lg:col-span-2 space-y-6">
          {filteredArticles.length === 0 ? (
            <Card className="glass border-border p-8 text-center">
              <p className="text-muted-foreground">No se encontraron artículos</p>
            </Card>
          ) : (
            filteredArticles.map((article, index) => (
              <Link key={article.id} to={`/blog/${article.id}`}>
                <Card className={`glass border-border overflow-hidden hover:border-primary/50 transition-all group ${
                  index === 0 ? "md:flex" : ""
                }`}>
                  <div className={`relative overflow-hidden ${index === 0 ? "md:w-1/2 h-48 md:h-auto" : "h-48"}`}>
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge 
                      variant="outline" 
                      className={`absolute top-3 left-3 ${categoryColors[article.category]}`}
                    >
                      {categoryNames[article.category]}
                    </Badge>
                  </div>
                  <CardContent className={`p-5 space-y-3 ${index === 0 ? "md:w-1/2" : ""}`}>
                    <h2 className="font-display text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">{article.author.name}</p>
                        <p className="text-xs text-muted-foreground">{article.author.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Newsletter */}
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold">Newsletter</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Recibe las últimas noticias sobre tokenización directo en tu email.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full">
                  Suscribirme
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-semibold">Categorías</h3>
              <div className="space-y-2">
                {categories.map(cat => {
                  const count = blogArticles.filter(a => a.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Badge variant="outline" className={categoryColors[cat]}>
                          {categoryNames[cat]}
                        </Badge>
                      </span>
                      <span className="text-xs text-muted-foreground">{count}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Popular Tags */}
          <Card className="glass border-border">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-display font-semibold">Tags Populares</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogArticles.flatMap(a => a.tags))).slice(0, 10).map(tag => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted/50">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogHome;
