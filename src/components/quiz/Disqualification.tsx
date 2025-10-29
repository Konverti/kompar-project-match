import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DisqualificationProps {
  reason: "budget" | "timeline";
  onBack: () => void;
}

const Disqualification = ({ reason, onBack }: DisqualificationProps) => {
  const messages = {
    budget: {
      title: "Merci de votre intérêt!",
      description: "Pour l'instant, Kompar se spécialise dans les projets de 12 000$ et plus. Nous vous recommandons de consulter des entrepreneurs locaux directement pour votre projet."
    },
    timeline: {
      title: "Votre projet est encore loin!",
      description: "Revenez nous voir 6 mois avant le début prévu des travaux pour obtenir des soumissions pertinentes et à jour. Les prix et la disponibilité des entrepreneurs peuvent beaucoup changer d'ici là."
    }
  };
  
  const message = messages[reason];
  
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <div className="flex justify-center">
        <div className="bg-accent-light p-6 rounded-full">
          <AlertCircle className="w-16 h-16 text-accent" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-foreground">
        {message.title}
      </h2>
      
      <p className="text-lg text-muted-foreground">
        {message.description}
      </p>
      
      <div className="pt-4 space-y-4">
        <Button 
          onClick={onBack}
          variant="default"
          size="lg"
        >
          Retour aux questions
        </Button>
        
        <div className="text-sm text-muted-foreground">
          <p>Besoin d'aide? <a href="#" className="text-primary hover:underline">Contactez-nous</a></p>
        </div>
      </div>
    </div>
  );
};

export default Disqualification;