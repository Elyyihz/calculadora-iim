import React from 'react';
import { FullIimDiagnosis } from '../../../types/calculatorDTOs';
import { Printer, ShieldCheck } from 'lucide-react';

interface ScoreHeroProps {
  result: FullIimDiagnosis;
}

export const ScoreHero: React.FC<ScoreHeroProps> = ({ result }) => {
  return (
    <>
      {/* EXCLUSIVE PRINT/PDF HEADER (Hidden on screen, rendered in PDF/print) */}
      <div className="print-only-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={26} color="#0D2B1F" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: '#0D2B1F' }}>
              UrbanFlow <span style={{ fontWeight: 400 }}>Consultoria</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#5A7568', textTransform: 'uppercase' }}>
              Relatório Executivo de Diagnóstico — Índice de Impacto de Mobilidade (IIM v3.0)
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#5A7568' }}>
          <div>Data: {new Date().toLocaleDateString('pt-BR')}</div>
          <div>Uso Interno · Confidencial</div>
        </div>
      </div>

      {/* RESULT HERO CARD */}
      <div className="res-hero">
        {result.empresaNome && (
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.55)',
              fontSize: '0.85rem',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem',
              fontWeight: 500
            }}
          >
            Diagnóstico — {result.empresaNome}
          </div>
        )}

        <div className="iim-score-wrap">
          <div className="iim-label">Índice de Impacto de Mobilidade</div>
          <div className="iim-num">{result.iimRounded}</div>
        </div>

        <div>
          <span
            className="iim-class"
            style={{
              background: result.classBg,
              color: result.classColor
            }}
          >
            {result.classificacao}
          </span>
        </div>

        <p className="iim-context">{result.contexto}</p>

        <div className="no-print" style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => window.print()}
            style={{
              color: 'rgba(255, 255, 255, 0.85)',
              borderColor: 'rgba(255, 255, 255, 0.35)',
              padding: '9px 20px',
              fontSize: '0.85rem'
            }}
          >
            <Printer size={16} />
            <span>Gerar relatório para impressão / PDF</span>
          </button>
        </div>
      </div>
    </>
  );
};
