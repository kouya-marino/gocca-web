import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Client-side navigation keeps the old scroll position, which lands you
 * halfway down a page you have never seen. Reset on every route change, but
 * leave in-page #anchor links alone.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
