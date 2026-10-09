import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, NAV_ITEMS } from '../../data/institutionalData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : '#FFFFFF',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(11, 37, 69, 0.08)',
        transition: 'all 0.25s ease',
        padding: '1rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* LOGO: urbanflow (typography matching design) */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#133E28'
          }}
        >
          <span>urban</span>
          <span style={{ color: '#2E9E5B', fontWeight: 600 }}>flow</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.2rem'
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                color: '#4B5563',
                fontSize: '0.92rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
                padding: '4px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0B1924')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4B5563')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ACTIONS: "Vamos conversar ↗" linking to real WhatsApp */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }} className="header-actions">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vamos conversar via WhatsApp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 22px',
              fontSize: '0.90rem',
              fontWeight: 600,
              color: '#0B1924',
              border: '1px solid #0B1924',
              borderRadius: '8px',
              textDecoration: 'none',
              background: 'transparent',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            className="btn-header-conversar"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0B1924';
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#0B1924';
            }}
          >
            <span>Vamos conversar</span>
            <ArrowUpRight size={16} strokeWidth={2.2} />
          </a>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="mobile-toggle"
            style={{
              display: 'none',
              color: '#0B1924',
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(11, 37, 69, 0.05)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid rgba(11, 37, 69, 0.08)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '0.8rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
          }}
          className="mobile-drawer"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#1F2937',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '8px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '12px',
              background: '#0B1924',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none',
              marginTop: '0.5rem'
            }}
          >
            <span>Vamos conversar</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .header-actions .btn-header-conversar {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
