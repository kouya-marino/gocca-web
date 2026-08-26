/**
 * The 2020 site had four testimonial slots but only one filled in with real
 * words (Harish S.A.). The second is DRAFT, attributed to the name that was
 * already on the old page. Slots three and four were pure Lorem Ipsum and have
 * been dropped rather than invented.
 *
 * TODO: confirm both people are happy to be quoted by name before launch.
 */

export const mission = 'We hope to provide digital strategies for 200 brands worldwide.'

export const testimonials = [
  {
    id: 'harish',
    quote: 'Beautiful and excellent service! Very reliable team of members!',
    name: 'Harish S.A.',
    context: 'First user of Gocca',
  },
  {
    id: 'harshit',
    // DRAFT
    quote:
      'They took the time to understand how we actually work before suggesting anything. That is rarer than it should be.',
    name: 'Harshit Arora',
    context: 'Second user of Gocca',
  },
]
