import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { PILLARS } from '../../data/institutionalData';
import { Compass, TrendingUp, Leaf, Users, CheckCircle2, Award, Target, Eye } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Compass: <Compass size={28} color="var(--accent)" strokeWidth={2} />,
  TrendingUp: <TrendingUp size={28} color="var(--accent)" strokeWidth={2} />,
  Leaf: <Leaf size={28} color="var(--accent)" strokeWidth={2} />,
  Users: <Users size={28} color="var(--accent)" strokeWidth={2} />
};

export const QuemSomosSection: React.FC = () => {
  return (
    <section id="quem-somos" className="section-padding">
      <div className="container">
        <SectionTitle
          eyebrow="Quem Somos"
          title="Pioneiros na integração entre"
          highlight="mobilidade, finanças e sustentabilidade"
          description="A UrbanFlow nasceu da urgência de transformar o tempo perdido no trânsito e o impacto ambiental corporativo em eficiência mensurável e retorno para o negócio."
        />

        {/* STORY & MISSION 2-COL BLOCK */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4.5rem',
            alignItems: 'center'
          }}
        >
          {/* LEFT: TEXT STORY */}
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: 'var(--radius)',
              padding: '2.5rem',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow)'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--brand-mid)',
                fontWeight: 700,
                fontSize: '0.85rem',
                marginBottom: '1rem'
              }}
            >
              <Award size={18} color="var(--accent)" />
              <span>Nossa Origem & Propósito</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--brand)',
                marginBottom: '1rem',
                lineHeight: 1.3
              }}
            >
              Transformamos deslocações em valor estratégico para as organizações
            </h3>

            <p style={{ color: 'var(--text-muted)', marginBottom: '1.2rem', lineHeight: 1.7 }}>
              Fundada por especialistas em planeamento urbano, engenharia de tráfego e sustentabilidade corporativa,
              a UrbanFlow é a consultoria pioneira no desenvolvimento de algoritmos que quantificam o custo invisível
              do deslocamento corporativo.
            </p>

            <p style={{ color: 'var(--text-muted)', marginBottom: '1.8rem', lineHeight: 1.7 }}>
              Comprovamos que planos de mobilidade inteligente não representam despesas, mas investimentos
              de alto retorno financeiro (ROI), alinhados às exigências de sustentabilidade ESG e de atração de talento.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div
                style={{
                  background: 'var(--surface-3)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--accent)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Target size={16} color="var(--brand)" />
                  <strong style={{ fontSize: '0.88rem', color: 'var(--brand)' }}>Missão</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Otimizar fluxos humanos corporativos através de dados, reduzindo custos e emissões.
                </p>
              </div>

              <div
                style={{
                  background: 'var(--surface-3)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3px solid var(--brand-mid)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <Eye size={16} color="var(--brand)" />
                  <strong style={{ fontSize: '0.88rem', color: 'var(--brand)' }}>Visão</strong>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Ser a referência ibérica em consultoria analítica de mobilidade e transição climática.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: METHODOLOGY HIGHLIGHTS */}
          <div
            className="card-blue"
            style={{
              background: 'linear-gradient(145deg, var(--brand) 0%, var(--brand-mid) 100%)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius)',
              padding: '2.5rem',
              border: '1px solid rgba(46, 158, 91, 0.25)',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 600,
                marginBottom: '0.75rem'
              }}
            >
              Diferenciais de Mercado
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.45rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.25rem'
              }}
            >
              Porque os líderes confiam na UrbanFlow
            </h3>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {[
                {
                  title: 'Metodologia Proprietária IIM v3.0',
                  desc: 'Algoritmo multicritério auditado que correlaciona tempo, custo, emissões e bem-estar.'
                },
                {
                  title: 'Modelagem Preditiva de ROI',
                  desc: 'Projeção rigorosa de poupança financeira antes de qualquer intervenção operacional.'
                },
                {
                  title: 'Privacidade Total (GDPR First)',
                  desc: 'Diagnósticos agregados que respeitam os dados pessoais de cada colaborador.'
                },
                {
                  title: 'Apoio de Ponta a Ponta',
                  desc: 'Do diagnóstico à implementação prática de vans, frotas elétricas e políticas híbridas.'
                }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <CheckCircle2
                    size={20}
                    color="var(--accent)"
                    style={{ flexShrink: 0, marginTop: '2px' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '2px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'rgba(255, 255, 255, 0.90)', lineHeight: 1.5 }}>
                      {item.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4 PILLARS OF CONSULTING */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                fontWeight: 700
              }}
            >
              Pilares de Atuação
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--brand)',
                marginTop: '0.4rem'
              }}
            >
              Como estruturamos os nossos projetos
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius)',
                  padding: '2rem 1.75rem',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: 'var(--accent-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.25rem',
                      border: '1px solid var(--accent-mid)'
                    }}
                  >
                    {iconMap[pillar.iconName]}
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--brand)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {pillar.title}
                  </h4>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                {pillar.metrics && (
                  <div
                    style={{
                      borderTop: '1px solid var(--border)',
                      paddingTop: '0.9rem',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--brand-mid)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent)'
                      }}
                    />
                    <span>{pillar.metrics}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
