import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Phone, ArrowUp, Calculator } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../../data/institutionalData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: 'var(--brand)',
        color: '#FFFFFF',
        borderTop: '1px solid rgba(46, 158, 91, 0.2)',
        padding: '4.5rem 0 2.5rem',
        marginTop: '3rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem'
          }}
        >
          {/* COLUMN 1: BRAND */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.2rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--brand)'
                }}
              >
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: 'var(--accent)'
                }}
              >
                Urban<span style={{ color: '#fff', fontWeight: 400 }}>Flow</span>
              </span>
            </div>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              {COMPANY_INFO.description}
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(46, 158, 91, 0.1)',
                border: '1px solid rgba(46, 158, 91, 0.25)',
                fontSize: '0.75rem',
                color: 'var(--accent)',
                fontWeight: 600
              }}
            >
              <Calculator size={14} />
              <span>Proprietários do Índice IIM v3.0</span>
            </div>
          </div>

          {/* COLUMN 2: NAVEGAÇÃO INSTITUCIONAL */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.2rem',
                letterSpacing: '0.04em'
              }}
            >
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: '0.88rem',
                      color: 'rgba(255, 255, 255, 0.88)',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.88)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/calculadora"
                  style={{
                    fontSize: '0.88rem',
                    color: 'var(--accent)',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Calculadora IIM →
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: METODOLOGIA & SERVIÇOS */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.2rem',
                letterSpacing: '0.04em'
              }}
            >
              Consultoria & Diagnóstico
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Auditoria de Comutação Corporativa
              </li>
              <li style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Dimensionamento de Frotas e Escopo 3
              </li>
              <li style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Modelagem de Políticas Híbridas
              </li>
              <li style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Planos de Mobilidade Sustentável (PMS)
              </li>
              <li style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                Simulação Financeira & Economia de Custos
              </li>
            </ul>
          </div>

          {/* COLUMN 4: CONTACTOS */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.95rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.2rem',
                letterSpacing: '0.04em'
              }}
            >
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                  {COMPANY_INFO.address}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.88)' }}
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.88)' }}>
                  {COMPANY_INFO.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.82)'
          }}
        >
          <div>
            © {new Date().getFullYear()} UrbanFlow Consultoria. Todos os direitos reservados.
            <span style={{ marginLeft: '12px', opacity: 0.85 }}>
              Calculadora IIM v3.0 integrada.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span>Lisboa · Porto · Madrid</span>
            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--accent)',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <span>Voltar ao Topo</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
