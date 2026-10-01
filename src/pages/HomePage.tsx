import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { QuemSomosSection } from '../components/home/QuemSomosSection';
import { EquipaSection } from '../components/home/EquipaSection';
import { ResponsabilidadesSection } from '../components/home/ResponsabilidadesSection';
import { CtaBanner } from '../components/home/CtaBanner';

export const HomePage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <HeroSection />
      <QuemSomosSection />
      <EquipaSection />
      <ResponsabilidadesSection />
      <CtaBanner />
    </>
  );
};
