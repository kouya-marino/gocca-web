import Container from './Container'
import styles from './Section.module.css'

/**
 * A page band. `tone` picks the background; `title`/`lead` render a consistent
 * heading block so every section on the site is spaced identically.
 */
export default function Section({
  id,
  tone = 'default',
  title,
  /** Heading level for `title`. Each page passes "h1" on its lead section so
   *  every route has exactly one top-level heading. */
  titleAs: Title = 'h2',
  eyebrow,
  lead,
  align = 'start',
  width,
  className = '',
  children,
}) {
  const hasHeading = Boolean(eyebrow || title || lead)

  return (
    <section id={id} className={`${styles.section} ${styles[tone]} ${className}`.trim()}>
      <Container width={width}>
        {hasHeading && (
          <header className={`${styles.head} ${styles[align]}`}>
            {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
            {title && <Title className={styles.title}>{title}</Title>}
            {lead && <p className={styles.lead}>{lead}</p>}
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
