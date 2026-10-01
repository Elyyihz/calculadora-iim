import React, { useEffect } from 'react';
import { QuemSomosSection } from '../components/home/QuemSomosSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const QuemSomosPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <QuemSomosSection />
      <CtaBanner />
    </div>
  );
};
