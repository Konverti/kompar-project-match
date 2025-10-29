import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import QuizEmbed from "@/components/QuizEmbed";
import Advantages from "@/components/Advantages";
import ChooseContractor from "@/components/ChooseContractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
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