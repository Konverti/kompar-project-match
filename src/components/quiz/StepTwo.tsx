import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface StepTwoProps {
  location: string;
  city: string;
  onLocationChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

const StepTwo = ({ location, city, onLocationChange, onCityChange }: StepTwoProps) => {
  const locations = [
    { id: "rive-nord", label: "Rive-Nord de Montréal" },
    { id: "rive-sud", label: "Rive-Sud de Montréal" },
    { id: "montreal", label: "Montréal" }
  ];
  
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex justify-center">
          <div className="bg-primary-light p-2 md:p-4 rounded-full">
            <MapPin className="w-5 h-5 md:w-8 md:h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          Où se situe votre projet?
        </h2>
        <p className="text-xs md:text-base text-muted-foreground">
          Sélectionnez votre région pour trouver des entrepreneurs locaux
        </p>
      </div>
      
      <div className="space-y-3 md:space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-3">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onLocationChange(loc.id)}
              className={`p-2 md:p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
                location === loc.id
                  ? "border-primary bg-primary-light shadow-strong"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span className="text-xs md:text-base font-semibold">{loc.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm md:text-base">
            Précisez la ville
          </Label>
          <Input
            id="city"
            placeholder="Ex: Laval, Longueuil, Montréal..."
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            className="h-10 md:h-12 text-sm md:text-base"
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;