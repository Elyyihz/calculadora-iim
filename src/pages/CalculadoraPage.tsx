import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Info, Sparkles } from 'lucide-react';
import { CalculatorWizard } from '../components/calculator/CalculatorWizard';
import { CalculatorProvider } from '../context/CalculatorContext';

export const CalculadoraPage: React.FC = () => {
  return (
    <div style={{ background: 'var(--surface-2)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* SUB-HEADER NAVIGATION */}
      <div
        className="no-print"
        style={{
          background: 'var(--brand)',
          borderBottom: '1px solid rgba(46, 158, 91, 0.2)',
          padding: '0.8rem 0'
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}
        >
          <Link
            to="/"
            style={{
              color: 'var(--accent)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Site Institucional</span>
          </Link>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.85)',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '5px 14px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.14)'
            }}
          >
            <Sparkles size={13} color="var(--accent)" />
            <span>Diagnóstico Interativo Oficial</span>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div
        className="no-print"
        style={{
          background: 'var(--brand)',
          padding: '3rem 1.5rem 4.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.14em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}
        >
          Ferramenta Proprietária v3.0 · UrbanFlow
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}
        >
          Calculadora <span style={{ color: 'var(--accent)' }}>IIM</span>
        </h1>

        <p
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '620px',
            margin: '0 auto',
            fontSize: '0.98rem',
            fontWeight: 300,
            lineHeight: 1.6
          }}
        >
          Índice de Impacto de Mobilidade — diagnóstico completo em 4 dimensões
          ponderadas com projeção financeira e simulador de ROI.
        </p>

        {/* REGRA DE ESCALA EXPLICATIVA DA CALCULADORA */}
        <div
          style={{
            marginTop: '1.4rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            padding: '8px 18px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.84rem',
            color: 'rgba(255, 255, 255, 0.9)',
            maxWidth: '720px',
            lineHeight: 1.45
          }}
        >
          <Info size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
          <span>
            <strong>Entenda a escala:</strong> Quanto maior a pontuação (aproximando-se de 100), pior é a mobilidade e maior é o impacto negativo financeiro e de bem-estar para a empresa e para o colaborador.
          </span>
        </div>

        {/* CURVED BOTTOM DECORATION */}
        <div
          style={{
            position: 'absolute',
            bottom: '-1px',
            left: 0,
            right: 0,
            height: '40px',
            background: 'var(--surface-2)',
            clipPath: 'ellipse(60% 100% at 50% 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* MAIN CALCULATOR WIZARD */}
      <CalculatorProvider>
        <CalculatorWizard />
      </CalculatorProvider>
    </div>
  );
};
