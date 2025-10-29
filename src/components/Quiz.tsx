import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

import ProgressBar from "./quiz/ProgressBar";
import StepOne from "./quiz/StepOne";
import StepTwo from "./quiz/StepTwo";
import StepThree from "./quiz/StepThree";
import StepFour from "./quiz/StepFour";
import StepFive from "./quiz/StepFive";
import StepSix from "./quiz/StepSix";
import StepSeven from "./quiz/StepSeven";
import Disqualification from "./quiz/Disqualification";

interface QuizData {
  projectType: string;
  location: string;
  city: string;
  budget: string;
  timeline: string;
  projectDetails: string;
  photos: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptedTerms: boolean;
}

const TOTAL_STEPS = 7;
const STORAGE_KEY = "kompar-quiz-data";

interface QuizProps {
  onClose: () => void;
}

const Quiz = ({ onClose }: QuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [disqualified, setDisqualified] = useState<"budget" | "timeline" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [quizData, setQuizData] = useState<QuizData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {
          projectType: "",
          location: "",
          city: "",
          budget: "",
          timeline: "",
          projectDetails: "",
          photos: [],
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          acceptedTerms: false
        };
      }
    }
    return {
      projectType: "",
      location: "",
      city: "",
      budget: "",
      timeline: "",
      projectDetails: "",
      photos: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      acceptedTerms: false
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizData));
  }, [quizData]);

  const validateStep = () => {
    switch (currentStep) {
      case 2:
        if (!quizData.location || !quizData.city) {
          toast.error("Veuillez remplir tous les champs de localisation");
          return false;
        }
        break;
      case 4:
        if (!quizData.timeline) {
          toast.error("Veuillez sélectionner un délai");
          return false;
        }
        if (quizData.timeline === "more-6-months") {
          setDisqualified("timeline");
          return false;
        }
        break;
      case 5:
        if (!quizData.projectDetails || quizData.projectDetails.length < 50) {
          toast.error("Veuillez fournir une description d'au moins 50 caractères");
          return false;
        }
        break;
      case 6:
        if (!quizData.firstName || !quizData.lastName || !quizData.email || !quizData.phone) {
          toast.error("Veuillez remplir tous les champs obligatoires");
          return false;
        }
        if (!quizData.acceptedTerms) {
          toast.error("Veuillez accepter les termes et conditions");
          return false;
        }
        if (!quizData.email.includes("@")) {
          toast.error("Veuillez entrer une adresse email valide");
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (currentStep === 6) {
      await handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        project_type: quizData.projectType,
        location: quizData.location,
        city: quizData.city,
        budget: quizData.budget,
        timeline: quizData.timeline,
        project_details: quizData.projectDetails,
        photos: quizData.photos,
        first_name: quizData.firstName,
        last_name: quizData.lastName,
        email: quizData.email,
        phone: quizData.phone,
        accepted_terms: quizData.acceptedTerms
      });

      if (error) throw error;

      localStorage.removeItem(STORAGE_KEY);
      setCurrentStep(7);
      toast.success("Votre demande a été envoyée avec succès!");
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (disqualified) {
      setDisqualified(null);
      if (disqualified === "budget") {
        setCurrentStep(3);
      } else {
        setCurrentStep(4);
      }
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setQuizData({
      projectType: "",
      location: "",
      city: "",
      budget: "",
      timeline: "",
      projectDetails: "",
      photos: [],
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      acceptedTerms: false
    });
    setCurrentStep(1);
    localStorage.removeItem(STORAGE_KEY);
    onClose();
  };

  if (disqualified) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-primary-light px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Disqualification reason={disqualified} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary-light px-4 py-6 md:py-12">
      <div className="max-w-4xl mx-auto">
        {currentStep < 7 && (
          <div className="mb-4 md:mb-8">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <span className="text-xs md:text-sm font-medium text-muted-foreground">
                Étape {currentStep} sur {TOTAL_STEPS}
              </span>
              <button
                onClick={onClose}
                className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Quitter
              </button>
            </div>
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </div>
        )}

        <div className="bg-card rounded-2xl shadow-strong p-3 md:p-6 lg:p-10">
          {currentStep === 1 && (
            <StepOne
              value={quizData.projectType}
              onChange={(value) => {
                setQuizData({ ...quizData, projectType: value });
                setTimeout(() => setCurrentStep(2), 300);
              }}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              location={quizData.location}
              city={quizData.city}
              onLocationChange={(value) => setQuizData({ ...quizData, location: value })}
              onCityChange={(value) => setQuizData({ ...quizData, city: value })}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              value={quizData.budget}
              onChange={(value) => {
                setQuizData({ ...quizData, budget: value });
                if (value === "less-12k") {
                  setTimeout(() => setDisqualified("budget"), 300);
                } else {
                  setTimeout(() => setCurrentStep(4), 300);
                }
              }}
            />
          )}

          {currentStep === 4 && (
            <StepFour
              value={quizData.timeline}
              onChange={(value) => {
                setQuizData({ ...quizData, timeline: value });
                if (value === "more-6-months") {
                  setTimeout(() => setDisqualified("timeline"), 300);
                } else {
                  setTimeout(() => setCurrentStep(5), 300);
                }
              }}
            />
          )}

          {currentStep === 5 && (
            <StepFive
              details={quizData.projectDetails}
              photos={quizData.photos}
              onDetailsChange={(value) => setQuizData({ ...quizData, projectDetails: value })}
              onPhotosChange={(value) => setQuizData({ ...quizData, photos: value })}
            />
          )}

          {currentStep === 6 && (
            <StepSix
              firstName={quizData.firstName}
              lastName={quizData.lastName}
              email={quizData.email}
              phone={quizData.phone}
              acceptedTerms={quizData.acceptedTerms}
              onFirstNameChange={(value) => setQuizData({ ...quizData, firstName: value })}
              onLastNameChange={(value) => setQuizData({ ...quizData, lastName: value })}
              onEmailChange={(value) => setQuizData({ ...quizData, email: value })}
              onPhoneChange={(value) => setQuizData({ ...quizData, phone: value })}
              onAcceptedTermsChange={(value) => setQuizData({ ...quizData, acceptedTerms: value })}
            />
          )}

          {currentStep === 7 && <StepSeven onRestart={handleRestart} />}

          {currentStep < 7 && currentStep !== 1 && currentStep !== 3 && currentStep !== 4 && (
            <div className="flex justify-between gap-2 md:gap-4 mt-4 md:mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                size="lg"
                disabled={currentStep === 1}
                className="text-sm md:text-base h-10 md:h-auto"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                Précédent
              </Button>

              <Button
                onClick={handleNext}
                variant="default"
                size="lg"
                disabled={isSubmitting}
                className="text-sm md:text-base h-10 md:h-auto"
              >
                {currentStep === 6 ? (isSubmitting ? "Envoi..." : "Envoyer") : "Suivant"}
                {currentStep < 6 && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
              </Button>
            </div>
          )}
          
          {(currentStep === 1 || currentStep === 3 || currentStep === 4) && (
            <div className="flex justify-start gap-2 md:gap-4 mt-4 md:mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                size="lg"
                disabled={currentStep === 1}
                className="text-sm md:text-base h-10 md:h-auto"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                Précédent
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;