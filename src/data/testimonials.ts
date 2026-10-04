/**
 * Client testimonials gathered from the practice's own Instagram account on 2026-10-03
 * (see docs/INSTAGRAM_TESTIMONIALS_2026-10-03.md, kept out of the public repo). Wording is
 * verbatim apart from trimming with an ellipsis; attribution is the public handle or the
 * channel the message arrived on, never a full name. Quotes that name a medical condition,
 * a minor, or a specific clinical outcome are deliberately left out pending practitioner
 * review (ADR-016).
 */
export const instagramUrl = 'https://www.instagram.com/synaptyx.manual.therapy/';

/** Honest count the account supports: 112 written testimonial items, about 102 people. */
export const testimonialTally = '100+';

export type FeaturedTestimonial = {
  quote: string;
  /** Public Instagram handle (without @) or a channel description for anonymous messages. */
  handle?: string;
  channel: 'Instagram comment' | 'Instagram post' | 'Client message';
  year: number;
};

export const featuredTestimonials: FeaturedTestimonial[] = [
  {
    quote:
      'Life changing is an understatement. Forever grateful that your work has allowed me to continue to do what I love.',
    handle: 'ambartsch',
    channel: 'Instagram comment',
    year: 2026,
  },
  {
    quote:
      'Best first experience with Josh. Precise, professional, knowledgeable and ahead of the curve!',
    handle: 'delilah_v_matos',
    channel: 'Instagram comment',
    year: 2024,
  },
  {
    quote:
      'Not only is he good at what he does but the knowledge he has is absolutely ridiculous, it was worth every penny.',
    handle: 'joeywb89',
    channel: 'Instagram comment',
    year: 2022,
  },
  {
    quote: 'I could literally breathe better after every session!',
    handle: 'katyflex',
    channel: 'Instagram comment',
    year: 2022,
  },
  {
    quote:
      'Grateful to have finally found someone who can work on my body in the ways it needs after putting it through so much with sports, training and injuries throughout the years!',
    handle: 'acostaandriana',
    channel: 'Instagram post',
    year: 2023,
  },
];

/**
 * Short fragments for the ambient "wall" behind the section. `**bold**` marks the phrase
 * to emphasise. Decorative only: the wall is aria-hidden and the featured quotes carry the
 * content.
 */
export const testimonialWall: string[] = [
  '**Life changing** is an understatement',
  'Precise, professional, **ahead of the curve**',
  'It was **worth every penny**',
  'I could literally **breathe better** after every session',
  'The knowledge he has is **absolutely ridiculous**',
  '**You actually care** and take your time. And educate',
  'Body feels **brand new**',
  "Feelin' like **a million bucks** after last session",
  'The strength increase compared to last week is **astonishing**',
  'Great session today. **Always learning** from you',
  'The progress **speaks for itself**',
  '**Recovery and maintenance** is key',
  "Make an appointment. It's **SO worth it**",
  'They give you **homework** to keep the results going strong',
  'You are **truly an expert** in your field',
  'Unlocked many doors that were **stubborn to get open**',
  '**Highly recommend** you schedule with him',
  "It's crazy how your instincts are **so accurate**",
  'I feel **much better**',
  'You are **absolutely amazing** at what you do',
  "Can't wait to **get back in there**",
  'Super impressed with **your work**',
  "He's **the best in the area**, explaining things and giving you stretches to do at home",
  'Glad our **paths have crossed**',
];
