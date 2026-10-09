import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useInternalAuth } from '../context/InternalAuthContext';

/**
 * Login view for UrbanFlow consultants and internal analysts.
 *
 * Enforces security gates prior to rendering the comprehensive 36-question
 * multidimensional calculator and batch spreadsheet ingestion interface.
 */
export const InternalLoginPage: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useInternalAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/interno/calculadora', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Por favor, informe a chave de acesso da equipe.');
      return;
    }

    const success = login(passcode);
    if (success) {
      setError(null);
      const origin = (location.state as { from?: string })?.from || '/interno/calculadora';
      navigate(origin, { replace: true });
    } else {
      setError('Chave de acesso incorreta. Verifique suas credenciais internas.');
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        background: '#F9FAFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.05)',
          padding: '2.8rem 2.2rem'
        }}
      >
        {/* Top Back Link */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            color: '#6B7280',
            textDecoration: 'none',
            marginBottom: '2rem'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#0B1924')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft size={15} />
          <span>Voltar ao site público</span>
        </Link>

        {/* Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.2rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: '#0B1924',
              color: '#2E9E5B',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <Lock size={24} />
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#0B1924',
              marginBottom: '0.4rem'
            }}
          >
            Área Restrita UrbanFlow
          </h1>
          <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.5 }}>
            Acesso exclusivo para consultores e analistas da UrbanFlow.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '0.84rem',
              color: '#B91C1C',
              marginBottom: '1.5rem'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="passcode"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#374151',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '0.5rem'
              }}
            >
              Chave de Acesso Institucional
            </label>
            <input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Digite a chave da equipe"
              autoFocus
              style={{
                width: '100%',
                padding: '13px 16px',
                borderRadius: '10px',
                border: '1px solid #D1D5DB',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#2E9E5B')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#D1D5DB')}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '14px',
              background: '#0B1924',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#1A3347')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0B1924')}
          >
            <span>Entrar no Workspace</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Security badge footer */}
        <div
          style={{
            marginTop: '2rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid #F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: '#9CA3AF'
          }}
        >
          <ShieldCheck size={14} color="#2E9E5B" />
          <span>Ambiente seguro com conformidade LGPD</span>
        </div>
      </div>
    </div>
  );
};
