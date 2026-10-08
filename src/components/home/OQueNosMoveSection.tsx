import React from 'react';
import { DollarSign, Zap, Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PILLARS_MOVEMENT } from '../../data/institutionalData';

export const OQueNosMoveSection: React.FC = () => {
  const getIcon = (role: string) => {
    switch (role) {
      case 'Eficiência':
        return <DollarSign size={24} color="var(--accent)" />;
      case 'Produtividade':
        return <Zap size={24} color="var(--accent)" />;
      case 'Bem-estar':
      default:
        return <Heart size={24} color="var(--accent)" />;
    }
  };

  return (
    <section
      id="o-que-nos-move"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Section Header with generous margin */}
        <div style={{ maxWidth: '780px', margin: '0 auto 4.5rem', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem'
            }}
          >
            Três Dimensões de Valor
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--brand)',
              lineHeight: 1.2,
              marginBottom: '1.2rem'
            }}
          >
            O que nos move
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              fontWeight: 400
            }}
          >
            A mobilidade corporativa deixou de ser um detalhe logístico e se tornou uma alavanca estratégica.
            Alinhamos os três centros decisórios da sua empresa em torno de uma mesma métrica de impacto.
          </p>
        </div>

        {/* 3 Pillars Grid with generous spacing */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4.5rem'
          }}
        >
          {PILLARS_MOVEMENT.map((pillar) => (
            <div
              key={pillar.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius)',
                border: '1px solid rgba(11, 37, 69, 0.08)',
                padding: '2.8rem 2.2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 25px rgba(11, 37, 69, 0.04)',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(11, 37, 69, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 25px rgba(11, 37, 69, 0.04)';
              }}
            >
              <div>
                {/* Pillar Header / Icon & Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.8rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getIcon(pillar.role)}
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: 'var(--brand)',
                      background: 'var(--surface-2)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-pill)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    {pillar.stakeholder}
                  </span>
                </div>

                {/* Pillar Title */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--brand)',
                    marginBottom: '1rem',
                    lineHeight: 1.3
                  }}
                >
                  {pillar.title}
                </h3>

                {/* Pillar Description */}
                <p
                  style={{
                    fontSize: '0.96rem',
                    color: '#4B5563',
                    lineHeight: 1.7,
                    marginBottom: '1.8rem'
                  }}
                >
                  {pillar.description}
                </p>

                {/* Highlights List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {pillar.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric Tag at the bottom */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--surface-2)',
                  borderLeft: '4px solid var(--accent)',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: 'var(--brand)'
                }}
              >
                {pillar.metric}
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist In-Section Bridge */}
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem',
            background: 'var(--surface-2)',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(11, 37, 69, 0.06)',
            maxWidth: '920px',
            margin: '0 auto'
          }}
        >
          <p style={{ fontSize: '1.05rem', color: 'var(--brand)', fontWeight: 600, marginBottom: '1rem' }}>
            Quer mensurar o impacto direto desses 3 pilares no seu quadro de colaboradores?
          </p>
          <Link
            to="/calculadora"
            className="btn btn-primary"
            style={{
              padding: '12px 26px',
              fontSize: '0.92rem'
            }}
          >
            <span>Iniciar Diagnóstico na Calculadora IIM</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
