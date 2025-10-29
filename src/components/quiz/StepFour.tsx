import { Calendar } from "lucide-react";

interface StepFourProps {
  value: string;
  onChange: (value: string) => void;
}

const StepFour = ({ value, onChange }: StepFourProps) => {
  const timelines = [
    { id: "asap", label: "Dès que possible" },
    { id: "1-3-months", label: "Dans 1-3 mois" },
    { id: "3-6-months", label: "Dans 3-6 mois" },
    { id: "more-6-months", label: "Dans plus de 6 mois" }
  ];
  
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex justify-center">
          <div className="bg-primary-light p-2 md:p-4 rounded-full">
            <Calendar className="w-5 h-5 md:w-8 md:h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          Quand souhaitez-vous débuter les travaux?
        </h2>
        <p className="text-xs md:text-base text-muted-foreground">
          Cela nous permet de planifier au mieux votre projet
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {timelines.map((timeline) => (
          <button
            key={timeline.id}
            onClick={() => onChange(timeline.id)}
            className={`p-2 md:p-4 rounded-lg border-2 text-left transition-all hover:scale-[1.02] ${
              value === timeline.id
                ? "border-primary bg-primary-light shadow-strong"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <span className="text-xs md:text-base font-semibold">{timeline.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepFour;