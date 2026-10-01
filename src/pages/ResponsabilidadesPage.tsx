import React, { useEffect } from 'react';
import { ResponsabilidadesSection } from '../components/home/ResponsabilidadesSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const ResponsabilidadesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <ResponsabilidadesSection />
      <CtaBanner />
    </div>
  );
};
