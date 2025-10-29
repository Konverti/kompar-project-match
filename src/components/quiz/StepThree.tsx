import { DollarSign } from "lucide-react";

interface StepThreeProps {
  value: string;
  onChange: (value: string) => void;
}

const StepThree = ({ value, onChange }: StepThreeProps) => {
  const budgetRanges = [
    { id: "less-12k", label: "Moins de 12 000$" },
    { id: "12k-14k", label: "12 000$ - 14 000$" },
    { id: "14k-16k", label: "14 000$ - 16 000$" },
    { id: "16k-18k", label: "16 000$ - 18 000$" },
    { id: "18k-20k", label: "18 000$ - 20 000$" },
    { id: "20k-22k", label: "20 000$ - 22 000$" },
    { id: "22k-24k", label: "22 000$ - 24 000$" },
    { id: "24k-26k", label: "24 000$ - 26 000$" },
    { id: "26k-28k", label: "26 000$ - 28 000$" },
    { id: "28k-30k", label: "28 000$ - 30 000$" },
    { id: "30k-35k", label: "30 000$ - 35 000$" },
    { id: "35k-40k", label: "35 000$ - 40 000$" },
    { id: "more-40k", label: "40 000$ et plus" }
  ];
  
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-accent-light p-4 rounded-full">
            <DollarSign className="w-8 h-8 text-accent" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Quel est votre budget estimé?
        </h2>
        <div className="bg-accent-light border-l-4 border-primary p-4 rounded-r-lg">
          <p className="text-sm text-foreground font-medium mb-2">
            💡 Pourquoi c'est important?
          </p>
          <p className="text-sm text-muted-foreground">
            Un budget réaliste assure des soumissions précises. <strong>Important:</strong> Choisir un budget plus élevé ne fait pas augmenter les prix - les entrepreneurs ajustent selon votre projet réel.
          </p>
        </div>
      </div>
      
      <div className="hidden md:grid grid-cols-2 gap-3">
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
      
      <div className="md:hidden">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-4 rounded-lg border-2 border-border bg-card text-foreground font-semibold focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        >
          <option value="">Sélectionnez votre budget</option>
          {budgetRanges.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StepThree;