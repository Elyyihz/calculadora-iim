import React from 'react';
import { Mail, Phone, MessageCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO, NAV_ITEMS } from '../../data/institutionalData';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#FFFFFF',
        color: '#1F2937',
        borderTop: '1px solid #E5E7EB',
        padding: '5rem 0 3rem'
      }}
    >
      <div className="container">
        {/* Main Footer Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand & Tagline */}
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'baseline',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#133E28',
                marginBottom: '0.8rem'
              }}
            >
              <span>urban</span>
              <span style={{ color: '#2E9E5B', fontWeight: 600 }}>flow</span>
            </Link>
            <p
              style={{
                fontSize: '0.92rem',
                color: '#4B5563',
                lineHeight: 1.6,
                marginBottom: '1.2rem',
                maxWidth: '300px'
              }}
            >
              Melhores caminhos. Melhores resultados.
            </p>
            <p
              style={{
                fontSize: '0.82rem',
                color: '#6B7280',
                lineHeight: 1.55,
                maxWidth: '320px'
              }}
            >
              Consultoria estratégica em mobilidade corporativa, People Analytics e mensuração de impacto operacional.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0B1924',
                marginBottom: '1.2rem'
              }}
            >
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.90rem',
                      color: '#4B5563',
                      textDecoration: 'none',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#2E9E5B')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/calculadora"
                  style={{
                    fontSize: '0.90rem',
                    color: '#2E9E5B',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  Calculadora IIM →
                </Link>
              </li>
            </ul>
          </div>

          {/* Real Contacts */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0B1924',
                marginBottom: '1.2rem'
              }}
            >
              Fale Conosco
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* WhatsApp */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.90rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2E9E5B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
              >
                <MessageCircle size={18} color="#2E9E5B" />
                <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#374151',
                  textDecoration: 'none',
                  fontSize: '0.90rem',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2E9E5B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#374151')}
              >
                <Mail size={18} color="#2E9E5B" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              {/* Phone info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#6B7280',
                  fontSize: '0.86rem'
                }}
              >
                <Phone size={18} color="#9CA3AF" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div>
            <h4
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#0B1924',
                marginBottom: '1.2rem'
              }}
            >
              Redes Sociais
            </h4>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Instagram */}
              <a
                href={COMPANY_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da UrbanFlow"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B1924',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2E9E5B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.color = '#0B1924';
                }}
              >
                <InstagramIcon size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href={COMPANY_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da UrbanFlow"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B1924',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2E9E5B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.color = '#0B1924';
                }}
              >
                <LinkedinIcon size={20} />
              </a>

              {/* WhatsApp direct */}
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp da UrbanFlow"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B1924',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#2E9E5B';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                  e.currentTarget.style.color = '#0B1924';
                }}
              >
                <MessageCircle size={20} />
              </a>
            </div>

            <p style={{ fontSize: '0.80rem', color: '#6B7280', lineHeight: 1.5 }}>
              Acompanhe novidades sobre mobilidade corporativa e People Analytics.
            </p>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div
          style={{
            borderTop: '1px solid #E5E7EB',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.2rem',
            fontSize: '0.82rem',
            color: '#6B7280'
          }}
        >
          <div>
            <span>Privacidade</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>© 2026 UrbanFlow Consultoria</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Projeto acadêmico · dados estimados e projetados.</span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#2E9E5B',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.82rem'
              }}
            >
              <span>Topo</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
