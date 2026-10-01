import React, { useState } from 'react';
import { CalculatorInputDTO, FullIimDiagnosis } from '../../../types/calculatorDTOs';
import { Printer, ShieldCheck, Database, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '../../../services/apiService';

interface ScoreHeroProps {
  result: FullIimDiagnosis;
  formData?: CalculatorInputDTO;
}

export const ScoreHero: React.FC<ScoreHeroProps> = ({ result, formData }) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [savedId, setSavedId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSaveDiagnosis = async () => {
    if (!formData) return;
    setSaveStatus('saving');
    setErrorMessage(null);

    const res = await apiService.salvarDiagnostico(formData, result);
    if (res.success && res.data) {
      setSaveStatus('saved');
      setSavedId(res.data.id);
    } else {
      setSaveStatus('error');
      setErrorMessage(res.error || 'Não foi possível salvar na API.');
    }
  };

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

        {/* FEEDBACK BANNER FOR API SAVE */}
        {saveStatus === 'saved' && (
          <div
            className="no-print"
            style={{
              marginTop: '1.25rem',
              background: 'rgba(46, 204, 138, 0.15)',
              border: '1px solid var(--accent)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.85rem'
            }}
          >
            <CheckCircle2 size={18} color="var(--accent)" />
            <span>
              Diagnóstico salvo com sucesso na base corporativa! Protocolo: <strong>#{savedId}</strong>
            </span>
          </div>
        )}

        {saveStatus === 'error' && (
          <div
            className="no-print"
            style={{
              marginTop: '1.25rem',
              background: 'rgba(204, 51, 51, 0.2)',
              border: '1px solid rgba(204, 51, 51, 0.5)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              color: '#FFB8B8',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.82rem',
              maxWidth: '90%'
            }}
          >
            <AlertCircle size={18} color="#FF6B6B" />
            <span>
              {errorMessage} (Inicie o backend com <code>uvicorn app.main:app --reload</code> na pasta <code>backend</code>)
            </span>
          </div>
        )}

        <div
          className="no-print"
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}
        >
          {formData && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveDiagnosis}
              disabled={saveStatus === 'saving' || saveStatus === 'saved'}
              style={{
                padding: '9px 20px',
                fontSize: '0.85rem',
                opacity: saveStatus === 'saved' ? 0.7 : 1
              }}
            >
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Salvando no Servidor...</span>
                </>
              ) : saveStatus === 'saved' ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Salvo na Base #{savedId}</span>
                </>
              ) : (
                <>
                  <Database size={16} />
                  <span>Salvar Diagnóstico na Base de Dados</span>
                </>
              )}
            </button>
          )}

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
