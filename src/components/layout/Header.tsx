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
      <div className="container header-container">
        {/* LOGO: urbanflow (typography matching design) */}
        <Link
          to="/"
          className="header-logo"
        >
          <span>urban</span>
          <span style={{ color: '#2E9E5B', fontWeight: 600 }}>flow</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ACTIONS: "Vamos conversar ↗" linking to real WhatsApp */}
        <div className="header-actions">
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vamos conversar via WhatsApp"
            className="btn-header-conversar"
          >
            <span className="btn-full-text">Vamos conversar</span>
            <span className="btn-short-text">Conversar</span>
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </a>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-drawer-link"
            >
              {item.label}
            </a>
          ))}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer-cta"
          >
            <span>Vamos conversar</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      <style>{`
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }

        .header-logo {
          display: inline-flex;
          align-items: baseline;
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #133E28;
          flex-shrink: 0;
          white-space: nowrap;
          z-index: 2;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 2.2rem;
        }

        .nav-link {
          color: #4B5563;
          font-size: 0.92rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
          padding: 4px 0;
        }

        .nav-link:hover {
          color: #0B1924;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }

        .btn-header-conversar {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 22px;
          font-size: 0.90rem;
          font-weight: 600;
          color: #0B1924;
          border: 1px solid #0B1924;
          border-radius: 8px;
          text-decoration: none;
          background: transparent;
          transition: all 0.2s ease;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .btn-header-conversar:hover {
          background: #0B1924;
          color: #FFFFFF;
        }

        .btn-header-conversar .btn-short-text {
          display: none;
        }

        .btn-header-conversar .btn-full-text {
          display: inline;
        }

        .mobile-toggle {
          display: none;
          color: #0B1924;
          padding: 8px;
          border-radius: 8px;
          background: rgba(11, 37, 69, 0.05);
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .mobile-drawer {
          background: #FFFFFF;
          border-top: 1px solid rgba(11, 37, 69, 0.08);
          padding: 1.5rem;
          display: flex;
          flexDirection: column;
          gap: 1rem;
          margin-top: 0.8rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        }

        .mobile-drawer-link {
          color: #1F2937;
          font-size: 1rem;
          font-weight: 500;
          padding: 8px 0;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .mobile-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          background: #0B1924;
          color: #FFFFFF;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          margin-top: 0.5rem;
        }

        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .header-logo {
            font-size: 1.35rem !important;
          }
          .header-actions {
            gap: 10px !important;
          }
          .btn-header-conversar {
            padding: 7px 14px !important;
            font-size: 0.82rem !important;
          }
          .btn-header-conversar .btn-full-text {
            display: none !important;
          }
          .btn-header-conversar .btn-short-text {
            display: inline !important;
          }
        }

        @media (max-width: 520px) {
          /* Em telas de celular (<= 520px), remove o botão duplicado do topo para
             garantir espaço total e ZERO sobreposição com a marca urbanflow.
             O botão de contato fica com destaque máximo no menu drawer (hambúrguer)! */
          .btn-header-conversar {
            display: none !important;
          }
          .header-logo {
            font-size: 1.25rem !important;
          }
          .header-actions {
            gap: 6px !important;
          }
        }
      `}</style>
    </header>
  );
};
