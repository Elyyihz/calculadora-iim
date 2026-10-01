import React, { useEffect } from 'react';
import { EquipaSection } from '../components/home/EquipaSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const EquipaPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '2rem' }}>
      <EquipaSection />
      <CtaBanner />
    </div>
  );
};
