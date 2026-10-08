import React from 'react';
import { ArrowUpRight, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../../data/institutionalData';

export const CtaBanner: React.FC = () => {
  return (
    <section
      id="conversao"
      style={{
        padding: '3rem 0 6rem',
        background: '#FFFFFF'
      }}
    >
      <div className="container">
        {/* Soft pale green card container matching reference design */}
        <div
          style={{
            background: '#EBF3EE',
            borderRadius: '24px',
            border: '1px solid #D1DFD6',
            padding: '4.5rem 4rem 3rem',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(11, 37, 69, 0.04)'
          }}
          className="cta-banner-card"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            {/* Left Content */}
            <div style={{ maxWidth: '640px' }}>
              {/* Eyebrow */}
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3B5848',
                  marginBottom: '1.2rem'
                }}
              >
                O próximo passo começa com uma conversa
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.3rem, 4.5vw, 3.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: '1.2rem'
                }}
              >
                <span style={{ color: '#0B1924', display: 'block' }}>Sua equipe se move.</span>
                <span style={{ color: '#2E9E5B', display: 'block' }}>Sua empresa pode evoluir.</span>
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1.15rem',
                  color: '#4A5568',
                  lineHeight: 1.6,
                  fontWeight: 400
                }}
              >
                Vamos entender o impacto da mobilidade na sua operação?
              </p>
            </div>

            {/* Right Action: HIGHEST VISUAL HIGHLIGHT ON SCREEN */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Preparar meu diagnóstico via WhatsApp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  background: '#0B1924',
                  color: '#FFFFFF',
                  padding: '22px 42px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  boxShadow: '0 14px 35px rgba(11, 25, 36, 0.35)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer'
                }}
                className="main-cta-button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 45px rgba(11, 25, 36, 0.45)';
                  e.currentTarget.style.background = '#132838';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 14px 35px rgba(11, 25, 36, 0.35)';
                  e.currentTarget.style.background = '#0B1924';
                }}
              >
                <span>Preparar meu diagnóstico</span>
                <ArrowUpRight size={24} strokeWidth={2.4} />
              </a>

              {/* Secondary Option: Self-service Calculator */}
              <Link
                to="/calculadora"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.90rem',
                  color: '#2B4C38',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '4px 8px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2E9E5B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#2B4C38')}
              >
                <Calculator size={15} />
                <span>Ou simule agora na Calculadora IIM</span>
              </Link>
            </div>
          </div>

          {/* Bottom subtle divider and notes */}
          <div
            style={{
              borderTop: '1px solid #D5E2D9',
              paddingTop: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              fontSize: '0.82rem',
              color: '#6B7280'
            }}
          >
            <span>Mobilidade corporativa com pessoas no centro.</span>
            <span style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
              Recife & Região Metropolitana
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cta-banner-card {
            padding: 2.8rem 1.8rem 2rem !important;
          }
          .main-cta-button {
            width: 100% !important;
            padding: 18px 24px !important;
            font-size: 1.05rem !important;
          }
        }
      `}</style>
    </section>
  );
};
