import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_STATS } from '../../data/institutionalData';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      style={{
        background: 'var(--brand)',
        color: '#FFFFFF',
        padding: '5rem 0 7rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(46, 204, 138, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Eyebrow badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(46, 204, 138, 0.12)',
            border: '1px solid rgba(46, 204, 138, 0.3)',
            color: 'var(--accent)',
            fontSize: '0.78rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '1.8rem'
          }}
        >
          <Sparkles size={14} />
          <span>Consultoria Estratégica & Inteligência Urbana</span>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.3rem, 5.5vw, 4rem)',
            color: '#FFFFFF',
            lineHeight: 1.15,
            maxWidth: '900px',
            margin: '0 auto 1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Redesenhe a mobilidade da sua empresa com{' '}
          <span style={{ color: 'var(--accent)' }}>inteligência quantitativa</span>
        </h1>

        {/* Hero Subtitle */}
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.72)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            fontSize: '1.1rem',
            fontWeight: 300,
            lineHeight: 1.7
          }}
        >
          Ajudamos organizações a reduzir a pegada de carbono, eliminar custos com percursos ineficientes
          e devolver tempo produtivo e qualidade de vida aos colaboradores através da nossa metodologia proprietária IIM.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '4.5rem'
          }}
        >
          <Link to="/calculadora" className="btn btn-accent-glow" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <Calculator size={18} />
            <span>Calcular Índice IIM da sua Empresa</span>
            <ArrowRight size={18} />
          </Link>

          <a href="#quem-somos" className="btn btn-outline-light" style={{ padding: '14px 28px', fontSize: '1rem' }}>
            <span>Conhecer a Nossa Abordagem</span>
          </a>
        </div>

        {/* STATS STRIP */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1060px',
            margin: '0 auto'
          }}
        >
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(26, 74, 53, 0.45)',
                border: '1px solid rgba(46, 204, 138, 0.18)',
                borderRadius: 'var(--radius)',
                padding: '1.5rem 1.25rem',
                backdropFilter: 'blur(8px)',
                textAlign: 'left',
                transition: 'transform var(--transition-fast)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.3rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '0.5rem'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  marginBottom: '0.25rem'
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-faint)',
                  lineHeight: 1.4
                }}
              >
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative smooth bottom curve matching the original HTML */}
      <div
        style={{
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          right: 0,
          height: '60px',
          background: 'var(--surface-2)',
          clipPath: 'ellipse(60% 100% at 50% 100%)',
          pointerEvents: 'none'
        }}
      />
    </section>
  );
};
