import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TemplateType = 'modern' | 'enterprise';

interface TemplateContextType {
  template: TemplateType;
  setTemplate: (template: TemplateType) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

const STORAGE_KEY = 'authit-template';

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateType>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored as TemplateType) || 'modern';
    }
    return 'modern';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, template);
    
    // Add/remove template class on document
    document.documentElement.classList.remove('template-modern', 'template-enterprise');
    document.documentElement.classList.add(`template-${template}`);
  }, [template]);

  const setTemplate = (newTemplate: TemplateType) => {
    setTemplateState(newTemplate);
  };

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
}
