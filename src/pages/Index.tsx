import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  Clock, 
  Award, 
  ChevronRight,
  CheckCircle,
  Users,
  BookOpen,
  DollarSign
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Analysis",
      description: "Assess personality traits and work style compatibility"
    },
    {
      icon: Target,
      title: "Technical Aptitude",
      description: "Evaluate numerical reasoning and financial knowledge"
    },
    {
      icon: TrendingUp,
      title: "WISCAR Framework",
      description: "Multi-dimensional readiness analysis"
    },
    {
      icon: Award,
      title: "Personalized Results",
      description: "Get tailored career guidance and next steps"
    }
  ];

  const careerPaths = [
    "Treasury Analyst / Associate",
    "Corporate Finance Analyst", 
    "Cash Management Specialist",
    "FX Risk Analyst",
    "Liquidity Strategist"
  ];

  const successTraits = [
    "Analytical thinking with attention to detail",
    "Comfortable with numbers, risk, and compliance",
    "Structured and process-oriented mindset",
    "Strong communication and decision-making abilities",
    "Interest in macroeconomics and capital markets"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            Career Intelligence Suite
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Should You Become a{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Treasury Analyst?
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover your alignment with Treasury Analyst roles through our comprehensive 
            psychometric, technical, and aptitude assessment. Get personalized career guidance 
            in just 20-30 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-primary border-0 text-lg px-8 py-6 shadow-assessment"
              onClick={() => navigate("/assessment")}
            >
              Start Assessment
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>
        </div>

        {/* What Does a Treasury Analyst Do */}
        <Card className="p-8 mb-12 bg-gradient-card shadow-card border-0">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <DollarSign className="w-6 h-6 text-primary mr-2" />
                What Does a Treasury Analyst Do?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Treasury Analysts manage a company's liquidity, financial risk, cash flow forecasting, 
                and investment strategies. They oversee bank relationships, monitor cash positions, 
                analyze FX risk, and ensure compliance with financial policies.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Typical Career Paths:</h3>
                <ul className="space-y-2">
                  {careerPaths.map((path, index) => (
                    <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span>{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center">
                <Users className="w-5 h-5 text-primary mr-2" />
                Who Succeeds in Treasury Roles?
              </h3>
              <ul className="space-y-3">
                {successTraits.map((trait, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Assessment Features */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Career Assessment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our multi-dimensional assessment evaluates your fit across psychological, 
              technical, and cognitive dimensions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-card shadow-card border-0 hover:shadow-float transition-shadow">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 bg-gradient-card shadow-float border-0">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to Discover Your Career Fit?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take our comprehensive assessment to get personalized insights, 
              detailed score breakdowns, and actionable next steps for your career journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary border-0 text-lg px-8 py-6 shadow-assessment"
                onClick={() => navigate("/assessment")}
              >
                Begin Assessment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>20-30 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Personalized Results</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
