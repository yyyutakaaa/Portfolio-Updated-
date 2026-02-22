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
        label: "Nieuw Project",
        title: "SilentStream",
        description: "Een krachtige Windows-applicatie voor intelligente audio-ruisonderdrukking en routing.",
        stack: "RUST / WINDOWS / EGUI",
        features: ["AI Ruisonderdrukking", "Microfoon Routing", "System Tray Integratie"],
        cta: "Bekijk op GitHub"
      },
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
      title: "Privacy Policy",
      lastUpdated: "LAST UPDATED: FEBRUARY 22, 2026",
      backToHome: "Terug naar Home",
      introParagraph: "This Privacy Policy describes the policies and procedures of the developer (\"I\", \"me\", \"my\") regarding the Visibility Spoofer Chrome extension (\"the Extension\", \"the Service\") and explains your privacy rights and how the law protects you.",
      interpretation: {
        heading: "Interpretation and Definitions",
        subHeading1: "Interpretation",
        text1: "The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
        subHeading2: "Definitions",
        definitions: [
          { term: "Developer", meaning: "refers to the individual developer, based in Belgium." },
          { term: "Country", meaning: "refers to Belgium." },
          { term: "Device", meaning: "means any device that can access the Service such as a computer, a cell phone or a digital tablet." },
          { term: "Extension", meaning: "refers to the Visibility Spoofer Chrome browser extension." },
          { term: "Personal Data", meaning: "is any information that relates to an identified or identifiable individual." },
          { term: "Service", meaning: "refers to the Extension." },
          { term: "You", meaning: "means the individual accessing or using the Service." }
        ]
      },
      noCollection: {
        heading: "No Collection of Personal Data",
        text1: "Visibility Spoofer does not collect, store, transmit, or share any personal data or usage data of any kind. The Extension operates entirely within your local browser and does not communicate with any external servers or third parties.",
        text2: "Specifically, the Extension does not collect:",
        items: [
          "Personal identification information (name, email address, phone number, etc.)",
          "Browsing history or web activity",
          "IP addresses or device identifiers",
          "Location data",
          "Authentication or verification data",
          "Financial or payment information",
          "Personal communications",
          "Cookies or tracking technologies",
          "Analytics or usage statistics",
          "Website content or user-generated content"
        ]
      },
      howItWorks: {
        heading: "How the Extension Works",
        text: "The Extension injects a script into web pages at the time they load in order to override the browser's Page Visibility API. This causes websites to always perceive the tab as active and focused. All processing happens exclusively within your local browser environment. No data is read, recorded, or transmitted at any point during this process."
      },
      noTracking: {
        heading: "No Use of Tracking Technologies",
        text: "The Extension does not use cookies, web beacons, pixel tags, analytics scripts, or any other tracking technologies. No session data or persistent data is written to your device by the Extension."
      },
      noThirdParty: {
        heading: "No Third-Party Sharing",
        text: "Since no data is collected, no data is shared with or sold to any third party, including advertisers, analytics providers, business partners, or affiliates."
      },
      gdpr: {
        heading: "GDPR – General Data Protection Regulation",
        text1: "As the developer of this Extension is based in Belgium (European Union), I am committed to complying with the General Data Protection Regulation (GDPR). Since no personal data is collected, processed, or stored by the Extension, there is no data processing activity subject to GDPR obligations.",
        text2: "Under the GDPR, you have the following rights. While these rights are not applicable in practice since I collect no data, I acknowledge them fully:",
        rights: [
          { name: "The right to access", desc: "You have the right to request copies of any personal data I hold about you." },
          { name: "The right to rectification", desc: "You have the right to request correction of any inaccurate personal data." },
          { name: "The right to erasure", desc: "You have the right to request deletion of your personal data." },
          { name: "The right to restrict processing", desc: "You have the right to request that I restrict the processing of your personal data." },
          { name: "The right to data portability", desc: "You have the right to request transfer of your personal data to another organization or directly to you." },
          { name: "The right to object", desc: "You have the right to object to my processing of your personal data." }
        ],
        text3: "Since no personal data is collected, none of the above rights are triggered in practice. If you have any concerns, you may contact me at any time."
      },
      children: {
        heading: "Children's Privacy",
        text: "The Extension does not collect any data from any user, including children under the age of 16. The Extension is safe for use by anyone. If you are a parent or guardian and have concerns about the use of this Extension by a child, feel free to contact me."
      },
      security: {
        heading: "Security",
        text: "Since no personal data is collected or transmitted, there is no personal data at risk. The Extension does not establish any network connections, does not write data to external storage, and does not interact with any server infrastructure."
      },
      links: {
        heading: "Links to Other Websites",
        text: "The Extension or website may contain links to other websites not operated by me. I strongly advise you to review the Privacy Policy of every site you visit. I have no control over and assume no responsibility for the content or privacy practices of any third-party sites."
      },
      changes: {
        heading: "Changes to This Privacy Policy",
        text: "I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date. You are advised to review this Privacy Policy periodically for any changes."
      },
      contact: {
        heading: "Contact Me",
        text: "If you have any questions about this Privacy Policy, you can contact me by visiting:"
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
        label: "New Project",
        title: "SilentStream",
        description: "A powerful Windows application for intelligent audio noise suppression and routing.",
        stack: "RUST / WINDOWS / EGUI",
        features: ["AI Noise Suppression", "Microphone Routing", "System Tray Integration"],
        cta: "View on GitHub"
      },
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
      lastUpdated: "LAST UPDATED: FEBRUARY 22, 2026",
      backToHome: "Back to Home",
      introParagraph: "This Privacy Policy describes the policies and procedures of the developer (\"I\", \"me\", \"my\") regarding the Visibility Spoofer Chrome extension (\"the Extension\", \"the Service\") and explains your privacy rights and how the law protects you.",
      interpretation: {
        heading: "Interpretation and Definitions",
        subHeading1: "Interpretation",
        text1: "The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.",
        subHeading2: "Definitions",
        definitions: [
          { term: "Developer", meaning: "refers to the individual developer, based in Belgium." },
          { term: "Country", meaning: "refers to Belgium." },
          { term: "Device", meaning: "means any device that can access the Service such as a computer, a cell phone or a digital tablet." },
          { term: "Extension", meaning: "refers to the Visibility Spoofer Chrome browser extension." },
          { term: "Personal Data", meaning: "is any information that relates to an identified or identifiable individual." },
          { term: "Service", meaning: "refers to the Extension." },
          { term: "You", meaning: "means the individual accessing or using the Service." }
        ]
      },
      noCollection: {
        heading: "No Collection of Personal Data",
        text1: "Visibility Spoofer does not collect, store, transmit, or share any personal data or usage data of any kind. The Extension operates entirely within your local browser and does not communicate with any external servers or third parties.",
        text2: "Specifically, the Extension does not collect:",
        items: [
          "Personal identification information (name, email address, phone number, etc.)",
          "Browsing history or web activity",
          "IP addresses or device identifiers",
          "Location data",
          "Authentication or verification data",
          "Financial or payment information",
          "Personal communications",
          "Cookies or tracking technologies",
          "Analytics or usage statistics",
          "Website content or user-generated content"
        ]
      },
      howItWorks: {
        heading: "How the Extension Works",
        text: "The Extension injects a script into web pages at the time they load in order to override the browser's Page Visibility API. This causes websites to always perceive the tab as active and focused. All processing happens exclusively within your local browser environment. No data is read, recorded, or transmitted at any point during this process."
      },
      noTracking: {
        heading: "No Use of Tracking Technologies",
        text: "The Extension does not use cookies, web beacons, pixel tags, analytics scripts, or any other tracking technologies. No session data or persistent data is written to your device by the Extension."
      },
      noThirdParty: {
        heading: "No Third-Party Sharing",
        text: "Since no data is collected, no data is shared with or sold to any third party, including advertisers, analytics providers, business partners, or affiliates."
      },
      gdpr: {
        heading: "GDPR – General Data Protection Regulation",
        text1: "As the developer of this Extension is based in Belgium (European Union), I am committed to complying with the General Data Protection Regulation (GDPR). Since no personal data is collected, processed, or stored by the Extension, there is no data processing activity subject to GDPR obligations.",
        text2: "Under the GDPR, you have the following rights. While these rights are not applicable in practice since I collect no data, I acknowledge them fully:",
        rights: [
          { name: "The right to access", desc: "You have the right to request copies of any personal data I hold about you." },
          { name: "The right to rectification", desc: "You have the right to request correction of any inaccurate personal data." },
          { name: "The right to erasure", desc: "You have the right to request deletion of your personal data." },
          { name: "The right to restrict processing", desc: "You have the right to request that I restrict the processing of your personal data." },
          { name: "The right to data portability", desc: "You have the right to request transfer of your personal data to another organization or directly to you." },
          { name: "The right to object", desc: "You have the right to object to my processing of your personal data." }
        ],
        text3: "Since no personal data is collected, none of the above rights are triggered in practice. If you have any concerns, you may contact me at any time."
      },
      children: {
        heading: "Children's Privacy",
        text: "The Extension does not collect any data from any user, including children under the age of 16. The Extension is safe for use by anyone. If you are a parent or guardian and have concerns about the use of this Extension by a child, feel free to contact me."
      },
      security: {
        heading: "Security",
        text: "Since no personal data is collected or transmitted, there is no personal data at risk. The Extension does not establish any network connections, does not write data to external storage, and does not interact with any server infrastructure."
      },
      links: {
        heading: "Links to Other Websites",
        text: "The Extension or website may contain links to other websites not operated by me. I strongly advise you to review the Privacy Policy of every site you visit. I have no control over and assume no responsibility for the content or privacy practices of any third-party sites."
      },
      changes: {
        heading: "Changes to This Privacy Policy",
        text: "I may update this Privacy Policy from time to time. I will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date. You are advised to review this Privacy Policy periodically for any changes."
      },
      contact: {
        heading: "Contact Me",
        text: "If you have any questions about this Privacy Policy, you can contact me by visiting:"
      }
    }
  }
};