import { getPasswordStrength } from '@/lib/validators';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);
  const percentage = (score / 6) * 100;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength:</span>
        <span className={`font-medium ${
          label === 'Weak' ? 'text-destructive' : 
          label === 'Medium' ? 'text-warning' : 
          'text-success'
        }`}>
          {label}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
