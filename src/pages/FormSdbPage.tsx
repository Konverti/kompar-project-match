import { useEffect } from "react";

const FormSdbPage = () => {
  useEffect(() => {
    // Écouter les événements de soumission du formulaire Typeform
    const handleMessage = (event: MessageEvent) => {
      // Vérifier que le message vient de Typeform
      if (event.data && typeof event.data === 'object') {
        // Typeform envoie un événement 'form-submit' quand le formulaire est soumis
        if (event.data.type === 'form-submit') {
          console.log('Formulaire Typeform soumis, déclenchement du pixel Facebook Lead - sdb');
          // Déclencher le pixel Facebook Lead avec paramètre sdb
          if (typeof window !== 'undefined' && (window as any).fbq) {
            (window as any).fbq('track', 'Lead', {content_name: 'sdb'});
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe 
        src="https://form.typeform.com/to/QZrg45iq" 
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="Formulaire Salle de Bain"
      />
    </div>
  );
};

export default FormSdbPage;
