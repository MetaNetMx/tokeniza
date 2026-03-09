import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  Award, 
  Clock, 
  Users,
  TrendingUp,
  Shield,
  Lightbulb,
  Play,
  Lock
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  modules: number;
  enrolled: number;
  rating: number;
  image: string;
  completed: boolean;
  locked: boolean;
  progress?: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  publishDate: string;
  featured: boolean;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introducción a la Tokenización',
    description: 'Aprende los conceptos fundamentales de la tokenización de activos y su impacto en las finanzas modernas.',
    level: 'Principiante',
    duration: '2h 30min',
    modules: 6,
    enrolled: 1250,
    rating: 4.8,
    image: '/placeholder.svg',
    completed: false,
    locked: false,
    progress: 0
  },
  {
    id: '2',
    title: 'Inversión en Real Estate Tokenizado',
    description: 'Estrategias avanzadas para invertir en propiedades inmobiliarias a través de tokens.',
    level: 'Intermedio',
    duration: '4h 15min',
    modules: 10,
    enrolled: 890,
    rating: 4.9,
    image: '/placeholder.svg',
    completed: false,
    locked: false,
    progress: 25
  },
  {
    id: '3',
    title: 'Análisis de Riesgo en DeFi',
    description: 'Herramientas y técnicas para evaluar riesgos en protocolos de finanzas descentralizadas.',
    level: 'Avanzado',
    duration: '6h 45min',
    modules: 15,
    enrolled: 456,
    rating: 4.7,
    image: '/placeholder.svg',
    completed: false,
    locked: true
  },
  {
    id: '4',
    title: 'Compliance y Regulación',
    description: 'Aspectos legales y regulatorios de las inversiones tokenizadas a nivel global.',
    level: 'Intermedio',
    duration: '3h 20min',
    modules: 8,
    enrolled: 678,
    rating: 4.6,
    image: '/placeholder.svg',
    completed: true,
    locked: false,
    progress: 100
  }
];

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'El Futuro de las Finanzas: Tokenización Explicada',
    excerpt: 'Descubre cómo la tokenización está revolucionando el acceso a activos tradicionalmente ilíquidos.',
    category: 'Educación',
    readTime: '8 min',
    author: 'María González',
    publishDate: '2024-03-15',
    featured: true
  },
  {
    id: '2',
    title: '5 Estrategias para Diversificar tu Portafolio con Tokens',
    excerpt: 'Aprende técnicas profesionales para optimizar tu cartera de inversiones tokenizadas.',
    category: 'Estrategias',
    readTime: '6 min',
    author: 'Carlos Rivera',
    publishDate: '2024-03-12',
    featured: false
  },
  {
    id: '3',
    title: 'Análisis de Mercado: Tendencias Q1 2024',
    excerpt: 'Revisión completa de las tendencias más importantes en el mercado de activos tokenizados.',
    category: 'Análisis',
    readTime: '12 min',
    author: 'Ana Martínez',
    publishDate: '2024-03-10',
    featured: true
  }
];

const Academy = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermedio':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Avanzado':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Academia TOKENIZA</h1>
          <p className="text-muted-foreground">Aprende, invierte y crece con conocimiento experto</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Cursos Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Videos Educativos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Certificaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8.2k</p>
                <p className="text-xs text-muted-foreground">Estudiantes Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Cursos
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Artículos
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Certificados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Cursos Destacados</h2>
            <Button variant="outline">Ver Todos</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id} className="relative overflow-hidden">
                {course.locked && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-black/80 text-white p-2 rounded-full">
                      <Lock className="w-4 h-4" />
                    </div>
                  </div>
                )}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Play className="w-12 h-12 text-primary/50" />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{course.modules} módulos</span>
                      <span>{course.enrolled.toLocaleString()} estudiantes</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                    
                    {course.progress !== undefined && course.progress > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progreso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                    
                    <Button 
                      className="w-full" 
                      variant={course.completed ? "secondary" : "default"}
                      disabled={course.locked}
                    >
                      {course.locked ? (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Desbloqueado con Premium
                        </>
                      ) : course.completed ? (
                        <>
                          <Award className="w-4 h-4 mr-2" />
                          Completado
                        </>
                      ) : course.progress && course.progress > 0 ? (
                        'Continuar Curso'
                      ) : (
                        'Comenzar Curso'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Artículos Recientes</h2>
            <Button variant="outline">Ver Biblioteca</Button>
          </div>

          <div className="space-y-4">
            {mockArticles.map((article) => (
              <Card key={article.id} className={article.featured ? "border-primary/50" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{article.category}</Badge>
                        {article.featured && (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            Destacado
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                        <p className="text-muted-foreground">{article.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{article.author}</span>
                          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm">
                          Leer Artículo
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Certificaciones Profesionales</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Completa cursos especializados y obtén certificaciones reconocidas por la industria
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Analista de Inversiones</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fundamentos de análisis financiero y evaluación de activos tokenizados
                  </p>
                  <Button variant="outline" size="sm">Ver Requisitos</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Especialista en Compliance</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Regulaciones y aspectos legales en finanzas descentralizadas
                  </p>
                  <Button variant="outline" size="sm">Ver Requisitos</Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Consultor en Tokenización</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Estrategias avanzadas para tokenización de activos reales
                  </p>
                  <Button variant="outline" size="sm">Ver Requisitos</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Academy;