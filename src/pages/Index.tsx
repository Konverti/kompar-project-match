import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import QuizEmbed from "@/components/QuizEmbed";
import Advantages from "@/components/Advantages";
import Testimonials from "@/components/Testimonials";
import ChooseContractor from "@/components/ChooseContractor";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <QuizEmbed />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <Advantages />
      <Testimonials />
      <ChooseContractor />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;