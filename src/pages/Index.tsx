import { useState } from "react";
import Hero from "@/components/Hero";
import Quiz from "@/components/Quiz";
import Footer from "@/components/Footer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return <Quiz onClose={() => setShowQuiz(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Hero onStartQuiz={() => setShowQuiz(true)} />
      <Footer />
    </div>
  );
};

export default Index;