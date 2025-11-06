import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight, ArrowLeft, UserPlus, Building, Users } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { useAuth } from '@/hooks/useAuth';
import { 
  registerStep1Schema, 
  registerProducerStep2Schema, 
  registerConsortiumStep2Schema, 
  registerStep3Schema,
  GEORGIAN_REGIONS,
  INDUSTRIES,
  INDUSTRY_FOCUS,
  REGION_COVERAGE
} from '@/lib/validators';
import { 
  RegisterStepOne, 
  RegisterProducerStep2, 
  RegisterConsortiumStep2, 
  RegisterStep3, 
  AccountType 
} from '@/types/auth';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();

  // Step 1 Form - Account Type Selection
  const step1Form = useForm<RegisterStepOne>({
    resolver: zodResolver(registerStep1Schema),
  });

  // Step 2A Form - Producer Info
  const producerForm = useForm<RegisterProducerStep2>({
    resolver: zodResolver(registerProducerStep2Schema),
  });

  // Step 2B Form - Consortium Info
  const consortiumForm = useForm<RegisterConsortiumStep2>({
    resolver: zodResolver(registerConsortiumStep2Schema),
  });

  // Step 3 Form - Personal/Admin Info
  const step3Form = useForm<RegisterStep3>({
    resolver: zodResolver(registerStep3Schema),
  });

  const handleStep1Submit = async (data: RegisterStepOne) => {
    setAccountType(data.accountType);
    setStep(2);
  };

  const handleStep2Submit = async () => {
    if (accountType === 'producer') {
      const isValid = await producerForm.trigger();
      if (isValid) setStep(3);
    } else if (accountType === 'consortium') {
      const isValid = await consortiumForm.trigger();
      if (isValid) setStep(3);
    }
  };

  const handleStep3Submit = async (step3Data: RegisterStep3) => {
    const completeData: any = {
      accountType,
      fullName: step3Data.fullName,
      password: step3Data.password,
    };

    if (accountType === 'producer') {
      const producerData = producerForm.getValues();
      completeData.email = producerData.businessEmail;
      completeData.companyName = producerData.companyName;
      completeData.phone = producerData.phone;
      completeData.region = producerData.region;
      completeData.industry = producerData.industry;
    } else if (accountType === 'consortium') {
      const consortiumData = consortiumForm.getValues();
      completeData.email = consortiumData.email;
      completeData.consortiumName = consortiumData.consortiumName;
      completeData.phone = consortiumData.phone;
      completeData.memberCount = consortiumData.memberCount;
      completeData.industryFocus = consortiumData.industryFocus;
      completeData.regionCoverage = consortiumData.regionCoverage;
    }

    await registerUser(completeData);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-3">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= 1 ? (step > 1 ? 'bg-success' : 'bg-primary') : 'bg-muted'
            }`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= 2 ? (step > 2 ? 'bg-success' : 'bg-primary') : 'bg-muted'
            }`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= 3 ? 'bg-primary' : 'bg-muted'
            }`} />
          </div>

          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {step === 1 && 'Create Your Account'}
              {step === 2 && (accountType === 'producer' ? 'Organization Information' : 'Consortium Information')}
              {step === 3 && (accountType === 'producer' ? 'Personal Information' : 'Admin Information')}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Step {step} of 3
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {/* Step 1: Choose Account Type */}
          {step === 1 && (
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-6">
              <div className="space-y-4">
                <Label>Choose Your Account Type</Label>
                <RadioGroup
                  value={step1Form.watch('accountType')}
                  onValueChange={(value) => step1Form.setValue('accountType', value as AccountType)}
                  className="space-y-4"
                >
                  {/* Producer Option */}
                  <Label
                    htmlFor="producer"
                    className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <RadioGroupItem value="producer" id="producer" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Individual Producer/Company</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        I'm registering my own brand and products
                      </p>
                      <p className="text-xs text-muted-foreground mb-2 italic">
                        Wineries, food producers, manufacturers
                      </p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Manage your own products</li>
                        <li>• Generate QR codes</li>
                        <li>• View your analytics</li>
                      </ul>
                    </div>
                  </Label>

                  {/* Consortium Option */}
                  <Label
                    htmlFor="consortium"
                    className="flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <RadioGroupItem value="consortium" id="consortium" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="font-semibold">Consortium/Association</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        I manage multiple member companies
                      </p>
                      <p className="text-xs text-muted-foreground mb-2 italic">
                        Trade associations, DOC/PDO consortiums
                      </p>
                      <ul className="text-xs space-y-1 text-muted-foreground">
                        <li>• Invite and manage members</li>
                        <li>• Aggregated analytics</li>
                        <li>• Centralized billing</li>
                      </ul>
                    </div>
                  </Label>
                </RadioGroup>
                {step1Form.formState.errors.accountType && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.accountType.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}

          {/* Step 2A: Producer Registration */}
          {step === 2 && accountType === 'producer' && (
            <form onSubmit={(e) => { e.preventDefault(); handleStep2Submit(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company Name"
                  {...producerForm.register('companyName')}
                  className={producerForm.formState.errors.companyName ? 'border-destructive' : ''}
                />
                {producerForm.formState.errors.companyName && (
                  <p className="text-sm text-destructive">
                    {producerForm.formState.errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email *</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="company@example.com"
                  {...producerForm.register('businessEmail')}
                  className={producerForm.formState.errors.businessEmail ? 'border-destructive' : ''}
                />
                {producerForm.formState.errors.businessEmail && (
                  <p className="text-sm text-destructive">
                    {producerForm.formState.errors.businessEmail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+995 555 123 456"
                  {...producerForm.register('phone')}
                />
                <p className="text-xs text-muted-foreground">Georgian format</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select
                  value={producerForm.watch('region')}
                  onValueChange={(value) => producerForm.setValue('region', value)}
                >
                  <SelectTrigger className={producerForm.formState.errors.region ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {GEORGIAN_REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {producerForm.formState.errors.region && (
                  <p className="text-sm text-destructive">
                    {producerForm.formState.errors.region.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select
                  value={producerForm.watch('industry')}
                  onValueChange={(value) => producerForm.setValue('industry', value)}
                >
                  <SelectTrigger className={producerForm.formState.errors.industry ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {producerForm.formState.errors.industry && (
                  <p className="text-sm text-destructive">
                    {producerForm.formState.errors.industry.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                >
                  Next: Personal Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 2B: Consortium Registration */}
          {step === 2 && accountType === 'consortium' && (
            <form onSubmit={(e) => { e.preventDefault(); handleStep2Submit(); }} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consortiumName">Consortium Name *</Label>
                <Input
                  id="consortiumName"
                  placeholder="e.g., Kakheti Wine Consortium"
                  {...consortiumForm.register('consortiumName')}
                  className={consortiumForm.formState.errors.consortiumName ? 'border-destructive' : ''}
                />
                {consortiumForm.formState.errors.consortiumName && (
                  <p className="text-sm text-destructive">
                    {consortiumForm.formState.errors.consortiumName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Official Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="info@consortium.ge"
                  {...consortiumForm.register('email')}
                  className={consortiumForm.formState.errors.email ? 'border-destructive' : ''}
                />
                {consortiumForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {consortiumForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+995 555 123 456"
                  {...consortiumForm.register('phone')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberCount">Number of Members</Label>
                <Input
                  id="memberCount"
                  type="number"
                  placeholder="Estimated number of member companies"
                  {...consortiumForm.register('memberCount', { valueAsNumber: true })}
                />
                <p className="text-xs text-muted-foreground">Approximate - you can change this later</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industryFocus">Industry Focus *</Label>
                <Select
                  value={consortiumForm.watch('industryFocus')}
                  onValueChange={(value) => consortiumForm.setValue('industryFocus', value)}
                >
                  <SelectTrigger className={consortiumForm.formState.errors.industryFocus ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select industry focus" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRY_FOCUS.map((focus) => (
                      <SelectItem key={focus} value={focus}>
                        {focus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {consortiumForm.formState.errors.industryFocus && (
                  <p className="text-sm text-destructive">
                    {consortiumForm.formState.errors.industryFocus.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="regionCoverage">Region Coverage</Label>
                <Select
                  value={consortiumForm.watch('regionCoverage')}
                  onValueChange={(value) => consortiumForm.setValue('regionCoverage', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGION_COVERAGE.map((coverage) => (
                      <SelectItem key={coverage} value={coverage}>
                        {coverage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                >
                  Next: Admin Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Personal/Admin Information */}
          {step === 3 && (
            <form onSubmit={step3Form.handleSubmit(handleStep3Submit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="Your full name"
                  {...step3Form.register('fullName')}
                  className={step3Form.formState.errors.fullName ? 'border-destructive' : ''}
                  disabled={loading}
                />
                {step3Form.formState.errors.fullName && (
                  <p className="text-sm text-destructive">
                    {step3Form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create password"
                    {...step3Form.register('password')}
                    className={step3Form.formState.errors.password ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <PasswordStrengthIndicator password={step3Form.watch('password')} />
                {step3Form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {step3Form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    {...step3Form.register('confirmPassword')}
                    className={step3Form.formState.errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {step3Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {step3Form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={step3Form.watch('agreeToTerms')}
                  onCheckedChange={(checked) => step3Form.setValue('agreeToTerms', checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-tight cursor-pointer"
                >
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:text-primary/80 font-medium">
                    Terms & Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:text-primary/80 font-medium">
                    Privacy Policy
                  </a>
                </Label>
              </div>
              {step3Form.formState.errors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {step3Form.formState.errors.agreeToTerms.message}
                </p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="marketing"
                  checked={step3Form.watch('marketingEmails')}
                  onCheckedChange={(checked) => step3Form.setValue('marketingEmails', checked as boolean)}
                  disabled={loading}
                />
                <Label
                  htmlFor="marketing"
                  className="text-sm font-normal leading-tight cursor-pointer"
                >
                  Send me product updates and tips
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
