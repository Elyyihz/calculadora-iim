import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../../data/institutionalData';

export const CtaBanner: React.FC = () => {
  return (
    <section style={{ padding: '2rem 0 7rem', background: '#FFFFFF' }}>
      <div className="container">
        <div
          className="card-blue"
          style={{
            background: 'var(--brand)',
            borderRadius: 'var(--radius)',
            padding: '4.5rem 3.5rem',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(46, 158, 91, 0.25)',
            boxShadow: '0 12px 40px rgba(11, 37, 69, 0.12)'
          }}
        >
          {/* Subtle background ambient glow */}
          <div
            style={{
              position: 'absolute',
              right: '-8%',
              top: '-30%',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(46, 158, 91, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 16px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(46, 158, 91, 0.16)',
                color: 'var(--accent)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1.4rem',
                border: '1px solid rgba(46, 158, 91, 0.35)'
              }}
            >
              <Sparkles size={14} />
              <span>Diagnóstico Preliminar IIM</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.2,
                marginBottom: '1.2rem'
              }}
            >
              Pronto para descobrir o índice de impacto de mobilidade da sua empresa?
            </h3>

            <p
              style={{
                color: 'rgba(255, 255, 255, 0.92)',
                fontSize: '1.1rem',
                lineHeight: 1.75,
                marginBottom: '2.5rem',
                maxWidth: '680px',
                margin: '0 auto 2.5rem'
              }}
            >
              Utilize nossa ferramenta interativa proprietária para mapear as 4 dimensões, obter
              a projeção de economia financeira e simular o retorno sobre o investimento em tempo real.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.2rem'
              }}
            >
              <Link
                to="/calculadora"
                className="btn btn-cta"
                style={{
                  padding: '16px 34px',
                  fontSize: '1.02rem',
                  borderRadius: 'var(--radius-pill)',
                  boxShadow: '0 6px 20px rgba(46, 158, 91, 0.35)'
                }}
              >
                <Calculator size={19} />
                <span>Calcular IIM da Minha Empresa</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light"
                style={{
                  padding: '16px 30px',
                  fontSize: '1.02rem',
                  borderRadius: 'var(--radius-pill)'
                }}
              >
                <MessageSquare size={18} />
                <span>Falar com Consultor</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
