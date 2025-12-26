import { useTemplate, TemplateType } from './TemplateProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sparkles, Grid3X3, Check } from 'lucide-react';

const templates: { value: TemplateType; label: string; description: string; icon: typeof Sparkles }[] = [
  {
    value: 'modern',
    label: 'Modern',
    description: 'Clean, spacious design',
    icon: Sparkles,
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
    description: 'Dense, functional layout',
    icon: Grid3X3,
  },
];

export function TemplateSwitcher() {
  const { template, setTemplate } = useTemplate();
  const currentTemplate = templates.find(t => t.value === template);
  const Icon = currentTemplate?.icon || Sparkles;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{currentTemplate?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {templates.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTemplate(t.value)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <t.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium text-sm">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.description}</div>
              </div>
            </div>
            {template === t.value && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
