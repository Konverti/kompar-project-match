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
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    }
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onPhoneChange(formatted);
  };

  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex justify-center">
          <div className="bg-primary-light p-2 md:p-4 rounded-full">
            <User className="w-5 h-5 md:w-8 md:h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          Comment peut-on vous joindre?
        </h2>
        <p className="text-xs md:text-base text-muted-foreground">
          Les entrepreneurs qualifiés vous contacteront directement
        </p>
      </div>
      
      <div className="space-y-3 md:space-y-6">
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="firstName" className="text-sm md:text-base">
              Prénom *
            </Label>
            <Input
              id="firstName"
              placeholder="Jean"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="h-10 md:h-12 text-sm md:text-base"
            />
          </div>
          
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="lastName" className="text-sm md:text-base">
              Nom *
            </Label>
            <Input
              id="lastName"
              placeholder="Tremblay"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              className="h-10 md:h-12 text-sm md:text-base"
            />
          </div>
        </div>
        
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="email" className="text-sm md:text-base flex items-center gap-2">
            <Mail className="w-3 h-3 md:w-4 md:h-4" />
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jean.tremblay@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="h-10 md:h-12 text-sm md:text-base"
          />
        </div>
        
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="phone" className="text-sm md:text-base flex items-center gap-2">
            <Phone className="w-3 h-3 md:w-4 md:h-4" />
            Téléphone *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(514) 555-0123"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={14}
            className="h-10 md:h-12 text-sm md:text-base"
          />
        </div>
        
        <div className="bg-secondary p-3 md:p-4 rounded-lg space-y-2 md:space-y-4">
          <div className="flex items-start gap-2 md:gap-3">
            <Checkbox
              id="acceptedTerms"
              checked={acceptedTerms}
              onCheckedChange={(checked) => onAcceptedTermsChange(checked as boolean)}
            />
            <label 
              htmlFor="acceptedTerms" 
              className="text-xs md:text-sm leading-relaxed cursor-pointer"
            >
              J'accepte de recevoir jusqu'à 3 soumissions d'entrepreneurs qualifiés et 
              j'accepte les{" "}
              <a 
                href="https://docs.google.com/document/d/1SN2E2l1B5XVQE6AIe9CxLrlUHHmpWIuJhE5OuFZTKMs/edit?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                termes et conditions
              </a>
            </label>
          </div>
          
          <p className="text-[10px] md:text-xs text-muted-foreground">
            🔒 Vos informations sont confidentielles et ne seront partagées qu'avec des 
            entrepreneurs qualifiés de votre région.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepSix;