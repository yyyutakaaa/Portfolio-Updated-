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

export interface StageProject {
  index: string;
  title: string;
  stack: string;
  /** Two or three sentences: what was built and what worked. */
  summary: string;
  /** The longer write-up, one paragraph each, behind the disclosure. */
  details: string[];
  /** Demo recording on YouTube, where there is one. */
  video?: string;
  /** What went wrong and how it was solved, plus what it taught. Shown inside the write-up. */
  evidence?: {
    problems: { problem: string; cause: string; fix: string }[];
    learned: { skill: string; applied: string }[];
  };
  /** A line of context that has to be read before the rest, e.g. that a demo was an isolated lab. */
  note?: string;
  /** File stem of the demo's thumbnail in `public/stage/`, e.g. `arp` → `arp-560.webp`. */
  thumb?: string;
}

export interface StageCopy {
  /** Label of the button on the home page. */
  cta: string;
  back: string;
  label: string;
  heading: string;
  intro: string;
  /** Label of the button that downloads the internship CV. */
  download: string;
  /** Opens the same PDF in the browser instead of saving it. */
  view: string;
  contactLabel: string;
  skillsLabel: string;
  skills: string[];
  groups: { title: string; projects: StageProject[] }[];
  open: string;
  close: string;
  /** Label of the link to a project's demo video. */
  watch: string;
  problemsTitle: string;
  problemCols: { problem: string; cause: string; fix: string };
  learnedTitle: string;
  learnedCols: { skill: string; applied: string };
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
  nav: { about: string; work: string; stage: string; resume: string; contact: string; home: string };
  hero: {
    eyebrow: string;
    ledeHead: string;
    ledeEm: string;
    ledeTail: string;
    location: string;
    status: string;
    /** What a recruiter deciding in a few seconds needs: the direction, the period, the school. */
    internship: { key: string; value: string }[];
    scroll: string;
  };
  about: {
    label: string;
    heading: string;
    body: string[];
    facts: { key: string; value: string }[];
  };
  /** The first two items live on the home page; the rest sit on the projects page, image-free. */
  work: {
    label: string;
    heading: string;
    items: WorkItem[];
    more: { cta: string; label: string; heading: string; back: string };
  };
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
    locationLabel: string;
    location: string;
    availability: string;
    availableText: string;
    responseTime: string;
    email: string;
    socials: { label: string; href: string }[];
    form: ContactFormCopy;
  };
  stage: StageCopy;
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

export const STAGE_EMAIL = 'mehdi.ouladkhlie@student.hogent.be';

export const EMAIL = 'mehdi.ouladkhlie@outlook.be';

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
  { label: 'GitHub', href: 'https://github.com/yyyutakaaa' },
  { label: 'Instagram', href: 'https://www.instagram.com/y.yutaka.a/' },
];

