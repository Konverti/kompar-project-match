import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface StepSevenProps {
  onRestart: () => void;
}

const StepSeven = ({ onRestart }: StepSevenProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="bg-primary-light p-8 rounded-full">
          <CheckCircle2 className="w-24 h-24 text-primary animate-scale-in" />
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-foreground">
          Merci! Votre demande a été envoyée
        </h2>
        
        <p className="text-xl text-muted-foreground">
          Vous recevrez vos soumissions dans les 48 heures
        </p>
      </div>
      
      <div className="bg-card p-8 rounded-lg shadow-soft space-y-4">
        <h3 className="text-lg font-semibold">Prochaines étapes</h3>
        <ul className="text-left space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <div className="bg-primary-light p-1 rounded-full mt-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Nous analysons votre demande et sélectionnons les meilleurs entrepreneurs</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-primary-light p-1 rounded-full mt-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Vous recevrez jusqu'à 3 soumissions détaillées par email</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-primary-light p-1 rounded-full mt-1">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>
            <span>Comparez les offres et choisissez l'entrepreneur qui vous convient</span>
          </li>
        </ul>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={onRestart}
          variant="outline"
          size="lg"
        >
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
};

export default StepSeven;