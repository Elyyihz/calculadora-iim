import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        padding: '8rem 1.5rem',
        textAlign: 'center',
        background: 'var(--surface-2)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--surface-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <Compass size={36} color="var(--accent)" />
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          fontWeight: 800,
          color: 'var(--brand)',
          marginBottom: '0.5rem'
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--brand-mid)',
          marginBottom: '1rem'
        }}
      >
        Página não encontrada
      </h2>

      <p
        style={{
          color: 'var(--text-muted)',
          maxWidth: '480px',
          marginBottom: '2rem',
          lineHeight: 1.6
        }}
      >
        O endereço que procurou não existe ou foi transferido. Pode retornar ao site institucional
        ou experimentar a nossa calculadora.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Voltar ao Início</span>
        </Link>
        <Link to="/calculadora" className="btn btn-ghost">
          <span>Calculadora IIM</span>
        </Link>
      </div>
    </div>
  );
};
