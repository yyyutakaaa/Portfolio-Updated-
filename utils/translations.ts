import React from 'react';

export const translations = {
  nl: {
    nav: {
      portfolio: "Portfolio",
      resume: "CV / Ervaring",
      contact: "Contact",
      status: "Open voor werk",
    },
    home: {
      role: "Aspirant Systeem- & Netwerkbeheerder",
      location: "EVERGEM, BE",
      localTime: "Lokale tijd",
      featuredProject: {
        label: "Grootste Project",
        title: "Muted",
        description: "Mijn microfoon klonk altijd rammelend door de ventilator van mijn pc, dus bouwde ik hier iets voor. Muted filtert ruis lokaal via RNNoise voordat je stem Discord, Teams of je game bereikt.",
        stack: "WINDOWS APP / C# .NET 9",
        features: ["RNNoise-ruisonderdrukking", "100% lokale verwerking", "Voice gate & virtuele kabel"],
        cta: "Bekijk project"
      },
      secondProject: {
        label: "2de Project",
        title: "Sets",
        description: "Een offline-first workout logger, gebouwd voor na de training, niet ervoor. Loggen schrijft altijd eerst naar je toestel; zonder verbinding wacht de sessie gewoon tot je weer online bent.",
        stack: "PWA / VANILLA JS + SUPABASE",
        features: ["Offline-first met automatische sync", "Live 1RM & PR-detectie", "Installeerbaar als PWA"],
        cta: "Bekijk Sets"
      },
      profile: {
        title: "Profiel",
        text: React.createElement(React.Fragment, null,
          "Ik studeer ",
          React.createElement("span", { className: "text-textMain font-semibold" }, "Systeem- en Netwerkbeheer"),
          " en weet intussen vrij zeker wat ik wil: aan de slag als System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Het liefst werk ik in Windows-omgevingen. Ik heb al heel wat pc's en netwerken zien vastlopen en er minstens evenveel weer aan de praat gekregen, van kapotte drivers tot rare netwerkfouten. Daarnaast haal ik mijn ",
          React.createElement("span", { className: "text-textMain italic serif text-[1.1em]" }, "CCNA"),
          " en volg ik Microsoft-trajecten om dat verder uit te bouwen."
        ),
        cta: "Bekijk volledige CV"
      },
      status: {
        label: "Status",
        gradYear: "AFSTUDEERJAAR",
        available: "BESCHIKBAAR VOOR WERK"
      },
      certified: {
        label: "Gecertificeerd",
        title: "Microsoft 365",
        subtitle: "FUNDAMENTALS (MS-900)"
      },
      skills: {
        label: "Kerncompetenties",
        sysAdmin: "SYSTEEMBEHEER",
        networking: "NETWERKEN",
        cloudOps: "CLOUD & OPS",
        softSkills: "SOFT SKILLS",
        items: {
          sysAdmin: ["Windows Server", "Active Directory", "Virtualisatie (Hyper-V)", "Hardware Troubleshooting"],
          networking: ["CCNA Routing & Switching", "Netwerk Topologie Design", "TCP/IP Protocollen", "Firewall Config"],
          cloudOps: ["Microsoft 365 Admin", "Azure Basis", "Backup Oplossingen", "Voorraadbeheersystemen"],
          softSkills: ["Analytisch Denken", "Team Leiderschap", "Probleemoplossend", "Communicatief"]
        }
      },
      projects: {
        label: "Persoonlijke Projecten",
        items: [
          {
            title: "Visibility Spoofer",
            stack: "JAVASCRIPT / CHROME EXTENSION",
            desc: "Chrome-extensie die de Page Visibility API spooft, zodat een tabblad altijd 'zichtbaar' en gefocust lijkt, ook op de achtergrond. Zit anti-detectie in, houdt rekening met dynamische iframes, en laat niets achter in de console.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "Een PWA die brandstofkosten en CO₂-uitstoot berekent. Adressuggesties werken real-time en de kaarten draaien op Leaflet/OSM.",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "Windows desktop-app om een pc op afstand uit te schakelen via een webinterface. Zit achter een pincode en integreert met de system tray.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "Archiveert je Instagram-DM's: versleuteld, met rate-limiting, een modulaire opzet en export naar JSON of CSV.",
            url: "https://github.com/yyyutakaaa/InstaDM-Saver"
          }
        ]
      },
      education: {
        label: "Academische Achtergrond",
        expected: "VERWACHT 2027",
        degree1: "Graduaat Systeem- en Netwerkbeheer",
        degree2: "Intermedia / Multimedia",
        degree2desc: "Secundair Diploma behaald"
      }
    },
    mutedPage: {
      back: "Terug naar home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Schone microfoon. Duidelijke stem.",
      screenshotAlt: "Screenshot van de Muted-app met RNNoise-filter, voice gate en virtuele-kabel-instellingen",
      intro: "Muted is een Windows-app die ik gebouwd heb nadat ik het beu was om mijn koelventilator te horen tijdens elke Discord-call. De app haalt achtergrondgeluid uit je microfoon voordat het bij Discord, Teams of je spelletje aankomt, en dat gebeurt volledig lokaal op je pc: er gaat niets naar de cloud en er wordt niets opgenomen.",
      deepDive: {
        title: "Onder de motorkap",
        signalPathTitle: "De signaalketen",
        signalPathIntro: "Windows laat een app bestaande microfoons en luidsprekers gebruiken, maar zonder een ondertekende kernel-driver mag een app geen nieuw apparaat aanmaken. Muted werkt daarom met wat er al is: het neemt je echte microfoon, maakt die schoon en geeft het resultaat door aan een virtuele kabel waar je apps naar kunnen luisteren.",
        signalPath: ["Microfoon", "Muted (gain · RNNoise · mix · gate · drift)", "Virtuele kabel in", "Gekoppelde kabel-uitgang", "Discord / Teams / game"],
        frameMathTitle: "De cijfers waar het op draait",
        frameMath: [
          { value: "48 kHz", label: "samplerate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise-vertraging" }
        ],
        points: [
          {
            title: "Geen eigen driver",
            body: "Windows laat een gewone app geen nieuwe microfoon toevoegen aan de apparatenlijst van Discord; daar heb je een ondertekende kernel-driver en een heel ondertekeningsproces voor nodig. Muted slaat dat helemaal over en leent een virtuele audiokabel die al geïnstalleerd is, en voert daar schone audio in. Alles blijft in één gewone user-mode app, er draait niets in de kernel."
          },
          {
            title: "De opnamethread blijft uit de weg",
            body: "De thread die je microfoon uitleest doet maar één ding: de audio naar een buffer kopiëren en verder gaan. Geen filtering, geen locks, geen geheugenallocatie op dat pad. Een tweede thread haalt telkens precies 480 samples op, 10 ms audio, wat de framegrootte is waar RNNoise op rekent."
          },
          {
            title: "Eén frame, van begin tot eind",
            body: "Elk frame krijgt eerst input-gain en splitst dan in tweeën. Eén kopie blijft onaangeroerd, de andere gaat door RNNoise. Omdat RNNoise zelf ongeveer 20 ms vertraging toevoegt, wordt de onaangeroerde kopie evenveel vertraagd zodat ze sample voor sample gelijklopen. Ze worden gemengd volgens een verhouding die jij instelt, een optionele voice gate knipt de stiltes weg op basis van RNNoise's eigen stemdetectie, en daarna volgt de output-gain."
          },
          {
            title: "Twee klokken die het oneens zijn",
            body: "Je microfoon en de virtuele kabel zijn aparte apparaten, elk met zijn eigen klok, en tijdens een lange call lopen ze uit elkaar. Als Muted precies evenveel samples zou wegschrijven als het inleest, zou de buffer langzaam leeglopen of overstromen. Daarom stuurt het honderd keer per seconde één sample meer of minder door, afhankelijk van hoe vol de buffer zit. Eén sample hoor je niet, maar het houdt alles urenlang synchroon."
          },
          {
            title: "Het start niet in je luidsprekers",
            body: "Eén controle heeft niets met geluidskwaliteit te maken. Als Muteds uitgang ooit op je luidsprekers terechtkwam in plaats van op een virtuele kabel, zou het je eigen stem terug de microfoon in voeren en een lus vormen. Daarom checkt het eerst of de uitgang echt een virtuele kabel is, en weigert het te starten als dat niet zo is."
          }
        ]
      },
      howItWorksTitle: "Hoe het werkt",
      howItWorks: [
        "De app vangt je microfoon op 48kHz mono via WASAPI.",
        "Elk blokje van 480 samples (20ms) gaat door het RNNoise-model van Xiph, dat getraind is om stemgeluid van ruis te onderscheiden.",
        "Een optionele voice gate knipt stiltes nog agressiever weg, zodat toetsenbordgeklik of een zoemende ventilator niet doorsijpelt.",
        "Klokdrift wordt gecorrigeerd, zodat de audio ook bij lange sessies synchroon blijft.",
        "Het resultaat gaat naar een virtuele audiokabel, die je vervolgens als microfoon selecteert in Discord, Teams of je game."
      ],
      featuresTitle: "Kernfuncties",
      features: [
        "Ruisonderdrukking in real-time met het officiële RNNoise-model",
        "Alles draait lokaal: geen account, geen cloud, geen opnames",
        "Instelbare dry/wet-mix voor audiokwaliteit",
        "Voice gate voor extra stille stiltes",
        "Automatische detectie van aangesloten audioapparaten",
        "Minimaliseert naar de systeemtray en kan automatisch opstarten"
      ],
      stackTitle: "Gebruikte technologie",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF voor de interface", "NAudio + native RNNoise DLL voor audioverwerking", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Aan de slag",
      installSteps: [
        "Installeer een ondertekende virtuele audiokabel, bijvoorbeeld VB-CABLE.",
        "Herstart Windows als dat gevraagd wordt.",
        "Open Muted en stel je microfoon in als input en de kabel als output.",
        "Kies in Discord, Teams of je game de opnamekant van de kabel als microfoon."
      ],
      limitationsTitle: "Belangrijk om te weten",
      limitations: "RNNoise onderdrukt ruis, maar canceled geen echo. Als je last hebt van galm of echo, gebruik dan een headset of een aparte AEC-oplossing.",
      downloadCta: "Download de pre-release (.exe)",
      downloadNote: "v0.1.0 — alleen Windows, nog in ontwikkeling",
      githubCta: "Bekijk de broncode op GitHub"
    },
    setsPage: {
      back: "Terug naar home",
      badge: "PWA",
      title: "Sets",
      tagline: "Train. Noteer het. Klaar.",
      intro: "Sets is een minimalistische logger voor kracht- en cardiotraining. De filosofie is simpel: je gaat naar de gym, je traint, en je schrijft achteraf op wat je deed. Geen abonnementspop-ups, geen laadschermen. Gewoon een schone PWA.",
      deepDive: {
        title: "Onder de motorkap",
        signalPathTitle: "Hoe een sessie wordt opgeslagen",
        signalPathIntro: "Gyms zitten vaak in een kelder zonder bereik, dus is de app offline-first: een workout loggen schrijft altijd eerst naar je toestel. Zonder verbinding gaat de sessie in een wachtrij en wordt ze automatisch verstuurd zodra je weer online bent.",
        signalPath: ["Workout", "Lokale write (localStorage)", "Outbox bij offline", "Supabase (cloud sync)"],
        frameMathTitle: "De cijfers waar het op draait",
        frameMath: [
          { value: "32 kB", label: "Tailwind CSS, precompiled" },
          { value: "0 ms", label: "leeslatentie uit cache" },
          { value: "3", label: "SQL-migraties" },
          { value: "Epley", label: "1RM-formule" }
        ],
        points: [
          {
            title: "Alles rendert uit cache",
            body: "Elk scherm leest uit een lokale cache per gebruiker (localStorage), dus de app voelt nooit traag aan, ook niet met een slechte verbinding. Bij het inloggen en na elke sync wordt die cache ververst vanuit Supabase."
          },
          {
            title: "Sessies overleven een crash",
            body: "De actieve workout wordt bij elke wijziging automatisch opgeslagen. Killt iOS de app halverwege een sessie op de achtergrond, dan biedt Sets bij de volgende opstart gewoon aan om verder te gaan waar je gebleven was."
          },
          {
            title: "Guest mode is geen doodlopende straat",
            body: "Trainen zonder account slaat gewoon op als een lokaal 'guest'-profiel. Log je later in, dan worden die workouts meegenomen naar je account in plaats van te verdwijnen."
          },
          {
            title: "Wie het laatst synct, wint",
            body: "Er is geen conflictresolutie. Bewerk je dezelfde sessie op twee toestellen die allebei offline waren, dan overschrijft de sync die het laatst binnenkomt de andere. Voor een logboek van je eigen trainingen is dat een afweging die ik kan verantwoorden."
          }
        ]
      },
      howItWorksTitle: "Snel loggen",
      howItWorks: [
        "De app toont je gewichten en reps van de vorige sessie meteen als placeholder in de invoervelden.",
        "Elke set berekent live je geschatte 1RM met de Epley-formule; versla je je record, dan gloeit het veld goud op.",
        "Cardio krijgt eigen velden voor tijd, afstand en calorieën.",
        "Tik op het setnummer om het te taggen als warm-up, working set, drop set of tot falen; warm-ups tellen niet mee voor volume of PR's.",
        "RPE per set is optioneel te activeren en verfijnt de 1RM-schatting op basis van reps in reserve."
      ],
      featuresTitle: "Kernfuncties",
      features: [
        "Dashboard met trainingsvolume, PR's en trendgrafieken van de laatste 7 sessies",
        "Bronze-, silver- en goldbadges met hardware-versnelde gloed-effecten",
        "Instelbare plaatcalculator per gym en per eenheid",
        "Gewichten in kg of lbs door de hele app, met kg als opslageenheid",
        "Licht/donker thema en volledige Nederlandse en Engelse vertaling",
        "Backup als JSON via de instellingen, of via de SetsDB-console"
      ],
      stackTitle: "Gebruikte technologie",
      stack: [
        "Vanilla ES6+ JavaScript, zonder bundler",
        "Tailwind CSS, precompiled tot één static bestand",
        "Supabase voor auth, database en cloud-sync (met row-level security)",
        "PWA met een offline-first localStorage-cache en outbox"
      ],
      installTitle: "Installeren als PWA",
      installSteps: [
        "Open sets.ink in Safari (iOS) of Chrome (Android).",
        "Tik op het deel-icoon en kies 'Zet op beginscherm'.",
        "De app opent voortaan volledig scherm, zonder browserbalk, alsof het een native app is."
      ],
      limitationsTitle: "Belangrijk om te weten",
      limitations: "Guest-data blijft alleen op je toestel tot je inlogt: de app opnieuw installeren zonder account verliest die historie. En omdat er geen conflictresolutie is, wint bij het bewerken van dezelfde sessie op twee offline toestellen gewoon wie het laatst synct.",
      openCta: "Open Sets",
      openNote: "sets.ink — gratis te gebruiken, installeerbaar als PWA"
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "PROFESSIONELE ERVARING & ACHTERGROND",
      download: "Download PDF",
      experienceTitle: "Werkervaring",
      educationTitle: "Opleiding",
      jobs: [
        {
          role: "Magazijnier (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - HEDEN",
          description: [
            "Sorteer producten per rit, zodat collega's ze kunnen inscannen en bij de juiste klant afleveren.",
            "Scan er ondertussen ook zelf producten bij wanneer dat nodig is.",
            "Houd het magazijn overzichtelijk en netjes."
          ]
        },
        {
          role: "Assistent Voorraadbeheer (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OKT 2025",
          description: [
            "Verificatie van fysieke voorraadniveaus ten opzichte van digitale systemen.",
            "Direct rapporteren en oplossen van overschotten of tekorten.",
            "Magazijnorganisatie en nauwkeurige inventarisregistratie om logistieke fouten te voorkomen.",
            "Werken in een sector met verse producten waar snelheid en precisie cruciaal zijn."
          ]
        },
        {
          role: "Logistiek Assistent (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - HEDEN",
          description: [
            "Dispatching & Coördinatie: Centraal aanspreekpunt voor goederenstroom en transportdocumentatie.",
            "Orderpicking: Gebruik van scansystemen voor efficiënte orderverwerking onder strakke deadlines.",
            "Routeverdeling: Sorteren van goederen voor regionale distributiepaden."
          ]
        },
        {
          role: "Verkoopmedewerker (Student)",
          company: "Lidl België & Luxemburg | Gent",
          period: "AUG 2022 - OKT 2023",
          description: [
            "Verantwoordelijk voor kassa, voorraadbeheer en de bakkerijafdeling, in een omgeving waar het altijd druk was. Daar leerde ik vooral om snel te schakelen tussen taken zonder dat de klantvriendelijkheid eronder leed."
          ]
        },
        {
          role: "Horecamedewerker (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "Ondersteuning van het keukenteam en handhaven van hygiënestandaarden tijdens het hoogseizoen."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Graduaat Systeem- en Netwerkbeheer",
          period: "2025 - 2027 (Verwacht)",
          description: "Focus op enterprise netwerken, serverbeheer en cloud infrastructuren."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "Secundair diploma behaald met focus op IT en multimedia."
        }
      ],
      languages: {
        title: "Talenkennis",
        dutch: "Nederlands",
        arabic: "Arabisch",
        english: "Engels",
        french: "Frans",
        native: "MOEDERTAAL",
        fluent: "VLOEIEND",
        basic: "BASIS"
      },
      contact: {
        title: "Contact Info"
      }
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "LAST UPDATED: JUNE 10, 2026",
      backToHome: "Terug naar Home",
      introParagraph: "Deze privacyverklaring legt uit welke gegevens via deze portfolio website kunnen worden verwerkt, waarom dat gebeurt en welke externe diensten daarbij betrokken kunnen zijn.",
      sections: [
        {
          heading: "Wie Beheert Deze Website",
          paragraphs: [
            "Deze website is de persoonlijke portfolio van Mehdi Oulad Khlie. De website wordt gebruikt om projecten, ervaring, contactgegevens en professionele profielen te tonen.",
            "Voor vragen over deze privacyverklaring of over gegevens die je via de website verstuurt, kun je contact opnemen via de contactpagina."
          ]
        },
        {
          heading: "Gegevens Via Het Contactformulier",
          paragraphs: [
            "Wanneer je het contactformulier gebruikt, worden de gegevens die je zelf invult verzonden zodat ik op je bericht kan reageren.",
            "Het formulier verwerkt de volgende gegevens:"
          ],
          items: [
            "Naam",
            "E-mailadres",
            "Onderwerp",
            "Berichtinhoud",
            "Technische verzendgegevens die door de formulierdienst kunnen worden verwerkt, zoals tijdstip, IP-adres, browser- of netwerkgegevens"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "Het contactformulier verstuurt berichten via Web3Forms, een externe formulierdienst. Daardoor worden formulierinzendingen naar Web3Forms verzonden voordat ze bij mij aankomen.",
            "Gebruik het formulier alleen als je akkoord bent dat de ingevulde gegevens door Web3Forms worden verwerkt voor het afleveren van je bericht."
          ]
        },
        {
          heading: "Externe Links En Diensten",
          paragraphs: [
            "Deze website bevat links naar externe diensten zoals GitHub, LinkedIn, Instagram, Credly en projectrepositories. Als je zo'n link opent, geldt het privacybeleid van die externe dienst.",
            "De website kan externe resources laden, zoals lettertypen of hosting-assets. Deze externe partijen kunnen technische gegevens verwerken die nodig zijn om hun dienst te leveren."
          ]
        },
        {
          heading: "Cookies En Analytics",
          paragraphs: [
            "In de huidige codebase is geen analytics-provider geconfigureerd en de website plaatst zelf geen marketingcookies.",
            "Als analytics later worden toegevoegd, kan een analytics-provider technische gebruiksgegevens verwerken, zoals bezochte pagina's, apparaat- of browserinformatie en algemene interactiedata. Deze privacyverklaring moet dan worden bijgewerkt."
          ]
        },
        {
          heading: "Bewaartermijn",
          paragraphs: [
            "Berichten die via het contactformulier binnenkomen, worden alleen bewaard zolang dat redelijk nodig is om je vraag te beantwoorden, opvolging te doen of relevante communicatie bij te houden.",
            "Je kunt vragen om eerdere communicatie te laten verwijderen, tenzij er een legitieme reden is om die nog te bewaren."
          ]
        },
        {
          heading: "Jouw Rechten",
          paragraphs: [
            "Afhankelijk van de toepasselijke privacywetgeving kun je vragen om inzage, correctie of verwijdering van persoonsgegevens die je via deze website hebt verstrekt.",
            "Omdat dit een persoonlijke portfolio is, worden gegevens beperkt gehouden tot wat nodig is voor contact en professionele communicatie."
          ]
        },
        {
          heading: "Beveiliging",
          paragraphs: [
            "Ik ga zorgvuldig om met gegevens die via de website worden verstuurd, maar geen enkele online verzending of externe dienst kan absolute beveiliging garanderen.",
            "Stuur daarom geen gevoelige gegevens, wachtwoorden, financiële informatie of vertrouwelijke documenten via het contactformulier."
          ]
        },
        {
          heading: "Wijzigingen",
          paragraphs: [
            "Deze privacyverklaring kan worden aangepast wanneer de website, het contactformulier of gebruikte externe diensten veranderen.",
            "De datum bovenaan deze pagina geeft aan wanneer de tekst voor het laatst is bijgewerkt."
          ]
        }
      ],
      contact: {
        heading: "Contact",
        text: "Heb je vragen over deze privacyverklaring, neem dan contact op via:",
        url: "https://www.mehdioul.dev/#/contact"
      }
    }
  },
  en: {
    nav: {
      portfolio: "Portfolio",
      resume: "CV / Resume",
      contact: "Contact",
      status: "Open to work",
    },
    home: {
      role: "Aspiring System & Network Administrator",
      location: "EVERGEM, BE",
      localTime: "Local Time",
      featuredProject: {
        label: "Flagship Project",
        title: "Muted",
        description: "My mic always picked up my PC's fan noise, so I built something for it. Muted filters noise locally through RNNoise before your voice reaches Discord, Teams, or your game.",
        stack: "WINDOWS APP / C# .NET 9",
        features: ["RNNoise noise suppression", "100% local processing", "Voice gate & virtual cable"],
        cta: "View project"
      },
      secondProject: {
        label: "2nd Project",
        title: "Sets",
        description: "An offline-first workout logger, built for after training, not during it. Logging always writes to your device first; without a connection the session just waits until you're back online.",
        stack: "PWA / VANILLA JS + SUPABASE",
        features: ["Offline-first with automatic sync", "Live 1RM & PR detection", "Installable as a PWA"],
        cta: "View Sets"
      },
      profile: {
        title: "Profile",
        text: React.createElement(React.Fragment, null,
          "I'm studying ",
          React.createElement("span", { className: "text-textMain font-semibold" }, "System and Network Administration"),
          ", and by now I know what I want: to work as a System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "I prefer working in Windows environments. I've watched plenty of PCs and networks fall over and gotten just as many running again, from broken drivers to weird network faults. On the side, I'm working toward my ",
          React.createElement("span", { className: "text-textMain italic serif text-[1.1em]" }, "CCNA"),
          " and taking Microsoft courses to build on that."
        ),
        cta: "View Full Resume"
      },
      status: {
        label: "Status",
        gradYear: "GRADUATION YEAR",
        available: "AVAILABLE FOR HIRE"
      },
      certified: {
        label: "Certified",
        title: "Microsoft 365",
        subtitle: "FUNDAMENTALS (MS-900)"
      },
      skills: {
        label: "Core Competencies",
        sysAdmin: "SYSTEM ADMIN",
        networking: "NETWORKING",
        cloudOps: "CLOUD & OPS",
        softSkills: "SOFT SKILLS",
        items: {
          sysAdmin: ["Windows Server", "Active Directory", "Virtualization (Hyper-V)", "Hardware Troubleshooting"],
          networking: ["CCNA Routing & Switching", "Network Topology Design", "TCP/IP Protocols", "Firewall Config"],
          cloudOps: ["Microsoft 365 Admin", "Azure Basics", "Backup Solutions", "Inventory Systems"],
          softSkills: ["Analytical Thinking", "Team Leadership", "Problem Solving", "Communicative"]
        }
      },
      projects: {
        label: "Personal Projects",
        items: [
          {
            title: "Visibility Spoofer",
            stack: "JAVASCRIPT / CHROME EXTENSION",
            desc: "A Chrome extension that spoofs the Page Visibility API so a tab always looks 'visible' and focused, even in the background. Has anti-detection built in, handles dynamic iframes, and stays quiet in the console.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "A PWA that calculates fuel costs and CO₂ emissions. Address autocomplete runs in real time, and the maps are built on Leaflet/OSM.",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "A Windows desktop app that shuts your PC down remotely through a web interface. Locked behind a PIN code, with system tray integration.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "Archives your Instagram DMs: encrypted, rate-limited, modular, and exportable to JSON or CSV.",
            url: "https://github.com/yyyutakaaa/InstaDM-Saver"
          }
        ]
      },
      education: {
        label: "Academic Background",
        expected: "EXPECTED 2027",
        degree1: "Associate Degree System & Network Admin",
        degree2: "Intermedia / Multimedia",
        degree2desc: "Secondary Diploma Obtained"
      }
    },
    mutedPage: {
      back: "Back to home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Clean mic. Clear voice.",
      screenshotAlt: "Screenshot of the Muted app showing the RNNoise filter, voice gate, and virtual cable settings",
      intro: "Muted is a Windows app I built after getting tired of hearing my PC's cooling fan on every Discord call. It strips background noise from your mic before it reaches Discord, Teams, or your game, all processed locally on your PC: nothing goes to the cloud, nothing gets recorded.",
      deepDive: {
        title: "Under the hood",
        signalPathTitle: "The signal path",
        signalPathIntro: "Windows lets an app use microphones and speakers that already exist, but it won't let one publish a brand-new device without a signed kernel driver. Muted works with what's there instead: it takes your real mic, cleans it up, and hands the result to a virtual cable your apps can listen to.",
        signalPath: ["Microphone", "Muted (gain · RNNoise · mix · gate · drift)", "Virtual cable in", "Cable's paired output", "Discord / Teams / game"],
        frameMathTitle: "The numbers it runs on",
        frameMath: [
          { value: "48 kHz", label: "sample rate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise delay" }
        ],
        points: [
          {
            title: "No driver of its own",
            body: "Windows won't let a normal app add a new microphone to Discord's device list; that needs a signed kernel driver and a whole signing process. Muted skips all of it and borrows a virtual audio cable that's already installed, feeding clean audio into it. Everything stays in one regular user-mode app, nothing runs in the kernel."
          },
          {
            title: "The capture thread stays out of the way",
            body: "The thread reading your mic does one thing: copy the audio into a buffer and move on. No filtering, no locks, no memory allocation on that path. A second thread pulls exactly 480 samples at a time, 10 ms of audio, which is the frame size RNNoise expects."
          },
          {
            title: "One frame, start to finish",
            body: "Each frame gets input gain, then splits in two. One copy stays untouched, the other goes through RNNoise. Because RNNoise adds about 20 ms of its own delay, the untouched copy is held back by the same amount so the two line up sample for sample. They're blended by a ratio you set, an optional voice gate trims the gaps using RNNoise's own voice detection, and then output gain is applied."
          },
          {
            title: "Two clocks that don't agree",
            body: "Your mic and the virtual cable are separate devices, each with its own clock, and over a long call they drift apart. If Muted wrote exactly as many samples as it read, the buffer would slowly run dry or overflow. So a hundred times a second it emits one sample more or fewer depending on how full the buffer is. You can't hear a single sample, but it keeps everything aligned for hours."
          },
          {
            title: "It won't start into your speakers",
            body: "One check has nothing to do with sound quality. If Muted's output ever landed on your speakers instead of a virtual cable, it would feed your own voice back into the mic and loop. So it verifies the output really is a virtual cable before it starts, and refuses to run if it isn't."
          }
        ]
      },
      howItWorksTitle: "How it works",
      howItWorks: [
        "The app captures your mic at 48kHz mono through WASAPI.",
        "Every 480-sample chunk (20ms) runs through Xiph's RNNoise model, trained to tell voice apart from noise.",
        "An optional voice gate cuts silence more aggressively so keyboard clatter or fan hum doesn't leak through.",
        "Clock drift gets corrected so audio stays in sync during long sessions.",
        "The cleaned output goes to a virtual audio cable, which you then select as your mic in Discord, Teams, or your game."
      ],
      featuresTitle: "Core features",
      features: [
        "Real-time noise suppression using the official RNNoise model",
        "Runs entirely locally: no account, no cloud, no recordings",
        "Adjustable dry/wet mix for audio quality",
        "Voice gate for extra-quiet silences",
        "Automatic detection of connected audio devices",
        "Minimizes to the system tray and can autostart"
      ],
      stackTitle: "Tech stack",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF for the interface", "NAudio + native RNNoise DLL for audio processing", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Getting started",
      installSteps: [
        "Install a signed virtual audio cable, e.g. VB-CABLE.",
        "Restart Windows if prompted.",
        "Open Muted and set your mic as input and the cable as output.",
        "In Discord, Teams, or your game, pick the cable's recording side as your microphone."
      ],
      limitationsTitle: "Worth knowing",
      limitations: "RNNoise suppresses noise but doesn't cancel echo. If you're dealing with room echo, use a headset or a dedicated AEC solution.",
      downloadCta: "Download the pre-release (.exe)",
      downloadNote: "v0.1.0 — Windows only, still in development",
      githubCta: "View source on GitHub"
    },
    setsPage: {
      back: "Back to home",
      badge: "PWA",
      title: "Sets",
      tagline: "Train. Log it. Done.",
      intro: "Sets is a minimalist logger for strength and cardio training. The philosophy is simple: you go to the gym, you train, and you write down what you did afterward. No subscription prompts, no loading screens. Just a clean PWA.",
      deepDive: {
        title: "Under the hood",
        signalPathTitle: "How a session gets saved",
        signalPathIntro: "Gyms tend to be basements with no signal, so the app is offline-first: logging a workout always writes to your device first. Without a connection the session gets queued and pushed to the cloud automatically once you're back online.",
        signalPath: ["Workout", "Local write (localStorage)", "Outbox if offline", "Supabase (cloud sync)"],
        frameMathTitle: "The numbers it runs on",
        frameMath: [
          { value: "32 kB", label: "precompiled Tailwind CSS" },
          { value: "0 ms", label: "read latency from cache" },
          { value: "3", label: "SQL migrations" },
          { value: "Epley", label: "1RM formula" }
        ],
        points: [
          {
            title: "Everything renders from cache",
            body: "Every screen reads from a per-user local cache (localStorage), so the app never feels slow, even on a bad connection. That cache gets refreshed from Supabase on login and after every sync."
          },
          {
            title: "Sessions survive a crash",
            body: "The active workout autosaves on every change. If iOS kills the app in the background mid-session, Sets just offers to resume where you left off on next launch."
          },
          {
            title: "Guest mode isn't a dead end",
            body: "Training without an account saves to a local 'guest' profile. Sign in later and those workouts get migrated into your account instead of disappearing."
          },
          {
            title: "Last sync wins",
            body: "There's no conflict resolution. Edit the same session on two devices that were both offline, and whichever one syncs last overwrites the other. For a personal training log, that's a trade-off I can live with."
          }
        ]
      },
      howItWorksTitle: "Fast logging",
      howItWorks: [
        "The app shows your weights and reps from the last session directly as placeholders in the inputs.",
        "Every set calculates your estimated 1RM live using the Epley formula; beat your record and the field glows gold.",
        "Cardio gets its own fields for time, distance, and calories.",
        "Tap a set's number to tag it as warm-up, working, drop set, or to-failure; warm-ups are excluded from volume and PR detection.",
        "RPE per set is optional and sharpens the 1RM estimate using reps in reserve."
      ],
      featuresTitle: "Core features",
      features: [
        "Dashboard with training volume, PRs, and trend charts from the last 7 sessions",
        "Bronze, silver, and gold badges with hardware-accelerated glow effects",
        "Configurable plate calculator per gym and per unit",
        "Weights in kg or lbs throughout the app, with kg as the canonical storage unit",
        "Light/dark theme and full Dutch and English translations",
        "JSON backup from the settings sheet, or through the SetsDB console"
      ],
      stackTitle: "Tech stack",
      stack: [
        "Vanilla ES6+ JavaScript, no bundler",
        "Tailwind CSS, precompiled into a single static file",
        "Supabase for auth, database, and cloud sync (with row-level security)",
        "PWA with an offline-first localStorage cache and outbox"
      ],
      installTitle: "Installing as a PWA",
      installSteps: [
        "Open sets.ink in Safari (iOS) or Chrome (Android).",
        "Tap the share icon and choose Add to Home Screen.",
        "From then on it opens full-screen, no browser bar, like a native app."
      ],
      limitationsTitle: "Worth knowing",
      limitations: "Guest data stays on your device until you sign in: reinstalling without an account loses that history. And since there's no conflict resolution, editing the same session on two offline devices means whichever one syncs last wins.",
      openCta: "Open Sets",
      openNote: "sets.ink — free to use, installable as a PWA"
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "PROFESSIONAL EXPERIENCE & BACKGROUND",
      download: "Download PDF",
      experienceTitle: "Work Experience",
      educationTitle: "Education",
      jobs: [
        {
          role: "Warehouse Assistant (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - PRESENT",
          description: [
            "Sort products by delivery route so colleagues can scan them in and get them to the right customer.",
            "Also handle scanning myself whenever it's needed.",
            "Keep the warehouse tidy and organized."
          ]
        },
        {
          role: "Inventory Management Assistant (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OCT 2025",
          description: [
            "Verification of physical stock levels against digital systems.",
            "Direct reporting and resolution of surpluses or shortages.",
            "Warehouse organization and accurate inventory recording to prevent logistical errors.",
            "Working in a fresh produce sector where speed and precision are crucial."
          ]
        },
        {
          role: "Logistics Assistant (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - PRESENT",
          description: [
            "Dispatching & Coordination: Central point of contact for goods flow and transport documentation.",
            "Order Picking: Using scanning systems for efficient order processing under tight deadlines.",
            "Route Distribution: Sorting goods for regional distribution paths."
          ]
        },
        {
          role: "Sales Associate (Student)",
          company: "Lidl Belgium & Luxembourg | Gent",
          period: "AUG 2022 - OCT 2023",
          description: [
            "Responsible for checkout, stock management, and the bakery department in a store that was rarely quiet. Learned to switch between tasks fast without letting customer service slip."
          ]
        },
        {
          role: "Hospitality Staff (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "Supporting the kitchen team and maintaining hygiene standards during peak season."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Associate Degree System & Network Administration",
          period: "2025 - 2027 (Expected)",
          description: "Focus on enterprise networks, server management, and cloud infrastructures."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "Secondary diploma obtained with a focus on IT and multimedia."
        }
      ],
      languages: {
        title: "Languages",
        dutch: "Dutch",
        arabic: "Arabic",
        english: "English",
        french: "French",
        native: "NATIVE",
        fluent: "FLUENT",
        basic: "BASIC"
      },
      contact: {
        title: "Contact Info"
      }
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "LAST UPDATED: JUNE 10, 2026",
      backToHome: "Back to Home",
      introParagraph: "This privacy policy explains what data may be processed through this portfolio website, why it may be processed, and which external services may be involved.",
      sections: [
        {
          heading: "Who Runs This Website",
          paragraphs: [
            "This website is the personal portfolio of Mehdi Oulad Khlie. It is used to present projects, experience, contact details, and professional profiles.",
            "For questions about this privacy policy or about data you submit through the website, you can contact me through the contact page."
          ]
        },
        {
          heading: "Data Submitted Through The Contact Form",
          paragraphs: [
            "When you use the contact form, the information you choose to submit is sent so I can read and respond to your message.",
            "The form processes the following data:"
          ],
          items: [
            "Name",
            "Email address",
            "Subject",
            "Message content",
            "Technical delivery data that may be processed by the form provider, such as timestamp, IP address, browser data, or network data"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "The contact form sends messages through Web3Forms, an external form service. This means form submissions are sent to Web3Forms before they are delivered to me.",
            "Only use the form if you agree that the submitted information may be processed by Web3Forms for message delivery."
          ]
        },
        {
          heading: "External Links And Services",
          paragraphs: [
            "This website links to external services such as GitHub, LinkedIn, Instagram, Credly, and project repositories. When you open one of those links, the privacy policy of that external service applies.",
            "The website may load external resources, such as fonts or hosting assets. Those external parties may process technical data needed to provide their service."
          ]
        },
        {
          heading: "Cookies And Analytics",
          paragraphs: [
            "No analytics provider is configured in the current codebase, and the website itself does not set marketing cookies.",
            "If analytics are added later, an analytics provider may process technical usage data, such as visited pages, device or browser information, and general interaction data. This privacy policy should be updated if that happens."
          ]
        },
        {
          heading: "Retention",
          paragraphs: [
            "Messages received through the contact form are kept only as long as reasonably needed to answer your question, follow up, or keep relevant communication records.",
            "You can ask for previous communication to be deleted unless there is a legitimate reason to keep it."
          ]
        },
        {
          heading: "Your Rights",
          paragraphs: [
            "Depending on applicable privacy law, you may ask to access, correct, or delete personal data you have submitted through this website.",
            "Because this is a personal portfolio, data is kept limited to what is needed for contact and professional communication."
          ]
        },
        {
          heading: "Security",
          paragraphs: [
            "I take reasonable care with data submitted through the website, but no online transmission or external service can guarantee absolute security.",
            "Do not send sensitive data, passwords, financial information, or confidential documents through the contact form."
          ]
        },
        {
          heading: "Changes",
          paragraphs: [
            "This privacy policy may be updated when the website, contact form, or external services change.",
            "The date at the top of this page shows when the text was last updated."
          ]
        }
      ],
      contact: {
        heading: "Contact",
        text: "If you have questions about this privacy policy, contact me through:",
        url: "https://www.mehdioul.dev/#/contact"
      }
    }
  }
};
