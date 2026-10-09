import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const NossaOrigemSection: React.FC = () => {
  return (
    <section
      id="nossa-origem"
      style={{
        background: '#FFFFFF',
        padding: '7rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="origem-grid"
        >
          {/* LEFT: Illustrative Card with Recife Coordinates & Skyline */}
          <div
            style={{
              background: '#EAF2EC',
              borderRadius: '20px',
              padding: '2.5rem 2.2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '440px',
              border: '1px solid #D5E2D9',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Top label */}
            <div
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#3B5848'
              }}
            >
              Do Recife. Para novos caminhos.
            </div>

            {/* City Skyline & Flow Curve SVG */}
            <div style={{ margin: '2rem 0', width: '100%' }}>
              <svg
                viewBox="0 0 360 220"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                fill="none"
              >
                {/* Baseline grid horizontal lines */}
                <line x1="10" y1="170" x2="350" y2="170" stroke="#CBD5CB" strokeWidth="1" />
                <line x1="10" y1="185" x2="350" y2="185" stroke="#CBD5CB" strokeWidth="1" />
                <line x1="10" y1="200" x2="350" y2="200" stroke="#CBD5CB" strokeWidth="1" />

                {/* Building 1 (Left) */}
                <rect x="35" y="110" width="38" height="60" stroke="#2D5A3F" strokeWidth="1.8" fill="none" />
                <line x1="45" y1="122" x2="63" y2="122" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="45" y1="134" x2="63" y2="134" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="45" y1="146" x2="63" y2="146" stroke="#2D5A3F" strokeWidth="1.5" />

                {/* Building 2 (Mid-Left tall) */}
                <rect x="88" y="90" width="36" height="80" stroke="#2D5A3F" strokeWidth="1.8" fill="none" />
                <line x1="97" y1="104" x2="115" y2="104" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="97" y1="118" x2="115" y2="118" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="97" y1="132" x2="115" y2="132" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="97" y1="146" x2="115" y2="146" stroke="#2D5A3F" strokeWidth="1.5" />

                {/* Bridge / Arch in the center */}
                <path d="M 115 170 C 130 140, 180 140, 205 170" stroke="#2D5A3F" strokeWidth="1.8" fill="none" />
                <line x1="145" y1="145" x2="145" y2="170" stroke="#2D5A3F" strokeWidth="1.2" />
                <line x1="175" y1="145" x2="175" y2="170" stroke="#2D5A3F" strokeWidth="1.2" />

                {/* Building 3 (Mid-Right tall) */}
                <rect x="200" y="80" width="40" height="90" stroke="#2D5A3F" strokeWidth="1.8" fill="none" />
                <line x1="210" y1="96" x2="230" y2="96" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="210" y1="112" x2="230" y2="112" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="210" y1="128" x2="230" y2="128" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="210" y1="144" x2="230" y2="144" stroke="#2D5A3F" strokeWidth="1.5" />

                {/* Building 4 (Far-Right) */}
                <rect x="278" y="115" width="44" height="55" stroke="#2D5A3F" strokeWidth="1.8" fill="none" />
                <line x1="290" y1="130" x2="310" y2="130" stroke="#2D5A3F" strokeWidth="1.5" />
                <line x1="290" y1="144" x2="310" y2="144" stroke="#2D5A3F" strokeWidth="1.5" />

                {/* Rising green trajectory flow curve */}
                <path
                  d="M 10 200 C 60 190, 80 145, 160 142 C 220 140, 260 70, 350 65"
                  stroke="#2E9E5B"
                  strokeWidth="2.5"
                  fill="none"
                />

                {/* Trajectory dots */}
                <circle cx="160" cy="142" r="5" fill="#2E9E5B" />
                <circle cx="282" cy="74" r="6" fill="#2E9E5B" />
              </svg>
            </div>

            {/* Bottom coordinates and city reference */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#4B6354',
                fontWeight: 600
              }}
            >
              <span>8°03′ S 34°52′ O</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                RECIFE, PERNAMBUCO
                <ArrowUpRight size={13} />
              </span>
            </div>
          </div>

          {/* RIGHT: Story and academic origins */}
          <div>
            {/* Eyebrow */}
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#3B5848',
                marginBottom: '1.2rem'
              }}
            >
              Nossa Origem
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.1rem, 4vw, 3.1rem)',
                fontWeight: 800,
                color: '#0B1924',
                lineHeight: 1.2,
                letterSpacing: '-0.025em',
                marginBottom: '1.8rem'
              }}
            >
              Olhar para a cidade.
              <br />
              Cuidar das pessoas.
              <br />
              Mover negócios.
            </h2>

            {/* Paragraph 1 */}
            <p
              style={{
                fontSize: '1.02rem',
                color: '#4B5563',
                lineHeight: 1.75,
                marginBottom: '1.4rem'
              }}
            >
              A UrbanFlow nasce da união entre People Analytics e mobilidade urbana, com foco em empresas de médio e grande porte da Região Metropolitana do Recife.
            </p>

            {/* Paragraph 2 */}
            <p
              style={{
                fontSize: '1.02rem',
                color: '#4B5563',
                lineHeight: 1.75,
                marginBottom: '2rem'
              }}
            >
              Um projeto construído por seis fundadores, a partir de um plano de negócios de Administração da UNINASSAU, para repensar a relação entre deslocamento e trabalho.
            </p>

            {/* Status bullet */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.84rem',
                color: '#4B5563',
                padding: '8px 14px',
                background: '#F3F4F6',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 500
              }}
            >
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2E9E5B' }} />
              <span>Empreendimento em desenvolvimento · operação projetada para 2027–2029</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
