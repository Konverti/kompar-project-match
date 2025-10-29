import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone } from "lucide-react";

interface StepSixProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  acceptedTerms: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onAcceptedTermsChange: (value: boolean) => void;
}

const StepSix = ({
  firstName,
  lastName,
  email,
  phone,
  acceptedTerms,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPhoneChange,
  onAcceptedTermsChange
}: StepSixProps) => {
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-primary-light p-4 rounded-full">
            <User className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground">
          Comment peut-on vous joindre?
        </h2>
        <p className="text-muted-foreground">
          Les entrepreneurs qualifiés vous contacteront directement
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-base">
              Prénom *
            </Label>
            <Input
              id="firstName"
              placeholder="Jean"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-base">
              Nom de famille *
            </Label>
            <Input
              id="lastName"
              placeholder="Tremblay"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              className="h-12"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jean.tremblay@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Téléphone *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(514) 555-0123"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            className="h-12"
          />
        </div>
        
        <div className="bg-secondary p-4 rounded-lg space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="acceptedTerms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => onAcceptedTermsChange(checked as boolean)}
            />
            <label 
              htmlFor="acceptedTerms" 
              className="text-sm leading-relaxed cursor-pointer"
            >
              J'accepte de recevoir jusqu'à 3 soumissions d'entrepreneurs qualifiés et 
              j'accepte les{" "}
              <a href="#" className="text-primary hover:underline font-medium">
                termes et conditions
              </a>
            </label>
          </div>
          
          <p className="text-xs text-muted-foreground">
            🔒 Vos informations sont confidentielles et ne seront partagées qu'avec des 
            entrepreneurs qualifiés de votre région.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSix;