import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie-Claude Dubois",
      location: "Laval",
      rating: 5,
      text: "J'ai reçu 3 soumissions en moins de 48h pour ma cuisine. Le processus était simple et les entrepreneurs étaient professionnels.",
      project: "Rénovation de cuisine"
    },
    {
      name: "François Lemieux",
      location: "Montréal",
      rating: 4,
      text: "Bon service pour comparer les prix. J'ai pu choisir l'entrepreneur qui correspondait le mieux à mon budget.",
      project: "Salle de bain"
    },
    {
      name: "Sophie Tremblay",
      location: "Québec",
      rating: 5,
      text: "Pratique et gratuit. Les entrepreneurs ont bien compris mes besoins et les soumissions étaient détaillées.",
      project: "Sous-sol"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Ce que nos clients disent
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Des propriétaires comme vous ont trouvé leur entrepreneur idéal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-border/50 pt-4">
                <p className="font-semibold text-foreground text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.project} • {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
