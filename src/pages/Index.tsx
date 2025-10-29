import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Quiz from "@/components/Quiz";
import Advantages from "@/components/Advantages";
import ChooseContractor from "@/components/ChooseContractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const scrollToQuiz = () => {
    const element = document.getElementById('quiz-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onStartQuiz={scrollToQuiz} />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="quiz-form" className="bg-gradient-to-b from-background to-primary-light py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-strong p-6 md:p-10">
            <Quiz onClose={scrollToQuiz} />
          </div>
        </div>
      </div>
      <Advantages />
      <ChooseContractor />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;