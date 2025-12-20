import React from 'react';

export const translations = {
  nl: {
    nav: {
      portfolio: "Portfolio",
      resume: "CV / Ervaring",
      status: "Open voor werk",
    },
    home: {
      role: "Aspirant Systeem- & Netwerkbeheerder",
      location: "EVERGEM, BE",
      localTime: "Lokale tijd",
      profile: {
        title: "Profiel",
        text: React.createElement(React.Fragment, null,
          "Ik ben een gemotiveerde student ",
          React.createElement("span", { className: "text-white font-medium" }, "Systeem- en Netwerkbeheer"),
          " met één duidelijk doel: werken als System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Ik werk graag met Windows omgevingen en heb ruime ervaring met het troubleshooten van hardware en software. Mijn ambitie reikt verder dan mijn diploma; ik focus op specialisatie via ",
          React.createElement("span", { className: "text-white font-mono text-sm border border-border px-1" }, "CCNA"),
          " en Microsoft-trajecten."
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
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "Een moderne PWA voor het berekenen van brandstofkosten en CO₂-uitstoot met real-time adressuggesties en interactieve kaarten (Leaflet/OSM).",
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
            desc: "Professionele tool voor het archiveren van Instagram DM's. Bevat encryptie, rate-limiting, modulaire architectuur en export naar JSON/CSV.",
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
    resume: {
      title: "Curriculum Vitae",
      subtitle: "PROFESSIONELE ERVARING & ACHTERGROND",
      download: "Download PDF",
      experienceTitle: "Werkervaring",
      educationTitle: "Opleiding",
      jobs: [
        {
          role: "Assistent Voorraadbeheer (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - HEDEN",
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
      title: "Privacybeleid",
      lastUpdated: "Laatst bijgewerkt: 20 december 2025",
      p1: "Deze website verzamelt, bewaart of verwerkt geen persoonlijke informatie. Er worden geen cookies, analysetools, volgsystemen of diensten van derden gebruikt.",
      p2: "Indien u rechtstreeks contact met mij opneemt (bijvoorbeeld per e-mail), wordt de door u verstrekte informatie alleen gebruikt om op uw bericht te reageren en wordt deze niet met derden gedeeld.",
      contactTitle: "Contacteer Ons",
      contactText: "Als u vragen heeft over dit privacybeleid, kunt u contact met ons opnemen:",
      byEmail: "Via e-mail: mehdi.ouladkhlie@outlook.be"
    }
  },
  en: {
    nav: {
      portfolio: "Portfolio",
      resume: "CV / Resume",
      status: "Open to work",
    },
    home: {
      role: "Aspiring System & Network Administrator",
      location: "EVERGEM, BE",
      localTime: "Local Time",
      profile: {
        title: "Profile",
        text: React.createElement(React.Fragment, null,
          "I am a motivated ",
          React.createElement("span", { className: "text-white font-medium" }, "System and Network Administration"),
          " student with one clear goal: working as a System Administrator.",
          React.createElement("br", null),
          React.createElement("br", null),
          "I enjoy working with Windows environments and have extensive experience troubleshooting hardware and software. My ambition extends beyond my degree; I focus on specialization via ",
          React.createElement("span", { className: "text-white font-mono text-sm border border-border px-1" }, "CCNA"),
          " and Microsoft tracks."
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
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "A modern PWA for calculating fuel costs and CO₂ emissions featuring real-time address autocomplete and interactive maps (Leaflet/OSM).",
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
            desc: "Professional tool for fetching and archiving Instagram DMs. Features encryption, rate-limiting, modular architecture, and JSON/CSV exports.",
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
    resume: {
      title: "Curriculum Vitae",
      subtitle: "PROFESSIONAL EXPERIENCE & BACKGROUND",
      download: "Download PDF",
      experienceTitle: "Work Experience",
      educationTitle: "Education",
      jobs: [
        {
          role: "Inventory Management Assistant (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - PRESENT",
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
      lastUpdated: "Last updated: December 20, 2025",
      p1: "This website does not collect, store, or process any personal information. No cookies, analytics tools, tracking scripts, or third‑party services are used.",
      p2: "If you contact me directly (for example by email), any information you provide will be used only to respond to your message and will not be shared with third parties.",
      contactTitle: "Contact Us",
      contactText: "If you have any questions about this Privacy Policy, You can contact us:",
      byEmail: "By email: mehdi.ouladkhlie@outlook.be"
    }
  }
};