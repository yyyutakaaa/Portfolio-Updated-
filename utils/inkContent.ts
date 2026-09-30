/**
 * Every word on the sumi-e site, in both languages.
 *
 * Kept apart from `translations.ts` because that file belongs to the previous
 * shell and is shaped around it. The copy itself is the same copy — the
 * profile text, the project descriptions and the stacks are carried over from
 * the old site rather than rewritten, trimmed to the one-liners this layout
 * asks for.
 */

export interface WorkItem {
  /** Reads as a plate number on a scroll, so it stays two digits. */
  index: string;
  title: string;
  stack: string;
  description: string;
  /** Internal route, or an external repository. */
  href: string;
  external: boolean;
  /** Omitted where there is no screenshot to show yet. */
  image?: { src: string; srcSet: string; alt: string; ratio?: string };
  cta: string;
  /** A second destination, e.g. the live site next to the repository. Omitted for most projects. */
  secondaryHref?: string;
  secondaryCta?: string;
  secondaryExternal?: boolean;
}

export interface ContactFormCopy {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  required: string;
  invalidEmail: string;
}

export interface InkCopy {
  nav: { about: string; work: string; resume: string; contact: string; home: string };
  hero: {
    eyebrow: string;
    ledeHead: string;
    ledeEm: string;
    ledeTail: string;
    location: string;
    status: string;
    scroll: string;
  };
  about: {
    label: string;
    heading: string;
    body: string[];
    facts: { key: string; value: string }[];
    portraitAlt: string;
    portraitPending: string;
  };
  work: { label: string; heading: string; items: WorkItem[] };
  contact: {
    label: string;
    heading: string;
    line: string;
    /** Above the large email address, for anyone who would rather not fill in a form. */
    direct: string;
    /** Header of the letter the form is set as. */
    letterTo: string;
    localTime: string;
    formTitle: string;
    infoTitle: string;
    socialTitle: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    location: string;
    availability: string;
    availableText: string;
    responseTime: string;
    email: string;
    phone: string;
    socials: { label: string; href: string }[];
    form: ContactFormCopy;
  };
  footer: { name: string; place: string };
}

const SETS_IMAGE = {
  src: '/sets/preview-1400.webp',
  srcSet: '/sets/preview-800.webp 800w, /sets/preview-1400.webp 1400w',
  /* Wider than the other plates — its own screenshot is a 1731×909 banner,
     not a 16:10 crop — so it gets its own ratio rather than losing its edges
     to `object-fit: cover` inside a box built for something narrower. */
  ratio: '1731 / 909',
};

const MUTED_IMAGE = {
  src: '/muted-screenshot-1400.webp',
  srcSet: '/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w',
};

const SPOOFER_IMAGE = {
  src: '/visibility-spoofer-720.webp',
  srcSet: '/visibility-spoofer-480.webp 480w, /visibility-spoofer-720.webp 720w',
  /* The extension's own popup — a tall, narrow panel, not a browser window —
     so it keeps its native shape rather than being cropped into a landscape
     box built for a screenshot. */
  ratio: '318 / 358',
};

const FUELTRACKER_IMAGE = {
  src: '/fueltracker-1400.webp',
  srcSet: '/fueltracker-800.webp 800w, /fueltracker-1400.webp 1400w',
};

const SHUTITDOWN_IMAGE = {
  src: '/shutdown-server-1000.webp',
  srcSet: '/shutdown-server-700.webp 700w, /shutdown-server-1000.webp 1000w',
  /* Cropped tight to the window itself — its corners are rounded, so cropping
     any looser than this lets the desktop wallpaper behind it bleed back in
     at the edges. That native shape is wider than the other plates' 16:10,
     so it gets its own ratio rather than being cropped again to fit. */
  ratio: '582 / 383',
};

export const EMAIL = 'mehdi.ouladkhlie@outlook.be';

export const PHONE = '+32 468 54 94 78';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
  { label: 'GitHub', href: 'https://github.com/yyyutakaaa' },
  { label: 'Instagram', href: 'https://www.instagram.com/y.yutaka.a/' },
];

