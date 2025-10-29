import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import komparLogo from "@/assets/kompar-logo.png";

interface HeroProps {
  onStartQuiz: () => void;
}

const Hero = ({ onStartQuiz }: HeroProps) => {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-primary-light px-4 py-16 md:py-20">
      <div className="max-w-5xl mx-auto text-center space-y-6 md:space-y-10 animate-fade-in">
        <div className="mb-6 md:mb-8">
          <img 
            src={komparLogo} 
            alt="Kompar" 
            className="h-24 md:h-40 w-auto mx-auto"
          />
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight max-w-4xl mx-auto">
          Trouvez le bon entrepreneur pour votre projet de rénovation
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Répondez à quelques questions et recevez jusqu'à 3 soumissions gratuites 
          d'entrepreneurs qualifiés
        </p>
        
        <div className="pt-6 md:pt-8">
          <Button 
            onClick={onStartQuiz}
            variant="hero"
            size="lg"
            className="text-base md:text-lg px-8 md:px-10 py-5 md:py-6 h-auto font-bold"
          >
            OBTENIR MES SOUMISSIONS
            <ArrowRight className="ml-3 w-5 h-5" />
          </Button>
        </div>
        
        <div className="pt-10 md:pt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-4 md:p-8 rounded-xl shadow-soft border border-border">
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2 md:mb-3">100%</div>
            <div className="text-xs md:text-base text-muted-foreground">Gratuit et sans engagement</div>
          </div>
          <div className="bg-card p-4 md:p-8 rounded-xl shadow-soft border border-border">
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2 md:mb-3">48h</div>
            <div className="text-xs md:text-base text-muted-foreground">Pour recevoir vos soumissions</div>
          </div>
          <div className="bg-card p-4 md:p-8 rounded-xl shadow-soft border border-border">
            <div className="text-3xl md:text-5xl font-bold text-primary mb-2 md:mb-3">3</div>
            <div className="text-xs md:text-base text-muted-foreground">Entrepreneurs qualifiés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;