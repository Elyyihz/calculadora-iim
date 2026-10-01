import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, BarChart3, Clock, DollarSign, Leaf } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section style={{ padding: '0 0 5rem' }}>
      <div className="container">
        <div
          style={{
            background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-mid) 100%)',
            borderRadius: 'var(--radius)',
            padding: '3.5rem 2.5rem',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(46, 158, 91, 0.25)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Subtle background graphics */}
          <div
            style={{
              position: 'absolute',
              right: '-5%',
              top: '-20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(46, 158, 91, 0.12) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '16px',
                  background: 'rgba(46, 158, 91, 0.15)',
                  color: 'var(--accent)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  border: '1px solid rgba(46, 158, 91, 0.3)'
                }}
              >
                <Calculator size={14} />
                <span>Simulador Proprietário</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: '1rem'
                }}
              >
                Pronto para descobrir o índice de impacto de mobilidade da sua empresa?
              </h3>

              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  marginBottom: '1.8rem'
                }}
              >
                Utilize a ferramenta oficial dos nossos consultores para gerar um diagnóstico preliminar
                em 4 etapas, obter projeções de economia financeira e simular o impacto de intervenções operacionais.
              </p>

              <Link
                to="/calculadora"
                className="btn btn-accent-glow"
                style={{ padding: '13px 26px', fontSize: '0.95rem' }}
              >
                <Calculator size={17} />
                <span>Abrir a Calculadora IIM v3.0</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* 4 DIMENSIONS PREVIEW PILLS */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius)',
                padding: '1.75rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div
                style={{
                  fontSize: '0.76rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}
              >
                4 Dimensões Ponderadas pelo Algoritmo IIM
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  {
                    title: 'D1: Tempo & Deslocamento',
                    desc: 'Minutos perdidos por dia e índice de atrito na comutação',
                    icon: <Clock size={18} color="var(--accent)" />
                  },
                  {
                    title: 'D2: Custo & Eficiência Financeira',
                    desc: 'Gastos com combustíveis, estacionamentos e subsídios',
                    icon: <DollarSign size={18} color="var(--accent)" />
                  },
                  {
                    title: 'D3: Emissões & Pegada Ambiental',
                    desc: 'Estimativa de kg de CO₂e gerados no trajeto diário',
                    icon: <Leaf size={18} color="var(--accent)" />
                  },
                  {
                    title: 'D4: Bem-Estar & Saúde do Colaborador',
                    desc: 'Stress acumulado, desgaste e impacto no turnover corporativo',
                    icon: <BarChart3 size={18} color="var(--accent)" />
                  }
                ].map((dim, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ flexShrink: 0 }}>{dim.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                        {dim.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                        {dim.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
