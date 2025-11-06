import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, ArrowRight, ArrowLeft, UserPlus } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PasswordStrengthIndicator } from '@/components/auth/PasswordStrengthIndicator';
import { useAuth } from '@/hooks/useAuth';
import { registerStep1Schema, registerStep2Schema, GEORGIAN_REGIONS } from '@/lib/validators';
import { RegisterStepOne, RegisterStepTwo } from '@/types/auth';

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, loading } = useAuth();

  // Step 1 Form
  const step1Form = useForm<RegisterStepOne>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      companyName: '',
      businessEmail: '',
      phone: '',
      region: '',
    },
  });

  // Step 2 Form
  const step2Form = useForm<RegisterStepTwo>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const handleStep1Submit = async (data: RegisterStepOne) => {
    setStep(2);
  };

  const handleStep2Submit = async (data: RegisterStepTwo) => {
    const step1Data = step1Form.getValues();
    const completeData = { ...step1Data, ...data };
    await registerUser(completeData);
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as +995 XXX XXX XXX
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `+995 ${digits}`;
    if (digits.length <= 6) return `+995 ${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `+995 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    step1Form.setValue('phone', formatted);
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-xl border-border/50">
        <CardHeader className="space-y-3">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${
              step === 1 ? 'bg-primary' : 'bg-success'
            }`} />
            <div className={`h-1.5 flex-1 rounded-full transition-colors ${
              step === 2 ? 'bg-primary' : 'bg-muted'
            }`} />
          </div>

          <div className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {step === 1 ? 'Create Your Account' : 'Complete Your Profile'}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 1 
                ? 'Step 1 of 2: Organization Information' 
                : 'Step 2 of 2: Personal Information'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {step === 1 ? (
            <form onSubmit={step1Form.handleSubmit(handleStep1Submit)} className="space-y-4">
              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company Ltd."
                  {...step1Form.register('companyName')}
                  className={step1Form.formState.errors.companyName ? 'border-destructive' : ''}
                />
                {step1Form.formState.errors.companyName && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email *</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="contact@company.com"
                  {...step1Form.register('businessEmail')}
                  className={step1Form.formState.errors.businessEmail ? 'border-destructive' : ''}
                />
                {step1Form.formState.errors.businessEmail && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.businessEmail.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+995 XXX XXX XXX"
                  {...step1Form.register('phone')}
                  onChange={handlePhoneChange}
                  className={step1Form.formState.errors.phone ? 'border-destructive' : ''}
                />
                {step1Form.formState.errors.phone && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Region */}
              <div className="space-y-2">
                <Label htmlFor="region">Region *</Label>
                <Select
                  value={step1Form.watch('region')}
                  onValueChange={(value) => step1Form.setValue('region', value)}
                >
                  <SelectTrigger className={step1Form.formState.errors.region ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    {GEORGIAN_REGIONS.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {step1Form.formState.errors.region && (
                  <p className="text-sm text-destructive">
                    {step1Form.formState.errors.region.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={step2Form.handleSubmit(handleStep2Submit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...step2Form.register('fullName')}
                  className={step2Form.formState.errors.fullName ? 'border-destructive' : ''}
                  disabled={loading}
                />
                {step2Form.formState.errors.fullName && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    {...step2Form.register('password')}
                    className={step2Form.formState.errors.password ? 'border-destructive pr-10' : 'pr-10'}
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
                <PasswordStrengthIndicator password={step2Form.watch('password')} />
                {step2Form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    {...step2Form.register('confirmPassword')}
                    className={step2Form.formState.errors.confirmPassword ? 'border-destructive pr-10' : 'pr-10'}
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
                {step2Form.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {step2Form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={step2Form.watch('agreeToTerms')}
                  onCheckedChange={(checked) => step2Form.setValue('agreeToTerms', checked as boolean)}
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
              {step2Form.formState.errors.agreeToTerms && (
                <p className="text-sm text-destructive">
                  {step2Form.formState.errors.agreeToTerms.message}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
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
                      Register
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
