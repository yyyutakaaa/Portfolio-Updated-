/**
 * Every word on the home page, the table of contents and the lab write-ups,
 * in both languages. The longer pages (Sets, Muted, CV, privacy) keep their
 * copy in `translations.ts`.
 */

export type Lang = 'nl' | 'en';

export interface LabProject {
  slug: string;
  /** The one figure the story turns on, set large beside the title. */
  figure: string;
  title: string;
  /** Short form for the table of contents on a phone. */
  shortTitle: string;
  subject: string;
  result: string;
  brief: { task: string; obstacle: string; solution: string };
  /** Opening paragraph. Words wrapped in *asterisks* are set in the display face. */
  lede: string;
  sections: { title: string; paragraphs?: string[]; steps?: string[] }[];
  mistake?: { title: string; body: string };
  featured?: boolean;
}

export interface SideProject {
  title: string;
  stack: string;
  description: string;
  href: string;
  external: boolean;
  image: { src: string; srcSet: string; alt: string };
  secondary?: { href: string; label: string };
}

export interface SiteCopy {
  nav: { index: string; close: string; home: string; language: string };
  hero: { location: string; scroll: string; role: string };
  index: {
    title: string;
    alsoLabel: string;
    alsoTitle: string;
    alsoSubject: string;
    pages: { about: string; work: string; resume: string; contact: string };
  };
  projects: {
    label: (n: number, total: number) => string;
    featured: string;
    read: string;
    next: (title: string) => string;
    backToIndex: string;
    brief: { task: string; obstacle: string; solution: string };
    items: LabProject[];
  };
  about: {
    label: string;
    body: string;
    facts: { key: string; value: string }[];
  };
  work: { label: string; heading: string; items: SideProject[]; read: string; code: string };
  contact: {
    label: string;
    line: string;
    copy: string;
    copied: string;
    formLink: string;
  };
  demo: {
    label: string;
    off: string;
    on: string;
    status: { idle: string; failing: string; moved: string; back: string };
  };
  footer: string;
}

export const EMAIL = 'mehdi.ouladkhlie@outlook.be';
export const PHONE = '+32 468 54 94 78';

export const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
  { label: 'GitHub', href: 'https://github.com/yyyutakaaa' },
  { label: 'Instagram', href: 'https://www.instagram.com/y.yutaka.a/' },
];

const IMG = {
  sets: { src: '/sets/preview-800.webp', srcSet: '/sets/preview-800.webp 800w, /sets/preview-1400.webp 1400w' },
  muted: { src: '/muted-screenshot-800.webp', srcSet: '/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w' },
  spoofer: { src: '/visibility-spoofer-480.webp', srcSet: '/visibility-spoofer-480.webp 480w, /visibility-spoofer-720.webp 720w' },
  fuel: { src: '/fueltracker-800.webp', srcSet: '/fueltracker-800.webp 800w, /fueltracker-1400.webp 1400w' },
  shutdown: { src: '/shutdown-server-700.webp', srcSet: '/shutdown-server-700.webp 700w, /shutdown-server-1000.webp 1000w' },
};

