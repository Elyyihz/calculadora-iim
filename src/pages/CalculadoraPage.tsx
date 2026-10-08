import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Sparkles, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/institutionalData';

/**
 * Public portal page for the calculator route (/calculadora).
 *
 * Clarifies governance boundaries: redirects public visitors to the
 * didactical preview simulator on the homepage, while routing authorized team
 * personnel to the private 36-question workspace.
 */
export const CalculadoraPage: React.FC = () => {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '80vh', padding: '5rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Top Back link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.86rem',
            color: '#6B7280',
            textDecoration: 'none',
            marginBottom: '2rem'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0B1924')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft size={16} />
          <span>Voltar para a página inicial</span>
        </Link>

        {/* Main Card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E5E7EB',
            padding: '3.5rem 3rem',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.04)',
            textAlign: 'center'
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(11, 25, 36, 0.06)',
              color: '#0B1924',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem'
            }}
          >
            <ShieldCheck size={14} color="#2E9E5B" />
            <span>Governança Metodológica do IIM</span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 800,
              color: '#0B1924',
              lineHeight: 1.2,
              marginBottom: '1.2rem'
            }}
          >
            Acesso à Metodologia Completa
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#4B5563',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '620px',
              margin: '0 auto 2.5rem'
            }}
          >
            A Calculadora IIM Completa de <strong>36 critérios ponderados</strong> e módulo de ingestão
            de planilhas de colaboradores é uma ferramenta confidencial de uso exclusivo da equipe técnica
            e consultores da UrbanFlow durante a prestação de serviços.
          </p>

          {/* Action options */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left',
              marginBottom: '2.5rem'
            }}
          >
            {/* Option 1: Public Didactical Simulator */}
            <div
              style={{
                background: '#F0FDF4',
                border: '1.5px solid #86EFAC',
                borderRadius: '16px',
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <Sparkles size={16} />
                  <span>Para Visitantes & Empresas</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B1924', marginBottom: '8px' }}>
                  Simulador Didático
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  Experimente nossa versão simplificada na Landing Page para entender o conceito e visualizar o impacto estimado.
                </p>
              </div>

              <a
                href="/#simulador"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 18px',
                  background: '#2E9E5B',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.90rem',
                  textDecoration: 'none',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(46, 158, 91, 0.25)'
                }}
              >
                <span>Acessar Simulador na Home</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Option 2: Internal Team Workspace */}
            <div
              style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.8rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0B1924', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>
                  <Lock size={16} />
                  <span>Equipe UrbanFlow</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0B1924', marginBottom: '8px' }}>
                  Workspace Restrito
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.55, marginBottom: '1.5rem' }}>
                  Área protegida para analistas aplicarem as 36 perguntas ou realizarem a importação de planilhas.
                </p>
              </div>

              <Link
                to="/interno/calculadora"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '12px 18px',
                  background: '#0B1924',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.90rem',
                  textDecoration: 'none',
                  justifyContent: 'center'
                }}
              >
                <span>Entrar no Workspace Interno</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div style={{ fontSize: '0.86rem', color: '#6B7280' }}>
            Dúvidas sobre o diagnóstico?{' '}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2E9E5B', fontWeight: 600, textDecoration: 'none' }}
            >
              Fale diretamente com nossa equipe no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
