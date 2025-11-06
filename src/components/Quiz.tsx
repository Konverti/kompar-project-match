import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { externalSupabase } from "@/lib/externalSupabase";
import { supabase } from "@/integrations/supabase/client";

import ProgressBar from "./quiz/ProgressBar";
import StepOne from "./quiz/StepOne";
import StepTwo from "./quiz/StepTwo";
import StepThree from "./quiz/StepThree";
import StepFive from "./quiz/StepFive";
import StepSix from "./quiz/StepSix";
import StepSeven from "./quiz/StepSeven";
import Disqualification from "./quiz/Disqualification";

interface QuizData {
  projectType: string;
  location: string;
  city: string;
  budget: string;
  projectDetails: string;
  photos: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptedTerms: boolean;
}

const TOTAL_STEPS = 6;
const STORAGE_KEY = "kompar-quiz-data";

interface QuizProps {
  onClose: () => void;
}

const Quiz = ({ onClose }: QuizProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [disqualified, setDisqualified] = useState<"budget" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Track Meta Pixel event when reaching step 2
  useEffect(() => {
    if (currentStep === 2) {
      // Add a small delay to ensure pixel is loaded
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          console.log('Tracking Form event');
          (window as any).fbq('trackCustom', 'Form');
        } else {
          console.warn('Meta Pixel not loaded');
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Track analytics for each step
  useEffect(() => {
    const trackStep = async () => {
      const stepNames = [
        "Étape 1: Type de projet",
        "Étape 2: Localisation",
        "Étape 3: Budget",
        "Étape 4: Détails",
        "Étape 5: Coordonnées",
        "Confirmation"
      ];
      
      if (currentStep <= 6) {
        try {
          await supabase.from("quiz_analytics").insert({
            session_id: sessionId,
            step_number: currentStep,
            step_name: stepNames[currentStep - 1] || "Étape inconnue",
          });
        } catch (error) {
          console.error("Error tracking step:", error);
        }
      }
    };
    
    trackStep();
  }, [currentStep, sessionId]);
  
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
        if (!quizData.projectDetails || quizData.projectDetails.length < 50) {
          toast.error("Veuillez fournir une description d'au moins 50 caractères");
          return false;
        }
        break;
      case 5:
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

    if (currentStep === 5) {
      await handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const convertBudgetToCents = (budget: string): number => {
    const budgetMap: { [key: string]: number } = {
      "less-12k": 1200000,
      "12k-14k": 1400000,
      "14k-16k": 1600000,
      "16k-18k": 1800000,
      "18k-20k": 2000000,
      "20k-22k": 2200000,
      "22k-24k": 2400000,
      "24k-26k": 2600000,
      "26k-28k": 2800000,
      "28k-30k": 3000000,
      "30k-35k": 3500000,
      "35k-40k": 4000000,
      "more-40k": 4000000
    };
    return budgetMap[budget] || 0;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        projectType: quizData.projectType,
        location: quizData.location,
        city: quizData.city,
        budget: quizData.budget,
        projectDetails: quizData.projectDetails,
        photos: quizData.photos,
        firstName: quizData.firstName,
        lastName: quizData.lastName,
        email: quizData.email,
        phone: quizData.phone,
        acceptedTerms: quizData.acceptedTerms
      };

      const { error } = await externalSupabase.from("leads").insert({
        first_name: quizData.firstName,
        last_name: quizData.lastName,
        email: quizData.email,
        phone: quizData.phone,
        city: quizData.city,
        location: quizData.location,
        project_type: quizData.projectType,
        budget: quizData.budget,
        project_details: quizData.projectDetails,
        photos: quizData.photos,
        accepted_terms: quizData.acceptedTerms,
        pool_status: "pending_approval"
      });

      if (error) throw error;

      // Track Meta Pixel custom event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        console.log('Tracking Prospect event');
        (window as any).fbq('trackCustom', 'Prospect');
      } else {
        console.warn('Meta Pixel not loaded for Prospect event');
      }

      localStorage.removeItem(STORAGE_KEY);
      setCurrentStep(6);
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
      setCurrentStep(3);
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
    <div className="bg-gradient-to-b from-background to-primary-light px-4 py-4 md:py-6">
      <div className="max-w-4xl mx-auto w-full">
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
                  // Track disqualification
                  supabase.from("quiz_analytics").insert({
                    session_id: sessionId,
                    step_number: 0,
                    step_name: "Disqualifié: Budget",
                  });
                  setTimeout(() => setDisqualified("budget"), 300);
                } else {
                  setTimeout(() => setCurrentStep(4), 300);
                }
              }}
            />
          )}

          {currentStep === 4 && (
            <StepFive
              details={quizData.projectDetails}
              photos={quizData.photos}
              onDetailsChange={(value) => setQuizData({ ...quizData, projectDetails: value })}
              onPhotosChange={(value) => setQuizData({ ...quizData, photos: value })}
            />
          )}

          {currentStep === 5 && (
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

          {currentStep === 6 && <StepSeven onRestart={handleRestart} />}

          {currentStep < 6 && currentStep !== 1 && currentStep !== 3 && (
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
                {currentStep === 5 ? (isSubmitting ? "Envoi..." : "Envoyer") : "Suivant"}
                {currentStep < 5 && <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
              </Button>
            </div>
          )}
          
          {(currentStep === 1 || currentStep === 3) && (
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