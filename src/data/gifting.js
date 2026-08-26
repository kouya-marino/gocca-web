/**
 * Corporate gifting page content.
 *
 * ⚠ ALL COPY ON THIS PAGE IS DRAFT. The 2020 site said nothing about gifting,
 * so unlike the rest of src/data/ there was no original wording to preserve —
 * every sentence here was written from the four categories the owner confirmed
 * (festival hampers, branded merchandise, employee gifting, client & partner
 * gifting) and nothing else.
 *
 * It deliberately states NO prices, minimum order quantities, lead times in
 * days, client names, order volumes or delivery coverage, because none of those
 * have been confirmed. README.md carries the full list of facts to fill in —
 * work through it before treating this page as final.
 *
 * To add product photography: drop files into src/assets/, import them at the
 * top of this file, and set the matching category's `image`. The slot crops to
 * 4:3, so supply at least 800x600. Until then each card shows an iconed tile.
 */

export const hero = {
  eyebrow: 'CORPORATE GIFTING',
  title: 'Four things we send for companies',
  lead:
    'Festival hampers, branded merchandise, employee gifting and client gifts. The brief is usually the same shape: a list of names, a date that will not move, and a budget to stay inside. Tell us which one you need.',
}

export const intro = {
  heading: 'What actually goes wrong',
  body:
    'Bulk orders rarely go wrong on the choice of gift. They go wrong on artwork approved too late, a stock shortfall nobody flagged, or an address list nobody checked against the headcount. Find yours in the four below and you will know in a minute whether we can take it; if your order sits across two of them, that is normal, and it is still one order.',
}

/** The four confirmed categories. `image: null` renders the icon fallback. */
export const categories = [
  {
    id: 'festival-hampers',
    name: 'Festival & occasion hampers',
    icon: 'gift',
    image: null,
    blurb:
      'Diwali, New Year, Raksha Bandhan, anniversaries. Long lists against one fixed date, where late is the same as not sent. We plan these backwards from the day they have to be in hand.',
    examples: [
      'Diwali hampers',
      'New Year gifts',
      'Raksha Bandhan sets',
      'Anniversary hampers',
      'Festive gift boxes',
    ],
  },
  {
    id: 'branded-merchandise',
    name: 'Branded merchandise',
    icon: 'merch',
    image: null,
    blurb:
      'Custom-logo apparel, drinkware, desk goods, tech accessories and stationery. Anything carrying your logo needs the artwork settled first, so the proof is agreed before anything reaches production.',
    examples: [
      'Logo apparel',
      'Branded drinkware',
      'Desk goods',
      'Tech accessories',
      'Custom stationery',
    ],
  },
  {
    id: 'employee-gifting',
    name: 'Employee gifting',
    icon: 'badge',
    image: null,
    blurb:
      'Welcome kits, work anniversaries, appreciation and rewards, farewell kits. This one repeats, so the specification and the artwork are worth settling once and running again rather than rebuilding.',
    examples: [
      'Onboarding kits',
      'Work anniversary gifts',
      'Milestone gifts',
      'Reward gifts',
      'Farewell kits',
    ],
  },
  {
    id: 'client-partner-gifting',
    name: 'Client & partner gifting',
    icon: 'partners',
    image: null,
    blurb:
      'Higher value, shorter lists, usually tied to a deal or a launch. Names are checked against the list you gave us, and the packaging is treated as part of the gift.',
    examples: [
      'Deal closing gifts',
      'Client Diwali gifts',
      'Launch gifts',
      'Curated sets',
      'Partner hampers',
    ],
  },
]

/** How an order runs, start to finish. */
export const process = [
  {
    title: 'The date',
    body:
      'Tell us the occasion, roughly how many people, the budget you are working to and the day it has to land. If that date is not workable for what you are asking, you hear it in this conversation, not a week before the event.',
  },
  {
    title: 'Options',
    body:
      'We come back with a shortlist that fits the budget rather than a catalogue to wade through. If something will not work at your quantity, we say so then.',
  },
  {
    title: 'Approval',
    body:
      'Branding goes onto a proof, and onto a sample where one is warranted, before it goes onto the order. A wrong shade of your logo is cheap to fix now and expensive to fix later.',
  },
  {
    title: 'Packing',
    body:
      'Hampers and kits are assembled and counted against the list you gave us. A short delivery should be found by us, not by you on the morning of the event.',
  },
  {
    title: 'Delivery',
    body:
      'One address or many. You are told when things dispatch, and you hear early if anything on the list looks like slipping.',
  },
]

export const why = [
  {
    title: 'Dates we have thought through',
    body:
      'A gifting date does not move, so we do not agree to one we have not worked back from. We would rather commit to a smaller list and deliver all of it.',
  },
  {
    title: 'Told early, not late',
    body:
      'If a supplier is short or an item has quietly changed, you hear it while there is still time to swap it — not on the day it was meant to arrive.',
  },
  {
    title: 'The same person throughout',
    body:
      'You are not handed from a sales contact to a dispatch contact halfway through. Whoever took the brief is who you ask where the order has got to.',
  },
  {
    title: 'Fewer items, better ones',
    body:
      'One thing people keep using beats five that go into a drawer. We will say when we think you are buying volume instead of a gift.',
  },
]

export const cta = {
  title: 'Tell us what you are sending',
  body:
    'Occasion, rough headcount, rough budget, and the date it has to be in hand. That is enough for us to come back with options and a price. If the date is too tight for what you have in mind, we will say that plainly rather than take the order and hope. If you are between two categories, say so — we will tell you which way it is easier to run.',
  buttonLabel: 'Start an enquiry',
}
