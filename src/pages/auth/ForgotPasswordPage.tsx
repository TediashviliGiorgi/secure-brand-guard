import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { forgotPasswordSchema } from '@/lib/validators';
import { ForgotPasswordData } from '@/types/auth';

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const { forgotPassword, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    const success = await forgotPassword(data);
    if (success) {
      setEmailSent(true);
    }
  };

  return (
    <AuthLayout>
      <Card className="w-full max-w-md shadow-xl border-border/50">
        {!emailSent ? (
          <>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-semibold tracking-tight">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Recovery Link
                    </>
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="space-y-4 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  Check Your Email
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  We've sent a password recovery link to:
                </CardDescription>
                <p className="text-sm font-medium text-foreground">
                  {getValues('email')}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Didn't receive the email?</strong>
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                  <li>Check your spam or junk folder</li>
                  <li>Make sure the email address is correct</li>
                  <li>Wait a few minutes and try again</li>
                </ul>
              </div>

              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setEmailSent(false)}
              >
                Try Different Email
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </CardFooter>
          </>
        )}
      </Card>
    </AuthLayout>
  );
}
