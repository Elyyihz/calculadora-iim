import React from 'react';
import { Printer, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../../../data/institutionalData';

interface ConversionCtaSectionProps {
  empresaNome?: string;
  iimScore?: number;
  classificacao?: string;
}

export const ConversionCtaSection: React.FC<ConversionCtaSectionProps> = ({
  empresaNome,
  iimScore,
  classificacao
}) => {
  // Número WhatsApp oficial (apenas dígitos)
  const rawPhone = COMPANY_INFO.phone.replace(/\D/g, '') || '351210987654';

  // Mensagem padrão formatada para WhatsApp comercial
  const baseMessage = empresaNome
    ? `Olá, gerei o IIM da minha empresa (${empresaNome}${iimScore !== undefined ? `, Score: ${iimScore}` : ''}${classificacao ? ` - ${classificacao}` : ''}) e gostaria de um diagnóstico completo.`
    : 'Olá, gerei o IIM da minha empresa e gostaria de um diagnóstico completo.';

  const whatsappUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(baseMessage)}`;

  return (
    <div
      className="res-section conversion-cta-card"
      style={{
        background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-mid) 100%)',
        color: '#FFFFFF',
        borderRadius: 'var(--radius)',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(46, 158, 91, 0.3)',
        boxShadow: 'var(--shadow-lg)',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elemento de fundo estético */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(46, 158, 91, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(46, 158, 91, 0.18)',
            border: '1px solid rgba(46, 158, 91, 0.4)',
            color: 'var(--accent)',
            fontSize: '0.74rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 14px',
            borderRadius: 'var(--radius-pill)',
            marginBottom: '1rem'
          }}
        >
          Consultoria Personalizada UrbanFlow
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.75rem',
            lineHeight: 1.25
          }}
        >
          Pronto para transformar estas projeções em economia real?
        </h3>

        <p
          style={{
            fontSize: '0.92rem',
            color: 'rgba(255, 255, 255, 0.78)',
            lineHeight: 1.6,
            marginBottom: '1.8rem',
            maxWidth: '580px',
            margin: '0 auto 1.8rem'
          }}
        >
          Os nossos consultores realizam auditorias com amostragem estatística representativa,
          mapeamento de rotas e implementação das intervenções operacionais prioritárias para a sua empresa.
        </p>

        {/* GRUPO DE BOTÕES DE AÇÃO */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}
        >
          {/* BOTÃO PRINCIPAL VERDE (#2E9E5B) -> WHATSAPP */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#2E9E5B',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem',
              padding: '12px 24px',
              borderRadius: 'var(--radius-pill)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(46, 158, 91, 0.4)',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#25854c';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2E9E5B';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Ícone WhatsApp */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Solicitar diagnóstico completo</span>
            <ArrowUpRight size={16} />
          </a>

          {/* BOTÃO SECUNDÁRIO -> GERAR RELATÓRIO EM PDF */}
          <button
            type="button"
            onClick={() => window.print()}
            className="btn btn-outline-light"
            style={{
              padding: '12px 22px',
              fontSize: '0.9rem',
              fontWeight: 500,
              borderRadius: 'var(--radius-pill)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.08)',
              transition: 'all 0.2s ease'
            }}
          >
            <Printer size={16} />
            <span>Gerar relatório em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
