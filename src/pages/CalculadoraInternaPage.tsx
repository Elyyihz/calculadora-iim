import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  FileSpreadsheet,
  Lock,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import { CalculatorWizard } from '../components/calculator/CalculatorWizard';
import { SpreadsheetImportPanel } from '../components/calculator/internal/SpreadsheetImportPanel';
import { CalculatorProvider } from '../context/CalculatorContext';
import { useInternalAuth } from '../context/InternalAuthContext';

/**
 * Private Workspace Page for UrbanFlow consultants.
 *
 * Hosts the comprehensive 36-question multidimensional IIM engine
 * and the bulk spreadsheet ingestion module for client employee responses.
 */
export const CalculadoraInternaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wizard' | 'spreadsheet'>('wizard');
  const { logout } = useInternalAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <CalculatorProvider>
      <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
        {/* INTERNAL WORKSPACE TOP BAR */}
        <header
          style={{
            background: '#0B1924',
            color: '#FFFFFF',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.9rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {/* Left: Brand & Restrict Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#FFFFFF'
                }}
              >
                <span>urban</span>
                <span style={{ color: '#2E9E5B', fontWeight: 600 }}>flow</span>
              </Link>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(46, 158, 91, 0.15)',
                  border: '1px solid rgba(46, 158, 91, 0.35)',
                  color: '#4ADE80',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                <Lock size={11} />
                <span>Uso Restrito · Equipe UrbanFlow</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem',
                  color: '#CBD5E1',
                  textDecoration: 'none'
                }}
              >
                <ArrowLeft size={14} />
                <span>Ir para Site Público</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#F87171',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </header>

        {/* WORKSPACE HERO / TAB SWITCHER */}
        <div
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            padding: '2.5rem 0 1.5rem'
          }}
        >
          <div className="container">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '1.8rem'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#2E9E5B'
                  }}
                >
                  Painel de Diagnóstico Corporativo
                </span>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
                    fontWeight: 800,
                    color: '#0B1924',
                    marginTop: '2px'
                  }}
                >
                  Calculadora IIM Completa (36 Perguntas)
                </h1>
              </div>

              {/* TABS SELECTOR */}
              <div
                style={{
                  display: 'inline-flex',
                  background: '#F1F5F9',
                  padding: '4px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('wizard')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: activeTab === 'wizard' ? 700 : 500,
                    color: activeTab === 'wizard' ? '#FFFFFF' : '#475569',
                    background: activeTab === 'wizard' ? '#0B1924' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <FileText size={16} />
                  <span>Questionário Passo a Passo (36 Perguntas)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('spreadsheet')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: activeTab === 'spreadsheet' ? 700 : 500,
                    color: activeTab === 'spreadsheet' ? '#FFFFFF' : '#475569',
                    background: activeTab === 'spreadsheet' ? '#2E9E5B' : 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <FileSpreadsheet size={16} />
                  <span>Alimentar via Planilha</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: FULL 36-QUESTION WIZARD */}
        {activeTab === 'wizard' && (
          <div className="container" style={{ marginTop: '2rem' }}>
            <CalculatorWizard />
          </div>
        )}

        {/* TAB 2: BULK SPREADSHEET INGESTION MODULE */}
        {activeTab === 'spreadsheet' && (
          <div className="container" style={{ marginTop: '2rem' }}>
            <SpreadsheetImportPanel onProcessed={() => setActiveTab('wizard')} />
          </div>
        )}
      </div>
    </CalculatorProvider>
  );
};
