import { Link } from 'react-router-dom'
import Container from './Container'
import Logo from './Logo'
import { nav, site } from '../data/site'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink} aria-label="Gocca Global Services — home">
              <Logo showSub={false} size={30} />
            </Link>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            <h2 className={styles.colTitle}>Site</h2>
            <ul className={styles.list}>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.list}>
              <li>
                <a href={`mailto:${site.email}`} className={styles.link}>
                  {site.email}
                </a>
              </li>
              {site.location && <li className={styles.plain}>{site.location}</li>}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} {site.legalName}
          </p>
          <p className={styles.plain}>Built to be easy to change.</p>
        </div>
      </Container>
    </footer>
  )
}
