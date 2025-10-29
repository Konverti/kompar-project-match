import { CheckCircle2 } from "lucide-react";

const ChooseContractor = () => {
  const tips = [
    {
      title: "Le prix n'est pas tout",
      description: "La soumission la moins chère n'est pas toujours la meilleure. Considérez l'expérience, les références et la qualité des travaux."
    },
    {
      title: "Vérifiez les références",
      description: "Demandez à voir des projets similaires et contactez d'anciens clients pour connaître leur expérience."
    },
    {
      title: "La communication compte",
      description: "Choisissez un entrepreneur qui communique clairement, répond rapidement et comprend votre vision."
    },
    {
      title: "Lisez le contrat en détail",
      description: "Assurez-vous que tout est écrit : délais, garanties, matériaux, paiements échelonnés et clauses de modification."
    },
    {
      title: "Licences et assurances",
      description: "Vérifiez que l'entrepreneur possède les licences RBQ requises et une assurance responsabilité civile valide."
    },
    {
      title: "Fiez-vous à votre instinct",
      description: "Si quelque chose vous semble étrange ou trop beau pour être vrai, prenez le temps de poser plus de questions."
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-foreground">
            Comment bien choisir son entrepreneur
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Le prix le plus bas n'est pas toujours le meilleur choix. Voici nos conseils pour faire le bon choix.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className="bg-background p-3 md:p-6 rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-primary flex-shrink-0 mt-0.5 md:mt-1" />
                <div>
                  <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-foreground leading-tight">
                    {tip.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-tight">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChooseContractor;
