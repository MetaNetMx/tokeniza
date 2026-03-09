import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogArticles, categoryColors, categoryNames } from "@/data/blogData";
import { ArrowLeft, Calendar, Clock, Share2, Twitter, Linkedin, Facebook, Mail, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

const BlogArticle = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const article = blogArticles.find(a => a.id === articleId);
  const relatedArticles = blogArticles
    .filter(a => a.id !== articleId && a.category === article?.category)
    .slice(0, 3);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [articleId]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = article?.title || "";
    
    const links: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast.success("Link copiado al portapapeles");
    } else {
      window.open(links[platform], "_blank", "width=600,height=400");
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("¡Gracias por suscribirte!");
      setEmail("");
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Artículo no encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/blog")}>
          Volver al Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/blog")} className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver al Blog
          </Button>

          {/* Article Header */}
          <div className="space-y-4">
            <Badge variant="outline" className={categoryColors[article.category]}>
              {categoryNames[article.category]}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{article.title}</h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-xs text-muted-foreground">{article.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.date).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Share2 className="w-4 h-4" /> Compartir:
            </span>
            <Button variant="outline" size="icon" onClick={() => handleShare("twitter")}>
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleShare("linkedin")}>
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleShare("facebook")}>
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
              Copiar Link
            </Button>
          </div>

          {/* Article Content */}
          <Card className="glass border-border">
            <CardContent className="p-6 md:p-8 prose prose-invert max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Author Card */}
          <Card className="glass border-border">
            <CardContent className="p-6 flex items-center gap-4">
              <img 
                src={article.author.avatar} 
                alt={article.author.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-display font-semibold">{article.author.name}</p>
                <p className="text-sm text-muted-foreground">{article.author.role}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Experto en tokenización y mercados digitales en Latinoamérica.
                </p>
              </div>
            </CardContent>
          </Card>
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
                Recibe las últimas noticias sobre tokenización.
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

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <Card className="glass border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-semibold">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedArticles.map(related => (
                    <Link key={related.id} to={`/blog/${related.id}`} className="block group">
                      <div className="flex gap-3">
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-20 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {related.readTime}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="glass border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="font-display font-semibold">¿Listo para invertir?</h3>
              <p className="text-sm text-muted-foreground">
                Explora activos tokenizados con rendimientos atractivos.
              </p>
              <Link to="/dashboard/marketplace">
                <Button className="w-full gradient-blue-cyan text-primary-foreground">
                  Ver Marketplace <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
