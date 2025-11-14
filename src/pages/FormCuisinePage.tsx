import { useEffect } from "react";

const FormCuisinePage = () => {
  useEffect(() => {
    // Facebook Pixel tracking
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'ViewContent');
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe 
        src="https://form.typeform.com/to/jxtxPYBD" 
        style={{ width: '100%', height: '100vh', border: 'none' }}
        title="Formulaire Cuisine"
      />
    </div>
  );
};

export default FormCuisinePage;
