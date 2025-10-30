import { Button } from "@/components/ui/button";
import { Bath, ChefHat, Home, Flame } from "lucide-react";

interface StepOneProps {
  value: string;
  onChange: (value: string) => void;
}

const StepOne = ({ value, onChange }: StepOneProps) => {
  const projectTypes = [
    { id: "Cuisine", label: "Cuisine", icon: ChefHat },
    { id: "Salle de bain", label: "Salle de bain", icon: Bath },
    { id: "Sous-sol", label: "Sous-sol", icon: Home },
    { id: "Après sinistre", label: "Après sinistre", icon: Flame }
  ];
  
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in">
      <div className="text-center space-y-2 md:space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          Quel type de projet souhaitez-vous réaliser?
        </h2>
        <p className="text-xs md:text-base text-muted-foreground">
          Sélectionnez le type de projet qui correspond à vos besoins
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-2xl mx-auto">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`p-3 md:p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                value === type.id
                  ? "border-primary bg-primary-light shadow-strong"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-1 md:gap-3">
                <div className={`p-2 md:p-4 rounded-full ${
                  value === type.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}>
                  <Icon className="w-5 h-5 md:w-8 md:h-8" />
                </div>
                <span className="text-sm md:text-lg font-semibold">{type.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepOne;