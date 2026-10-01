import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { TEAM_MEMBERS } from '../../data/institutionalData';
import { GraduationCap } from 'lucide-react';

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.74s.78 1.74 1.74 1.74 1.74-.78 1.74-1.74-.78-1.74-1.74-1.74Z"/>
  </svg>
);

export const EquipaSection: React.FC = () => {
  return (
    <section id="a-equipa" className="section-padding" style={{ background: 'var(--surface-3)' }}>
      <div className="container">
        <SectionTitle
          eyebrow="A Equipa"
          title="Liderança multidisciplinar em"
          highlight="engenharia, economia e sustentabilidade"
          description="Os nossos consultores combinam rigor académico, experiência corporativa em multinacionais e profundo domínio das dinâmicas urbanas contemporâneas."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              style={{
                background: 'var(--surface)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              {/* MEMBER PHOTO */}
              <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(13,43,31,0.85) 0%, transparent 60%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '16px',
                    right: '16px'
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(46, 204, 138, 0.25)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--accent)',
                      border: '1px solid rgba(46, 204, 138, 0.4)',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      display: 'inline-block'
                    }}
                  >
                    {member.role}
                  </span>
                </div>
              </div>

              {/* MEMBER CONTENT */}
              <div
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: 'var(--brand)',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {member.name}
                  </h3>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      color: 'var(--brand-mid)',
                      fontWeight: 500,
                      marginBottom: '0.85rem'
                    }}
                  >
                    <GraduationCap size={15} color="var(--accent)" />
                    <span>{member.specialty}</span>
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '1.25rem'
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {/* SKILLS TAGS & FOOTER */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '1.2rem'
                    }}
                  >
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          background: 'var(--surface-3)',
                          color: 'var(--text-muted)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontWeight: 500
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--border)',
                      paddingTop: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-faint)' }}>
                      UrbanFlow Advisory
                    </span>
                    <a
                      href={member.linkedin || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Perfil LinkedIn de ${member.name}`}
                      style={{
                        color: 'var(--brand-mid)',
                        transition: 'color var(--transition-fast)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--brand-mid)')}
                    >
                      <LinkedInIcon />
                      <span>Conectar</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
