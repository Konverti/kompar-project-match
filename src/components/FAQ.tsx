import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Est-ce vraiment gratuit?",
      answer: "Oui, Kompar est 100% gratuit pour les propriétaires. Nous sommes rémunérés par les entrepreneurs partenaires lorsqu'ils obtiennent un contrat via notre plateforme."
    },
    {
      question: "Combien de soumissions vais-je recevoir?",
      answer: "Vous recevrez jusqu'à 3 soumissions d'entrepreneurs qualifiés. Ce nombre peut varier selon la disponibilité des entrepreneurs dans votre région et la nature de votre projet."
    },
    {
      question: "Sous quel délai vais-je recevoir les soumissions?",
      answer: "Vous recevrez vos soumissions dans un délai maximal de 48 heures après avoir complété le formulaire. Dans la plupart des cas, vous recevrez les premières soumissions dans les 24 heures."
    },
    {
      question: "Suis-je obligé d'accepter une soumission?",
      answer: "Non, absolument pas. Vous n'avez aucune obligation d'accepter les soumissions reçues. Le service est sans engagement et vous êtes libre de choisir ou non de donner suite."
    },
    {
      question: "Que se passe-t-il avec mes informations personnelles?",
      answer: "Vos informations sont strictement confidentielles et ne seront partagées qu'avec les entrepreneurs qualifiés qui vous fourniront une soumission."
    },
    {
      question: "Quels types de projets acceptez-vous?",
      answer: "Nous acceptons tous les projets de rénovation résidentielle : cuisine, salle de bain, sous-sol, reconstruction après sinistre, etc. Le budget minimum est de 12 000$ et le projet doit débuter dans les 6 prochains mois."
    },
    {
      question: "Que faire si je ne suis pas satisfait des soumissions?",
      answer: "Si les soumissions reçues ne correspondent pas à vos attentes, contactez-nous. Nous ferons de notre mieux pour vous mettre en contact avec d'autres entrepreneurs ou vous conseiller sur les prochaines étapes."
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-card" id="faq">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Questions fréquentes
          </h2>
          <p className="text-lg text-muted-foreground">
            Tout ce que vous devez savoir sur Kompar
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background px-6 rounded-lg border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
