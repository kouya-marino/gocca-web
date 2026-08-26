import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Container from './Container'
import Logo from './Logo'
import { nav } from '../data/site'
import styles from './Header.module.css'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef(null)
  const toggleRef = useRef(null)

  // Close the mobile menu whenever the route changes, otherwise it stays open
  // over the page you just navigated to.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Escape closes, and focus returns to the button that opened it.
  useEffect(() => {
    if (!open) return

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    function onPointerDown(event) {
      if (
        !panelRef.current?.contains(event.target) &&
        !toggleRef.current?.contains(event.target)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header className={styles.header}>
      <Container className={styles.bar}>
        <Link to="/" className={styles.brand} aria-label="Gocca Global Services — home">
          <Logo />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul className={styles.list}>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="visually-hidden">
            {open ? 'Close menu' : 'Open menu'}
          </span>
          <span className={open ? `${styles.burger} ${styles.x}` : styles.burger} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </Container>

      {/* The 2020 site shipped a hamburger button whose target markup had been
          deleted, so tapping it on a phone did nothing. This panel is that fix. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        className={open ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
        hidden={!open}
      >
        <Container>
          <nav aria-label="Primary, mobile">
            <ul className={styles.panelList}>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.panelLink} ${styles.active}`
                        : styles.panelLink
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  )
}
