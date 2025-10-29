import { Shield, Clock, ThumbsUp, TrendingDown } from "lucide-react";

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
      icon: TrendingDown,
      title: "Meilleur prix",
      description: "La compétition entre entrepreneurs vous garantit des prix justes et compétitifs."
    },
    {
      icon: ThumbsUp,
      title: "100% gratuit",
      description: "Notre service est entièrement gratuit et sans engagement. Aucun frais caché."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-primary-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Pourquoi choisir Kompar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La solution la plus simple et efficace pour vos projets de rénovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 animate-fade-in flex gap-6"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-primary-light p-4 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                <advantage.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground">
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
