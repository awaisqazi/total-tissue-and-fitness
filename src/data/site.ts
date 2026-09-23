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
// `image` is a root-relative public path; render it through withBase. Card images are decorative.
export const services = [
  {
    id: 'manual-therapy',
    number: '01',
    title: 'Manual Therapy',
    subtitle: 'Understand how you move.',
    description:
      'Individual assessment, hands-on soft tissue work, and movement education. An approach built around your body and your goals.',
    href: '/manual-therapy/',
    image: media.facility,
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
    image: media.sauna,
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
    image: media.mentorshipPoster,
    tags: ['Practitioner education', 'Applied techniques'],
  },
];
export const faqs = [
  {
    question: 'Is this the same practice as Total Tissue & Fitness?',
    answer:
      'Yes. Total Tissue & Fitness is now Synaptyx Manual Therapy, a separate sister company within the Synaptyx family alongside Synaptyx Health & Performance. The manual therapy, contrast therapy, and mentorship you know continue under the new name.',
  },
  {
    question: 'Where are you located?',
    answer: `You’ll find us at ${site.address}. Your Vagaro confirmation has everything you need for your visit.`,
  },
  {
    question: 'What happens at my first visit?',
    answer:
      'It starts with a quick call. The first-session listing in Vagaro tells you how to reach the team, and once you’ve talked, you can book your first session with Josh or Casey.',
  },
  {
    question: 'How do returning clients book?',
    answer:
      'Head to the booking page, pick your service and a time with Josh or Casey, and you’re set.',
  },
  {
    question: 'How often should I schedule a session?',
    answer:
      'That depends on you. Your practitioner will talk through your goals, activity, health history, and how you’ve responded so far, and you’ll work out a rhythm together.',
  },
  {
    question: 'Is contrast therapy included?',
    answer:
      'Right now, the tissue-work listing includes an hour of contrast therapy with the cold plunge, hot tub, and infrared sauna. Double-check what’s included in your appointment with the team when you book.',
  },
  {
    question: 'Can I discuss a specific condition?',
    answer:
      'Absolutely. Bring your questions to your practitioner. They’ll talk through whether our services are a good fit for you and how they sit alongside any care you’re already receiving.',
  },
];
