import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface BatchStep5Props {
  form: UseFormReturn<any>;
}

export const BatchStep5 = ({ form }: BatchStep5Props) => {
  const [mainPhotoPreview, setMainPhotoPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const handleMainPhotoChange = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('mainPhoto', file);
    }
  };

  const handleGalleryChange = (files: FileList | null) => {
    if (files) {
      const filesArray = Array.from(files).slice(0, 10);
      const previews: string[] = [];

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === filesArray.length) {
            setGalleryPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });

      form.setValue('galleryPhotos', filesArray);
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="mainPhoto"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Main Photo *</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      handleMainPhotoChange(file);
                    }}
                    className="hidden"
                    id="main-photo-upload"
                    {...field}
                  />
                  <label htmlFor="main-photo-upload" className="cursor-pointer">
                    {mainPhotoPreview ? (
                      <div className="relative inline-block">
                        <img
                          src={mainPhotoPreview}
                          alt="Main product"
                          className="max-h-64 rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setMainPhotoPreview(null);
                            form.setValue('mainPhoto', null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">
                          <span className="text-primary font-medium">Click to upload</span> or
                          drag and drop
                        </div>
                        <p className="text-xs text-muted-foreground">
                          JPG or PNG, max 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="galleryPhotos"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Gallery Photos</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={(e) => handleGalleryChange(e.target.files)}
                  {...field}
                />
                <FormDescription>Upload up to 10 additional photos</FormDescription>
                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {galleryPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="videoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Video URL</FormLabel>
            <FormControl>
              <Input placeholder="https://youtube.com/watch?v=..." {...field} />
            </FormControl>
            <FormDescription>YouTube or Vimeo URL (optional)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="documents"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Documents (Certificates, Awards)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      onChange(Array.from(files).slice(0, 5));
                    }
                  }}
                  {...field}
                />
                <FormDescription>Upload up to 5 PDF files, max 10MB each</FormDescription>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
