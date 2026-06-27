import type { CSSProperties, ReactNode } from 'react';

/** Вспомогательные обёртки для оформления витрины. Не часть uikit. */

export const Row = ({
  children,
  align = 'center',
  wrap = true,
  gap = 12,
  style,
}: {
  children: ReactNode;
  align?: CSSProperties['alignItems'];
  wrap?: boolean;
  gap?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems: align,
      gap,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Col = ({
  children,
  gap = 16,
  style,
}: {
  children: ReactNode;
  gap?: number;
  style?: CSSProperties;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, ...style }}>
    {children}
  </div>
);

export const Section = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
}) => (
  <section style={{ marginBottom: 32 }}>
    {title && (
      <h3
        style={{
          margin: '0 0 4px',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h3>
    )}
    {description && (
      <p style={{ margin: '0 0 16px', fontSize: 13, color: 'var(--text-secondary)' }}>
        {description}
      </p>
    )}
    {children}
  </section>
);
