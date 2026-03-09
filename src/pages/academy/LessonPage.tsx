import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/academyData";
import { ArrowLeft, ArrowRight, CheckCircle, XCircle, Play, Award, Zap } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  const lessonIndex = course?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  const nextLesson = course?.lessons[lessonIndex + 1];
  const prevLesson = course?.lessons[lessonIndex - 1];

  useEffect(() => {
    setLoading(true);
    setQuizAnswers([]);
    setQuizSubmitted(false);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [lessonId]);

  const saveProgress = (lessonId: string, points: number = 0, badge?: string) => {
    const saved = localStorage.getItem("academy_progress");
    const progress = saved ? JSON.parse(saved) : {
      completedLessons: [],
      totalPoints: 0,
      badges: [],
      certificates: [],
    };

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.totalPoints += points;
    }

    if (badge && !progress.badges.includes(badge)) {
      progress.badges.push(badge);
    }

    localStorage.setItem("academy_progress", JSON.stringify(progress));
    return progress;
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    if (!lesson?.quiz) return;
    
    const correct = lesson.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
    const total = lesson.quiz.length;
    const passed = correct === total;

    setQuizSubmitted(true);

    if (passed) {
      const pointsPerLesson = Math.round((course?.points || 0) / (course?.lessons.length || 1));
      const progress = saveProgress(lesson.id, pointsPerLesson);

      // Check if course is complete
      const courseComplete = course?.lessons.every(l => 
        progress.completedLessons.includes(l.id)
      );

      if (courseComplete && course) {
        // Award badge and certificate
        if (!progress.badges.includes(course.badge)) {
          progress.badges.push(course.badge);
        }
        if (!progress.certificates.includes(course.id)) {
          progress.certificates.push(course.id);
        }
        localStorage.setItem("academy_progress", JSON.stringify(progress));
        setShowCertificate(true);
      }

      toast.success(`¡Correcto! +${pointsPerLesson} puntos`);
    } else {
      toast.error(`${correct}/${total} correctas. Intenta de nuevo.`);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!course || !lesson) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Lección no encontrada</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/academia")}>
          Volver a Academia
        </Button>
      </div>
    );
  }

  const progress = Math.round(((lessonIndex + 1) / course.lessons.length) * 100);

  // Certificate Modal
  if (showCertificate) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass border-primary/50 max-w-lg w-full text-center">
          <CardContent className="p-8 space-y-6">
            <div className="text-6xl">{course.badge}</div>
            <Award className="w-16 h-16 text-yellow-400 mx-auto" />
            <h2 className="font-display text-2xl font-bold">¡Felicitaciones!</h2>
            <p className="text-muted-foreground">
              Has completado el curso "{course.title}" y obtenido tu certificado.
            </p>
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30">
              <p className="text-sm font-medium">Certificado de Completación</p>
              <p className="text-xs text-muted-foreground mt-1">{course.title}</p>
              <p className="text-xs text-muted-foreground">+{course.points} puntos obtenidos</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/academia")}>
                Ver Mis Cursos
              </Button>
              <Button className="flex-1 gradient-blue-cyan text-primary-foreground" onClick={() => navigate("/academia")}>
                <Zap className="w-4 h-4 mr-1" /> Nuevo Curso
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/academia/curso/${course.id}`)} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> {course.title}
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Lección {lessonIndex + 1} de {course.lessons.length}
          </span>
          <Progress value={progress} className="w-24 h-2" />
        </div>
      </div>

      {/* Lesson Title */}
      <div>
        <Badge variant="outline" className="mb-2">{lesson.duration}</Badge>
        <h1 className="font-display text-2xl md:text-3xl font-bold">{lesson.title}</h1>
      </div>

      {/* Video Placeholder */}
      <Card className="glass border-border overflow-hidden">
        <div className="relative aspect-video bg-muted/50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Play className="w-10 h-10 text-primary" />
            </div>
            <p className="text-muted-foreground">Video de la lección</p>
            <p className="text-xs text-muted-foreground mt-1">(Próximamente)</p>
          </div>
        </div>
      </Card>

      {/* Lesson Content */}
      <Card className="glass border-border">
        <CardContent className="p-6 md:p-8 prose prose-invert max-w-none">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </CardContent>
      </Card>

      {/* Quiz */}
      {lesson.quiz && (
        <Card className="glass border-border">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" /> Quiz de la Lección
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {lesson.quiz.map((q, qIndex) => (
              <div key={qIndex} className="space-y-3">
                <p className="font-medium">{qIndex + 1}. {q.question}</p>
                <div className="grid gap-2">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = quizSubmitted && oIndex === q.correctIndex;
                    const isWrong = quizSubmitted && isSelected && oIndex !== q.correctIndex;

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleQuizAnswer(qIndex, oIndex)}
                        disabled={quizSubmitted}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isCorrect
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : isWrong
                            ? "bg-red-500/20 border-red-500 text-red-400"
                            : isSelected
                            ? "bg-primary/20 border-primary"
                            : "bg-muted/30 border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                            isSelected ? "bg-primary text-primary-foreground border-primary" : "border-muted-foreground"
                          }`}>
                            {isCorrect ? <CheckCircle className="w-4 h-4" /> : isWrong ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + oIndex)}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {!quizSubmitted && (
              <Button 
                onClick={submitQuiz} 
                disabled={quizAnswers.length !== lesson.quiz.length}
                className="w-full"
              >
                Verificar Respuestas
              </Button>
            )}

            {quizSubmitted && !lesson.quiz.every((q, i) => quizAnswers[i] === q.correctIndex) && (
              <Button 
                variant="outline"
                onClick={() => {
                  setQuizAnswers([]);
                  setQuizSubmitted(false);
                }}
                className="w-full"
              >
                Intentar de Nuevo
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        {prevLesson ? (
          <Link to={`/academia/leccion/${course.id}/${prevLesson.id}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Anterior
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link to={`/academia/leccion/${course.id}/${nextLesson.id}`}>
            <Button className="gap-2">
              Siguiente <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        ) : (
          <Link to={`/academia/curso/${course.id}`}>
            <Button className="gap-2 gradient-blue-cyan text-primary-foreground">
              Finalizar Curso <CheckCircle className="w-4 h-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonPage;
