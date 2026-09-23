/** Approved source facts and destinations. See docs/MIGRATION_AUDIT.md before changing. */
export const site = {
  name: 'Synaptyx Manual Therapy',
  legacyName: 'Total Tissue & Fitness',
  familyName: 'Synaptyx',
  sisterName: 'Synaptyx Health & Performance',
  location: 'Oakbrook Terrace, Illinois',
  address: '17W755 Butterfield Road, Oakbrook Terrace, IL 60181',
  phone: '+16303862639',
  phoneDisplay: '(630) 386-2639',
  partnerUrl: 'https://www.synaptyxperformance.com/',
  description:
    'Synaptyx Manual Therapy, formerly Total Tissue & Fitness and a sister company of Synaptyx Health & Performance: personalized manual therapy, movement education, and contrast therapy in Oakbrook Terrace, Illinois.',
  sourceChecked: '2026-09-22',
};
export const booking = {
  about: 'https://www.vagaro.com/totaltissueandfitness',
  staff: 'https://www.vagaro.com/totaltissueandfitness/staff',
  services: 'https://www.vagaro.com/totaltissueandfitness/services',
  giftCards: 'https://www.vagaro.com/totaltissueandfitness/gift-certificates',
  returning: 'https://www.vagaro.com/totaltissueandfitness/book-now',
  // Generated in the Synaptyx Manual Therapy Vagaro account on 2026-09-22.
  // Keep Vagaro's HTML unchanged; regenerate in Settings > Booking Widget after settings change.
  widgetHtml: `<div id='frameTitle' class='embedded-widget-title' style='font-size: 23px; color: #333;font-family:Arial, Helvetica, sans-serif; line-height:24px; padding: 18px 10px 8px; text-align: center; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;'></div>
<div class="vagaro" style="width:250px; padding:0; border:0; margin:0 auto; text-align:center;"><style>.vagaro a {font-size:14px; color:#AAA; text-decoration:none;}</style><a href="https://www.vagaro.com/pro/">Powered by Vagaro</a>&nbsp;<a href="https://www.vagaro.com/pro/salon-software">Salon Software</a>,&nbsp;<a href="https://www.vagaro.com/pro/spa-software">Spa Software</a>&nbsp;&amp;&nbsp;<a href="https://www.vagaro.com/pro/fitness-software">Fitness Software</a><script type="text/javascript" src="https://www.vagaro.com//resources/WidgetEmbeddedLoader/OZqpCJOoCJ8cT3qmV35y6JuSdBuOc1WJD1wOc1WO61CxdfkJE1wZCBOvifCs7fYJEPwMc9CxkPwOcXWS6Pg?v=WZlNhziXdeRwPWgmVoYCkP2jQfc46lm2qtXCZPZrvyi#"></script></div>`,
  workshop: 'https://calendly.com/contrast-therapy/contrast-therapy-clone',
  contrast: 'https://calendly.com/thayercfitness/total-tissue-session-clone',
  inquiry: '',
};
export const media = {
  logo: '/images/synaptyx/synaptyx-mark.webp',
  legacyLogo: '/images/optimized/total-tissue-logo.webp',
  favicon: '/images/synaptyx/favicon-64.png',
  appleIcon: '/images/synaptyx/apple-touch-icon.png',
  social: '/images/synaptyx/social-card.jpg',
  facility: '/images/optimized/recovery-space.webp',
  plunge: '/images/optimized/plunge.webp',
  sauna: '/images/optimized/sauna.webp',
  poster: '/images/6625ab15d06cde3819d95ae7_jb-total-background-video-poster-00001.jpg',
  overview: '/media/6625ab15d06cde3819d95ae7_jb-total-background-video-transcode.mp4',
  overviewWebm: '/media/6625ab15d06cde3819d95ae7_jb-total-background-video-transcode.webm',
  heroLoopMp4: '/media/optimized/hero-loop.mp4',
  heroLoopWebm: '/media/optimized/hero-loop.webm',
  mentorshipMp4: '/media/optimized/mentorship-session.mp4',
  mentorshipPoster:
    '/images/65f1cd38d5c13f0914954f48-67c9e6e9d3b1a49af9199e97_video-output-9470F004-2040-489A-81D3-A0D5D1757FB9-poster-00001.jpg',
  mentorshipWebm: '/media/optimized/mentorship-session.webm',
};
export const services = [
  {
    id: 'manual-therapy',
    number: '01',
    title: 'Manual Therapy',
    subtitle: 'Understand how you move.',
    description:
      'Individual assessment, hands-on soft tissue work, and movement education. An approach built around your body and your goals.',
    href: '/manual-therapy/',
    tags: ['Soft tissue work', 'Movement education'],
  },
  {
    id: 'contrast-therapy',
    number: '02',
    title: 'Contrast Therapy',
    subtitle: 'Make space for recovery.',
    description:
      'Cold plunge, hot plunge, and infrared sauna in our Oakbrook Terrace recovery space. A dedicated hour to complement your tissue work.',
    href: '/contrast-therapy/',
    tags: ['Cold plunge', 'Hot plunge', 'Infrared sauna'],
  },
  {
    id: 'mentorship',
    number: '03',
    title: 'Practitioner Mentorship',
    subtitle: 'Take your practice further.',
    description:
      'Practical education in soft tissue techniques, biomechanics, and recovery protocols for therapists and fitness professionals.',
    href: '/mentorship-program/',
    tags: ['Practitioner education', 'Applied techniques'],
  },
];
export const faqs = [
  {
    question: 'Is this the same practice as Total Tissue & Fitness?',
    answer:
      'Yes. Total Tissue & Fitness is now Synaptyx Manual Therapy, a separate sister company within the Synaptyx family alongside Synaptyx Health & Performance. The manual therapy, contrast therapy, and mentorship services described here continue under the new name.',
  },
  {
    question: 'Where are you located?',
    answer: `Appointments are at ${site.address}. Check your Vagaro confirmation for visit details.`,
  },
  {
    question: 'What happens at my first visit?',
    answer:
      'The first-session listing in Vagaro asks new clients to schedule a call first. Follow its contact instructions, then book the first session in Vagaro with Josh or Casey after the call.',
  },
  {
    question: 'How do returning clients book?',
    answer:
      'Use the live Vagaro booking widget on this site to choose a service, Josh or Casey where available, and an appointment time.',
  },
  {
    question: 'How often should I schedule a session?',
    answer:
      'Session frequency is individualized. Discuss your goals, activity, health history, and response to previous sessions with your practitioner to agree on a schedule.',
  },
  {
    question: 'Is contrast therapy included?',
    answer:
      'The current service description includes one hour of contrast therapy with tissue work, using a cold plunge, hot tub, and infrared sauna. Confirm the details of your selected appointment with the team.',
  },
  {
    question: 'Can I discuss a specific condition?',
    answer:
      'Yes. Share your questions directly with the practitioner during your consultation. They can discuss whether the services fit your needs and how they relate to your existing care plan.',
  },
];
