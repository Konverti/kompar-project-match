import { DollarSign } from "lucide-react";

interface StepThreeProps {
  value: string;
  onChange: (value: string) => void;
}

const StepThree = ({ value, onChange }: StepThreeProps) => {
  const budgetRanges = [
    { id: "less-10k", label: "Moins de 10 000$" },
    { id: "10k-12k", label: "10 000$ - 12 000$" },
    { id: "12k-15k", label: "12 000$ - 15 000$" },
    { id: "15k-18k", label: "15 000$ - 18 000$" },
    { id: "18k-21k", label: "18 000$ - 21 000$" },
    { id: "21k-25k", label: "21 000$ - 25 000$" },
    { id: "more-25k", label: "Plus de 25 000$" }
  ];
  
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-accent-light p-4 rounded-full">
            <DollarSign className="w-8 h-8 text-accent" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Quel est votre budget estimé?
        </h2>
        <p className="text-muted-foreground">
          Cette information nous aide à vous mettre en relation avec les bons entrepreneurs
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {budgetRanges.map((budget) => (
          <button
            key={budget.id}
            onClick={() => onChange(budget.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
              value === budget.id
                ? "border-primary bg-primary-light shadow-strong"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span className="font-semibold">{budget.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepThree;