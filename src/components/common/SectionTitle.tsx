import React from 'react';

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  darkTheme?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  darkTheme = false
}) => {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: align === 'center' ? '720px' : '640px',
        margin: align === 'center' ? '0 auto 3.5rem' : '0 0 2.5rem'
      }}
    >
      <div
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: 'var(--accent)',
          marginBottom: '0.8rem',
          display: 'inline-block'
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.85rem, 3.5vw, 2.6rem)',
          fontWeight: 800,
          lineHeight: 1.2,
          color: darkTheme ? '#FFFFFF' : 'var(--brand)',
          marginBottom: '1rem',
          letterSpacing: '-0.01em'
        }}
      >
        {title}{' '}
        {highlight && (
          <span style={{ color: 'var(--accent)', fontStyle: 'normal' }}>
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          style={{
            fontSize: '1.02rem',
            color: darkTheme ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-muted)',
            lineHeight: 1.65,
            fontWeight: 300
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
