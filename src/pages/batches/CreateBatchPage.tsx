import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ProgressIndicator } from '@/components/batches/ProgressIndicator';
import { BatchStep1 } from '@/components/batches/steps/BatchStep1';
import { BatchStep2 } from '@/components/batches/steps/BatchStep2';
import { BatchStep3 } from '@/components/batches/steps/BatchStep3';
import { BatchStep4 } from '@/components/batches/steps/BatchStep4';
import { BatchStep5 } from '@/components/batches/steps/BatchStep5';
import { BatchStep6 } from '@/components/batches/steps/BatchStep6';
import { BatchStep7 } from '@/components/batches/steps/BatchStep7';
import { BatchSuccessScreen } from '@/components/batches/BatchSuccessScreen';
import {
  batchStep1Schema,
  batchStep2Schema,
  batchStep3Schema,
  batchStep4Schema,
  batchStep5Schema,
  batchStep6Schema,
  batchStep7Schema,
  type CompleteBatch,
} from '@/lib/batchValidators';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LanguageSelector } from '@/components/LanguageSelector';

const TOTAL_STEPS = 7;

const stepSchemas = [
  batchStep1Schema,
  batchStep2Schema,
  batchStep3Schema,
  batchStep4Schema,
  batchStep5Schema,
  batchStep6Schema,
  batchStep7Schema,
];

const stepTitles = [
  'Basic Information',
  'Production Details',
  'Product Characteristics',
  'Pairing Recommendations',
  'Media Upload',
  'Brand Story',
  'Review & Confirm',
];

export default function CreateBatchPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CompleteBatch>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [batchId, setBatchId] = useState('');
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(stepSchemas[currentStep - 1]),
    mode: 'onBlur',
    defaultValues: formData,
  });

  // Initialize protection method from URL parameter
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'qr' || type === 'nfc' || type === 'both') {
      setFormData(prev => ({ ...prev, protectionMethod: type as 'qr' | 'nfc' | 'both' }));
    }
  }, [searchParams]);

  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const stepData = form.getValues();
      const updatedFormData = { ...formData, ...stepData };
      setFormData(updatedFormData);
      
      // Save to localStorage
      localStorage.setItem('batchDraft', JSON.stringify(updatedFormData));
      
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        // Reset form with merged data for next step
        form.reset(updatedFormData);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const stepData = form.getValues();
      const updatedFormData = { ...formData, ...stepData };
      setFormData(updatedFormData);
      setCurrentStep(currentStep - 1);
      form.reset(updatedFormData);
    }
  };

  const handleSaveDraft = () => {
    const stepData = form.getValues();
    const updatedFormData = { ...formData, ...stepData };
    localStorage.setItem('batchDraft', JSON.stringify(updatedFormData));
    toast({
      title: 'Draft Saved',
      description: 'Your batch has been saved as a draft.',
    });
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const finalData = { ...formData, ...data };
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Generate batch ID
    const year = new Date().getFullYear();
    const randomId = Math.floor(Math.random() * 900) + 100;
    const generatedBatchId = `AUTH-${year}-${randomId.toString().padStart(3, '0')}`;
    
    setBatchId(generatedBatchId);
    setShowSuccess(true);
    
    // Clear draft
    localStorage.removeItem('batchDraft');
    
    toast({
      title: 'Batch Created',
      description: `Batch ${generatedBatchId} has been created successfully.`,
    });
  });

  if (showSuccess) {
    return (
      <BatchSuccessScreen
        batchId={batchId}
        productName={formData.productName || ''}
        numberOfUnits={formData.numberOfUnits || 0}
        technology={formData.protectionMethod as 'qr' | 'nfc' | 'both'}
        onNavigateToDashboard={() => navigate('/dashboard')}
        onNavigateToBatches={() => navigate('/dashboard/batches')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/batches')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Button>
          <LanguageSelector />
        </div>

        <Card className="shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Create New Batch</CardTitle>
            <CardDescription>
              Step {currentStep} of {TOTAL_STEPS}: {stepTitles[currentStep - 1]}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

            <Form {...form}>
              <form onSubmit={handleSubmit}>
          {currentStep === 1 && <BatchStep1 form={form} />}
          {currentStep === 2 && <BatchStep2 form={form} />}
          {currentStep === 3 && <BatchStep3 form={form} />}
          {currentStep === 4 && <BatchStep4 form={form} />}
          {currentStep === 5 && <BatchStep5 form={form} />}
          {currentStep === 6 && <BatchStep6 form={form} />}
          {currentStep === 7 && <BatchStep7 form={form} formData={formData} />}

                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  <div>
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSaveDraft}
                    >
                      Save as Draft
                    </Button>

                    {currentStep < TOTAL_STEPS ? (
                      <Button type="button" onClick={handleNext}>
                        Next: {stepTitles[currentStep]}
                      </Button>
                    ) : (
                      <Button type="submit">
                        Create Batch
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
