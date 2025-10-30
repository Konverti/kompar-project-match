import komparLogo from "@/assets/kompar-logo.png";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src={komparLogo} 
              alt="Kompar" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Votre partenaire de confiance pour vos projets de rénovation
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Comment ça marche
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Entrepreneurs</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://app.konverti.ca" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Devenir un entrepreneur partenaire
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@kompar.ca" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@kompar.ca
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© 2025 Kompar. Tous droits réservés.</p>
            <p className="text-xs mt-1">Kompar est une marque exploitée par Agence Ludik</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termes et conditions
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;