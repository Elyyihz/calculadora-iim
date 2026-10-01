import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Layers } from 'lucide-react';
import { CalculatorWizard } from '../components/calculator/CalculatorWizard';
import { CalculatorProvider } from '../context/CalculatorContext';

export const CalculadoraPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'wizard' | 'legacy'>('wizard');

  return (
    <div style={{ background: 'var(--surface-2)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* SUB-HEADER NAVIGATION */}
      <div
        style={{
          background: 'var(--brand)',
          borderBottom: '1px solid rgba(46, 204, 138, 0.2)',
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(255, 255, 255, 0.08)',
                padding: '3px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('wizard')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: viewMode === 'wizard' ? 'var(--brand)' : 'rgba(255, 255, 255, 0.75)',
                  background: viewMode === 'wizard' ? 'var(--accent)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Layers size={13} />
                <span>Formulário Multi-Etapas (Stepper)</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('legacy')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '16px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: viewMode === 'legacy' ? 'var(--brand)' : 'rgba(255, 255, 255, 0.75)',
                  background: viewMode === 'legacy' ? 'var(--accent)' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                <Play size={13} />
                <span>HTML Legado</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER */}
      <div
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

      {/* MAIN VIEW */}
      {viewMode === 'wizard' ? (
        <CalculatorProvider>
          <CalculatorWizard />
        </CalculatorProvider>
      ) : (
        <div className="container" style={{ marginTop: '2rem' }}>
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                background: 'var(--brand)',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(46, 204, 138, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)', marginLeft: '10px' }}>
                  calculadora-iim-v3.1-1.html
                </span>
              </div>
            </div>

            <iframe
              src="/calculadora-prototype.html"
              title="Calculadora IIM Legada"
              style={{
                width: '100%',
                height: '840px',
                border: 'none',
                display: 'block'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
