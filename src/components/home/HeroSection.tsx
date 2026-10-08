import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <section
        id="inicio"
        style={{
          background: '#FFFFFF',
          padding: '5rem 0 4.5rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
            className="hero-grid"
          >
            {/* Left Content */}
            <div>
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
                Conectando deslocamento e resultados
              </div>

              {/* Title */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                  fontWeight: 800,
                  color: '#0B1924',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: '1.5rem'
                }}
              >
                Um novo caminho para sua empresa ir mais longe.
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '1.12rem',
                  color: '#4B5563',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  marginBottom: '2.5rem',
                  maxWidth: '560px'
                }}
              >
                Transformamos trajetos diários em dados estratégicos para reduzir custos, melhorar a pontualidade e cuidar de quem move o seu negócio.
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <Link
                  to="/calculadora"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '16px 32px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    background: '#0B1924',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(11, 25, 36, 0.25)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1A3347';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0B1924';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Conheça seu impacto</span>
                  <ArrowRight size={18} />
                </Link>

                <a
                  href="#o-metodo"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '16px 26px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#0B1924',
                    background: 'transparent',
                    border: '1px solid #D1D5DB',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0B1924';
                    e.currentTarget.style.background = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span>Explore nosso método</span>
                </a>
              </div>
            </div>

            {/* Right Map/Network Graphic Card */}
            <div>
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem 2.2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)'
                }}
              >
                {/* Header of graphic card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#64748B'
                      }}
                    >
                      Conexões Urbanas
                    </span>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#0B1924',
                        marginTop: '2px'
                      }}
                    >
                      Mapeamento Multimodal
                    </h3>
                  </div>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(46, 158, 91, 0.12)',
                      color: '#2E9E5B',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2E9E5B' }} />
                    <span>Tempo Real</span>
                  </span>
                </div>

                {/* SVG Visualizing urban routes network */}
                <div style={{ width: '100%', height: 'auto' }}>
                  <svg viewBox="0 0 400 240" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {/* Background grid lines */}
                    <line x1="20" y1="60" x2="380" y2="60" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="20" y1="120" x2="380" y2="120" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="20" y1="180" x2="380" y2="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Network connections */}
                    <path d="M 60 180 Q 140 100 200 130 T 340 70" stroke="#2E9E5B" strokeWidth="2.5" fill="none" />
                    <path d="M 80 80 Q 180 180 280 140 T 360 170" stroke="#0B1924" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
                    <path d="M 120 200 C 180 80 240 60 320 110" stroke="#2E9E5B" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />

                    {/* Network Nodes */}
                    <circle cx="60" cy="180" r="7" fill="#0B1924" />
                    <circle cx="200" cy="130" r="9" fill="#2E9E5B" />
                    <circle cx="200" cy="130" r="16" fill="rgba(46, 158, 91, 0.2)" />
                    <circle cx="340" cy="70" r="7" fill="#0B1924" />
                    <circle cx="80" cy="80" r="5" fill="#64748B" />
                    <circle cx="280" cy="140" r="6" fill="#2E9E5B" />
                    <circle cx="360" cy="170" r="5" fill="#64748B" />

                    {/* Node Labels */}
                    <text x="60" y="205" fontSize="11" fontWeight="600" fill="#64748B" textAnchor="middle">Polo Residencial</text>
                    <text x="200" y="105" fontSize="12" fontWeight="800" fill="#2E9E5B" textAnchor="middle">Hub de Integração</text>
                    <text x="340" y="52" fontSize="11" fontWeight="600" fill="#0B1924" textAnchor="middle">Sede Corporativa</text>
                  </svg>
                </div>

                {/* Bottom stats inside graphic card */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '1.2rem',
                    paddingTop: '1.2rem',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '0.82rem',
                    color: '#64748B'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} color="#2E9E5B" />
                    <span>Dados 100% anonimizados</span>
                  </div>
                  <div style={{ fontWeight: '600', color: '#0B1924' }}>
                    4 Dimensões Integradas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER RIBBON: "O deslocamento é diário. O impacto também." */}
      <section
        style={{
          background: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          borderBottom: '1px solid #E2E8F0',
          padding: '1.5rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#0B1924'
              }}
            >
              O deslocamento é diário. O impacto também.
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#0B1924'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2E9E5B' }} />
                <span>Eficiência para o negócio</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#0B1924'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2E9E5B' }} />
                <span>Produtividade para a operação</span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid #E2E8F0',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#0B1924'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2E9E5B' }} />
                <span>Bem-estar para as pessoas</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
