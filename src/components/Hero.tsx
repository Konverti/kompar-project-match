import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import komparLogo from "@/assets/kompar-logo.png";

interface HeroProps {
  onStartQuiz: () => void;
}

const Hero = ({ onStartQuiz }: HeroProps) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-background to-primary-light px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block mb-4">
          <img 
            src={komparLogo} 
            alt="Kompar" 
            className="h-16 md:h-20 w-auto mx-auto"
          />
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
          Trouvez le bon entrepreneur pour votre projet rénovation
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Répondez à quelques questions et recevez jusqu'à 3 soumissions gratuites 
          d'entrepreneurs qualifiés
        </p>
        
        <div className="pt-4">
          <Button 
            onClick={onStartQuiz}
            variant="hero"
            size="lg"
            className="text-lg px-8 py-6 h-auto"
          >
            OBTENIR MES SOUMISSIONS
            <ArrowRight className="ml-2" />
          </Button>
        </div>
        
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Gratuit et sans engagement</div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">48h</div>
            <div className="text-sm text-muted-foreground">Pour recevoir vos soumissions</div>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-soft">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted-foreground">Entrepreneurs qualifiés</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;