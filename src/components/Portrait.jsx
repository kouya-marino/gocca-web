import styles from './Portrait.module.css'

/**
 * A team photo, or — when there isn't one yet — a monogram tile rather than a
 * stock stand-in. The 2020 site filled these slots with template stock faces
 * that had nothing to do with the people named underneath them.
 */
export default function Portrait({ src, name }) {
  if (src) {
    return (
      <img className={styles.photo} src={src} alt={name} loading="lazy" width="420" height="540" />
    )
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <div className={styles.fallback} role="img" aria-label={`${name} — photo to follow`}>
      <span className={styles.initials}>{initials}</span>
    </div>
  )
}
