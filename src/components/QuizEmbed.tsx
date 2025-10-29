import Quiz from "./Quiz";

const QuizEmbed = () => {
  return (
    <section id="quiz-form" className="bg-gradient-to-b from-background to-primary-light py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Obtenez vos soumissions
          </h2>
          <p className="text-lg text-muted-foreground">
            Remplissez le formulaire et recevez jusqu'à 3 soumissions gratuites
          </p>
        </div>
        <div className="bg-card rounded-2xl shadow-strong p-6 md:p-10">
          <Quiz onClose={() => {}} />
        </div>
      </div>
    </section>
  );
};

export default QuizEmbed;
