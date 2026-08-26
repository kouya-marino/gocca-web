import { site } from '../data/site'
import styles from './FormEmbed.module.css'

/**
 * An embedded Google Form, with a graceful fallback for before one is
 * connected. Used by both /work-with-us and /corporate-gifting, which point at
 * two different forms — see `googleFormEmbedUrl` and `giftingFormEmbedUrl` in
 * src/data/site.js.
 *
 * The fallback matters: an unconfigured iframe renders as a blank grey box that
 * looks like a bug, so until a URL exists the page shows the email address
 * instead and the site stays deployable.
 */
export default function FormEmbed({
  url,
  height = 1200,
  title,
  fallbackTitle = 'The form is not connected yet',
  fallbackBody = 'Until it is, email us directly and we will pick it up the same way.',
  configKey,
}) {
  if (url) {
    return (
      <div className={styles.wrap}>
        <iframe className={styles.frame} src={url} height={height} title={title} loading="lazy">
          Loading…
        </iframe>
      </div>
    )
  }

  return (
    <div className={styles.fallback}>
      <h3 className={styles.fallbackTitle}>{fallbackTitle}</h3>
      <p className={styles.fallbackBody}>{fallbackBody}</p>
      <a className={styles.mailto} href={`mailto:${site.email}`}>
        {site.email}
      </a>
      {/* Dev-build only. This is an instruction to the site owner, not something a
          prospective client should read at the site's main conversion point. Vite
          sets import.meta.env.DEV false for `vite build`, so it is stripped from
          the deployed bundle while `npm run dev` still shows it. */}
      {configKey && import.meta.env.DEV && (
        <p className={styles.devNote}>
          <strong>Site owner:</strong> paste your Google Form embed URL into{' '}
          <code>{configKey}</code> in <code>src/data/site.js</code> and this block is replaced
          by the form. See the README for where to find that URL.
        </p>
      )}
    </div>
  )
}
