import { ClipboardList, Users, CheckCircle2 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: ClipboardList,
      title: "1. Décrivez votre projet",
      description: "Répondez à quelques questions simples sur votre projet de rénovation en moins de 5 minutes."
    },
    {
      icon: Users,
      title: "2. Recevez 3 soumissions",
      description: "Nous vous mettons en contact avec jusqu'à 3 entrepreneurs qualifiés et vérifiés dans les 48 heures."
    },
    {
      icon: CheckCircle2,
      title: "3. Choisissez le meilleur",
      description: "Comparez les soumissions, lisez les avis et choisissez l'entrepreneur qui correspond le mieux à vos besoins."
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-foreground">
            Comment ça marche
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processus simple et transparent pour trouver le bon entrepreneur
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-background p-3 md:p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary-light p-2 md:p-4 rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-6 mx-auto md:mx-0">
                <step.icon className="w-5 h-5 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-xs md:text-base text-muted-foreground leading-tight md:leading-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
