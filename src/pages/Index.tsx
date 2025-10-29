import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Quiz from "@/components/Quiz";
import Advantages from "@/components/Advantages";
import ChooseContractor from "@/components/ChooseContractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="min-h-screen">
      {!showQuiz ? (
        <>
          <Hero onStartQuiz={() => setShowQuiz(true)} />
          <div id="how-it-works">
            <HowItWorks />
          </div>
          <Advantages />
          <ChooseContractor />
          <FAQ />
          <Footer />
        </>
      ) : (
        <Quiz onClose={() => setShowQuiz(false)} />
      )}
    </div>
  );
};

export default Index;