/**
 * Site-wide constants. Everything a non-developer might reasonably want to
 * change lives in this folder rather than inside components.
 *
 * Any value marked `// DRAFT` was written to fill a gap the 2020 site left as
 * Lorem Ipsum. Review the full list in README.md before going live.
 */

export const site = {
  name: 'Gocca',
  legalName: 'Gocca Global Services',
  tagline: 'The one stop portal for all your needs',
  strapline: 'Intuitive, Inclusive and Innovative',
  url: 'https://www.gocca.in',

  // TODO: confirm the public contact address before launch. The 2020 site used
  // a personal Gmail account, which is not a good look on a business domain.
  email: 'hello@gocca.in',

  // TODO: the 2020 site listed "Uttharakhant, Ahimsakhant, Indirapuram", which
  // reads like leftover placeholder text. Replace with the real address or drop
  // the `location` field entirely — the footer and contact page both handle it
  // being absent.
  location: 'Indirapuram, Ghaziabad, Uttar Pradesh, India',

  /**
   * Two separate Google Forms, because the two audiences need different fields.
   * Paste the *embed* URL of each; leave one null and its page shows a friendly
   * fallback with the email address instead of a broken iframe.
   *
   * To get an embed URL: open the form → Send → the < > (embed) tab → copy the
   * value of the src="..." attribute only. It looks like:
   *   https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true
   */

  /** Careers / general enquiry form, shown on /work-with-us. */
  googleFormEmbedUrl: null,
  googleFormHeight: 1200,

  /** Corporate gifting enquiry form, shown on /corporate-gifting. */
  giftingFormEmbedUrl: null,
  giftingFormHeight: 1400,
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Corporate Gifting', to: '/corporate-gifting' },
  { label: 'Team', to: '/team' },
  { label: 'Work With Us', to: '/work-with-us' },
]
