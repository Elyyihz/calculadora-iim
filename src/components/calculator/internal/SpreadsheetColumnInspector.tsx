import React, { useState } from 'react';
import {
  Columns,
  Table,
  Sparkles,
  Search,
  Hash,
  Type,
  ToggleLeft
} from 'lucide-react';
import { ParsedSpreadsheetResult } from '../../../types/spreadsheet';

interface SpreadsheetColumnInspectorProps {
  result: ParsedSpreadsheetResult;
}

/**
 * Visual column inspector and data previewer for uploaded spreadsheets.
 *
 * Prepares the structural foundation for mapping spreadsheet columns into
 * the 36 dimensions of the UrbanFlow IIM survey.
 */
export const SpreadsheetColumnInspector: React.FC<SpreadsheetColumnInspectorProps> = ({ result }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'columns' | 'table'>('columns');

  const { headers, columnsSummary, previewRows, metadata } = result;

  const filteredColumns = columnsSummary.filter((col) =>
    col.header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'number':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              background: '#EFF6FF',
              color: '#1D4ED8',
              fontSize: '0.70rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px'
            }}
          >
            <Hash size={11} />
            Numérico
          </span>
        );
      case 'boolean':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              background: '#FDF2F8',
              color: '#BE185D',
              fontSize: '0.70rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px'
            }}
          >
            <ToggleLeft size={11} />
            Booleano
          </span>
        );
      default:
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              background: '#F3F4F6',
              color: '#374151',
              fontSize: '0.70rem',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '4px'
            }}
          >
            <Type size={11} />
            Texto
          </span>
        );
    }
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '1.8rem 1.6rem',
        marginTop: '1.5rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
      }}
    >
      {/* Top Bar with summary and view switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          paddingBottom: '1.2rem',
          borderBottom: '1px solid #F1F5F9'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#0B1924'
              }}
            >
              Estrutura de Colunas Detectada
            </span>
            <span
              style={{
                background: '#ECFDF5',
                color: '#15803D',
                border: '1px solid #A7F3D0',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                fontWeight: 700
              }}
            >
              {headers.length} colunas encontradas
            </span>
          </div>
          <div style={{ fontSize: '0.80rem', color: '#64748B', marginTop: '2px' }}>
            Planilha <strong>"{metadata.fileName}"</strong> ({metadata.totalRows} registros válidos de colaboradores)
          </div>
        </div>

        {/* View Switcher: Columns Grid vs Data Table */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              display: 'inline-flex',
              background: '#F1F5F9',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid #E2E8F0'
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode('columns')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: viewMode === 'columns' ? 700 : 500,
                color: viewMode === 'columns' ? '#0B1924' : '#64748B',
                background: viewMode === 'columns' ? '#FFFFFF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                boxShadow: viewMode === 'columns' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <Columns size={14} />
              <span>Colunas ({headers.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('table')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                fontWeight: viewMode === 'table' ? 700 : 500,
                color: viewMode === 'table' ? '#0B1924' : '#64748B',
                background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                boxShadow: viewMode === 'table' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <Table size={14} />
              <span>Prévia dos Dados ({previewRows.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAPPING READINESS BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
          border: '1px solid #A7F3D0',
          borderRadius: '12px',
          padding: '1.2rem 1.4rem',
          marginBottom: '1.6rem',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}
      >
        <Sparkles size={20} color="#15803D" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#166534', marginBottom: '3px' }}>
            Pronto para Mapeamento com as 36 Perguntas do Formulário IIM
          </div>
          <div style={{ fontSize: '0.82rem', color: '#15803D', lineHeight: 1.5 }}>
            As colunas acima foram lidas e indexadas com sucesso pelo parser. Na próxima etapa, você poderá associar cada coluna da sua planilha às métricas exatas das 4 dimensões (<strong>D1: Trajeto</strong>, <strong>D2: Estresse & Bem-Estar</strong>, <strong>D3: Produtividade</strong> e <strong>D4: Vulnerabilidade Urbana</strong>).
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: COLUMNS CARDS GRID */}
      {viewMode === 'columns' && (
        <div>
          {/* Search column input */}
          <div style={{ marginBottom: '1rem', position: 'relative', maxWidth: '320px' }}>
            <Search
              size={15}
              color="#94A3B8"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar coluna por nome..."
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1rem'
            }}
          >
            {filteredColumns.map((col) => (
              <div
                key={col.header}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'border-color 0.2s'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>
                      Coluna #{col.index + 1}
                    </span>
                    {getTypeBadge(col.detectedType)}
                  </div>

                  <div
                    style={{
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      color: '#0B1924',
                      wordBreak: 'break-word',
                      lineHeight: 1.3,
                      marginBottom: '8px'
                    }}
                  >
                    {col.header}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.70rem', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>
                    Amostras de valores:
                  </div>
                  <div
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      padding: '6px 8px',
                      fontSize: '0.74rem',
                      color: '#334155',
                      fontFamily: 'monospace',
                      maxHeight: '65px',
                      overflowY: 'auto'
                    }}
                  >
                    {col.sampleValues.length > 0 ? (
                      col.sampleValues.map((sample, sIdx) => (
                        <div
                          key={sIdx}
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          • {String(sample)}
                        </div>
                      ))
                    ) : (
                      <span style={{ color: '#94A3B8', fontStyle: 'italic' }}>Coluna vazia</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: DATA TABLE PREVIEW */}
      {viewMode === 'table' && (
        <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                <th style={{ padding: '8px 10px', color: '#64748B', fontWeight: 700, width: '40px' }}>#</th>
                {headers.map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 12px',
                      color: '#0B1924',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      borderLeft: '1px solid #F1F5F9'
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {previewRows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  style={{
                    background: rIdx % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    borderBottom: '1px solid #F1F5F9'
                  }}
                >
                  <td style={{ padding: '8px 10px', color: '#94A3B8', fontWeight: 600 }}>{rIdx + 1}</td>
                  {headers.map((h) => (
                    <td
                      key={h}
                      style={{
                        padding: '8px 12px',
                        color: '#334155',
                        whiteSpace: 'nowrap',
                        borderLeft: '1px solid #F1F5F9'
                      }}
                    >
                      {String(row[h] !== undefined && row[h] !== null ? row[h] : '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
