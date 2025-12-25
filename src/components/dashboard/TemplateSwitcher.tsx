import { useDashboardTemplate, DashboardTemplate } from '@/contexts/DashboardTemplateContext';
import { Monitor, Terminal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const templates: { id: DashboardTemplate; name: string; description: string; icon: typeof Monitor }[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean glassmorphism design',
    icon: Monitor,
  },
  {
    id: 'legacy',
    name: 'Legacy Enterprise',
    description: 'Classic enterprise interface',
    icon: Terminal,
  },
];

export function TemplateSwitcher() {
  const { template, setTemplate } = useDashboardTemplate();
  const currentTemplate = templates.find((t) => t.id === template) || templates[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <currentTemplate.icon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentTemplate.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Dashboard Template</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {templates.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={template === t.id ? 'bg-accent' : ''}
          >
            <t.icon className="h-4 w-4 mr-2" />
            <div className="flex flex-col">
              <span className="font-medium">{t.name}</span>
              <span className="text-xs text-muted-foreground">{t.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
