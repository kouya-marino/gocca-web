import styles from './Logo.module.css'

/**
 * The Gocca mark, redrawn as inline SVG from the original raster logo so it
 * stays sharp at any size, has a transparent background, and takes its colour
 * from `currentColor` (which is what lets it invert in the footer).
 */
export function LogoMark({ size = 34, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="50" cy="50" r="38" />
      <path d="M50 12 A38 38 0 0 0 50 88" />
      <path d="M50 17 A33 33 0 0 0 50 83" />
      <path d="M50 22 A28 28 0 0 0 50 78" />
      <path d="M50 27 A23 23 0 0 0 31 66" />
      <path d="M50 27 V73" />
      <path d="M27 50 H88" />
    </svg>
  )
}

/** Mark plus wordmark, as used in the header and footer. */
export default function Logo({ showSub = true, size = 34 }) {
  return (
    <span className={styles.logo}>
      <LogoMark size={size} className={styles.mark} />
      <span className={styles.words}>
        <span className={styles.wordmark}>gocca</span>
        {showSub && <span className={styles.sub}>Global Services</span>}
      </span>
    </span>
  )
}
