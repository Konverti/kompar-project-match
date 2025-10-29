import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Quiz from "@/components/Quiz";
import QuizEmbed from "@/components/QuizEmbed";
import Advantages from "@/components/Advantages";
import ChooseContractor from "@/components/ChooseContractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen">
      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}
      <Hero onStartQuiz={() => setShowQuiz(true)} />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <QuizEmbed />
      <Advantages />
      <ChooseContractor />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;