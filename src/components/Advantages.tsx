import { Shield, Clock, ThumbsUp } from "lucide-react";

const Advantages = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Entrepreneurs vérifiés",
      description: "Tous nos entrepreneurs sont présélectionnés, vérifiés et possèdent les licences nécessaires."
    },
    {
      icon: Clock,
      title: "Gain de temps",
      description: "Plus besoin de chercher pendant des heures. Recevez 3 soumissions pertinentes en 48h maximum."
    },
    {
      icon: ThumbsUp,
      title: "100% gratuit",
      description: "Notre service est entièrement gratuit et sans engagement. Aucun frais caché."
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-primary-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-foreground">
            Pourquoi choisir Kompar?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            La solution la plus simple et efficace pour vos projets de rénovation
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-card p-3 md:p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 animate-fade-in flex flex-col md:flex-row gap-2 md:gap-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary-light p-2 md:p-4 rounded-full h-10 w-10 md:h-14 md:w-14 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <advantage.icon className="w-5 h-5 md:w-7 md:h-7 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-xs md:text-base text-muted-foreground leading-tight md:leading-normal">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
