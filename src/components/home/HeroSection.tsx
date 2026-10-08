import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_STATS } from '../../data/institutionalData';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)',
        color: 'var(--text)',
        padding: '7rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle ambient blur in the background */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(46, 158, 91, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(11, 37, 69, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Minimalist Eyebrow pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(11, 37, 69, 0.05)',
            border: '1px solid rgba(11, 37, 69, 0.12)',
            color: 'var(--brand)',
            fontSize: '0.80rem',
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '2rem'
          }}
        >
          <Sparkles size={14} color="var(--accent)" />
          <span>Consultoria em Mobilidade Corporativa & People Analytics</span>
        </div>

        {/* Hero Title (Exact briefing specification) */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            color: 'var(--brand)',
            lineHeight: 1.15,
            maxWidth: '920px',
            margin: '0 auto 1.8rem',
            letterSpacing: '-0.025em'
          }}
        >
          Um novo caminho para sua empresa ir mais longe
        </h1>

        {/* Hero Subtitle (Focused on transforming commute into data) */}
        <p
          style={{
            color: '#4B5563',
            maxWidth: '740px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(1.05rem, 2vw, 1.22rem)',
            fontWeight: 400,
            lineHeight: 1.75
          }}
        >
          Transformamos o trajeto dos seus colaboradores em dados estratégicos de alta precisão.
          Identifique perdas ocultas, elimine custos invisíveis de turnover e presenteísmo e destrave
          a verdadeira capacidade produtiva da sua organização.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.2rem',
            marginBottom: '5rem'
          }}
        >
          <Link
            to="/calculadora"
            className="btn btn-cta"
            style={{
              padding: '16px 34px',
              fontSize: '1.02rem',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 6px 24px rgba(46, 158, 91, 0.28)'
            }}
          >
            <Calculator size={19} />
            <span>Calcular IIM da Minha Empresa</span>
            <ArrowRight size={18} />
          </Link>

          <a
            href="#o-metodo"
            className="btn btn-ghost"
            style={{
              padding: '16px 30px',
              fontSize: '1.02rem',
              borderRadius: 'var(--radius-pill)',
              background: '#FFFFFF',
              color: 'var(--brand)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 2px 10px rgba(11, 37, 69, 0.04)'
            }}
          >
            <span>Conhecer o Método</span>
          </a>
        </div>

        {/* Minimalist Proof Cards with generous white space */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.8rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(11, 37, 69, 0.08)',
                borderRadius: 'var(--radius)',
                padding: '2rem 1.6rem',
                textAlign: 'left',
                boxShadow: '0 4px 20px rgba(11, 37, 69, 0.04)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.1rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  lineHeight: 1.1,
                  marginBottom: '0.6rem'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.98rem',
                  fontWeight: 700,
                  color: 'var(--brand)',
                  marginBottom: '0.35rem'
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '0.84rem',
                  color: '#6B7280',
                  lineHeight: 1.55
                }}
              >
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