export const inkContent: Record<'en' | 'nl', InkCopy> = {
  en: {
    nav: { about: 'About', work: 'Work', stage: 'Internship', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie, home' },
    hero: {
      eyebrow: 'System and network administrator',
      ledeHead: "If it's doing its job, you never ",
      ledeEm: 'notice',
      ledeTail: ' it.',
      location: 'Evergem, BE',
      status: 'Open to opportunities',
      internship: [
        { key: 'Looking for', value: 'An internship in system & network administration: networks, servers and cloud' },
        { key: 'Period', value: '8 February to 27 May 2027 (60 days)' },
        { key: 'Studying', value: 'Associate degree, System & Network Administration, HOGENT' },
      ],
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
          cta: 'See it on GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: "Calculates what a drive costs in fuel and how much CO₂ it produces. Start typing an address and the suggestions pop up right away.",
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
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
          cta: 'See it on GitHub',
        },
      ],
      more: {
        cta: 'More projects',
        label: 'More projects',
        heading: 'Smaller things, mostly on GitHub.',
        back: 'Back home',
      },
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
      locationLabel: 'Location',
      location: 'Evergem, Belgium',
      availability: 'Availability',
      availableText: 'Currently available',
      responseTime: "I'll usually reply within a day or two.",
      email: EMAIL,
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
    stage: {
      cta: 'My internship projects',
      back: 'Back home',
      label: 'For my internship',
      heading: 'What I have already built.',
      intro:
        'I am looking for an internship as a system and network administrator. These are five projects from my degree, each built and tested in a lab of its own. Open a project for the full story.',
      download: 'Download my internship CV',
      view: 'View my internship CV',
      contactLabel: 'Contact for the internship',
      skillsLabel: 'What I have worked with',
      skills: [
        'Active Directory',
        'DNS & DHCP failover',
        'HAProxy',
        'Palo Alto firewall',
        'Proxmox & HA',
        'StarWind vSAN',
        'Zabbix',
        'Kali Linux',
      ],
      watch: 'Watch the demo',
      problemsTitle: 'What went wrong and how I fixed it',
      problemCols: { problem: 'Problem', cause: 'Cause', fix: 'Fix' },
      learnedTitle: 'What I learned',
      learnedCols: { skill: 'Skill', applied: 'How I used it' },
      open: 'Read the full story',
      close: 'Close',
      groups: [
        {
          title: 'Network & security',
          projects: [
            {
              index: '01',
              title: 'Palo Alto firewall',
              stack: 'Palo Alto · PAN-OS · NAT · service routes',
              summary:
                'The base configuration of the Branch Office firewall over SSH: internet, policies, DNS and NTP over WAN, licensing and automatic updates. Everything worked and was tested from a LAN client.',
              evidence: {
                problems: [
                  { problem: 'Setting up DNS and NTP over WAN did not work at first.', cause: 'The WAN interface is a DHCP client, and Palo Alto does not accept that as the source of a service route.', fix: 'Created a loopback interface with a fixed IP in the LAN zone and used it as the source. Traffic leaves over the default route with NAT.' },
                  { problem: 'Installing the update failed because the file had not finished downloading. It happened twice.', cause: 'The install was started while the download was still running.', fix: 'Download first, check with show jobs all that the job is done, and only then install.' },
                ],
                learned: [
                  { skill: 'Managing Palo Alto over the CLI', applied: 'Downloaded and installed updates over SSH, checked jobs and versions.' },
                  { skill: 'Checking network connectivity', applied: 'Tested the DHCP lease, default route, and pings to 8.8.8.8 and google.com.' },
                  { skill: 'Using firewall objects and policies', applied: 'Created address objects; verified the security and NAT policies through working browsing.' },
                  { skill: 'Setting up service routes and interfaces', applied: 'Used a loopback interface to send DNS and NTP over WAN.' },
                  { skill: 'Activating licences and subscriptions', applied: 'Threat Prevention, URL Filtering, WildFire, DNS Security and SD-WAN active.' },
                  { skill: 'Analysing error messages', applied: 'Traced the update FAIL message to a download that was still running.' },
                ],
              },
              details: [
                'I started by checking connectivity: the WAN side got an address over DHCP, there was a default route and a ping to 8.8.8.8 came back. A Windows client behind the firewall could browse, which proved my security policy and NAT rule were right.',
                'Next I created address objects for LAN-HQ, LAN-BO, DMZ and SERVERS, so policies can use names instead of IP ranges.',
                'DNS and NTP had to leave over WAN, but Palo Alto will not use a DHCP interface as the source for a service route. I solved that with a loopback interface with a fixed IP in the LAN zone.',
                'After activating the licence, Threat Prevention, URL Filtering, WildFire, DNS Security and SD-WAN were all running. I pulled the signatures in over the CLI, learned to let a download finish before installing, and set up an automatic update schedule.',
              ],
            },
            {
              index: '02',
              title: 'Redundant network infrastructure',
              video: 'https://youtu.be/ZUK2rmJAkuE',
              thumb: 'redundant',
              stack: 'Active Directory · DHCP failover · HAProxy · BIND9',
              summary:
                'An infrastructure with no single point of failure: two domain controllers, two firewalls and two web servers behind a load balancer. When one web server went down, the other took over.',
              details: [
                'DC1 and DC2 are both domain controllers and AD replication works. DHCP runs in Hot Standby failover and the scope and DNS zone replicate correctly.',
                'The network runs over two firewalls: Firewall 1 connects to the internet, the DMZ and Firewall 2, and Firewall 2 manages the server and client networks. Traffic to the web servers is balanced by HAProxy.',
                'In the demo the site alternates between Web1 and Web2, and stays up if one fails. I also tested the domain join, reachability through both firewalls, AD, DNS, BIND9 and DNS lookups.',
              ],
            },
            {
              index: '03',
              title: 'ARP poisoning & DNS spoofing',
              video: 'https://youtu.be/TZJtIaS60t8',
              thumb: 'arp',
              note: 'Only carried out in an isolated school lab, on my own test machines. Countermeasures include Dynamic ARP Inspection and DNSSEC.',
              stack: 'Kali Linux · iptables · Man-in-the-Middle',
              summary:
                'An attack demo in an isolated school lab: sitting between a victim and the network with Kali Linux and redirecting its traffic. Built to understand how these attacks work and how to stop them.',
              details: [
                'First came ARP poisoning. ARP has no authentication, so I could convince the victim (Ubuntu) that I was the router, and its traffic then ran through me.',
                'DNS spoofing followed: instead of the real IP address, the victim got the address of my own server. I used iptables to route the intercepted traffic properly on my Kali machine.',
                'When the victim requested a well-known website, it got my own demo page instead. That proved the attack worked. All of it happened in an isolated lab.',
              ],
            },
          ],
        },
        {
          title: 'Virtualisation & monitoring',
          projects: [
            {
              index: '04',
              title: 'Proxmox HCI with shared storage',
              video: 'https://youtu.be/ZMIf_8fFkLE',
              thumb: 'proxmox',
              stack: 'Proxmox · StarWind vSAN · iSCSI · HA',
              summary:
                'Shared storage on a Proxmox cluster with StarWind vSAN, so VMs can move between nodes without downtime. In the HA test I powered a node off hard and the VM restarted on another one by itself.',
              details: [
                'Local storage is not enough if VMs need to move between nodes. On each node I imported a StarWind CVM with an extra network interface and an extra disk, loaded the licence and created an HA device with synchronous mirroring.',
                'There is hardly any documentation for StarWind on Proxmox, so I combined the guides for Proxmox and VMware vSphere.',
                'An LXC container on that shared disk did not work: an iSCSI LUN is block storage with no filesystem, and containers need one.',
              ],
            },
            {
              index: '05',
              title: 'Zabbix monitoring lab',
              video: 'https://youtu.be/lQUlKRPNc5U',
              thumb: 'zabbix',
              stack: 'Zabbix 7.4 · SNMP · pfSense · VMware Workstation',
              summary:
                'Set up Zabbix myself on a host-only network and monitored five hosts in five different ways, with a custom dashboard to see everything at a glance.',
              evidence: {
                problems: [
                  { problem: 'Could not log in to the appliance as Admin.', cause: 'The console login is the Linux user, not the Zabbix web user.', fix: 'Logged in with the appliance\'s root account.' },
                  { problem: 'IP conflict on 192.168.100.10.', cause: 'Windows Server had already been given that IP.', fix: 'The Zabbix server got a different fixed IP.' },
                  { problem: 'The appliance was on the NAT subnet.', cause: 'Its network card was on VMnet8.', fix: 'Moved the card to VMnet1 and set a static IP through ifcfg-eth0.' },
                  { problem: 'nmcli was not available on the appliance.', cause: 'The appliance uses network scripts.', fix: 'Edited the configuration in /etc/sysconfig/network-scripts.' },
                  { problem: 'Pinging Windows from Zabbix failed.', cause: 'Windows Firewall was blocking ICMP.', fix: 'Added a firewall rule for ICMPv4.' },
                  { problem: 'No internet on the Ubuntu server.', cause: 'Traffic was not going out through pfSense.', fix: 'Temporarily added a second network card on VMnet8 for package installs.' },
                  { problem: 'The SNMP service was not visible in services.msc.', cause: 'The Windows feature was not installed.', fix: 'Ran Install-WindowsFeature SNMP-Service.' },
                  { problem: 'The Zabbix frontend returned a 404 on /zabbix.', cause: 'The appliance serves the frontend from the root.', fix: 'Opened the frontend on the server\'s own IP.' },
                ],
                learned: [
                  { skill: 'Monitoring and SNMP', applied: 'Configuring hosts, communities and templates.' },
                  { skill: 'Network administration', applied: 'Static IPs, host-only and NAT.' },
                  { skill: 'Firewall administration', applied: 'pfSense, Windows Firewall and iptables.' },
                  { skill: 'Linux administration', applied: 'Rocky Linux and Ubuntu, network configuration, package management.' },
                  { skill: 'Windows Server administration', applied: 'Installing features, services, PowerShell.' },
                  { skill: 'Troubleshooting', applied: 'Isolating causes layer by layer.' },
                ],
              },
              details: [
                'The five hosts were a Windows server over SNMP, a Windows server with the Zabbix agent, an Ubuntu server with snmpd, an Ubuntu server with the agent, and my pfSense firewall.',
                'The dashboard has widgets for connection attempts on my website, host availability, critical problems on the network and the disk usage of a server.',
                'I showed in a video of at most five minutes that everything works.',
              ],
            },
          ],
        },
      ],
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },

  nl: {
    nav: { about: 'Over mij', work: 'Werk', stage: 'Stage', resume: 'CV', contact: 'Contact', home: 'Mehdi Oulad Khlie, home' },
    hero: {
      eyebrow: 'Systeem- en netwerkbeheerder',
      ledeHead: 'Werkt het zoals het moet, dan merk je er ',
      ledeEm: 'niks',
      ledeTail: ' van.',
      location: 'Evergem, BE',
      status: 'Op zoek naar werk',
      internship: [
        { key: 'Op zoek naar', value: 'Een stage in systeem- en netwerkbeheer: netwerk, servers en cloud' },
        { key: 'Periode', value: '8 februari tot 27 mei 2027 (60 dagen)' },
        { key: 'Opleiding', value: 'Graduaat Systeem- en Netwerkbeheer, HOGENT' },
      ],
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
          cta: 'Bekijk de code op GitHub',
        },
        {
          index: '04',
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Berekent wat een rit kost aan brandstof en hoeveel CO₂ daarbij vrijkomt. Begin een adres te typen en de suggesties staan er meteen.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
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
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          cta: 'Bekijk de code op GitHub',
        },
      ],
      more: {
        cta: 'Meer projecten',
        label: 'Meer projecten',
        heading: 'Kleinere dingen, vooral op GitHub.',
        back: 'Terug naar home',
      },
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
      locationLabel: 'Locatie',
      location: 'Evergem, België',
      availability: 'Beschikbaarheid',
      availableText: 'Beschikbaar voor werk',
      responseTime: 'Ik laat meestal binnen een dag of twee iets weten.',
      email: EMAIL,
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
    stage: {
      cta: 'Mijn stageprojecten',
      back: 'Terug naar home',
      label: 'Voor mijn stage',
      heading: 'Wat ik al opgezet heb.',
      intro:
        'Ik zoek een stage als systeem- en netwerkbeheerder. Dit zijn vijf projecten uit mijn opleiding, elk in een eigen lab opgebouwd en getest. Klik een project open voor het volledige verhaal.',
      download: 'Download mijn stage-CV',
      view: 'Bekijk mijn stage-CV',
      contactLabel: 'Contact voor de stage',
      skillsLabel: 'Waar ik mee gewerkt heb',
      skills: [
        'Active Directory',
        'DNS & DHCP-failover',
        'HAProxy',
        'Palo Alto firewall',
        'Proxmox & HA',
        'StarWind vSAN',
        'Zabbix',
        'Kali Linux',
      ],
      watch: 'Bekijk de demo',
      problemsTitle: 'Wat er misliep en hoe ik het oploste',
      problemCols: { problem: 'Probleem', cause: 'Oorzaak', fix: 'Oplossing' },
      learnedTitle: 'Wat ik hierbij geleerd heb',
      learnedCols: { skill: 'Vaardigheid', applied: 'Toepassing' },
      open: 'Lees het volledige verhaal',
      close: 'Sluit',
      groups: [
        {
          title: 'Netwerk & security',
          projects: [
            {
              index: '01',
              title: 'Palo Alto firewall',
              stack: 'Palo Alto · PAN-OS · NAT · service routes',
              summary:
                'De basisconfiguratie van de Branch Office-firewall via SSH: internet, policies, DNS en NTP via WAN, licentie en automatische updates. Alles werkte en is getest vanaf een client in het LAN.',
              evidence: {
                problems: [
                  { problem: 'DNS en NTP via WAN instellen lukte niet direct.', cause: 'De WAN-interface is een DHCP-client. Palo Alto accepteert die niet als bron voor een service route.', fix: 'Een loopback-interface met een vast IP aangemaakt in de zone LAN en gebruikt als bron. Het verkeer gaat via de default route en NAT naar buiten.' },
                  { problem: 'De installatie van de update gaf FAIL omdat het bestand nog niet gedownload was. Dit gebeurde twee keer.', cause: 'De installatie was gestart terwijl de download nog liep.', fix: 'Eerst downloaden en met show jobs all controleren of de job klaar is, en pas daarna installeren.' },
                ],
                learned: [
                  { skill: 'Palo Alto beheren via CLI', applied: 'Via SSH updates gedownload en geïnstalleerd, jobs en versies gecontroleerd.' },
                  { skill: 'Netwerkconnectiviteit controleren', applied: 'DHCP-lease, default route en ping naar 8.8.8.8 en google.com getest.' },
                  { skill: 'Firewallobjecten en policies gebruiken', applied: 'Address objects aangemaakt; security policy en NAT-policy gecontroleerd via werkend surfen.' },
                  { skill: 'Service routes en interfaces instellen', applied: 'Loopback-interface gebruikt om DNS en NTP via WAN te sturen.' },
                  { skill: 'Licenties en subscriptions activeren', applied: 'Threat Prevention, URL Filtering, WildFire, DNS Security en SD-WAN actief.' },
                  { skill: 'Foutmeldingen analyseren', applied: 'De FAIL-melding bij de update herleid tot een download die nog liep.' },
                ],
              },
              details: [
                'Ik heb eerst de internetconnectiviteit gecontroleerd: de WAN-kant kreeg via DHCP een adres, er stond een default route en een ping naar 8.8.8.8 kwam terug. Vanaf een Windows-client achter de firewall kon ik ook surfen, wat bewees dat mijn security policy en NAT-regel klopten.',
                'Daarna maakte ik address objects aan voor LAN-HQ, LAN-BO, DMZ en SERVERS, zodat ik policies met namen kan schrijven in plaats van met IP-reeksen.',
                'DNS en NTP moesten via WAN vertrekken, maar Palo Alto laat een DHCP-interface niet toe als bron voor service routes. Ik loste dat op met een loopback-interface met een vast IP-adres in de LAN-zone.',
                'Na het activeren van de licentie draaiden Threat Prevention, URL Filtering, WildFire, DNS Security en SD-WAN. Ik haalde de signatures binnen via de CLI, leerde dat je de download moet laten afronden voor je installeert, en stelde een automatisch updateschema in.',
              ],
            },
            {
              index: '02',
              title: 'Redundante netwerkinfrastructuur',
              video: 'https://youtu.be/ZUK2rmJAkuE',
              thumb: 'redundant',
              stack: 'Active Directory · DHCP-failover · HAProxy · BIND9',
              summary:
                'Een infrastructuur zonder single point of failure: twee domain controllers, twee firewalls en twee webservers met load balancing. Bij het uitvallen van een webserver nam de andere het verkeer over.',
              details: [
                'DC1 en DC2 zijn allebei domain controller en de AD-replicatie werkt. DHCP staat in Hot Standby-failover en de scope en DNS-zone worden correct gerepliceerd.',
                'Het netwerk loopt over twee firewalls: Firewall 1 is verbonden met internet, de DMZ en Firewall 2, en Firewall 2 beheert het servernetwerk en het clientnetwerk. Het verkeer naar de webservers wordt via HAProxy verdeeld.',
                'In de demo wisselt de website tussen Web1 en Web2, en bij het uitvallen van één server blijft ze bereikbaar. Ik testte ook de domain join, de bereikbaarheid via beide firewalls, AD, DNS, BIND9 en DNS-lookups.',
              ],
            },
            {
              index: '03',
              title: 'ARP poisoning & DNS spoofing',
              video: 'https://youtu.be/TZJtIaS60t8',
              thumb: 'arp',
              note: 'Alleen uitgevoerd in een afgeschermd schoollab, op eigen testmachines. Tegenmaatregelen zijn onder meer Dynamic ARP Inspection en DNSSEC.',
              stack: 'Kali Linux · iptables · Man-in-the-Middle',
              summary:
                'Een aanvalsdemo in een afgeschermd schoollab: met Kali Linux tussen een slachtoffer en het netwerk gaan zitten en verkeer omleiden. Bedoeld om te begrijpen hoe zulke aanvallen werken en hoe je ze tegenhoudt.',
              details: [
                'Eerst deed ik ARP poisoning. ARP heeft geen authenticatie, dus ik kon het slachtoffer (Ubuntu) wijsmaken dat ik de router was, waarna zijn verkeer via mij liep.',
                'Daarna volgde DNS spoofing: in plaats van het echte IP-adres kreeg het slachtoffer een adres van mijn eigen server. Met iptables routeerde ik het onderschepte verkeer goed op mijn Kali-machine.',
                'Toen het slachtoffer een bekende website opvroeg, kreeg het mijn eigen demopagina te zien. Dat was het bewijs dat de aanval werkte. Alles gebeurde in een geïsoleerd lab.',
              ],
            },
          ],
        },
        {
          title: 'Virtualisatie & monitoring',
          projects: [
            {
              index: '04',
              title: 'Proxmox HCI met shared storage',
              video: 'https://youtu.be/ZMIf_8fFkLE',
              thumb: 'proxmox',
              stack: 'Proxmox · StarWind vSAN · iSCSI · HA',
              summary:
                'Shared storage op een Proxmox-cluster met StarWind vSAN, zodat VM’s zonder downtime tussen nodes kunnen bewegen. In de HA-test schakelde ik een node hardhandig uit en de VM startte automatisch op een andere.',
              details: [
                'Lokale storage volstaat niet als VM’s tussen nodes moeten kunnen bewegen. Ik importeerde op elke node een StarWind CVM met een extra netwerkinterface en een extra schijf, laadde de licentie in en maakte een HA-device met synchrone mirroring.',
                'Documentatie voor StarWind op Proxmox bestaat nauwelijks, dus ik combineerde de gidsen voor Proxmox en VMware vSphere.',
                'Een LXC-container op die gedeelde schijf lukte niet: een iSCSI-LUN is block storage zonder bestandssysteem, en containers hebben een filesystem nodig.',
              ],
            },
            {
              index: '05',
              title: 'Zabbix monitoring lab',
              video: 'https://youtu.be/lQUlKRPNc5U',
              thumb: 'zabbix',
              stack: 'Zabbix 7.4 · SNMP · pfSense · VMware Workstation',
              summary:
                'Zabbix zelf opgezet in een host-only netwerk en vijf hosts gemonitord op vijf verschillende manieren, met een eigen dashboard om alles in één oogopslag te zien.',
              evidence: {
                problems: [
                  { problem: 'Geen login op de appliance met Admin.', cause: 'De console-login is de Linux-gebruiker, niet de Zabbix-webgebruiker.', fix: 'Inloggen met de root-account van de appliance.' },
                  { problem: 'IP-conflict op 192.168.100.10.', cause: 'Windows Server had dit IP al gekregen.', fix: 'De Zabbix-server kreeg een ander vast IP.' },
                  { problem: 'De appliance stond op het NAT-subnet.', cause: 'De netwerkkaart hing op VMnet8.', fix: 'Netwerkkaart omgezet naar VMnet1 en een statisch IP ingesteld via ifcfg-eth0.' },
                  { problem: 'nmcli niet beschikbaar op de appliance.', cause: 'De appliance gebruikt netwerkscripts.', fix: 'De configuratie bewerkt in /etc/sysconfig/network-scripts.' },
                  { problem: 'Ping van Zabbix naar Windows mislukte.', cause: 'De Windows Firewall blokkeerde ICMP.', fix: 'Een firewallregel voor ICMPv4 toegevoegd.' },
                  { problem: 'Geen internet op de Ubuntu-server.', cause: 'Het verkeer liep niet via pfSense naar buiten.', fix: 'Tijdelijk een tweede netwerkkaart op VMnet8 voor de pakketinstallatie.' },
                  { problem: 'De SNMP-service was niet zichtbaar in services.msc.', cause: 'De Windows-feature was niet geïnstalleerd.', fix: 'Install-WindowsFeature SNMP-Service uitgevoerd.' },
                  { problem: 'De Zabbix-frontend gaf een 404 op /zabbix.', cause: 'De appliance draait de frontend op de root.', fix: 'De frontend geopend op het IP van de server zelf.' },
                ],
                learned: [
                  { skill: 'Monitoring en SNMP', applied: 'Hosts, communities en templates configureren.' },
                  { skill: 'Netwerkbeheer', applied: 'Statische IP\'s, host-only en NAT.' },
                  { skill: 'Firewallbeheer', applied: 'pfSense, Windows Firewall en iptables.' },
                  { skill: 'Linux-beheer', applied: 'Rocky Linux en Ubuntu, netwerkconfiguratie, pakketbeheer.' },
                  { skill: 'Windows Server-beheer', applied: 'Features installeren, services, PowerShell.' },
                  { skill: 'Troubleshooting', applied: 'Stapsgewijs oorzaken isoleren per laag.' },
                ],
              },
              details: [
                'De vijf hosts waren een Windows-server via SNMP, een Windows-server met de Zabbix-agent, een Ubuntu-server met snmpd, een Ubuntu-server met de agent, en mijn pfSense-firewall.',
                'Op het dashboard staan widgets voor het aantal verbindingspogingen op mijn website, de beschikbaarheid van de hosts, kritieke problemen in het netwerk en het schijfgebruik van een server.',
                'Ik toonde in een video van maximaal vijf minuten dat alles werkt.',
              ],
            },
          ],
        },
      ],
    },
    footer: { name: 'Mehdi Oulad Khlie', place: 'Evergem, BE' },
  },
};
