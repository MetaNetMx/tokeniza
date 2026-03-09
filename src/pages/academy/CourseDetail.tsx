import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses, Course } from "@/data/academyData";
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle, Play, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = courses.find(c => c.id === courseId);
      setCourse(found || null);
      
      const saved = localStorage.getItem("academy_progress");
      if (saved) {
        const progress = JSON.parse(saved);
        setCompletedLessons(progress.completedLessons || []);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [courseId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20" />
          ))}
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Curso no encontrado</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/academia")}>
          Volver a Academia
        </Button>
      </div>
    );
  }

  const progress = Math.round(
    (course.lessons.filter(l => completedLessons.includes(l.id)).length / course.lessons.length) * 100
  );

  const getNextLesson = () => {
    const uncompletedLesson = course.lessons.find(l => !completedLessons.includes(l.id));
    return uncompletedLesson || course.lessons[0];
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" onClick={() => navigate("/academia")} className="gap-2">
        <ArrowLeft className="w-4 h-4" /> Volver a Academia
      </Button>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="outline" className="bg-card/80 mb-2">
                {course.level}
              </Badge>
              <h1 className="font-display text-2xl md:text-3xl font-bold">{course.title}</h1>
            </div>
          </div>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <Card className="glass border-border h-fit">
          <CardContent className="p-6 space-y-4">
            <div className="text-center">
              <span className="text-5xl">{course.badge}</span>
              <p className="text-sm text-muted-foreground mt-2">Badge del curso</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-display font-bold">{course.lessons.length}</p>
                <p className="text-xs text-muted-foreground">Lecciones</p>
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{course.points}</p>
                <p className="text-xs text-muted-foreground">Puntos</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progreso</span>
                <span className="text-primary font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Link to={`/academia/leccion/${course.id}/${getNextLesson().id}`}>
              <Button className="w-full gradient-blue-cyan text-primary-foreground" size="lg">
                <Play className="w-4 h-4 mr-2" />
                {progress === 0 ? "Comenzar Curso" : progress === 100 ? "Repasar" : "Continuar"}
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {course.level}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lessons List */}
      <Card className="glass border-border">
        <CardHeader>
          <CardTitle className="font-display">Contenido del Curso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(course.lessons[index - 1].id) && !isCompleted;

            return (
              <Link
                key={lesson.id}
                to={isLocked ? "#" : `/academia/leccion/${course.id}/${lesson.id}`}
                className={isLocked ? "cursor-not-allowed" : ""}
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                    isCompleted
                      ? "bg-green-500/10 border-green-500/30"
                      : isLocked
                      ? "bg-muted/30 border-border opacity-50"
                      : "bg-card border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isLocked
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                  </div>
                  {lesson.quiz && (
                    <Badge variant="outline" className="text-xs">
                      Quiz
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseDetail;
