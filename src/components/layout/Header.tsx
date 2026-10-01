import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Calculator, ShieldCheck } from 'lucide-react';
import { NAV_ITEMS } from '../../data/institutionalData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
        background: scrolled ? 'rgba(13, 43, 31, 0.96)' : 'var(--brand)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(46, 204, 138, 0.15)',
        transition: 'all 0.3s ease',
        padding: '0.9rem 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* LOGO */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent) 0%, #1A4A35 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand)',
              boxShadow: '0 2px 10px rgba(46, 204, 138, 0.3)'
            }}
          >
            <ShieldCheck size={22} color="var(--brand)" strokeWidth={2.5} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                color: 'var(--accent)',
                letterSpacing: '0.04em',
                lineHeight: 1
              }}
            >
              Urban<span style={{ color: '#FFFFFF', fontWeight: 400 }}>Flow</span>
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                color: 'var(--text-faint)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginTop: '2px'
              }}
            >
              Consultoria Estratégica
            </div>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.8rem'
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => {
            const isCalculadora = item.href === '/calculadora';
            return (
              <a
                key={item.label}
                href={item.href}
                style={{
                  color: isCalculadora ? 'var(--accent)' : 'rgba(255, 255, 255, 0.82)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  padding: '6px 0'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = isCalculadora ? 'var(--accent)' : 'rgba(255, 255, 255, 0.82)')
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* ACTIONS (CTA TO CALCULATOR ROUTE) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="header-actions">
          <Link
            to="/calculadora"
            className="btn btn-primary"
            style={{
              padding: '9px 18px',
              fontSize: '0.85rem'
            }}
          >
            <Calculator size={16} />
            <span>Calculadora IIM</span>
            <ArrowUpRight size={15} />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="mobile-toggle"
            style={{
              display: 'none',
              color: '#FFFFFF',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.08)'
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
            background: 'var(--brand)',
            borderTop: '1px solid rgba(46, 204, 138, 0.15)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginTop: '0.8rem'
          }}
          className="mobile-drawer"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#FFFFFF',
                fontSize: '1.05rem',
                fontWeight: 500,
                padding: '8px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {item.label}
            </a>
          ))}
          <Link
            to="/calculadora"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{
              marginTop: '0.5rem',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Calculator size={18} />
            <span>Acessar Calculadora IIM</span>
            <ArrowUpRight size={16} />
          </Link>
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
          .header-actions .btn {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
