import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { RESPONSIBILITIES } from '../../data/institutionalData';
import { ShieldCheck, Check, Sparkles, Globe, HeartHandshake, FileCheck } from 'lucide-react';

const categoryIcon: Record<string, React.ReactNode> = {
  ESG: <Globe size={20} color="var(--accent)" />,
  Social: <HeartHandshake size={20} color="var(--accent)" />,
  Governança: <FileCheck size={20} color="var(--accent)" />,
  Mobilidade: <Sparkles size={20} color="var(--accent)" />
};

export const ResponsabilidadesSection: React.FC = () => {
  return (
    <section id="responsabilidades" className="section-padding">
      <div className="container">
        <SectionTitle
          eyebrow="Responsabilidades & Compromissos"
          title="Rigor ético, conformidade ESG e"
          highlight="impacto social positivo"
          description="Acreditamos que a mobilidade sustentável só é genuína quando apoiada em governança transparente, dados auditáveis e respeito absoluto pela vida das pessoas."
        />

        {/* RESPONSIBILITY CARDS GRID */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          {RESPONSIBILITIES.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius)',
                padding: '2.2rem',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem'
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'var(--surface-3)',
                      color: 'var(--brand-mid)',
                      padding: '4px 12px',
                      borderRadius: '16px',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {categoryIcon[item.category]}
                    <span>{item.category}</span>
                  </span>

                  <ShieldCheck size={20} color="var(--accent)" />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--brand)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.3
                  }}
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem'
                  }}
                >
                  {item.description}
                </p>

                {/* COMMITMENTS BULLET LIST */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)',
                      fontWeight: 700,
                      marginBottom: '0.75rem'
                    }}
                  >
                    Compromissos Operacionais
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.commitments.map((commitment, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.84rem',
                          color: 'var(--text)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                          lineHeight: 1.45
                        }}
                      >
                        <Check
                          size={15}
                          color="var(--accent)"
                          style={{ flexShrink: 0, marginTop: '3px' }}
                        />
                        <span>{commitment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* IMPACT METRICS FOOTER */}
              <div
                style={{
                  background: 'var(--accent-light)',
                  border: '1px solid var(--accent-mid)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                  color: 'var(--brand)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    flexShrink: 0
                  }}
                />
                <span>{item.impactMetrics}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ETHICAL PLEDGE BANNER */}
        <div
          style={{
            background: 'var(--brand)',
            borderRadius: 'var(--radius)',
            padding: '2.5rem',
            color: '#FFFFFF',
            border: '1px solid rgba(46, 204, 138, 0.2)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent)',
                fontWeight: 600,
                marginBottom: '0.5rem'
              }}
            >
              Declaração de Conformidade & Privacidade
            </div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.35rem',
                fontWeight: 700,
                marginBottom: '0.6rem'
              }}
            >
              Dados seguros, anonimização nativa e conformidade RGPD
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.6 }}>
              A UrbanFlow não recolhe dados individuais identificáveis para fins de rastreio contínuo.
              Todos os diagnósticos e outputs da Calculadora IIM operam sob agregações estatísticas,
              resguardando os direitos dos colaboradores e a integridade jurídica da organização contratante.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              textAlign: 'center',
              minWidth: '200px'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: 800,
                color: 'var(--accent)',
                lineHeight: 1
              }}
            >
              100%
            </div>
            <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 600, marginTop: '4px' }}>
              Anonimizado & Conforme
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '2px' }}>
              ISO 27001 & RGPD
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
