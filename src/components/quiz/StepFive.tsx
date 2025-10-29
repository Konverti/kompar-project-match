import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StepFiveProps {
  details: string;
  photos: string[];
  onDetailsChange: (value: string) => void;
  onPhotosChange: (files: string[]) => void;
}

const StepFive = ({ details, photos, onDetailsChange, onPhotosChange }: StepFiveProps) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setUploading(true);
    // In a real app, you would upload to Supabase Storage here
    // For now, we'll just create local URLs
    const newPhotos = Array.from(files).slice(0, 5 - photos.length).map(file => 
      URL.createObjectURL(file)
    );
    onPhotosChange([...photos, ...newPhotos]);
    setUploading(false);
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };
  
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="bg-accent-light p-4 rounded-full">
            <FileText className="w-8 h-8 text-accent" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Parlez-nous de votre projet
        </h2>
        <p className="text-muted-foreground">
          Plus vous donnez de détails, plus les soumissions seront précises
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="details" className="text-base">
            Description du projet *
          </Label>
          <Textarea
            id="details"
            placeholder="Décrivez votre projet en détail: dimensions, matériaux souhaités, style recherché, contraintes particulières, etc."
            value={details}
            onChange={(e) => onDetailsChange(e.target.value)}
            className="min-h-[200px]"
          />
          <p className="text-sm text-muted-foreground">
            {details.length} caractères (minimum 200 recommandé)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base">
            Photos (optionnel, jusqu'à 5)
          </Label>
          
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={photo} 
                    alt={`Photo ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {photos.length < 5 && (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
                disabled={uploading}
              />
              <label 
                htmlFor="photo-upload" 
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour ajouter des photos ({5 - photos.length} restantes)
                </p>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFive;