import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DashboardTemplate = 'modern' | 'legacy';

interface DashboardTemplateContextType {
  template: DashboardTemplate;
  setTemplate: (template: DashboardTemplate) => void;
}

const DashboardTemplateContext = createContext<DashboardTemplateContextType | undefined>(undefined);

export function DashboardTemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplate] = useState<DashboardTemplate>(() => {
    const saved = localStorage.getItem('dashboard-template');
    return (saved as DashboardTemplate) || 'modern';
  });

  useEffect(() => {
    localStorage.setItem('dashboard-template', template);
  }, [template]);

  return (
    <DashboardTemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </DashboardTemplateContext.Provider>
  );
}

export function useDashboardTemplate() {
  const context = useContext(DashboardTemplateContext);
  if (context === undefined) {
    throw new Error('useDashboardTemplate must be used within a DashboardTemplateProvider');
  }
  return context;
}
