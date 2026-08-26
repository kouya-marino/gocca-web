/**
 * The three service glyphs, drawn inline so there is no icon-font dependency.
 * The 2020 site pulled in the whole of Font Awesome plus a second icon font
 * for what amounted to three pictures.
 */
const paths = {
  sliders: (
    <>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2.4" />
      <circle cx="10" cy="16" r="2.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M13 20V8M18 20v-9" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.4" />
      <circle cx="5" cy="18" r="2.4" />
      <circle cx="19" cy="18" r="2.4" />
      <path d="M12 7.4v4.2M12 11.6 6.4 16.2M12 11.6l5.6 4.6" />
    </>
  ),
  /* --- corporate gifting categories --- */
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" />
      <path d="M12 8v13" />
      <path d="M12 8C12 8 11 3.5 8.5 3.5A2.25 2.25 0 0 0 8.5 8Z" />
      <path d="M12 8C12 8 13 3.5 15.5 3.5A2.25 2.25 0 0 1 15.5 8Z" />
    </>
  ),
  merch: (
    <path d="M8.5 3 4.5 5.5l1.6 3.2L8.5 7.6V20.5h7V7.6l2.4 1.1 1.6-3.2L15.5 3a3.5 3.5 0 0 1-7 0Z" />
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M8.5 13.4 7 21l5-2.6 5 2.6-1.5-7.6" />
    </>
  ),
  partners: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.6a3 3 0 0 1 0 5.8" />
      <path d="M17.4 14.2A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
}

export default function Icon({ name, size = 24, className }) {
  const glyph = paths[name]
  if (!glyph) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  )
}
