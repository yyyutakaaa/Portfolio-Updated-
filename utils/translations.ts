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
        title: "Grimdelve",
        description: "Een klein singleplayer RPG waar ik in mijn eigen tijd aan bouw: een dorpje vol NPC's, dagelijkse boss-fights, errands en een talentboom die stiekem groter wordt dan gepland.",
        stack: "2D RPG / SOLO PROJECT",
        features: ["Pixel-art dorp", "Dagelijkse boss-fights", "Talentbomen"],
        cta: "Nog geheim, meer volgt",
        previewLabel: "PREVIEW GEBLOKKEERD"
      },
      profile: {
        title: "Profiel",
        text: React.createElement(React.Fragment, null,
          "Ik studeer ",
          React.createElement("span", { className: "text-white font-medium" }, "Systeem- en Netwerkbeheer"),
          " en weet intussen vrij zeker wat ik wil: aan de slag als System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Het liefst werk ik in Windows-omgevingen. Ik heb al heel wat pc's en netwerken zien vastlopen en er minstens evenveel weer aan de praat gekregen, van kapotte drivers tot rare netwerkfouten. Daarnaast haal ik mijn ",
          React.createElement("span", { className: "text-white font-mono text-sm border border-border px-1" }, "CCNA"),
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
            desc: "Chrome-extensie die de Page Visibility API spooft, zodat een tabblad altijd 'zichtbaar' en gefocust blijft, ook op de achtergrond. Met anti-detectie, bescherming voor dynamische iframes en geen console-output.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "PWA voor het berekenen van brandstofkosten en CO₂-uitstoot, met real-time adressuggesties en interactieve kaarten (Leaflet/OSM).",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "Windows desktop app om een PC op afstand uit te schakelen via een webinterface, beveiligd met PIN-code verificatie en system tray integratie.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "Tool om Instagram DM's te archiveren, met encryptie, rate-limiting, een modulaire opzet en export naar JSON/CSV.",
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
            "Verantwoordelijk voor kassa, voorraadbeheer en de bakkerijafdeling. Focus op efficiëntie en klantvriendelijkheid in een drukke omgeving. Ontwikkeling van sterke multitasking vaardigheden."
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
        title: "Grimdelve",
        description: "A small singleplayer RPG I'm building in my spare time: a town full of NPCs, daily boss fights, errands, and a talent tree that keeps growing bigger than planned.",
        stack: "2D RPG / SOLO PROJECT",
        features: ["Pixel-art town", "Daily boss fights", "Talent trees"],
        cta: "Still a secret, more soon",
        previewLabel: "PREVIEW LOCKED"
      },
      profile: {
        title: "Profile",
        text: React.createElement(React.Fragment, null,
          "I'm studying ",
          React.createElement("span", { className: "text-white font-medium" }, "System and Network Administration"),
          ", and by now I know what I want: to work as a System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "I prefer working in Windows environments. I've watched plenty of PCs and networks fall over and gotten just as many running again, from broken drivers to weird network faults. On the side, I'm working toward my ",
          React.createElement("span", { className: "text-white font-mono text-sm border border-border px-1" }, "CCNA"),
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
            desc: "Chrome extension that spoofs the Page Visibility API, so a tab stays 'visible' and focused even in the background. Includes anti-detection, protection for dynamic iframes, and zero console output.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "A PWA for calculating fuel costs and CO₂ emissions, with real-time address autocomplete and interactive maps (Leaflet/OSM).",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "Windows desktop app to remotely shut down your PC via a web interface, secured with PIN code protection and system tray integration.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "A tool for fetching and archiving Instagram DMs, with encryption, rate-limiting, a modular setup, and JSON/CSV export.",
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
            "Responsible for checkout, stock management, and the bakery department. Focus on efficiency and customer service in a busy environment. Development of strong multitasking skills."
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
