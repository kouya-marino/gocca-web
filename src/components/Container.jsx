import styles from './Container.module.css'

/** Centred, gutter-aware content column. `width="narrow"` for prose. */
export default function Container({ width = 'default', className = '', children }) {
  return (
    <div className={`${styles.container} ${styles[width]} ${className}`.trim()}>
      {children}
    </div>
  )
}