export const content: Record<Lang, SiteCopy> = {
  nl: {
    nav: { index: 'Inhoud', close: 'Sluit', home: 'Mehdi Oulad Khlie, home', language: 'Taal' },
    hero: { location: 'Evergem', scroll: 'Scroll', role: 'Systeem- en netwerkbeheer' },
    index: {
      title: 'Inhoud',
      alsoLabel: 'Ook gedaan',
      alsoTitle: 'Onderschept zonder dat iemand het merkte',
      alsoSubject: 'ARP poisoning en DNS spoofing in een lab',
      pages: { about: 'Over mij', work: 'Eigen projecten', resume: 'CV', contact: 'Contact' },
    },
    projects: {
      label: (n, total) => `Project ${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
      featured: 'Uitgelicht',
      read: 'Lees het verhaal',
      next: (title) => `Volgend project: ${title}`,
      backToIndex: 'Terug naar de inhoud',
      brief: { task: 'Opdracht', obstacle: 'Obstakel', solution: 'Oplossing' },
      items: [
        {
          slug: 'palo-alto',
          figure: '5',
          title: 'Palo Alto weigerde mijn interface. Ik bouwde een omweg.',
          shortTitle: 'Palo Alto weigerde, ik bouwde een omweg',
          subject: 'Palo Alto firewall voor een filiaal',
          result: 'Een filiaal-firewall van nul opgezet, met vijf subscriptions die zichzelf up-to-date houden.',
          brief: {
            task: 'De firewall van het filiaal van nul configureren, via SSH.',
            obstacle: 'Palo Alto weigert een DHCP-interface als bron voor DNS en NTP.',
            solution: 'Een loopback met vast IP, zodat het verkeer toch via WAN vertrekt.',
          },
          lede: 'Een *firewall* is de portier van een netwerk: hij beslist wat naar binnen en naar buiten mag. Voor de Branch Office in mijn opdracht heb ik die portier zelf ingericht, van de eerste verbinding tot automatische updates.',
          sections: [
            {
              title: 'Volledige aanpak',
              steps: [
                'Eerst controleerde ik of er *internet* was, want zonder dat heeft de rest weinig zin. De WAN-kant kreeg via DHCP een adres, er stond een default route en een ping naar 8.8.8.8 kwam terug. Een Windows-client aan de LAN-kant kon met de firewall als gateway surfen. Daarmee was bewezen dat mijn security policy en NAT-regel werkten.',
                'Daarna maakte ik *address objects* aan voor LAN-HQ, LAN-BO, DMZ en SERVERS. Het zijn benoemde verwijzingen naar subnetten, zodat ik in een policy een naam kies in plaats van telkens een IP-reeks als 10.10.10.0/24 te typen.',
                "DNS en NTP moesten via WAN vertrekken, niet via de management-interface. Het probleem: mijn WAN-interface is een DHCP-client, en Palo Alto weigert zo'n interface als bron voor *service routes*. Mijn oplossing was een *loopback-interface* met een vast IP-adres in de LAN-zone. Het verkeer verlaat de firewall dan over WAN, krijgt NAT en komt aan bij de DNS-server van Hogent. Een ping naar google.com werd netjes omgezet.",
                'Met de autorisatiecode van de docent activeerde ik de *licentie*. Na een herstart draaiden alle subscriptions.',
                'Zonder *signatures* heeft een subscription niets om verkeer mee te vergelijken, dus haalde ik die binnen in een vaste volgorde: eerst het content-pakket, dan Antivirus, dan WildFire, telkens via de CLI met download en daarna install.',
                'URL Filtering werkt anders. PAN-DB doet realtime lookups in de cloud, dus er valt niets te downloaden. Ten slotte stelde ik een *auto-update* schema in: Threats wekelijks op woensdag om 02:00, Antivirus dagelijks om 02:30 en WildFire elke minuut.',
              ],
            },
            {
              title: 'Resultaat',
              paragraphs: [
                'Vijf *subscriptions* draaien tegelijk: Threat Prevention, URL Filtering, WildFire, DNS Security en SD-WAN. De firewall houdt zichzelf up-to-date.',
              ],
            },
          ],
          mistake: {
            title: 'Wat misliep',
            body: 'Twee keer startte ik de installatie terwijl de download nog liep, met een FAIL tot gevolg. Sindsdien controleer ik eerst met show jobs all of een taak echt klaar is voor ik verderga.',
          },
        },
        {
          slug: 'redundant-netwerk',
          figure: '2',
          title: 'Van alles twee, dus niets valt stil',
          shortTitle: 'Van alles twee',
          subject: 'Redundante netwerkinfrastructuur',
          result: 'Een netwerk waarin elke kritieke rol dubbel is: valt er één weg, dan neemt de reserve het over.',
          brief: {
            task: 'Een netwerk bouwen dat blijft werken als een onderdeel uitvalt.',
            obstacle: 'Eén server, firewall of webserver is meteen een single point of failure.',
            solution: "Alles dubbel: twee DC's, twee firewalls, en HAProxy voor de webservers.",
          },
          lede: '*Redundant* betekent dat van elk cruciaal onderdeel een reserve klaarstaat, zoals een reservewiel in de auto. Ik bouwde een netwerk waarin niets het enige exemplaar is.',
          sections: [
            {
              title: 'Opbouw',
              paragraphs: [
                'Het netwerk bestaat uit twee domain controllers (DC1 en DC2), twee firewalls, twee webservers, een aparte DNS-server en twee clients.',
              ],
            },
            {
              title: 'Volledige aanpak',
              steps: [
                'Op DC1 draaien *Active Directory*, DNS en DHCP. Beide domain controllers werken en de AD-replicatie klopt. Ook DHCP is redundant, met *Hot Standby failover*. De scope en de DNS-zone worden correct gerepliceerd.',
                'Het netwerk is verdeeld over twee firewalls. Firewall 1 is de primaire en is verbonden met het internet, de DMZ en Firewall 2. Firewall 2 beheert het servernetwerk en het clientnetwerk.',
                'Het verkeer naar de webservers verdeel ik met *HAProxy*. Vraag ik de website een paar keer op, dan wisselt ze tussen Web1 en Web2. Valt één webserver uit, dan neemt de andere over.',
              ],
            },
            {
              title: 'De test',
              paragraphs: [
                'In mijn demo controleer ik eerst de domain join. Daarna ping ik servers en netwerkcomponenten en test ik de bereikbaarheid via beide firewalls. Ik controleer Active Directory, DNS en of BIND9 draait, en doe lookups voor onder andere Server1, Web1 en de DNS-server.',
              ],
            },
            {
              title: 'Resultaat',
              paragraphs: [
                'De belangrijkste onderdelen werken: AD-replicatie, DHCP-failover, DNS, de netwerkverbindingen, de routing via de firewalls en de *load balancing* over de webservers.',
              ],
            },
          ],
        },
        {
          slug: 'zabbix',
          figure: '5',
          title: 'Vijf toestellen, vier methodes, één dashboard.',
          shortTitle: 'Vijf toestellen, één dashboard',
          subject: 'Monitoring met Zabbix',
          result: 'Eén Zabbix-server die vijf toestellen via vier verschillende methodes in de gaten houdt.',
          brief: {
            task: 'Zabbix opzetten en vijf hosts toevoegen, elk op een andere manier.',
            obstacle: 'Niet elk toestel praat hetzelfde: agent, SNMP-polling of snmpd.',
            solution: 'Per host de passende methode kiezen en alles op één dashboard samenbrengen.',
          },
          lede: '*Monitoring* is de bewakingscamera van een netwerk. Met Zabbix houd ik servers, netwerkapparaten en diensten in de gaten: uptime, resourcegebruik en problemen die opduiken.',
          sections: [
            {
              title: 'Volledige aanpak',
              steps: [
                'Ik installeerde Zabbix in mijn host-only netwerk.',
                'Ik voegde vijf hosts toe onder Data collection: een Windows-server via de generieke *SNMP*-service (geen agent, puur polling), een Windows-server met de *Zabbix-agent*, een Ubuntu-server met snmpd, een Ubuntu-server met de Zabbix-agent, en mijn firewall.',
                'Ik bouwde een *dashboard* met widgets voor het aantal verbindingspogingen op mijn website, host availability, kritieke problemen in het netwerk, het schijfgebruik van een server en één widget naar eigen keuze.',
                'Tot slot nam ik een filmpje van maximaal vijf minuten op waarin ik laat zien dat alles werkt.',
              ],
            },
            {
              title: 'Resultaat',
              paragraphs: ['Alle vijf hosts leveren gegevens en het dashboard toont het netwerk in één oogopslag.'],
            },
          ],
        },
        {
          slug: 'proxmox',
          figure: '1',
          title: 'Ik trok de stekker eruit. De VM verhuisde zelf.',
          shortTitle: 'Stekker eruit, VM verhuisde',
          subject: 'Proxmox-cluster met gedeelde opslag',
          result: 'Ik trok de stekker uit een draaiende node en de virtuele machine startte vanzelf weer op een andere.',
          featured: true,
          brief: {
            task: "Gedeelde opslag opzetten zodat VM's tussen nodes kunnen bewegen.",
            obstacle: 'Lokale opslag ketent een VM aan één node; high availability werkt dan niet.',
            solution: 'StarWind vSAN met een HA-device en synchrone mirroring over de nodes.',
          },
          lede: 'Als een server uitvalt, mag wat erop draait niet mee omvallen. Op mijn Proxmox-cluster zette ik *gedeelde opslag* op, zodat een virtuele machine vanzelf naar een andere server verhuist.',
          sections: [
            {
              title: 'Volledige aanpak',
              steps: [
                'Ik downloadde de StarWind Virtual HCI Appliance Free en kreeg per mail een licentiebestand. Documentatie voor StarWind op Proxmox bestaat bijna niet, dus legde ik de gidsen voor Proxmox en VMware vSphere naast elkaar. Ze lijken genoeg op elkaar om ermee te werken.',
                'Op elke node importeerde ik een *StarWind CVM*, met een extra netwerkinterface voor management en iSCSI-verkeer en een extra virtuele schijf voor de gedeelde opslag.',
                'In de webinterface van elke CVM laadde ik de licentie, voegde ik de schijf toe als storage pool en maakte ik een *HA-device* met synchrone mirroring.',
                "Ik vergeleek de opslagopties die bij het cluster passen. StarWind won, omdat VM's ermee kunnen migreren *zonder downtime*.",
              ],
            },
            {
              title: 'De test',
              paragraphs: [
                'Ik schakelde de node waarop mijn Linux-client draaide *hardhandig uit* terwijl de VM draaide. De VM verhuisde automatisch naar een andere node en startte daar opnieuw op.',
              ],
            },
            {
              title: 'Resultaat',
              paragraphs: [
                'Eén node uitgezet, en de VM draaide zonder mijn tussenkomst weer op een andere. Dat is *high availability* in de praktijk.',
              ],
            },
          ],
          mistake: {
            title: 'Wat misliep',
            body: 'Een container op de gedeelde schijf lukte niet. Een iSCSI-LUN is block storage zonder bestandssysteem, en LXC-containers hebben er net een nodig om te draaien. Zo begreep ik meteen waarom block en file storage niet inwisselbaar zijn.',
          },
        },
      ],
    },
    about: {
      label: 'Over mij',
      body: 'In een Windows-omgeving voel ik me het meest thuis. Ik heb al genoeg pc\'s en netwerken zien crashen, en er evenveel weer aan de praat gekregen. Naast mijn opleiding werk ik aan mijn CCNA.',
      facts: [
        { key: 'Nu', value: 'Zoekt stage' },
        { key: 'Studie', value: 'Graduaat Systeem- en Netwerkbeheer, HOGENT' },
        { key: 'Gecertificeerd', value: 'Microsoft 365 Fundamentals (MS-900)' },
        { key: 'Mee bezig', value: 'CCNA Routing & Switching' },
      ],
    },
    work: {
      label: 'Eigen projecten',
      heading: 'Dingen die ik bouwde omdat ik ze zelf nodig had.',
      read: 'Lees het verhaal',
      code: 'Bekijk op GitHub',
      items: [
        {
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: 'Gemaakt om je training achteraf in te typen, niet halverwege een set. Wat je intikt staat direct op je gsm en gaat vanzelf mee naar de cloud.',
          href: '/projects/sets',
          external: false,
          image: { ...IMG.sets, alt: 'De Sets-workoutapp op een gsm' },
        },
        {
          title: 'Muted',
          stack: 'Windows-app · C# .NET 9',
          description: 'Mijn micro nam constant mijn pc-ventilator mee op, dus loste ik het zelf op. RNNoise filtert die ruis er lokaal uit, nog voor je stem bij Discord binnenkomt.',
          href: '/projects/muted',
          external: false,
          image: { ...IMG.muted, alt: 'De Muted-app met het ruisfilter en de voice gate' },
        },
        {
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome-extensie',
          description: 'Laat de Page Visibility API geloven dat een tabblad open en actief is, ook als het op de achtergrond staat, inclusief iframes die later pas laden.',
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          image: { ...IMG.spoofer, alt: 'De Visibility Spoofer-extensie, spoofing actief' },
        },
        {
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Berekent wat een rit kost aan brandstof en hoeveel CO₂ daarbij vrijkomt. Begin een adres te typen en de suggesties staan er meteen.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          image: { ...IMG.fuel, alt: 'FuelTracker terwijl een route tussen twee adressen wordt gepland' },
          secondary: { href: 'https://fueltracker.mehdioul.dev/', label: 'Bekijk de website' },
        },
        {
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: 'Zet je pc op afstand uit via een webpagina. Zit achter een pincode en draait verder onopvallend mee in de system tray.',
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          image: { ...IMG.shutdown, alt: 'De ShutItDown-app met de draaiende server en de shutdown-link' },
        },
      ],
    },
    contact: {
      label: 'Contact',
      line: 'Zoekt stage systeem- en netwerkbeheer.',
      copy: 'Kopieer adres',
      copied: 'Gekopieerd',
      formLink: 'Of stuur een bericht',
    },
    demo: {
      label: 'Probeer het zelf',
      off: 'Zet Node 1 uit',
      on: 'Zet Node 1 weer aan',
      status: {
        idle: 'Node 1 draait, met de VM erop.',
        failing: 'Node 1 is uit. Het cluster merkt het en zoekt een nieuwe plek.',
        moved: 'De VM draait nu op Node 2. Niemand moest iets doen.',
        back: 'Node 1 draait weer, met de VM erop.',
      },
    },
    footer: 'Mehdi Oulad Khlie, Evergem',
  },

  en: {
    nav: { index: 'Contents', close: 'Close', home: 'Mehdi Oulad Khlie, home', language: 'Language' },
    hero: { location: 'Evergem', scroll: 'Scroll', role: 'System and network administration' },
    index: {
      title: 'Contents',
      alsoLabel: 'Also done',
      alsoTitle: 'Intercepted without anyone noticing',
      alsoSubject: 'ARP poisoning and DNS spoofing in a lab',
      pages: { about: 'About', work: 'Side projects', resume: 'CV', contact: 'Contact' },
    },
    projects: {
      label: (n, total) => `Project ${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
      featured: 'Featured',
      read: 'Read the story',
      next: (title) => `Next project: ${title}`,
      backToIndex: 'Back to the contents',
      brief: { task: 'Task', obstacle: 'Obstacle', solution: 'Solution' },
      items: [
        {
          slug: 'palo-alto',
          figure: '5',
          title: 'Palo Alto refused my interface. I built a way around it.',
          shortTitle: 'Palo Alto refused, I built a way around',
          subject: 'Palo Alto firewall for a branch office',
          result: 'A branch firewall set up from scratch, with five subscriptions that keep themselves up to date.',
          brief: {
            task: "Configure the branch office's firewall from scratch, over SSH.",
            obstacle: "Palo Alto won't accept a DHCP interface as the source for DNS and NTP.",
            solution: 'A loopback with a static IP, so the traffic still leaves over WAN.',
          },
          lede: 'A *firewall* is the doorman of a network: it decides what gets in and what gets out. For the branch office in my assignment I set that doorman up myself, from the first connection to automatic updates.',
          sections: [
            {
              title: 'The full approach',
              steps: [
                'First I checked there was *internet*, because without it the rest is pointless. The WAN side got an address over DHCP, a default route was in place and a ping to 8.8.8.8 came back. A Windows client on the LAN side could browse with the firewall as its gateway. That proved my security policy and NAT rule worked.',
                'Next I created *address objects* for LAN-HQ, LAN-BO, DMZ and SERVERS. They are named references to subnets, so in a policy I pick a name instead of typing a range like 10.10.10.0/24 every time.',
                'DNS and NTP had to leave over WAN, not the management interface. The problem: my WAN interface is a DHCP client, and Palo Alto refuses such an interface as the source for *service routes*. My fix was a *loopback interface* with a static IP in the LAN zone. Traffic then leaves the firewall over WAN, gets NAT and reaches the Hogent DNS server. A ping to google.com resolved cleanly.',
                "With the teacher's authorisation code I activated the *licence*. After a reboot every subscription was running.",
                'Without *signatures* a subscription has nothing to compare traffic against, so I pulled them in a fixed order: the content package first, then Antivirus, then WildFire, each through the CLI with download and then install.',
                'URL Filtering works differently. PAN-DB does real-time lookups in the cloud, so there is nothing to download. Finally I set an *auto-update* schedule: Threats weekly on Wednesday at 02:00, Antivirus daily at 02:30 and WildFire every minute.',
              ],
            },
            {
              title: 'Result',
              paragraphs: [
                'Five *subscriptions* run side by side: Threat Prevention, URL Filtering, WildFire, DNS Security and SD-WAN. The firewall keeps itself up to date.',
              ],
            },
          ],
          mistake: {
            title: 'What went wrong',
            body: 'Twice I started the install while the download was still running, and got a FAIL for it. Since then I check with show jobs all that a job has really finished before moving on.',
          },
        },
        {
          slug: 'redundant-netwerk',
          figure: '2',
          title: 'Two of everything, so nothing stops',
          shortTitle: 'Two of everything',
          subject: 'Redundant network infrastructure',
          result: 'A network where every critical role exists twice: if one goes down, the spare takes over.',
          brief: {
            task: 'Build a network that keeps working when a part fails.',
            obstacle: 'A single server, firewall or web server is a single point of failure.',
            solution: 'Everything twice: two DCs, two firewalls, and HAProxy in front of the web servers.',
          },
          lede: '*Redundant* means there is a spare ready for every crucial part, like the spare tyre in a car. I built a network in which nothing is the only one of its kind.',
          sections: [
            {
              title: 'Layout',
              paragraphs: [
                'The network consists of two domain controllers (DC1 and DC2), two firewalls, two web servers, a separate DNS server and two clients.',
              ],
            },
            {
              title: 'The full approach',
              steps: [
                'DC1 runs *Active Directory*, DNS and DHCP. Both domain controllers work and AD replication is correct. DHCP is redundant too, with *Hot Standby failover*. The scope and the DNS zone replicate correctly.',
                'The network is split across two firewalls. Firewall 1 is the primary and connects to the internet, the DMZ and Firewall 2. Firewall 2 handles the server network and the client network.',
                'I spread traffic to the web servers with *HAProxy*. Request the site a few times and it alternates between Web1 and Web2. If one web server goes down, the other takes over.',
              ],
            },
            {
              title: 'The test',
              paragraphs: [
                'In my demo I first check the domain join. Then I ping servers and network components and test reachability through both firewalls. I check Active Directory, DNS and whether BIND9 is running, and do lookups for Server1, Web1 and the DNS server, among others.',
              ],
            },
            {
              title: 'Result',
              paragraphs: [
                'The key parts work: AD replication, DHCP failover, DNS, the network links, routing through the firewalls and *load balancing* across the web servers.',
              ],
            },
          ],
        },
        {
          slug: 'zabbix',
          figure: '5',
          title: 'Five devices, four methods, one dashboard.',
          shortTitle: 'Five devices, one dashboard',
          subject: 'Monitoring with Zabbix',
          result: 'One Zabbix server keeping an eye on five devices through four different methods.',
          brief: {
            task: 'Set up Zabbix and add five hosts, each a different way.',
            obstacle: 'Not every device speaks the same language: agent, SNMP polling or snmpd.',
            solution: 'Pick the right method per host and bring it all together on one dashboard.',
          },
          lede: '*Monitoring* is the security camera of a network. With Zabbix I watch servers, network devices and services: uptime, resource usage and problems as they appear.',
          sections: [
            {
              title: 'The full approach',
              steps: [
                'I installed Zabbix in my host-only network.',
                'I added five hosts under Data collection: a Windows server through the generic *SNMP* service (no agent, pure polling), a Windows server with the *Zabbix agent*, an Ubuntu server with snmpd, an Ubuntu server with the Zabbix agent, and my firewall.',
                'I built a *dashboard* with widgets for connection attempts on my website, host availability, critical problems in the network, disk usage on a server and one widget of my own choosing.',
                'Finally I recorded a video of at most five minutes showing that everything works.',
              ],
            },
            {
              title: 'Result',
              paragraphs: ['All five hosts deliver data and the dashboard shows the network at a glance.'],
            },
          ],
        },
        {
          slug: 'proxmox',
          figure: '1',
          title: 'I pulled the plug. The VM moved by itself.',
          shortTitle: 'Plug pulled, the VM moved',
          subject: 'Proxmox cluster with shared storage',
          result: 'I pulled the plug on a running node and the virtual machine started up again on another one by itself.',
          featured: true,
          brief: {
            task: 'Set up shared storage so VMs can move between nodes.',
            obstacle: 'Local storage ties a VM to one node; high availability cannot work then.',
            solution: 'StarWind vSAN with an HA device and synchronous mirroring across the nodes.',
          },
          lede: 'When a server fails, whatever runs on it should not fall over with it. On my Proxmox cluster I set up *shared storage*, so a virtual machine moves to another server by itself.',
          sections: [
            {
              title: 'The full approach',
              steps: [
                'I downloaded the StarWind Virtual HCI Appliance Free and got a licence file by email. Documentation for StarWind on Proxmox barely exists, so I laid the guides for Proxmox and VMware vSphere side by side. They are close enough to work from.',
                'On every node I imported a *StarWind CVM*, with an extra network interface for management and iSCSI traffic and an extra virtual disk for the shared storage.',
                'In the web interface of each CVM I loaded the licence, added the disk as a storage pool and created an *HA device* with synchronous mirroring.',
                'I compared the storage options that fit the cluster. StarWind won, because it lets VMs migrate *without downtime*.',
              ],
            },
            {
              title: 'The test',
              paragraphs: [
                'I switched off the node running my Linux client *the hard way*, while the VM was running. The VM moved to another node automatically and started up there again.',
              ],
            },
            {
              title: 'Result',
              paragraphs: [
                'One node switched off, and the VM was running again on another without me touching it. That is *high availability* in practice.',
              ],
            },
          ],
          mistake: {
            title: 'What went wrong',
            body: "A container on the shared disk wouldn't work. An iSCSI LUN is block storage without a file system, and LXC containers need exactly that to run. It showed me straight away why block and file storage aren't interchangeable.",
          },
        },
      ],
    },
    about: {
      label: 'About',
      body: "I feel most at home in a Windows environment. I've watched enough PCs and networks break down, and fixed just as many. Alongside my studies I'm working toward my CCNA.",
      facts: [
        { key: 'Now', value: 'Looking for an internship' },
        { key: 'Studying', value: 'Associate Degree, System & Network Administration, HOGENT' },
        { key: 'Certified', value: 'Microsoft 365 Fundamentals (MS-900)' },
        { key: 'Working on', value: 'CCNA Routing & Switching' },
      ],
    },
    work: {
      label: 'Side projects',
      heading: 'Things I built because I needed them myself.',
      read: 'Read the write-up',
      code: 'See it on GitHub',
      items: [
        {
          title: 'Sets',
          stack: 'PWA · Vanilla JS + Supabase',
          description: 'Built for logging your training after the fact, not mid-set. Whatever you type saves to your phone instantly, then syncs to the cloud by itself.',
          href: '/projects/sets',
          external: false,
          image: { ...IMG.sets, alt: 'The Sets workout app on a phone' },
        },
        {
          title: 'Muted',
          stack: 'Windows app · C# .NET 9',
          description: 'My microphone kept catching the sound of my PC fan, so I built a fix. RNNoise cleans up the noise locally, before your voice ever reaches Discord.',
          href: '/projects/muted',
          external: false,
          image: { ...IMG.muted, alt: 'The Muted desktop app showing its noise filter and voice gate' },
        },
        {
          title: 'Visibility Spoofer',
          stack: 'JavaScript · Chrome extension',
          description: 'Tricks the Page Visibility API into reporting a tab as open and focused even while it sits in the background, including iframes that load in afterward.',
          href: 'https://github.com/yyyutakaaa/Visibility-Spoofer',
          external: true,
          image: { ...IMG.spoofer, alt: 'The Visibility Spoofer extension popup, spoofing active' },
        },
        {
          title: 'FuelTracker',
          stack: 'Vue.js · Tailwind · PWA',
          description: 'Calculates what a drive costs in fuel and how much CO₂ it produces. Start typing an address and the suggestions pop up right away.',
          href: 'https://github.com/yyyutakaaa/FuelTracker',
          external: true,
          image: { ...IMG.fuel, alt: 'The FuelTracker site planning a route between two addresses' },
          secondary: { href: 'https://fueltracker.mehdioul.dev/', label: 'Visit the site' },
        },
        {
          title: 'ShutItDown',
          stack: 'C# .NET 6 · ASP.NET Core',
          description: 'Lets you shut your PC down remotely from a web page. Locked behind a PIN, and otherwise it just sits quietly in the system tray.',
          href: 'https://github.com/yyyutakaaa/ShutItDown',
          external: true,
          image: { ...IMG.shutdown, alt: 'The ShutItDown app showing the server running and its shutdown link' },
        },
      ],
    },
    contact: {
      label: 'Contact',
      line: 'Looking for an internship in system and network administration.',
      copy: 'Copy address',
      copied: 'Copied',
      formLink: 'Or send a message',
    },
    demo: {
      label: 'Try it yourself',
      off: 'Switch off Node 1',
      on: 'Switch Node 1 back on',
      status: {
        idle: 'Node 1 is running, with the VM on it.',
        failing: 'Node 1 is off. The cluster notices and looks for a new home.',
        moved: 'The VM now runs on Node 2. Nobody had to do a thing.',
        back: 'Node 1 is running again, with the VM on it.',
      },
    },
    footer: 'Mehdi Oulad Khlie, Evergem',
  },
};
