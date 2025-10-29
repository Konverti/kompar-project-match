import { useState } from "react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Quiz from "@/components/Quiz";

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