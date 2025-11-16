import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Building } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useAuth } from '@/hooks/useAuth';
import { 
  registerStep1Schema, 
  registerStep2Schema,
  GEORGIAN_REGIONS,
  INDUSTRIES,
} from '@/lib/validators';
import { 
  RegisterStep1, 
  RegisterStep2, 
} from '@/types/auth';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();
  const { t } = useTranslation();

  // Step 1 Form - Company Information
  const step1Form = useForm<RegisterStep1>({
    resolver: zodResolver(registerStep1Schema),
  });

  // Step 2 Form - Personal/Admin Info
  const step2Form = useForm<RegisterStep2>({
    resolver: zodResolver(registerStep2Schema),
  });

  const handleStep1Submit = async () => {
    const isValid = await step1Form.trigger();
    if (isValid) setStep(2);
  };

  const handleStep2Submit = async (step2Data: RegisterStep2) => {
    const step1Data = step1Form.getValues();
    const completeData = {
      accountType: 'producer' as const,
      ...step1Data,
      ...step2Data,
    };

    await registerUser(completeData);
  };

  return (
    <AuthLayout>
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-3">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {step === 1 ? t('auth.companyInfo') : t('auth.personalInfo')}
              </CardTitle>
              <CardDescription>
                {step === 1 ? t('auth.companyInfoDesc') : t('auth.personalInfoDesc')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Step 1: Company Information */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleStep1Submit(); }}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t('auth.companyName')} *</Label>
                <Input
                  id="companyName"
                  placeholder={t('auth.companyNamePlaceholder')}
                  {...step1Form.register('companyName')}
                />
                {step1Form.formState.errors.companyName && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.companyName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.emailPlaceholder')}
                  {...step1Form.register('email')}
                />
                {step1Form.formState.errors.email && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('auth.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('auth.phonePlaceholder')}
                    {...step1Form.register('phone')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">{t('auth.region')}</Label>
                  <Select onValueChange={(value) => step1Form.setValue('region', value)}>
                    <SelectTrigger id="region">
                      <SelectValue placeholder={t('auth.selectRegion')} />
                    </SelectTrigger>
                    <SelectContent>
                      {GEORGIAN_REGIONS.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">{t('auth.industry')}</Label>
                <Select onValueChange={(value) => step1Form.setValue('industry', value)}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder={t('auth.selectIndustry')} />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">{t('auth.address')}</Label>
                <Input
                  id="address"
                  placeholder={t('auth.addressPlaceholder')}
                  {...step1Form.register('address')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">{t('auth.website')}</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder={t('auth.websitePlaceholder')}
                  {...step1Form.register('website')}
                />
                {step1Form.formState.errors.website && (
                  <p className="text-sm text-destructive">{step1Form.formState.errors.website.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">{t('auth.instagram')}</Label>
                  <Input
                    id="instagram"
                    placeholder={t('auth.instagramPlaceholder')}
                    {...step1Form.register('instagram')}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">{t('auth.facebook')}</Label>
                  <Input
                    id="facebook"
                    placeholder={t('auth.facebookPlaceholder')}
                    {...step1Form.register('facebook')}
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="w-full">
                {t('common.continue')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </form>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <form onSubmit={step2Form.handleSubmit(handleStep2Submit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')} *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.passwordPlaceholder')}
                    {...step2Form.register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {step2Form.watch('password') && (
                  <PasswordStrengthIndicator password={step2Form.watch('password')} />
                )}
                {step2Form.formState.errors.password && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')} *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    {...step2Form.register('confirmPassword')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {step2Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={step2Form.watch('agreeToTerms')}
                    onCheckedChange={(checked) => step2Form.setValue('agreeToTerms', !!checked)}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm leading-none cursor-pointer">
                    {t('auth.agreeToTerms')}{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      {t('auth.termsLink')}
                    </Link>
                  </label>
                </div>
                {step2Form.formState.errors.agreeToTerms && (
                  <p className="text-sm text-destructive">{step2Form.formState.errors.agreeToTerms.message}</p>
                )}

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="marketingEmails"
                    checked={step2Form.watch('marketingEmails')}
                    onCheckedChange={(checked) => step2Form.setValue('marketingEmails', !!checked)}
                  />
                  <label htmlFor="marketingEmails" className="text-sm leading-none cursor-pointer">
                    {t('auth.marketingEmails')}
                  </label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3">
              <div className="flex w-full gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-1/3"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('common.back')}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? t('common.loading') : t('auth.createAccount')}
                </Button>
              </div>
              
              <p className="text-sm text-center text-muted-foreground">
                {t('auth.alreadyHaveAccount')}{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t('auth.signIn')}
                </Link>
              </p>
            </CardFooter>
          </form>
        )}
      </Card>
    </AuthLayout>
  );
}
