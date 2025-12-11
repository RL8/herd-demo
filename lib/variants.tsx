'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Variant = 'home' | 'current' | 'progressive' | 'conversational';

interface VariantContextType {
  variant: Variant;
  setVariant: (v: Variant) => void;
}

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<Variant>('home');

  // Read from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlVariant = params.get('v') as Variant;
    if (urlVariant && ['home', 'current', 'progressive', 'conversational'].includes(urlVariant)) {
      setVariant(urlVariant);
    }
  }, []);

  // Update URL when variant changes
  const handleSetVariant = (v: Variant) => {
    setVariant(v);
    const url = new URL(window.location.href);
    url.searchParams.set('v', v);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <VariantContext.Provider value={{ variant, setVariant: handleSetVariant }}>
      {children}
    </VariantContext.Provider>
  );
}

export function useVariant() {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariant must be used within VariantProvider');
  }
  return context;
}

