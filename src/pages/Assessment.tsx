import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/assessment/ProgressBar";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { ResultsCard } from "@/components/assessment/ResultsCard";
import { assessmentData } from "@/data/assessmentData";
import { AssessmentState, AssessmentResponse } from "@/types/assessment";
import { calculateScores } from "@/utils/scoring";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
  const navigate = useNavigate();
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    responses: [],
    isComplete: false,
  });

  const currentSection = assessmentData[state.currentSection];
  const currentQuestion = currentSection?.questions[state.currentQuestion];
  const totalQuestions = assessmentData.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = state.responses.length;

  const handleAnswerSelect = (answer: number) => {
    if (!currentQuestion) return;

    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      category: currentQuestion.category,
      subcategory: currentQuestion.subcategory,
      weight: currentQuestion.weight,
    };

    setState(prev => {
      const newResponses = [...prev.responses];
      const existingIndex = newResponses.findIndex(r => r.questionId === currentQuestion.id);
      
      if (existingIndex >= 0) {
        newResponses[existingIndex] = response;
      } else {
        newResponses.push(response);
      }

      return {
        ...prev,
        responses: newResponses,
      };
    });
  };

  const handleNext = () => {
    setState(prev => {
      let newSection = prev.currentSection;
      let newQuestion = prev.currentQuestion + 1;

      // Check if we need to move to the next section
      if (newQuestion >= assessmentData[newSection].questions.length) {
        newSection++;
        newQuestion = 0;
      }

      // Check if assessment is complete
      if (newSection >= assessmentData.length) {
        const results = calculateScores(prev.responses);
        return {
          ...prev,
          isComplete: true,
          results,
        };
      }

      return {
        ...prev,
        currentSection: newSection,
        currentQuestion: newQuestion,
      };
    });
  };

  const handlePrevious = () => {
    setState(prev => {
      let newSection = prev.currentSection;
      let newQuestion = prev.currentQuestion - 1;

      // Check if we need to move to the previous section
      if (newQuestion < 0) {
        newSection--;
        if (newSection >= 0) {
          newQuestion = assessmentData[newSection].questions.length - 1;
        }
      }

      // Don't go before the first question
      if (newSection < 0) {
        return prev;
      }

      return {
        ...prev,
        currentSection: newSection,
        currentQuestion: newQuestion,
      };
    });
  };

  const getCurrentAnswer = () => {
    if (!currentQuestion) return undefined;
    return state.responses.find(r => r.questionId === currentQuestion.id)?.answer;
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  const isFirstQuestion = state.currentSection === 0 && state.currentQuestion === 0;

  if (state.isComplete && state.results) {
    return (
      <div className="min-h-screen bg-assessment-bg">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
                <h1 className="text-3xl font-bold text-foreground">Assessment Complete</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Here are your personalized results for the Treasury Analyst career path.
              </p>
            </div>
            
            <ResultsCard results={state.results} />
            
            <div className="mt-8 text-center">
              <Button onClick={() => navigate("/")} variant="outline" size="lg">
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentSection || !currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="space-y-4">
              <ProgressBar
                current={answeredQuestions + 1}
                total={totalQuestions}
                sectionName={currentSection.title}
              />
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {currentSection.title}
                </h1>
                <p className="text-muted-foreground">
                  {currentSection.description}
                </p>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={getCurrentAnswer()}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>

          {/* Navigation */}
          <Card className="p-6 bg-card shadow-card border-0">
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-sm text-muted-foreground">
                Question {state.currentQuestion + 1} of {currentSection.questions.length}
              </div>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-primary border-0"
              >
                {state.currentSection === assessmentData.length - 1 && 
                 state.currentQuestion === currentSection.questions.length - 1 ? (
                  <>
                    Complete Assessment
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}