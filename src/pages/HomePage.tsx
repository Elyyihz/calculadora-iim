import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from '../components/home/HeroSection';
import { OQueNosMoveSection } from '../components/home/OQueNosMoveSection';
import { OMetodoSection } from '../components/home/OMetodoSection';
import { CalculadoraDidaticaSection } from '../components/home/CalculadoraDidaticaSection';
import { DaEscutaAcaoSection } from '../components/home/DaEscutaAcaoSection';
import { NossaOrigemSection } from '../components/home/NossaOrigemSection';
import { FaqSection } from '../components/home/FaqSection';
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
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero: Um novo caminho para sua empresa ir mais longe */}
      <HeroSection />

      {/* 2. O que nos move: Três pilares (Eficiência/CFO, Produtividade/Gestores, Bem-estar/RH) */}
      <OQueNosMoveSection />

      {/* 3. O Método: Gráfico de radar do IIM */}
      <OMetodoSection />

      {/* 4. Versão Didática da Calculadora (Conceitual para Visitantes) */}
      <CalculadoraDidaticaSection />

      {/* 5. Da escuta à ação: 4 passos */}
      <DaEscutaAcaoSection />

      {/* 5. Nossa Origem: História em Recife/UNINASSAU */}
      <NossaOrigemSection />

      {/* 6. FAQ: Acordeão com perguntas frequentes */}
      <FaqSection />

      {/* 7. Conversão / CTA */}
      <CtaBanner />
    </div>
  );
};
