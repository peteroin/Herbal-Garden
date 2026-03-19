import { useState, useEffect } from "react";
import SectionHeading from "../../components/ui/SectionHeading";
import SkeletonLoader from "../../components/ui/SkeletonLoader";
import QuizResultsModal from "../../components/QuizResultsModal";
import { quizAPI } from "../../lib/api";
import { useProgress } from "../../contexts/ProgressContext";
import { primaryButtonClass, secondaryButtonClass } from "../../constants/buttonClasses";

export default function QuizzesPage() {
  const { completeQuiz } = useProgress();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setIsLoading(true);
        const response = await quizAPI.getAllQuizzes();
        const data = response.data || [];
        setQuizzes(data);
        if (data.length > 0) {
          setSelectedQuiz(data[0]);
        }
      } catch (err) {
        console.error('Error fetching quizzes:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (isLoading) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Interactive Quiz"
          title="Check your AYUSH knowledge"
          copy="Loading quizzes..."
        />
        <div className="mt-8 space-y-4">
          <SkeletonLoader variant="card" count={2} />
        </div>
      </section>
    );
  }

  if (error || !selectedQuiz) {
    return (
      <section className="section-shell py-20">
        <SectionHeading
          eyebrow="Interactive Quiz"
          title="Check your AYUSH knowledge"
          copy={error ? `Error: ${error}` : "No quizzes available"}
        />
      </section>
    );
  }

  const correctCount = selectedQuiz.questions?.filter((q) => answers[q.id] === q.correctAnswer).length || 0;

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    
    // Calculate results
    const correctCount = selectedQuiz.questions?.filter((q) => answers[q.id] === q.correctAnswer).length || 0;
    const score = Math.round((correctCount / (selectedQuiz.questions?.length || 1)) * 100);
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
    
    // Show results modal
    setQuizResults({
      title: selectedQuiz.title,
      score,
      totalQuestions: selectedQuiz.questions?.length || 0,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpent
    });
    setShowResults(true);
    
    // Track quiz completion
    completeQuiz({
      quizId: selectedQuiz._id,
      quizSlug: selectedQuiz.slug || selectedQuiz.title?.toLowerCase().replace(/\s+/g, '-'),
      quizTitle: selectedQuiz.title,
      score,
      totalQuestions: selectedQuiz.questions?.length || 0,
      correctAnswers: correctCount,
      timeSpentSeconds: timeSpent
    });
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
    setShowResults(false);
    setQuizResults(null);
    setStartTime(Date.now());
  }

  return (
    <>
      {/* Hero Banner with Background Image */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 mb-12 shadow-2xl">
        <img
          src="/images/plant2.jpg"
          alt="Interactive Quizzes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/85 via-blue-900/75 to-forest-800/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-16 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Interactive Quizzes</h1>
            <p className="text-lg text-white/90 mb-6">
              Test your knowledge of medicinal plants, AYUSH systems, and traditional herbalism through engaging quizzes
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-2 bg-blue-600/80 rounded-full text-sm font-semibold">
                Test Knowledge
              </span>
              <span className="px-4 py-2 bg-forest-700/80 rounded-full text-sm font-semibold">
                Track Progress
              </span>
              <span className="px-4 py-2 bg-green-600/80 rounded-full text-sm font-semibold">
                Earn Badges
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="section-shell py-20">
      <SectionHeading
        eyebrow="Interactive Quiz"
        title="Check your AYUSH knowledge"
        copy="The legacy quiz logic is now local React state with per-question feedback, retry support, and a stable answer key."
      />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <form className="glass-panel p-6 sm:p-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-semibold text-forest-700">Select Quiz:</label>
            <select
              className="mt-2 w-full rounded-lg border border-forest-200 px-4 py-2 text-forest-900"
              onChange={(e) => {
                setSelectedQuiz(quizzes.find(q => q._id === e.target.value) || quizzes[0]);
                setAnswers({});
                setSubmitted(false);
                setShowResults(false);
                setStartTime(Date.now());
              }}
              value={selectedQuiz._id}
            >
              {quizzes.map((q) => (
                <option key={q._id} value={q._id}>{q.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-6">
            {selectedQuiz.questions?.map((question, index) => {
              const selectedAnswer = answers[question.id];
              const isCorrect = selectedAnswer === question.correctAnswer;
              return (
                <fieldset className="rounded-[28px] border border-forest-100 bg-white p-5" key={question.id}>
                  <legend className="text-lg font-semibold text-forest-900">
                    {index + 1}. {question.question}
                  </legend>
                  <div className="mt-4 grid gap-3">
                    {question.options?.map((option) => (
                      <label className="flex items-center gap-3 rounded-2xl border border-forest-100 px-4 py-3 text-sm text-forest-700" key={option}>
                        <input
                          checked={selectedAnswer === option}
                          name={question.id}
                          onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                          type="radio"
                          value={option}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {submitted ? (
                    <p className={`mt-4 text-sm ${isCorrect ? "text-green-700" : "text-clay-700"}`}>
                      {isCorrect ? "Correct." : `Correct answer: ${question.correctAnswer}.`} {question.explanation}
                    </p>
                  ) : null}
                </fieldset>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className={primaryButtonClass} type="submit">
              Submit Quiz
            </button>
            <button className={secondaryButtonClass} onClick={handleRetry} type="button">
              Retry
            </button>
          </div>
        </form>

        <aside className="glass-panel p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-clay-700">Scoreboard</p>
          <h2 className="mt-4 font-display text-5xl font-semibold text-forest-900">
            {submitted ? `${correctCount}/${selectedQuiz.questions?.length || 0}` : "Ready?"}
          </h2>
          <p className="mt-4 text-sm leading-6 text-forest-700">
            {submitted
              ? `You answered ${correctCount} out of ${selectedQuiz.questions?.length || 0} questions correctly.`
              : "Answer all questions and submit to see your score."}
          </p>
        </aside>
      </div>
      
      {/* Quiz Results Modal */}
      {showResults && quizResults && (
          <QuizResultsModal
            quizTitle={quizResults.title}
            score={quizResults.score}
            totalQuestions={quizResults.totalQuestions}
            correctAnswers={quizResults.correctAnswers}
            timeSpentSeconds={quizResults.timeSpentSeconds}
            onClose={() => {
              setShowResults(false);
              handleRetry();
            }}
            showModal={true}
          />
        )}
      </section>
    </>
  );
}