export const inkContent: Record<'en' | 'nl', InkCopy> = {
  en: {
    nav: { about: 'About', work: 'Work', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie, home' },
    hero: {
      eyebrow: 'System and network administrator',
      ledeHead: "If it's doing its job, you never ",
      ledeEm: 'notice',
      ledeTail: ' it.',
      location: 'Evergem, BE',
      status: 'Open to opportunities',
      scroll: 'Scroll down',
    },
    about: {
      label: 'About',
      heading: 'I feel most at home in a Windows environment.',
      body: [
        "I'm doing a degree in System and Network Administration, and I already know where I want to end up: as a sysadmin.",
        "I've watched enough PCs and networks break down, and fixed just as many, a driver that gives up, a network fault that makes zero sense until you dig into it. Alongside my studies I'm working toward my CCNA and picking up Microsoft courses to build on that.",
      ],
      facts: [
        { key: 'Studying', value: 'Associate Degree, System & Network Administration' },
        { key: 'Focus', value: 'Windows Server · Active Directory · networking' },
        { key: 'Certified', value: 'Microsoft 365 Fundamentals (MS-900)' },
        { key: 'Working on', value: 'CCNA Routing & Switching' },
      ],
      portraitAlt: 'Mehdi Oulad Khlie',
      portraitPending: 'Portrait',
    },
    work: {
      label: 'Some of my work',
      heading: 'Things I made because I wanted them around.',
      items: [
        {
          index: '01',
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: "Built for logging your training after the fact, not mid-set. Whatever you type saves to your phone instantly, then syncs to the cloud by itself.",
          href: '#/projects/sets',
          external: false,
          image: { ...SETS_IMAGE, alt: 'The Sets workout app on a phone' },
          cta: 'Read the write-up',
        },
        {
          index: '02',
          title: 'Muted',
          stack: 'Windows app · C# .NET 9',
          description: "My microphone kept catching the sound of my PC fan, so I built a fix. RNNoise cleans up the noise locally, before your voice ever reaches Discord.",
          href: '#/projects/muted',
          external: false,
          image: { ...MUTED_IMAGE, alt: 'The Muted desktop app showing its noise filter and voice gate' },
          cta: 'Read the write-up',
        },
        {
          index: '03',
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome extension',
          description: "Tricks the Page Visibility API into reporting a tab as open and focused even while it sits in the background, including iframes that load in afterward.",
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          image: { ...SPOOFER_IMAGE, alt: 'The Visibility Spoofer extension popup, spoofing active' },
          cta: 'See it on GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: "Calculates what a drive costs in fuel and how much CO₂ it produces. Start typing an address and the suggestions pop up right away.",
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          image: { ...FUELTRACKER_IMAGE, alt: 'The FuelTracker site planning a route between two addresses' },
          cta: 'See it on GitHub',
          secondaryHref: 'https://fueltracker.mehdioul.dev/',
          secondaryCta: 'Visit the site',
          secondaryExternal: true,
        },
        {
          index: '05',
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: "Lets you shut your PC down remotely from a web page. Locked behind a PIN, and otherwise it just sits quietly in the system tray.",
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          image: { ...SHUTITDOWN_IMAGE, alt: 'The ShutItDown app showing the server running and its shutdown link' },
          cta: 'See it on GitHub',
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: 'Reach out.',
      line: 'Have a question, or just feel like chatting? Fill in the letter below, or contact me directly through one of the channels next to it.',
      direct: 'Prefer to skip the form?',
      letterTo: 'To',
      localTime: 'Evergem, now',
      formTitle: 'A letter',
      infoTitle: 'Contact details',
      socialTitle: 'Elsewhere',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      location: 'Evergem, Belgium',
      availability: 'Availability',
      availableText: 'Currently available',
      responseTime: "I'll usually reply within a day or two.",
      email: EMAIL,
      phone: PHONE,
      socials: SOCIALS,
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        subject: 'Subject',
        subjectPlaceholder: "What's this about?",
        message: 'Message',
        messagePlaceholder: 'Write your message here…',
        send: 'Seal and send',
        sending: 'Sending…',
        success: "It's sent. I'll get back to you soon.",
        error: `Something went wrong there. Try again, or just email me directly at ${EMAIL}`,
        required: "This field can't stay empty",
        invalidEmail: 'Enter a valid email address',
      },
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },

  nl: {
    nav: { about: 'Over mij', work: 'Werk', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie, home' },
    hero: {
      eyebrow: 'Systeem- en netwerkbeheerder',
      ledeHead: 'Werkt het zoals het moet, dan merk je er ',
      ledeEm: 'niks',
      ledeTail: ' van.',
      location: 'Evergem, BE',
      status: 'Op zoek naar werk',
      scroll: 'Scroll verder',
    },
    about: {
      label: 'Over mij',
      heading: 'In een Windows-omgeving voel ik me het meest thuis.',
      body: [
        'Ik zit in de opleiding Systeem- en Netwerkbeheer, en ik weet nu al waar ik wil uitkomen: als systeembeheerder aan de slag.',
        'Ik heb al genoeg pc\'s en netwerken zien crashen, en er evenveel weer aan de praat gekregen: een driver die ermee stopt, een netwerkfout waar je in het begin geen touw aan vastknoopt, dat werk. Naast mijn opleiding werk ik aan mijn CCNA en volg ik Microsoft-cursussen om dat verder uit te bouwen.',
      ],
      facts: [
        { key: 'Opleiding', value: 'Graduaat Systeem- en Netwerkbeheer' },
        { key: 'Focus', value: 'Windows Server · Active Directory · netwerken' },
        { key: 'Gecertificeerd', value: 'Microsoft 365 Fundamentals (MS-900)' },
        { key: 'Mee bezig', value: 'CCNA Routing & Switching' },
      ],
      portraitAlt: 'Mehdi Oulad Khlie',
      portraitPending: 'Portret',
    },
    work: {
      label: 'Een paar projecten',
      heading: 'Spullen die ik gebouwd heb omdat ik ze zelf nodig had.',
      items: [
        {
          index: '01',
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: 'Gemaakt om je training achteraf in te typen, niet halverwege een set. Wat je intikt staat direct op je gsm en gaat vanzelf mee naar de cloud.',
          href: '#/projects/sets',
          external: false,
          image: { ...SETS_IMAGE, alt: 'De Sets-workoutapp op een gsm' },
          cta: 'Lees het volledige verhaal',
        },
        {
          index: '02',
          title: 'Muted',
          stack: 'Windows-app · C# .NET 9',
          description: 'Mijn micro nam constant mijn pc-ventilator mee op, dus loste ik het zelf op. RNNoise filtert die ruis er lokaal uit, nog voor je stem bij Discord binnenkomt.',
          href: '#/projects/muted',
          external: false,
          image: { ...MUTED_IMAGE, alt: 'De Muted-app met het ruisfilter en de voice gate' },
          cta: 'Lees het volledige verhaal',
        },
        {
          index: '03',
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome-extensie',
          description: 'Laat de Page Visibility API geloven dat een tabblad open en actief is, ook als het op de achtergrond staat, inclusief iframes die later pas laden.',
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          image: { ...SPOOFER_IMAGE, alt: 'De Visibility Spoofer-extensie, spoofing actief' },
          cta: 'Bekijk de code op GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Berekent wat een rit kost aan brandstof en hoeveel CO₂ daarbij vrijkomt. Begin een adres te typen en de suggesties staan er meteen.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          image: { ...FUELTRACKER_IMAGE, alt: 'FuelTracker terwijl een route tussen twee adressen wordt gepland' },
          cta: 'Bekijk de code op GitHub',
          secondaryHref: 'https://fueltracker.mehdioul.dev/',
          secondaryCta: 'Bekijk de website',
          secondaryExternal: true,
        },
        {
          index: '05',
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: 'Zet je pc op afstand uit via een webpagina. Zit achter een pincode en draait verder onopvallend mee in de system tray.',
          image: { ...SHUTITDOWN_IMAGE, alt: 'De ShutItDown-app met de draaiende server en de shutdown-link' },
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          cta: 'Bekijk de code op GitHub',
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: 'Stuur gerust een berichtje.',
      line: 'Heb je een vraag, of wil je gewoon babbelen? Vul hieronder een briefje in, of neem rechtstreeks contact op via een van de kanalen ernaast.',
      direct: 'Liever meteen mailen?',
      letterTo: 'Aan',
      localTime: 'Evergem, nu',
      formTitle: 'Een briefje',
      infoTitle: 'Contactgegevens',
      socialTitle: 'Elders',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefoon',
      locationLabel: 'Locatie',
      location: 'Evergem, België',
      availability: 'Beschikbaarheid',
      availableText: 'Beschikbaar voor werk',
      responseTime: 'Ik laat meestal binnen een dag of twee iets weten.',
      email: EMAIL,
      phone: PHONE,
      socials: SOCIALS,
      form: {
        name: 'Naam',
        namePlaceholder: 'Je naam',
        email: 'E-mail',
        emailPlaceholder: 'je@email.com',
        subject: 'Onderwerp',
        subjectPlaceholder: 'Waar gaat het over?',
        message: 'Bericht',
        messagePlaceholder: 'Schrijf hier je bericht…',
        send: 'Verzegelen en versturen',
        sending: 'Verzenden…',
        success: 'Verstuurd. Ik reageer zo snel mogelijk.',
        error: `Er liep iets mis. Probeer het nog eens, of mail me rechtstreeks op ${EMAIL}`,
        required: 'Dit veld mag niet leeg blijven',
        invalidEmail: 'Dit e-mailadres klopt niet',
      },
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },
};
