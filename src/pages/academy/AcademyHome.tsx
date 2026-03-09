import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { courses, calculateLevel, getLevelName, Course } from "@/data/academyData";
import { BookOpen, Award, Star, Trophy, Zap, GraduationCap, Clock, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const LEVEL_COLORS = {
  "Básico": "bg-green-500/20 text-green-400 border-green-500/30",
  "Intermedio": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  "Avanzado": "bg-red-500/20 text-red-400 border-red-500/30",
};

const AcademyHome = () => {
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({
    completedLessons: [] as string[],
    totalPoints: 0,
    badges: [] as string[],
    certificates: [] as string[],
  });

  useEffect(() => {
    // Simulate loading and fetch user progress from localStorage
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("academy_progress");
      if (saved) {
        setUserProgress(JSON.parse(saved));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getCourseProgress = (course: Course) => {
    const completedInCourse = course.lessons.filter(l => 
      userProgress.completedLessons.includes(l.id)
    ).length;
    return Math.round((completedInCourse / course.lessons.length) * 100);
  };

  const level = calculateLevel(userProgress.totalPoints);
  const levelName = getLevelName(level);
  const pointsToNextLevel = level < 5 ? [100, 250, 500, 1000][level - 1] - userProgress.totalPoints : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass border-border col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Tu Nivel</p>
                <h3 className="font-display text-2xl font-bold">{levelName}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={(userProgress.totalPoints / [100, 250, 500, 1000, 1000][level - 1]) * 100} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground">
                    {level < 5 ? `${pointsToNextLevel} pts para siguiente nivel` : "Nivel máximo"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-display font-bold">{userProgress.totalPoints}</p>
            <p className="text-sm text-muted-foreground">Puntos Totales</p>
          </CardContent>
        </Card>

        <Card className="glass border-border">
          <CardContent className="p-6 text-center">
            <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-2xl font-display font-bold">{userProgress.badges.length}</p>
            <p className="text-sm text-muted-foreground">Badges</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      {userProgress.badges.length > 0 && (
        <Card className="glass border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" /> Tus Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {userProgress.badges.map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted/50 border border-border">
                  <span className="text-2xl">{badge}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses Grid */}
      <div>
        <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6" /> Cursos Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const progress = getCourseProgress(course);
            const isCompleted = progress === 100;
            
            return (
              <Link key={course.id} to={`/academia/curso/${course.id}`}>
                <Card className="glass border-border h-full hover:border-primary/50 transition-all group cursor-pointer overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="outline" className={LEVEL_COLORS[course.level]}>
                        {course.level}
                      </Badge>
                    </div>
                    {isCompleted && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 text-3xl">
                      {course.badge}
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-display font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {course.lessons.length} lecciones
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {course.points} pts
                      </span>
                    </div>
                    {progress > 0 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progreso</span>
                          <span className="text-primary">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                      </div>
                    )}
                    <Button variant="ghost" size="sm" className="w-full gap-1 group-hover:bg-primary/10">
                      {progress === 0 ? "Comenzar" : progress === 100 ? "Repasar" : "Continuar"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Certificates */}
      {userProgress.certificates.length > 0 && (
        <Card className="glass border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Tus Certificados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProgress.certificates.map((certId) => {
                const course = courses.find(c => c.id === certId);
                return course ? (
                  <div key={certId} className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{course.badge}</span>
                      <div>
                        <p className="font-semibold text-sm">{course.title}</p>
                        <p className="text-xs text-muted-foreground">Certificado completado</p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcademyHome;
