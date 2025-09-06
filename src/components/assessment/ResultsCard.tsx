import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults } from "@/types/assessment";
import { TrendingUp, Brain, Target, Award, BookOpen, Users } from "lucide-react";

interface ResultsCardProps {
  results: AssessmentResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const getRecommendationBadge = () => {
    switch (results.recommendation) {
      case 'strong-fit':
        return <Badge className="bg-success text-success-foreground">Strong Fit</Badge>;
      case 'moderate-fit':
        return <Badge className="bg-warning text-warning-foreground">Moderate Fit</Badge>;
      case 'poor-fit':
        return <Badge variant="destructive">Consider Alternatives</Badge>;
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'strong-fit':
        return "Excellent! You show strong alignment with Treasury Analyst roles. This career path is highly recommended for you.";
      case 'moderate-fit':
        return "Good potential! With some targeted skill development, you could succeed as a Treasury Analyst.";
      case 'poor-fit':
        return "Treasury Analysis may not be the best fit. Consider the alternative career paths suggested below.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="p-8 bg-gradient-card shadow-float border-0">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            {getRecommendationBadge()}
            <h2 className="text-3xl font-bold text-foreground">
              {Math.round(results.scores.overall)}% Match
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {getRecommendationMessage()}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>Confidence: {Math.round(results.confidenceScore)}%</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Score Breakdown */}
      <Card className="p-6 bg-card shadow-card border-0">
        <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span>Score Breakdown</span>
        </h3>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Technical Readiness</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(results.scores.technical)}%
              </span>
            </div>
            <Progress value={results.scores.technical} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Psychological Fit</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(results.scores.psychometric)}%
              </span>
            </div>
            <Progress value={results.scores.psychometric} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">WISCAR Readiness</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(results.scores.wiscar)}%
              </span>
            </div>
            <Progress value={results.scores.wiscar} className="h-2" />
          </div>
        </div>
      </Card>

      {/* WISCAR Framework */}
      <Card className="p-6 bg-card shadow-card border-0">
        <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span>WISCAR Analysis</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(results.wiscarScores).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="text-sm font-medium capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <Progress value={value} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {Math.round(value)}%
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Personalized Insights */}
      <Card className="p-6 bg-card shadow-card border-0">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-primary" />
          <span>Personalized Insights</span>
        </h3>
        <ul className="space-y-3">
          {results.personalizedInsights.map((insight, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-muted-foreground leading-relaxed">{insight}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-card shadow-card border-0">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>Recommended Next Steps</span>
        </h3>
        <ol className="space-y-3">
          {results.nextSteps.map((step, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-muted-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* Alternative Roles */}
      {results.alternativeRoles && (
        <Card className="p-6 bg-card shadow-card border-0">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Alternative Career Paths</span>
          </h3>
          <ul className="space-y-3">
            {results.alternativeRoles.map((role, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">{role}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}