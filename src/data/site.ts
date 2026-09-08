/** Approved source facts and destinations. See docs/MIGRATION-AUDIT.md before changing. */
export const site = {
  name: 'Total Tissue & Fitness',
  legacyName: 'Total Tissue & Fitness',
  location: 'Oswego, Illinois',
  partnerUrl: 'https://www.synaptyxperformance.com/',
  description:
    'Personalized manual therapy, movement education, and contrast therapy in Oswego, Illinois. Hands-on recovery and movement education.',
  sourceChecked: '2026-09-08',
};
export const booking = {
  services: 'https://www.vagaro.com/totaltissueandfitness/services',
  returning: 'https://www.vagaro.com/totaltissueandfitness/book-now',
  workshop: 'https://calendly.com/contrast-therapy/contrast-therapy-clone',
  contrast: 'https://calendly.com/thayercfitness/total-tissue-session-clone',
  inquiry: '',
  janeUrl: '', // Do not infer. Set only after the business supplies and verifies it.
  transitionDate: '2026-11-01',
};
export const media = {
  logo: '/images/optimized/total-tissue-logo.webp',
  favicon: '/images/660ca351a18d35e961252c4a_jb-total--icon-32.png',
  social: '/images/66269de21a2f67537f7148ac_JB-FINAL-webflow.jpg',
  facility: '/images/optimized/recovery-space.webp',
  plunge: '/images/optimized/plunge.webp',
  sauna: '/images/optimized/sauna.webp',
  poster: '/images/6625ab15d06cde3819d95ae7_jb-total-background-video-poster-00001.jpg',
  overview: '/media/6625ab15d06cde3819d95ae7_jb-total-background-video-transcode.mp4',
};
export const services = [
  {
    id: 'manual-therapy',
    number: '01',
    title: 'Manual therapy',
    subtitle: 'Understand how you move.',
    description:
      'Individual assessment, hands-on soft tissue work, and movement education. An approach built around your body and your goals.',
    href: '/manual-therapy/',
    tags: ['Soft tissue work', 'Movement education'],
  },
  {
    id: 'contrast-therapy',
    number: '02',
    title: 'Contrast therapy',
    subtitle: 'Make space for recovery.',
    description:
      'Cold plunge, hot plunge, and infrared sauna in our Oswego recovery space. A dedicated hour to complement your tissue work.',
    href: '/contrast-therapy/',
    tags: ['Cold plunge', 'Hot plunge', 'Infrared sauna'],
  },
  {
    id: 'mentorship',
    number: '03',
    title: 'Practitioner mentorship',
    subtitle: 'Take your practice further.',
    description:
      'Practical education in soft tissue techniques, biomechanics, and recovery protocols for therapists and fitness professionals.',
    href: '/mentorship-program/',
    tags: ['Practitioner education', 'Applied techniques'],
  },
];
export const faqs = [
  {
    question: 'Where are you located?',
    answer:
      'Our manual therapy and contrast therapy services are based in Oswego, Illinois. Ask the team for arrival details when arranging your appointment. Synaptyx Health & Performance’s Oakbrook Terrace location is a separate location.',
  },
  {
    question: 'What happens at my first visit?',
    answer:
      'Start with a free educational session to discuss the approach and your goals. New client appointments are manually scheduled by the team using Jane after that conversation.',
  },
  {
    question: 'How do returning clients book?',
    answer:
      'Use the returning-client booking link. The current announcement says existing clients will transition to Jane beginning November 1, 2026. Follow the instructions provided by the team as your account transitions.',
  },
  {
    question: 'How often should I schedule a session?',
    answer:
      'Session frequency is individualized. Discuss your goals, activity, health history, and response to previous sessions with your practitioner to agree on a schedule.',
  },
  {
    question: 'Is contrast therapy included?',
    answer:
      'The Total Tissue & Fitness service description includes one hour of contrast therapy with tissue work, using a cold plunge, hot tub, and infrared sauna. Confirm the details of your selected appointment with the team.',
  },
  {
    question: 'Can I discuss a specific condition?',
    answer:
      'Yes. Share your questions directly with the practitioner during your consultation. They can discuss whether the services fit your needs and how they relate to your existing care plan.',
  },
];
