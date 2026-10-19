import React, { useState, useMemo } from 'react';
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Activity,
  Filter
} from 'lucide-react';
import { EmployeeIndividualDiagnosis } from '../../../types/spreadsheet';
import { IndividualIimCalculator } from '../../../services/IndividualIimCalculator';

interface IndividualDiagnosisTableProps {
  diagnoses: EmployeeIndividualDiagnosis[];
  companyName: string;
}

/**
 * Interactive table displaying individual IIM calculations for 100% of employees.
 *
 * Provides risk filtering, search, pagination, individual dimensional breakdown,
 * and direct CSV export of all individual scores.
 */
export const IndividualDiagnosisTable: React.FC<IndividualDiagnosisTableProps> = ({
  diagnoses,
  companyName
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'critico' | 'alto' | 'moderado' | 'baixo'>('all');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Distribution metrics across 100% of respondents
  const summary = useMemo(() => {
    const total = diagnoses.length;
    if (total === 0) return null;

    const avgIim = Math.round(diagnoses.reduce((acc, d) => acc + d.iimScore, 0) / total);
    const criticos = diagnoses.filter((d) => d.iimScore > 80);
    const altos = diagnoses.filter((d) => d.iimScore > 60 && d.iimScore <= 80);
    const moderados = diagnoses.filter((d) => d.iimScore > 40 && d.iimScore <= 60);
    const baixos = diagnoses.filter((d) => d.iimScore <= 40);

    return {
      total,
      avgIim,
      criticosCount: criticos.length,
      altosCount: altos.length,
      moderadosCount: moderados.length,
      baixosCount: baixos.length,
      criticosPct: Math.round((criticos.length / total) * 100),
      altosPct: Math.round((altos.length / total) * 100),
      moderadosPct: Math.round((moderados.length / total) * 100),
      baixosPct: Math.round((baixos.length / total) * 100)
    };
  }, [diagnoses]);

  // Filtered dataset
  const filteredList = useMemo(() => {
    return diagnoses.filter((item) => {
      // Risk filter
      if (riskFilter !== 'all' && item.riskLevel !== riskFilter) {
        return false;
      }
      // Text search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesId = item.id.toLowerCase().includes(query);
        const matchesSetor = item.setor.toLowerCase().includes(query);
        const matchesCargo = item.cargo.toLowerCase().includes(query);
        const matchesModal = item.modal.toLowerCase().includes(query);
        return matchesId || matchesSetor || matchesCargo || matchesModal;
      }
      return true;
    });
  }, [diagnoses, riskFilter, searchTerm]);

  // Pagination
  const totalPages = pageSize === -1 ? 1 : Math.max(1, Math.ceil(filteredList.length / pageSize));
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedList = useMemo(() => {
    if (pageSize === -1) return filteredList;
    const start = (effectivePage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, effectivePage, pageSize]);

  const handleExportCsv = () => {
    IndividualIimCalculator.exportToCsv(diagnoses, companyName);
  };

  if (diagnoses.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '1.8rem 1.6rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        marginTop: '2rem'
      }}
    >
      {/* SECTION HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.2rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.2rem',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#15803D',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.3rem'
            }}
          >
            <Activity size={15} />
            <span>Processamento Individual Completo</span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0B1924',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>Diagnóstico Individual dos Colaboradores</span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#166534',
                background: '#DCFCE7',
                border: '1px solid #86EFAC',
                padding: '3px 10px',
                borderRadius: '999px'
              }}
            >
              100% dos Respondentes ({diagnoses.length} de {diagnoses.length})
            </span>
          </h3>
          <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '4px 0 0' }}>
            Cada linha da planilha importada teve suas 4 dimensões (D1 a D4) e pontuação de IIM calculadas individualmente.
          </p>
        </div>

        {/* Export Full CSV Action */}
        <button
          type="button"
          onClick={handleExportCsv}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: '#0B1924',
            color: '#FFFFFF',
            fontSize: '0.86rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
            boxShadow: '0 4px 14px rgba(11, 25, 36, 0.2)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1b3245')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#0B1924')}
        >
          <Download size={16} />
          <span>Exportar Planilha com IIM Individual (.csv)</span>
        </button>
      </div>

      {/* METRICS SUMMARY CARDS */}
      {summary && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.8rem'
          }}
        >
          {/* Card 1: Total processado */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1rem 1.2rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              Base Processada
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0B1924', margin: '4px 0 2px' }}>
              {summary.total} colabs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#15803D', fontWeight: 600 }}>
              100% da lista calculada
            </div>
          </div>

          {/* Card 2: Média IIM */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '1rem 1.2rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
              IIM Médio da Equipe
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2E9E5B', margin: '4px 0 2px' }}>
              {summary.avgIim} pts
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
              Média ponderada D1–D4
            </div>
          </div>

          {/* Card 3: Críticos / Alto Risco */}
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px',
              padding: '1rem 1.2rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase' }}>
              Alto Risco & Críticos
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#DC2626', margin: '4px 0 2px' }}>
              {summary.criticosCount + summary.altosCount} colabs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#B91C1C', fontWeight: 600 }}>
              {summary.criticosPct + summary.altosPct}% da equipe (IIM &gt; 60)
            </div>
          </div>

          {/* Card 4: Moderados */}
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: '12px',
              padding: '1rem 1.2rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#D97706', textTransform: 'uppercase' }}>
              Impacto Moderado
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#D97706', margin: '4px 0 2px' }}>
              {summary.moderadosCount} colabs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#B45309', fontWeight: 600 }}>
              {summary.moderadosPct}% da equipe (IIM 41–60)
            </div>
          </div>

          {/* Card 5: Baixo Impacto */}
          <div
            style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: '12px',
              padding: '1rem 1.2rem'
            }}
          >
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#16A34A', textTransform: 'uppercase' }}>
              Mobilidade Fluida
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16A34A', margin: '4px 0 2px' }}>
              {summary.baixosCount} colabs
            </div>
            <div style={{ fontSize: '0.76rem', color: '#15803D', fontWeight: 600 }}>
              {summary.baixosPct}% da equipe (IIM ≤ 40)
            </div>
          </div>
        </div>
      )}

      {/* CONTROLS: SEARCH + RISK FILTER + PAGE SIZE */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1rem'
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar por ID, setor, cargo..."
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.82rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Risk Level Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Filter size={13} />
            Filtro:
          </span>

          {[
            { key: 'all', label: `Todos (${diagnoses.length})` },
            { key: 'critico', label: 'Críticos (>80)' },
            { key: 'alto', label: 'Altos (61-80)' },
            { key: 'moderado', label: 'Moderados (41-60)' },
            { key: 'baixo', label: 'Baixo (≤40)' }
          ].map((f) => {
            const isActive = riskFilter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => {
                  setRiskFilter(f.key as any);
                  setCurrentPage(1);
                }}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid #0B1924' : '1px solid #E2E8F0',
                  background: isActive ? '#0B1924' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Page Size Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: 600 }}>Exibir:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              fontSize: '0.78rem',
              background: '#FFFFFF',
              color: '#334155'
            }}
          >
            <option value={15}>15 por página</option>
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
            <option value={-1}>Ver todos ({filteredList.length})</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div
        style={{
          overflowX: 'auto',
          border: '1px solid #E2E8F0',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.80rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1', color: '#475569' }}>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Colaborador</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Setor / Cargo</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Trajeto & Modal</th>
              <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>D1 Trajeto</th>
              <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>D2 Estresse</th>
              <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>D3 Pontualidade</th>
              <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>D4 Vulnerabilidade</th>
              <th style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>IIM Individual</th>
              <th style={{ padding: '10px 14px', fontWeight: 700 }}>Classificação</th>
            </tr>
          </thead>
          <tbody>
            {paginatedList.map((emp, idx) => {
              const rowNum = pageSize === -1 ? idx + 1 : (effectivePage - 1) * pageSize + idx + 1;
              return (
                <tr
                  key={emp.id}
                  style={{
                    background: idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    borderBottom: '1px solid #F1F5F9',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#F0FDF4')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#FAFAFA')}
                >
                  {/* ID */}
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#0B1924' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>#{rowNum}</span>
                      <span>{emp.id}</span>
                    </div>
                  </td>

                  {/* Setor / Cargo */}
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ fontWeight: 600, color: '#1F2937' }}>{emp.setor}</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>{emp.cargo}</div>
                  </td>

                  {/* Trajeto & Modal */}
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ fontWeight: 600, color: '#0B1924' }}>
                      {emp.tempoTrajetoMin} min / dia
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                      {emp.distanciaKm} km · {emp.modal}
                    </div>
                  </td>

                  {/* D1 */}
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: emp.d1Score > 70 ? '#DC2626' : emp.d1Score > 45 ? '#D97706' : '#16A34A'
                      }}
                    >
                      {emp.d1Score} pts
                    </span>
                  </td>

                  {/* D2 */}
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: emp.d2Score > 70 ? '#DC2626' : emp.d2Score > 45 ? '#D97706' : '#16A34A'
                      }}
                    >
                      {emp.d2Score} pts
                    </span>
                  </td>

                  {/* D3 */}
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: emp.d3Score > 70 ? '#DC2626' : emp.d3Score > 45 ? '#D97706' : '#16A34A'
                      }}
                    >
                      {emp.d3Score} pts
                    </span>
                  </td>

                  {/* D4 */}
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span
                      style={{
                        fontWeight: 700,
                        color: emp.d4Score > 70 ? '#DC2626' : emp.d4Score > 45 ? '#D97706' : '#16A34A'
                      }}
                    >
                      {emp.d4Score} pts
                    </span>
                  </td>

                  {/* IIM INDIVIDUAL */}
                  <td style={{ padding: '10px 14px', textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.94rem',
                        fontWeight: 800,
                        color: emp.iimScore > 80 ? '#DC2626' : emp.iimScore > 60 ? '#EA580C' : emp.iimScore > 40 ? '#D97706' : '#16A34A',
                        background: emp.iimScore > 80 ? '#FEE2E2' : emp.iimScore > 60 ? '#FFEDD5' : emp.iimScore > 40 ? '#FEF3C7' : '#DCFCE7',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        minWidth: '55px'
                      }}
                    >
                      {emp.iimScore}
                    </span>
                  </td>

                  {/* Classificação */}
                  <td style={{ padding: '10px 14px' }}>
                    <span
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: emp.iimScore > 80 ? '#DC2626' : emp.iimScore > 60 ? '#EA580C' : emp.iimScore > 40 ? '#D97706' : '#16A34A'
                      }}
                    >
                      {emp.classification}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION BAR */}
      {pageSize !== -1 && totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '1.2rem',
            paddingTop: '1rem',
            borderTop: '1px solid #F1F5F9',
            fontSize: '0.80rem',
            color: '#64748B'
          }}
        >
          <div>
            Exibindo página <strong>{effectivePage}</strong> de <strong>{totalPages}</strong> (
            <strong>{filteredList.length}</strong> colaboradores filtrados de <strong>{diagnoses.length}</strong> no total)
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              disabled={effectivePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: effectivePage <= 1 ? '#F8FAFC' : '#FFFFFF',
                color: effectivePage <= 1 ? '#94A3B8' : '#0B1924',
                cursor: effectivePage <= 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={14} />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              disabled={effectivePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                background: effectivePage >= totalPages ? '#F8FAFC' : '#FFFFFF',
                color: effectivePage >= totalPages ? '#94A3B8' : '#0B1924',
                cursor: effectivePage >= totalPages ? 'not-allowed' : 'pointer'
              }}
            >
              <span>Próxima</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
