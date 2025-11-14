import { CheckCircle } from "lucide-react";

const ThankYouSdbPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Merci !
        </h1>
        <p className="text-muted-foreground text-lg">
          Nous avons bien reçu vos informations. Nous proposerons votre projet aux meilleurs entrepreneurs pour votre projet.
        </p>
      </div>
    </div>
  );
};

export default ThankYouSdbPage;
