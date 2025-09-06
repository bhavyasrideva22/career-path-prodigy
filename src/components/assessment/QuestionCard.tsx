import { Question } from "@/data/assessmentData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number;
  onAnswerSelect: (answer: number) => void;
}

export function QuestionCard({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  const isLikert = question.type === 'likert';
  const likertLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];

  return (
    <Card className="p-8 bg-question-bg shadow-card border-0">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground leading-relaxed">
          {question.text}
        </h3>
        
        {isLikert ? (
          <div className="space-y-3">
            {likertLabels.map((label, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-4 px-6 border-2 transition-all duration-200",
                  selectedAnswer === index
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border hover:border-primary/50 hover:bg-option-hover"
                )}
                onClick={() => onAnswerSelect(index)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{label}</span>
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-colors",
                    selectedAnswer === index 
                      ? "border-primary bg-primary" 
                      : "border-border"
                  )} />
                </div>
              </Button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left h-auto py-4 px-6 border-2 transition-all duration-200",
                  selectedAnswer === index
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border hover:border-primary/50 hover:bg-option-hover"
                )}
                onClick={() => onAnswerSelect(index)}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{option}</span>
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-colors",
                    selectedAnswer === index 
                      ? "border-primary bg-primary" 
                      : "border-border"
                  )} />
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}