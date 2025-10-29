import { Button } from "@/components/ui/button";
import { Bath, ChefHat, Home, Flame } from "lucide-react";

interface StepOneProps {
  value: string;
  onChange: (value: string) => void;
}

const StepOne = ({ value, onChange }: StepOneProps) => {
  const projectTypes = [
    { id: "cuisine", label: "Cuisine", icon: ChefHat },
    { id: "salle-de-bain", label: "Salle de bain", icon: Bath },
    { id: "sous-sol", label: "Sous-sol", icon: Home },
    { id: "apres-sinistre", label: "Après sinistre", icon: Flame }
  ];
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Quel type de projet souhaitez-vous réaliser?
        </h2>
        <p className="text-muted-foreground">
          Sélectionnez le type de projet qui correspond à vos besoins
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
                value === type.id
                  ? "border-primary bg-primary-light shadow-strong"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-4 rounded-full ${
                  value === type.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-lg font-semibold">{type.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepOne;