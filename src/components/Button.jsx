import { Link } from 'react-router-dom'
import styles from './Button.module.css'

/**
 * Renders a react-router <Link> when given `to`, a plain <a> when given `href`,
 * and a <button> otherwise — so every call site gets identical styling without
 * having to remember which element is correct.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...rest
}) {
  const cls = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`.trim()

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
