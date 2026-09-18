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
  image?: { src: string; srcSet: string; alt: string };
  cta: string;
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
};

const MUTED_IMAGE = {
  src: '/muted-screenshot-1400.webp',
  srcSet: '/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w',
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
    nav: { about: 'About', work: 'Work', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie — home' },
    hero: {
      eyebrow: 'System & network administrator',
      ledeHead: 'The best infrastructure is the kind nobody ',
      ledeEm: 'notices',
      ledeTail: '.',
      location: 'Evergem, BE',
      status: 'Open to work',
      scroll: 'Scroll',
    },
    about: {
      label: 'About',
      heading: 'Windows environments are where I am at home.',
      body: [
        'I am studying System and Network Administration, and by now I know what I want to do: work as a sysadmin.',
        'I have seen plenty of PCs and networks fall over and got just as many running again, from drivers that give up to network errors that make no sense at first. On the side I am working on my CCNA and taking Microsoft courses to build on that.',
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
      label: 'Selected work',
      heading: 'Things I built because I wanted them to exist.',
      items: [
        {
          index: '01',
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: 'An app for typing your workouts in after training, not during. What you type lands on your phone right away, then goes to the cloud on its own.',
          href: '#/projects/sets',
          external: false,
          image: { ...SETS_IMAGE, alt: 'The Sets workout app on a phone' },
          cta: 'Read the case study',
        },
        {
          index: '02',
          title: 'Muted',
          stack: 'Windows app · C# .NET 9',
          description: 'My mic kept picking up my PC fan, so I built something for it. RNNoise strips the noise out on your own machine, before your voice reaches Discord.',
          href: '#/projects/muted',
          external: false,
          image: { ...MUTED_IMAGE, alt: 'The Muted desktop app showing its noise filter and voice gate' },
          cta: 'Read the case study',
        },
        {
          index: '03',
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome extension',
          description: 'Spoofs the Page Visibility API so a tab looks open and focused while it sits in the background, iframes that load later included.',
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          cta: 'View on GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Works out what a trip costs you in fuel and how much CO₂ comes with it. Type an address and the suggestions are already there.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          cta: 'View on GitHub',
        },
        {
          index: '05',
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: 'Shuts your PC down remotely through a web page. Sits behind a PIN and runs along quietly in the system tray.',
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          cta: 'View on GitHub',
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: 'Say hi.',
      line: 'Got a question, or do you just want to chat? Fill in the form, or reach me directly through one of the channels on the side.',
      formTitle: 'Send a message',
      infoTitle: 'Contact details',
      socialTitle: 'Elsewhere',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      location: 'Evergem, Belgium',
      availability: 'Availability',
      availableText: 'Available for work',
      responseTime: 'I usually get back to you within a day or two.',
      email: EMAIL,
      phone: PHONE,
      socials: SOCIALS,
      form: {
        name: 'Name',
        namePlaceholder: 'Your full name',
        email: 'Email',
        emailPlaceholder: 'you@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'What is it about?',
        message: 'Message',
        messagePlaceholder: 'Type your message here…',
        send: 'Send message',
        sending: 'Sending…',
        success: 'Sent. I will get back to you as soon as I can.',
        error: `Something went wrong. Try again, or just email me at ${EMAIL}`,
        required: 'This field has to be filled in',
        invalidEmail: 'Fill in a valid email address',
      },
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },

  nl: {
    nav: { about: 'Over mij', work: 'Werk', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie — home' },
    hero: {
      eyebrow: 'Systeem- en netwerkbeheerder',
      ledeHead: 'De beste infrastructuur is die waar niemand iets van ',
      ledeEm: 'merkt',
      ledeTail: '.',
      location: 'Evergem, BE',
      status: 'Open voor werk',
      scroll: 'Scroll',
    },
    about: {
      label: 'Over mij',
      heading: 'Windows-omgevingen liggen me het best.',
      body: [
        'Ik studeer Systeem- en Netwerkbeheer en ik weet ondertussen goed wat ik wil doen: aan de slag als systeembeheerder.',
        'Ik heb al veel pc’s en netwerken zien vastlopen en er evenveel terug aan de praat gekregen, van drivers die het opgeven tot netwerkfouten waar je eerst niks van snapt. Daarnaast ben ik bezig met mijn CCNA en volg ik Microsoft-trajecten om daarop verder te bouwen.',
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
      label: 'Geselecteerd werk',
      heading: 'Dingen die ik gemaakt heb omdat ik ze wou hebben.',
      items: [
        {
          index: '01',
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: 'Een app om je workouts in te typen na je training, niet tijdens. Wat je intikt staat meteen op je gsm en gaat daarna vanzelf naar de cloud.',
          href: '#/projects/sets',
          external: false,
          image: { ...SETS_IMAGE, alt: 'De Sets-workoutapp op een gsm' },
          cta: 'Lees de case study',
        },
        {
          index: '02',
          title: 'Muted',
          stack: 'Windows-app · C# .NET 9',
          description: 'Mijn micro pikte constant de ventilator van mijn pc op, dus heb ik er zelf iets voor gemaakt. RNNoise haalt die ruis eruit op je eigen pc, voor je stem bij Discord aankomt.',
          href: '#/projects/muted',
          external: false,
          image: { ...MUTED_IMAGE, alt: 'De Muted-app met het ruisfilter en de voice gate' },
          cta: 'Lees de case study',
        },
        {
          index: '03',
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome-extensie',
          description: 'Spooft de Page Visibility API zodat een tabblad open en gefocust lijkt terwijl het op de achtergrond staat, iframes die later laden erbij.',
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          cta: 'Bekijk op GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Rekent uit wat een rit je kost aan brandstof en hoeveel CO₂ eraan hangt. Je typt een adres en de suggesties staan er al.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          cta: 'Bekijk op GitHub',
        },
        {
          index: '05',
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: 'Zet je pc van op afstand af via een webpagina. Zit achter een pincode en draait rustig mee in de system tray.',
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          cta: 'Bekijk op GitHub',
        },
      ],
    },
    contact: {
      label: 'Contact',
      heading: 'Zeg gerust hallo.',
      line: 'Heb je een vraag of wil je gewoon eens babbelen? Vul het formulier in, of pak me rechtstreeks via een van de kanalen hiernaast.',
      formTitle: 'Stuur een bericht',
      infoTitle: 'Contactgegevens',
      socialTitle: 'Elders',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefoon',
      locationLabel: 'Locatie',
      location: 'Evergem, België',
      availability: 'Beschikbaarheid',
      availableText: 'Beschikbaar voor werk',
      responseTime: 'Ik antwoord meestal binnen een dag of twee.',
      email: EMAIL,
      phone: PHONE,
      socials: SOCIALS,
      form: {
        name: 'Naam',
        namePlaceholder: 'Je volledige naam',
        email: 'E-mail',
        emailPlaceholder: 'je@email.com',
        subject: 'Onderwerp',
        subjectPlaceholder: 'Waarover gaat het?',
        message: 'Bericht',
        messagePlaceholder: 'Typ hier je bericht…',
        send: 'Verstuur bericht',
        sending: 'Verzenden…',
        success: 'Verstuurd. Ik laat zo snel mogelijk iets weten.',
        error: `Er ging iets mis. Probeer nog eens, of mail me gewoon op ${EMAIL}`,
        required: 'Dit veld moet ingevuld zijn',
        invalidEmail: 'Vul een geldig e-mailadres in',
      },
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },
};
