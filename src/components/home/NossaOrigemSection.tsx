import React from 'react';
import { GraduationCap, MapPin, Award, Quote } from 'lucide-react';
import { ORIGIN_STORY } from '../../data/institutionalData';

export const NossaOrigemSection: React.FC = () => {
  return (
    <section
      id="nossa-origem"
      style={{
        background: 'var(--surface-2)',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            background: '#FFFFFF',
            borderRadius: 'var(--radius)',
            border: '1px solid rgba(11, 37, 69, 0.08)',
            padding: '4.5rem 3.5rem',
            boxShadow: '0 8px 35px rgba(11, 37, 69, 0.04)',
            position: 'relative'
          }}
        >
          {/* Section Eyebrow & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
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
                textTransform: 'uppercase'
              }}
            >
              <GraduationCap size={15} />
              <span>{ORIGIN_STORY.institution}</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--brand)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <MapPin size={16} color="var(--accent)" />
              <span>{ORIGIN_STORY.city}</span>
            </div>
          </div>

          {/* Section Main Title */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
              fontWeight: 800,
              color: 'var(--brand)',
              lineHeight: 1.25,
              marginBottom: '2rem'
            }}
          >
            {ORIGIN_STORY.title}
          </h2>

          {/* Narrative Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              marginBottom: '3rem'
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#374151',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  fontWeight: 400
                }}
              >
                {ORIGIN_STORY.paragraph1}
              </p>
              <p
                style={{
                  fontSize: '1.02rem',
                  color: '#4B5563',
                  lineHeight: 1.75
                }}
              >
                {ORIGIN_STORY.paragraph2}
              </p>
            </div>

            <div
              style={{
                background: 'var(--surface-2)',
                borderRadius: 'var(--radius-sm)',
                padding: '2.2rem',
                borderLeft: '4px solid var(--accent)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <Quote size={28} color="var(--accent)" style={{ marginBottom: '1rem', opacity: 0.6 }} />
                <p
                  style={{
                    fontSize: '1.02rem',
                    color: 'var(--brand)',
                    lineHeight: 1.7,
                    fontWeight: 500,
                    fontStyle: 'italic',
                    marginBottom: '1.5rem'
                  }}
                >
                  "A mobilidade não é um custo inevitável do colaborador; é uma variável crítica
                  de saúde mental e de sustentabilidade financeira da empresa."
                </p>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                — Princípio Fundador do Índice IIM
              </div>
            </div>
          </div>

          <p
            style={{
              fontSize: '1.02rem',
              color: '#374151',
              lineHeight: 1.8,
              marginBottom: '2.5rem'
            }}
          >
            {ORIGIN_STORY.paragraph3}
          </p>

          {/* Trust Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              paddingTop: '2rem',
              borderTop: '1px solid #F3F4F6'
            }}
          >
            {ORIGIN_STORY.badges.map((badge, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--surface-2)',
                  color: 'var(--brand)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(11, 37, 69, 0.1)'
                }}
              >
                <Award size={15} color="var(--accent)" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
