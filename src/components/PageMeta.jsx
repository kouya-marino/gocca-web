import { useEffect } from 'react'

/**
 * Keeps <title>, the meta description and the canonical URL in step with the
 * current route. React 19 hoists <title>/<meta> rendered in components, but
 * doing it here keeps the logic in one place and lets us update the existing
 * canonical tag rather than adding a duplicate.
 */
export default function PageMeta({ title, description, path = '' }) {
  useEffect(() => {
    const full = title
      ? `${title} — Gocca Global Services`
      : 'Gocca Global Services — The one stop portal for all your needs'
    document.title = full

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `https://www.gocca.in${path}`)
  }, [title, description, path])

  return null
}
