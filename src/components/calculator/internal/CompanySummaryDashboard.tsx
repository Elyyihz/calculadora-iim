import React from 'react';
import {
  Building2,
  DollarSign,
  Printer,
  Compass,
  Zap,
  ArrowRight,
  Target
} from 'lucide-react';
import { CompanyExecutiveSummary } from '../../../types/spreadsheet';

interface CompanySummaryDashboardProps {
  summary: CompanyExecutiveSummary;
  onFilterByRiskGroup?: (riskKey: 'baixo' | 'moderado' | 'alto' | 'critico' | 'all') => void;
  selectedRiskFilter?: string;
}

/**
 * Executive Company Dashboard (Relatório da Empresa).
 *
 * Consolidates the full spreadsheet dataset into:
 * 1. Overall Company Average IIM and dimensional scores (D1-D4).
 * 2. Employee distribution across the 4 risk tiers (Baixo, Moderado, Alto, Crítico).
 * 3. Recommended global interventions with implementation playbooks and projected impact.
 */
export const CompanySummaryDashboard: React.FC<CompanySummaryDashboardProps> = ({
  summary,
  onFilterByRiskGroup,
  selectedRiskFilter = 'all'
}) => {
  const {
    companyName,
    totalEmployees,
    avgIimScore,
    classification,
    classColor,
    classBg,
    dimensionalAverages,
    riskGroups,
    globalInterventions,
    keyInsights,
    monthlyFinancialLossEstimate
  } = summary;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '20px',
        padding: '2.5rem 2.2rem',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
        marginBottom: '2.5rem'
      }}
      className="company-summary-dashboard"
    >
      {/* 1. TOP HEADER WITH COMPANY IDENTITY & ACTIONS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '1.8rem',
          borderBottom: '1px solid #E5E7EB',
          marginBottom: '2rem'
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
              color: '#2E9E5B',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.4rem'
            }}
          >
            <Building2 size={15} />
            <span>Relatório Consolidado da Empresa · UrbanFlow</span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 800,
              color: '#0B1924',
              lineHeight: 1.2
            }}
          >
            Dashboard Executivo: {companyName}
          </h2>

          <div style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '4px' }}>
            Diagnóstico consolidado a partir de <strong>100% dos respondentes</strong> ({totalEmployees} colaboradores avaliados).
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrint}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '10px',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1',
            color: '#1E293B',
            fontSize: '0.86rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#E2E8F0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#F1F5F9')}
        >
          <Printer size={16} />
          <span>Imprimir / Salvar PDF</span>
        </button>
      </div>

      {/* 2. OVERALL COMPANY AVERAGE IIM & DIMENSIONAL RADAR SUMMARY */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem',
          alignItems: 'stretch'
        }}
      >
        {/* Left Card: Company Average IIM Hero */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0B1924 0%, #132E42 100%)',
            color: '#FFFFFF',
            borderRadius: '18px',
            padding: '2.2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 12px 30px rgba(11, 25, 36, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#6EE7B7'
              }}
            >
              Média Geral da Empresa
            </span>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', margin: '0.8rem 0 0.6rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 6vw, 4.2rem)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#FFFFFF',
                  letterSpacing: '-0.03em'
                }}
              >
                {avgIimScore}
              </div>
              <span style={{ fontSize: '1.2rem', color: '#94A3B8', fontWeight: 600 }}>/ 100 pts</span>
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: classBg,
                color: classColor,
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontWeight: 800,
                marginBottom: '1.2rem'
              }}
            >
              <span>{classification}</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
              O Índice de Impacto de Mobilidade da organização reflete a intensidade de atrito no deslocamento da força de trabalho, sintetizando desgaste físico, perda de horas, absenteísmo e vulnerabilidade financeira.
            </p>
          </div>

          {/* Financial Loss Callout */}
          <div
            style={{
              marginTop: '1.6rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(239, 68, 68, 0.18)',
                color: '#F87171',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <DollarSign size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 600 }}>
                Impacto Financeiro Estimado
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FCA5A5' }}>
                R$ {monthlyFinancialLossEstimate.toLocaleString('pt-BR')} / mês
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>
                Perda em atrasos, horas no trânsito e risco de rotatividade
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: The 4 Dimensions Consolidation */}
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '18px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0B1924', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Médias Dimensionais da Empresa (D1 a D4)
              </span>
              <span style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
                Pesos Oficiais do IIM
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {/* D1 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#0B1924' }}>D1 · Trajeto & Comutação (30%)</span>
                  <span style={{ fontWeight: 800, color: dimensionalAverages.d1 > 70 ? '#DC2626' : dimensionalAverages.d1 > 45 ? '#D97706' : '#16A34A' }}>
                    {dimensionalAverages.d1} pts
                  </span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${dimensionalAverages.d1}%`,
                      background: dimensionalAverages.d1 > 70 ? '#DC2626' : dimensionalAverages.d1 > 45 ? '#D97706' : '#16A34A',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                  Tempo de comutação, distâncias percorridas e quantidade de baldeações.
                </div>
              </div>

              {/* D2 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#0B1924' }}>D2 · Estresse & Bem-Estar (27%)</span>
                  <span style={{ fontWeight: 800, color: dimensionalAverages.d2 > 70 ? '#DC2626' : dimensionalAverages.d2 > 45 ? '#D97706' : '#16A34A' }}>
                    {dimensionalAverages.d2} pts
                  </span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${dimensionalAverages.d2}%`,
                      background: dimensionalAverages.d2 > 70 ? '#DC2626' : dimensionalAverages.d2 > 45 ? '#D97706' : '#16A34A',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                  Cansaço crônico relatado, qualidade do sono e impacto psicológico no trânsito.
                </div>
              </div>

              {/* D3 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#0B1924' }}>D3 · Assiduidade & Retenção (25%)</span>
                  <span style={{ fontWeight: 800, color: dimensionalAverages.d3 > 70 ? '#DC2626' : dimensionalAverages.d3 > 45 ? '#D97706' : '#16A34A' }}>
                    {dimensionalAverages.d3} pts
                  </span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${dimensionalAverages.d3}%`,
                      background: dimensionalAverages.d3 > 70 ? '#DC2626' : dimensionalAverages.d3 > 45 ? '#D97706' : '#16A34A',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                  Atrasos frequentes, absenteísmo e propensão declarada a pedir demissão.
                </div>
              </div>

              {/* D4 */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: '#0B1924' }}>D4 · Vulnerabilidade & Custo (18%)</span>
                  <span style={{ fontWeight: 800, color: dimensionalAverages.d4 > 70 ? '#DC2626' : dimensionalAverages.d4 > 45 ? '#D97706' : '#16A34A' }}>
                    {dimensionalAverages.d4} pts
                  </span>
                </div>
                <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${dimensionalAverages.d4}%`,
                      background: dimensionalAverages.d4 > 70 ? '#DC2626' : dimensionalAverages.d4 > 45 ? '#D97706' : '#16A34A',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: '2px' }}>
                  Comprometimento da renda familiar com transporte e sensação de insegurança.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GROUPING EMPLOYEES BY RISK TIERS (BAIXO, MÉDIO, ALTO, CRÍTICO) */}
      <div style={{ marginBottom: '2.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0B1924',
                margin: 0
              }}
            >
              Distribuição da Equipe por Faixas de Risco
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '3px 0 0' }}>
              Agrupamento dos {totalEmployees} colaboradores com base no limiar de estresse e risco de ruptura.
            </p>
          </div>

          <span style={{ fontSize: '0.76rem', color: '#64748B', fontStyle: 'italic' }}>
            Clique em uma faixa para filtrar os funcionários na tabela abaixo
          </span>
        </div>

        {/* Continuous Horizontal Ratio Bar */}
        <div
          style={{
            height: '14px',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div style={{ width: `${riskGroups.baixo.percentage}%`, background: '#16A34A' }} title={`Baixo Risco: ${riskGroups.baixo.percentage}%`} />
          <div style={{ width: `${riskGroups.moderado.percentage}%`, background: '#D97706' }} title={`Médio Risco: ${riskGroups.moderado.percentage}%`} />
          <div style={{ width: `${riskGroups.alto.percentage}%`, background: '#EA580C' }} title={`Alto Risco: ${riskGroups.alto.percentage}%`} />
          <div style={{ width: `${riskGroups.critico.percentage}%`, background: '#DC2626' }} title={`Risco Crítico: ${riskGroups.critico.percentage}%`} />
        </div>

        {/* 4 Risk Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.2rem'
          }}
        >
          {/* Group 1: Baixo Risco */}
          <div
            onClick={() => onFilterByRiskGroup && onFilterByRiskGroup(selectedRiskFilter === 'baixo' ? 'all' : 'baixo')}
            style={{
              background: '#F0FDF4',
              border: selectedRiskFilter === 'baixo' ? '2px solid #16A34A' : '1px solid #BBF7D0',
              borderRadius: '14px',
              padding: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedRiskFilter === 'baixo' ? '0 6px 18px rgba(22, 163, 74, 0.18)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                Baixo Risco
              </span>
              <span style={{ fontSize: '0.72rem', color: '#15803D', fontWeight: 700, background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px' }}>
                0–40 pts
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#15803D', fontFamily: 'var(--font-display)' }}>
                {riskGroups.baixo.count}
              </span>
              <span style={{ fontSize: '0.88rem', color: '#166534', fontWeight: 700 }}>
                colabs ({riskGroups.baixo.percentage}%)
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#166534', lineHeight: 1.5, marginBottom: '10px' }}>
              {riskGroups.baixo.summary}
            </div>

            <div style={{ borderTop: '1px dashed #86EFAC', paddingTop: '8px', fontSize: '0.72rem', color: '#15803D' }}>
              <strong>Recomendação:</strong> {riskGroups.baixo.recommendation}
            </div>
          </div>

          {/* Group 2: Médio / Moderado */}
          <div
            onClick={() => onFilterByRiskGroup && onFilterByRiskGroup(selectedRiskFilter === 'moderado' ? 'all' : 'moderado')}
            style={{
              background: '#FFFBEB',
              border: selectedRiskFilter === 'moderado' ? '2px solid #D97706' : '1px solid #FDE68A',
              borderRadius: '14px',
              padding: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedRiskFilter === 'moderado' ? '0 6px 18px rgba(217, 119, 6, 0.18)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>
                Impacto Moderado
              </span>
              <span style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700, background: '#FEF3C7', padding: '2px 8px', borderRadius: '4px' }}>
                41–60 pts
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#B45309', fontFamily: 'var(--font-display)' }}>
                {riskGroups.moderado.count}
              </span>
              <span style={{ fontSize: '0.88rem', color: '#B45309', fontWeight: 700 }}>
                colabs ({riskGroups.moderado.percentage}%)
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#92400E', lineHeight: 1.5, marginBottom: '10px' }}>
              {riskGroups.moderado.summary}
            </div>

            <div style={{ borderTop: '1px dashed #FCD34D', paddingTop: '8px', fontSize: '0.72rem', color: '#92400E' }}>
              <strong>Recomendação:</strong> {riskGroups.moderado.recommendation}
            </div>
          </div>

          {/* Group 3: Alto Risco */}
          <div
            onClick={() => onFilterByRiskGroup && onFilterByRiskGroup(selectedRiskFilter === 'alto' ? 'all' : 'alto')}
            style={{
              background: '#FFF7ED',
              border: selectedRiskFilter === 'alto' ? '2px solid #EA580C' : '1px solid #FDBA74',
              borderRadius: '14px',
              padding: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedRiskFilter === 'alto' ? '0 6px 18px rgba(234, 88, 12, 0.18)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C2410C', textTransform: 'uppercase' }}>
                Alto Risco
              </span>
              <span style={{ fontSize: '0.72rem', color: '#C2410C', fontWeight: 700, background: '#FFEDD5', padding: '2px 8px', borderRadius: '4px' }}>
                61–80 pts
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#C2410C', fontFamily: 'var(--font-display)' }}>
                {riskGroups.alto.count}
              </span>
              <span style={{ fontSize: '0.88rem', color: '#C2410C', fontWeight: 700 }}>
                colabs ({riskGroups.alto.percentage}%)
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#9A3412', lineHeight: 1.5, marginBottom: '10px' }}>
              {riskGroups.alto.summary}
            </div>

            <div style={{ borderTop: '1px dashed #FDBA74', paddingTop: '8px', fontSize: '0.72rem', color: '#9A3412' }}>
              <strong>Recomendação:</strong> {riskGroups.alto.recommendation}
            </div>
          </div>

          {/* Group 4: Risco Crítico */}
          <div
            onClick={() => onFilterByRiskGroup && onFilterByRiskGroup(selectedRiskFilter === 'critico' ? 'all' : 'critico')}
            style={{
              background: '#FEF2F2',
              border: selectedRiskFilter === 'critico' ? '2px solid #DC2626' : '1px solid #FCA5A5',
              borderRadius: '14px',
              padding: '1.4rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: selectedRiskFilter === 'critico' ? '0 6px 18px rgba(220, 38, 38, 0.18)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#B91C1C', textTransform: 'uppercase' }}>
                Risco Crítico
              </span>
              <span style={{ fontSize: '0.72rem', color: '#B91C1C', fontWeight: 700, background: '#FEE2E2', padding: '2px 8px', borderRadius: '4px' }}>
                81–100 pts
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 900, color: '#B91C1C', fontFamily: 'var(--font-display)' }}>
                {riskGroups.critico.count}
              </span>
              <span style={{ fontSize: '0.88rem', color: '#B91C1C', fontWeight: 700 }}>
                colabs ({riskGroups.critico.percentage}%)
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#991B1B', lineHeight: 1.5, marginBottom: '10px' }}>
              {riskGroups.critico.summary}
            </div>

            <div style={{ borderTop: '1px dashed #F87171', paddingTop: '8px', fontSize: '0.72rem', color: '#991B1B' }}>
              <strong>Recomendação:</strong> {riskGroups.critico.recommendation}
            </div>
          </div>
        </div>
      </div>

      {/* 4. EXECUTIVE KEY INSIGHTS BANNER */}
      {keyInsights.length > 0 && (
        <div
          style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.4rem 1.6rem',
            marginBottom: '2.8rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
            <Compass size={18} color="#0B1924" />
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0B1924', margin: 0 }}>
              Síntese Executiva de Mobilidade Corporativa
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.8rem' }}>
            {keyInsights.map((insight, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '0.82rem',
                  color: '#334155',
                  lineHeight: 1.5
                }}
              >
                <span style={{ color: '#2E9E5B', fontWeight: 700 }}>•</span>
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SUGGESTED GLOBAL INTERVENTIONS FOR THE COMPANY */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.76rem',
                fontWeight: 700,
                color: '#2E9E5B',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.2rem'
              }}
            >
              <Zap size={14} />
              <span>Plano de Ação Estratégico</span>
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0B1924',
                margin: 0
              }}
            >
              Melhores Intervenções Globais Recomendadas
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '3px 0 0' }}>
              Ações de alto impacto calibradas especificamente para resolver os principais gargalos identificados na planilha.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {globalInterventions.map((inv, idx) => (
            <div
              key={inv.id}
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.5rem 1.6rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Header of intervention */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span
                      style={{
                        background: '#0B1924',
                        color: '#FFFFFF',
                        fontSize: '0.70rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        textTransform: 'uppercase'
                      }}
                    >
                      Prioridade {inv.priority}
                    </span>

                    <span
                      style={{
                        background: '#F1F5F9',
                        color: '#475569',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}
                    >
                      {inv.category}
                    </span>

                    <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                      Esforço: <strong>{inv.effort}</strong> · Prazo: <strong>{inv.timeframe}</strong>
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B1924', margin: 0 }}>
                    {idx + 1}. {inv.title}
                  </h4>
                </div>

                {/* Reduction Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.70rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                      Redução Projetada
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#2E9E5B' }}>
                      -{inv.iimReductionProjected} pts no IIM
                    </div>
                  </div>

                  {inv.monthlySavingsProjected > 0 && (
                    <div style={{ textAlign: 'right', borderLeft: '1px solid #E2E8F0', paddingLeft: '12px' }}>
                      <div style={{ fontSize: '0.70rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
                        Economia Estimada
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B1924' }}>
                        ~R$ {inv.monthlySavingsProjected.toLocaleString('pt-BR')}/mês
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {inv.description}
              </p>

              {/* Target workforce callout */}
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '0.78rem',
                  color: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Target size={14} color="#2E9E5B" />
                <span>
                  <strong>Público-alvo prioritário:</strong> {inv.targetGroupLabel}
                </span>
              </div>

              {/* Implementation steps */}
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Passo a passo sugerido de implementação:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {inv.actionSteps.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'baseline', gap: '6px', fontSize: '0.80rem', color: '#334155' }}>
                      <ArrowRight size={11} color="#2E9E5B" style={{ flexShrink: 0 }} />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
