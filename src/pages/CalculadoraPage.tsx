import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, CheckCircle2, Play, ExternalLink, Code } from 'lucide-react';

export const CalculadoraPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'prototype'>('architecture');

  return (
    <div style={{ background: 'var(--surface-2)', minHeight: '80vh', paddingBottom: '4rem' }}>
      {/* TOP SUB-HEADER BAR */}
      <div
        style={{
          background: 'var(--brand)',
          borderBottom: '1px solid rgba(46, 204, 138, 0.2)',
          padding: '0.8rem 0'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          <div
            style={{
              background: 'rgba(46, 204, 138, 0.15)',
              color: 'var(--accent)',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '3px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(46, 204, 138, 0.3)'
            }}
          >
            ROTA: /calculadora
          </div>
        </div>
      </div>

      {/* CALCULATOR HERO HEADER */}
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
          Módulo de Diagnóstico Quantitativo
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#FFFFFF',
            lineHeight: 1.2,
            marginBottom: '1rem'
          }}
        >
          Calculadora <span style={{ color: 'var(--accent)' }}>IIM v3.0</span>
        </h1>

        <p
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '640px',
            margin: '0 auto',
            fontSize: '0.98rem',
            fontWeight: 300,
            lineHeight: 1.6
          }}
        >
          Índice de Impacto de Mobilidade — diagnóstico corporativo em 4 dimensões
          ponderadas com projeção financeira, emissões de carbono e simulador de ROI.
        </p>

        {/* TAB TOGGLE CONTROLS */}
        <div
          style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '4px',
            borderRadius: '30px',
            marginTop: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <button
            onClick={() => setActiveTab('architecture')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: activeTab === 'architecture' ? 'var(--brand)' : 'rgba(255, 255, 255, 0.8)',
              background: activeTab === 'architecture' ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <Layers size={15} />
            <span>Estrutura & Arquitetura</span>
          </button>

          <button
            onClick={() => setActiveTab('prototype')}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: activeTab === 'prototype' ? 'var(--brand)' : 'rgba(255, 255, 255, 0.8)',
              background: activeTab === 'prototype' ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            <Play size={15} />
            <span>Executar Protótipo Interativo</span>
          </button>
        </div>

        {/* Curve divider */}
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

      {/* CONTENT WRAPPER */}
      <div className="container" style={{ marginTop: '2rem' }}>
        {activeTab === 'architecture' ? (
          <div>
            {/* ARCHITECTURE ROADMAP CARDS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
              }}
            >
              {[
                {
                  step: 'Etapa 1',
                  name: 'Dados da Empresa',
                  desc: 'Setor de atuação, quadro de colaboradores, política de modelo de trabalho (presencial, híbrido ou remoto).',
                  badge: '🏢 Contexto Organizacional'
                },
                {
                  step: 'Etapa 2',
                  name: 'Caracterização da Mobilidade',
                  desc: 'Divisão modal (transporte público, automóvel particular, micro-mobilidade, fretados) e distâncias médias.',
                  badge: '🚗 Matriz Modal'
                },
                {
                  step: 'Etapa 3',
                  name: 'Custos, Tempo & Frotas',
                  desc: 'Tempo médio de trajeto diário, custos com estacionamento, subsídios de combustível e manutenção.',
                  badge: '⏱️ Despesas & Prazos'
                },
                {
                  step: 'Etapa 4',
                  name: 'Diagnóstico & ROI IIM',
                  desc: 'Cálculo algorítmico do score IIM, gráfico de teia (radar), simulação de poupança financeira e recomendações.',
                  badge: '📊 Algoritmo v3.0'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius)',
                    padding: '1.75rem',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--accent)',
                          background: 'var(--surface-3)',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}
                      >
                        {item.step}
                      </span>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-faint)' }}>{item.badge}</span>
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--brand)',
                        marginBottom: '0.6rem'
                      }}
                    >
                      {item.name}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--border)',
                      paddingTop: '0.8rem',
                      marginTop: '1.2rem',
                      fontSize: '0.78rem',
                      color: 'var(--brand-mid)',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 size={16} color="var(--accent)" />
                    <span>Pronto para Componentização Standalone</span>
                  </div>
                </div>
              ))}
            </div>

            {/* TECHNICAL BLUEPRINT BOX */}
            <div
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius)',
                padding: '2.5rem',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <Code size={22} color="var(--accent)" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--brand)'
                  }}
                >
                  Arquitetura Baseada em Componentes & Roteamento
                </h3>
              </div>

              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                A estrutura do projeto está modularizada com separação clara de responsabilidades:
                o cabeçalho institucional permite navegar de volta a qualquer secção ('Início', 'Quem Somos',
                'A Equipa', 'Responsabilidades') e mantém a rota ativa <code>/calculadora</code> pronta para receber
                a transposição dos formulários e gráficos reativos.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <button
                  onClick={() => setActiveTab('prototype')}
                  className="btn btn-primary"
                  style={{ fontSize: '0.9rem' }}
                >
                  <Play size={16} />
                  <span>Testar Protótipo Interativo Agora</span>
                </button>

                <a
                  href="/calculadora-prototype.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: '0.9rem' }}
                >
                  <span>Abrir em Nova Aba</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* EMBEDDED PROTOTYPE IFRAME */}
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
                    Calculadora IIM v3.0 — Runtime Interativo
                  </span>
                </div>

                <a
                  href="/calculadora-prototype.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--accent)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Tela Cheia</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              <iframe
                src="/calculadora-prototype.html"
                title="Calculadora IIM v3.0"
                style={{
                  width: '100%',
                  height: '820px',
                  border: 'none',
                  display: 'block'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
