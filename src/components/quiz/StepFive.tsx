import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText, Upload, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { externalSupabase } from "@/lib/externalSupabase";
import { toast } from "sonner";

interface StepFiveProps {
  details: string;
  photos: string[];
  onDetailsChange: (value: string) => void;
  onPhotosChange: (files: string[]) => void;
}

const StepFive = ({ details, photos, onDetailsChange, onPhotosChange }: StepFiveProps) => {
  const [uploading, setUploading] = useState(false);
  const [isReformulating, setIsReformulating] = useState(false);
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setUploading(true);
    
    try {
      const filesToUpload = Array.from(files).slice(0, 5 - photos.length);
      const uploadedPaths: string[] = [];
      
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        const timestamp = Date.now();
        const fileName = `photo${timestamp}_${i}.${file.name.split('.').pop()}`;
        const filePath = `${fileName}`;
        
        const { error } = await externalSupabase.storage
          .from('leads-photos')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (error) {
          console.error('Upload error:', error);
          toast.error(`Erreur lors de l'upload de ${file.name}`);
          continue;
        }
        
        // Store the path in the format expected by the database
        uploadedPaths.push(`/lead-photos/${fileName}`);
      }
      
      if (uploadedPaths.length > 0) {
        onPhotosChange([...photos, ...uploadedPaths]);
        toast.success(`${uploadedPaths.length} photo(s) téléchargée(s)`);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error("Erreur lors du téléchargement des photos");
    } finally {
      setUploading(false);
    }
  };
  
  // Helper to get display URL for photos
  const getPhotoDisplayUrl = (photoPath: string): string => {
    // If it's already a full URL, return as is
    if (photoPath.startsWith('http')) return photoPath;
    
    // Extract filename from path like "/lead-photos/photo123.jpg"
    const fileName = photoPath.replace('/lead-photos/', '');
    
    // Get public URL from Supabase
    const { data } = externalSupabase.storage
      .from('leads-photos')
      .getPublicUrl(fileName);
    
    return data.publicUrl;
  };
  
  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const handleReformulate = async () => {
    if (!details || details.length < 10) {
      toast.error("Veuillez d'abord écrire une description");
      return;
    }

    setIsReformulating(true);
    try {
      const { data, error } = await supabase.functions.invoke("reformulate-description", {
        body: { description: details }
      });

      if (error) throw error;

      if (data?.reformulatedText) {
        onDetailsChange(data.reformulatedText);
        toast.success("Description reformulée avec succès!");
      } else {
        throw new Error("Aucune réponse de l'IA");
      }
    } catch (error) {
      console.error("Error reformulating:", error);
      toast.error("Erreur lors de la reformulation");
    } finally {
      setIsReformulating(false);
    }
  };
  
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="text-center space-y-2 md:space-y-4">
        <div className="flex justify-center">
          <div className="bg-accent-light p-2 md:p-4 rounded-full">
            <FileText className="w-5 h-5 md:w-8 md:h-8 text-accent" />
          </div>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
          Parlez-nous de votre projet
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
          Plus vous donnez de détails, plus les soumissions seront précises et adaptées à vos besoins. 
          Une description complète permet aux entrepreneurs de bien comprendre votre vision et d'éviter les surprises.
        </p>
      </div>
      
      <div className="space-y-3 md:space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="details" className="text-sm md:text-base">
              Description du projet *
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReformulate}
              disabled={isReformulating || !details || details.length < 10}
              className="text-xs md:text-sm"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {isReformulating ? "Reformulation..." : "Reformuler avec IA"}
            </Button>
          </div>
          <Textarea
            id="details"
            placeholder="Exemple: Je souhaite rénover ma cuisine de 12 pieds x 14 pieds. Actuellement, les armoires sont en mélamine blanc et j'aimerais les remplacer par des armoires en bois de style shaker. Le plancher est en céramique mais je voudrais installer du plancher flottant. Les comptoirs en stratifié doivent être changés pour du quartz blanc. L'évier est situé sous la fenêtre et je souhaite le conserver à cet endroit."
            value={details}
            onChange={(e) => onDetailsChange(e.target.value)}
            className="min-h-[120px] md:min-h-[200px] text-sm md:text-base"
          />
          <p className="text-xs md:text-sm text-muted-foreground">
            {details.length} caractères (minimum 25, mais plus de détails = meilleures soumissions)
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm md:text-base">
            Photos (optionnel, jusqu'à 5)
          </Label>
          
          {photos.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-3 mb-3 md:mb-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={getPhotoDisplayUrl(photo)} 
                    alt={`Photo ${index + 1}`} 
                    className="w-full h-16 md:h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-0.5 right-0.5 md:top-1 md:right-1 bg-destructive text-destructive-foreground p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {photos.length < 5 && (
            <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-8 text-center hover:border-primary transition-colors">
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
                className="cursor-pointer flex flex-col items-center gap-1 md:gap-2"
              >
                <Upload className="w-5 h-5 md:w-8 md:h-8 text-muted-foreground" />
                <p className="text-xs md:text-sm text-muted-foreground">
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