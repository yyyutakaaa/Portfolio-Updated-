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
      role: "Systeem- en netwerkbeheerder in opleiding",
      location: "EVERGEM, BE",
      localTime: "Lokale tijd",
      featuredProject: {
        label: "Grootste project",
        title: "Sets",
        description: "Een app om je workouts in te typen na je training, niet tijdens. Wat je intikt staat meteen op je gsm en gaat daarna naar de cloud, dus je sessies staan op al je toestellen.",
        stack: "PWA / VANILLA JS + SUPABASE",
        features: ["Synct zelf naar de cloud", "Live 1RM en PR-detectie", "Zet je op je beginscherm"],
        cta: "Bekijk Sets"
      },
      secondProject: {
        label: "2de project",
        title: "Muted",
        description: "Mijn micro pikte constant de ventilator van mijn pc op, dus heb ik er zelf iets voor gemaakt. Muted haalt die ruis eruit met RNNoise, op je eigen pc, voor je stem bij Discord, Teams of je game aankomt.",
        stack: "WINDOWS APP / C# .NET 9",
        features: ["Ruis eruit met RNNoise", "Draait volledig op je eigen pc", "Voice gate en virtuele kabel"],
        cta: "Bekijk project"
      },
      profile: {
        title: "Profiel",
        text: React.createElement(React.Fragment, null,
          "Ik studeer ",
          React.createElement("span", { className: "text-textMain font-semibold" }, "Systeem- en Netwerkbeheer"),
          " en ik weet ondertussen goed wat ik wil doen: aan de slag als systeembeheerder.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Windows-omgevingen liggen me het best. Ik heb al veel pc's en netwerken zien vastlopen en er evenveel terug aan de praat gekregen, van drivers die het opgeven tot netwerkfouten waar je eerst niks van snapt. Daarnaast ben ik bezig met mijn ",
          React.createElement("span", { className: "mono text-textMain text-[0.88em] tracking-[0.04em]" }, "CCNA"),
          " en volg ik Microsoft-trajecten om daarop verder te bouwen."
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
        label: "Waar ik mee werk",
        sysAdmin: "SYSTEEMBEHEER",
        networking: "NETWERKEN",
        cloudOps: "CLOUD & OPS",
        softSkills: "SOFT SKILLS",
        items: {
          sysAdmin: ["Windows Server", "Active Directory", "Virtualisatie (Hyper-V)", "Hardware fixen"],
          networking: ["CCNA Routing & Switching", "Netwerken uittekenen", "TCP/IP", "Firewalls instellen"],
          cloudOps: ["Microsoft 365 Admin", "Azure basis", "Backups", "Voorraadsystemen"],
          softSkills: ["Analytisch denken", "Een team trekken", "Problemen oplossen", "Duidelijk communiceren"]
        }
      },
      projects: {
        label: "Persoonlijke projecten",
        items: [
          {
            title: "Visibility Spoofer",
            stack: "JAVASCRIPT / CHROME EXTENSION",
            desc: "Chrome-extensie die de Page Visibility API spooft, zodat een tabblad open en gefocust lijkt terwijl het op de achtergrond staat. Er zit anti-detectie in, iframes die later laden pikt hij ook mee, en in de console zie je er niks van.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "Een PWA die uitrekent wat een rit je kost aan brandstof en hoeveel CO₂ eraan hangt. Je typt een adres en de suggesties komen meteen. De kaarten draaien op Leaflet/OSM.",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "Windows-app om je pc van op afstand af te zetten via een webpagina. Zit achter een pincode en draait gewoon mee in de system tray.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "Slaat je Instagram-DM's op zodat je ze bijhoudt. Alles staat versleuteld, het script houdt zich aan de rate limits, en je exporteert naar JSON of CSV.",
            url: "https://github.com/yyyutakaaa/InstaDM-Saver"
          }
        ]
      },
      education: {
        label: "Opleiding",
        expected: "VERWACHT 2027",
        degree1: "Graduaat Systeem- en Netwerkbeheer",
        degree2: "Intermedia / Multimedia",
        degree2desc: "Secundair diploma behaald"
      }
    },
    mutedPage: {
      back: "Terug naar home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Propere micro, duidelijke stem.",
      screenshotAlt: "Screenshot van de Muted-app met het RNNoise-filter, de voice gate en de instellingen voor de virtuele kabel",
      intro: "Muted is een Windows-app die ik gemaakt heb omdat ik het beu was dat heel Discord mijn ventilator hoorde. Het haalt achtergrondgeluid uit je micro voor het bij Discord, Teams of je game aankomt. Alles gebeurt op je eigen pc: er gaat niks naar een server en er wordt niks opgenomen.",
      deepDive: {
        title: "Onder de motorkap",
        signalPathTitle: "De weg die je stem aflegt",
        signalPathIntro: "Windows laat een app wel de micro's en boxen gebruiken die er al staan, maar een nieuw apparaat aanmaken mag niet zonder ondertekende kernel-driver. Muted doet het dus met wat er al is: het pakt je echte micro, maakt die proper, en zet het resultaat op een virtuele kabel waar je apps naar kunnen luisteren.",
        signalPath: ["Microfoon", "Muted (gain · RNNoise · mix · gate · drift)", "Virtuele kabel in", "Gekoppelde kabel-uitgang", "Discord / Teams / game"],
        frameMathTitle: "De cijfers erachter",
        frameMath: [
          { value: "48 kHz", label: "samplerate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise-vertraging" }
        ],
        points: [
          {
            title: "Geen eigen driver",
            body: "Een gewone app mag van Windows geen nieuwe micro toevoegen aan de lijst die Discord te zien krijgt. Daar heb je een ondertekende kernel-driver voor nodig, plus het hele ondertekeningsproces dat erbij hoort. Muted slaat dat over en leent een virtuele audiokabel die je al geïnstalleerd hebt, en voert daar propere audio in. Alles blijft in één gewone user-mode app, er draait niks in de kernel."
          },
          {
            title: "De opnamethread doet bijna niks",
            body: "De thread die je micro uitleest doet maar één ding: de audio in een buffer kopiëren en verder gaan. Geen filtering, geen locks, geen geheugen dat daar wordt aangevraagd. Een tweede thread haalt er telkens precies 480 samples uit, goed voor 10 ms audio, want dat is de framegrootte waar RNNoise op rekent."
          },
          {
            title: "Eén frame, van begin tot eind",
            body: "Elk frame krijgt eerst input-gain en splitst dan in twee. De ene kopie blijft zoals ze is, de andere gaat door RNNoise. RNNoise voegt zelf ongeveer 20 ms vertraging toe, dus de onaangeroerde kopie wordt evenveel opgehouden zodat ze sample per sample gelijk lopen. Daarna gaan ze samen volgens de verhouding die jij instelt, knipt een optionele voice gate de stiltes eruit op basis van RNNoise's eigen stemdetectie, en gaat de output-gain erover."
          },
          {
            title: "Twee klokken die niet gelijk lopen",
            body: "Je micro en de virtuele kabel zijn twee aparte apparaten met elk hun eigen klok, en tijdens een lange call lopen die uit elkaar. Zou Muted precies evenveel samples wegschrijven als het inleest, dan loopt de buffer stilaan leeg of net over. Daarom stuurt het honderd keer per seconde één sample meer of minder door, afhankelijk van hoe vol de buffer staat. Eén sample hoor je niet, maar zo blijft alles uren aan een stuk gelijk lopen."
          },
          {
            title: "Het start niet in je boxen",
            body: "Eén controle heeft niks met geluidskwaliteit te maken. Als de uitgang van Muted op je boxen zou staan in plaats van op een virtuele kabel, dan komt je eigen stem terug in je micro en heb je een lus. Daarom checkt de app eerst of de uitgang echt een virtuele kabel is, en start hij gewoon niet als dat niet klopt."
          }
        ]
      },
      howItWorksTitle: "Hoe het werkt",
      howItWorks: [
        "De app vangt je micro op in 48kHz mono via WASAPI.",
        "Elk blokje van 480 samples (20ms) gaat door het RNNoise-model van Xiph, dat getraind is om stem van ruis te onderscheiden.",
        "Zet je de voice gate aan, dan knipt die de stiltes er nog strakker uit, zodat je toetsenbord of een zoemende ventilator er niet doorkomt.",
        "De app corrigeert klokdrift, zodat het ook na een lange sessie nog gelijk loopt.",
        "Het resultaat gaat naar een virtuele audiokabel, en die kies je dan als micro in Discord, Teams of je game."
      ],
      featuresTitle: "Wat het doet",
      features: [
        "Ruis eruit terwijl je praat, met het officiële RNNoise-model",
        "Draait volledig op je eigen pc: geen account, geen cloud, geen opnames",
        "Je stelt zelf in hoeveel filter je wil met de dry/wet-mix",
        "Voice gate voor stiltes die echt stil zijn",
        "Vindt zelf de audioapparaten die aangesloten zijn",
        "Gaat naar de systeemtray en kan mee opstarten met Windows"
      ],
      stackTitle: "Waarmee het gebouwd is",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF voor de interface", "NAudio + native RNNoise DLL voor de audio", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Aan de slag",
      installSteps: [
        "Installeer een ondertekende virtuele audiokabel, bijvoorbeeld VB-CABLE.",
        "Herstart Windows als hij daarom vraagt.",
        "Open Muted en zet je micro als input en de kabel als output.",
        "Kies in Discord, Teams of je game de opnamekant van die kabel als micro."
      ],
      limitationsTitle: "Dat moet je wel weten",
      limitations: "RNNoise haalt ruis weg, maar geen echo. Zit je in een kamer die galmt, gebruik dan een headset of iets dat echt aan echo-onderdrukking doet.",
      downloadCta: "Download de pre-release (.exe)",
      downloadNote: "v0.1.0, alleen Windows, nog volop in de maak",
      githubCta: "Bekijk de code op GitHub"
    },
    setsPage: {
      back: "Terug naar home",
      badge: "PWA",
      title: "Sets",
      tagline: "Trainen, opschrijven, klaar.",
      intro: "Sets is een simpele app om bij te houden wat je in de gym doet, krachttraining en cardio. Je gaat trainen, en achteraf typ je in wat je gedaan hebt. Geen abonnement en geen laadschermen die je ophouden. Je zet hem in een paar tikken op je gsm en je bent vertrokken.",
      deepDive: {
        title: "Onder de motorkap",
        intro: "Dit stuk moet je niet lezen om de app te gebruiken. Het staat er voor wie wil weten hoe het vanbinnen in elkaar zit.",
        signalPathTitle: "Hoe een sessie wordt opgeslagen",
        signalPathIntro: "Wat je intikt gaat eerst naar je gsm zelf, dus het staat meteen vast en het scherm moet niet zitten wachten op een antwoord. Daarna gaat de sessie naar de cloud, zodat je data ook op je andere toestellen staat zonder dat jij daar iets voor moet doen.",
        signalPath: ["Workout", "Lokale write (localStorage)", "Supabase (cloud sync)"],
        frameMathTitle: "Wat dat in de praktijk betekent",
        frameMath: [
          { value: "Meteen", label: "je data staat er zonder wachten" },
          { value: "Sync", label: "je sessies staan op al je toestellen" },
          { value: "Live", label: "je 1RM verschijnt terwijl je nog typt" },
          { value: "Auto", label: "je workout bewaart zichzelf" }
        ],
        points: [
          {
            title: "Alles staat er direct",
            body: "Elk scherm toont je gegevens meteen, omdat de app een kopie op je gsm bijhoudt in plaats van alles opnieuw op te halen. Die kopie wordt op de achtergrond bijgewerkt wanneer je inlogt."
          },
          {
            title: "Een crash kost je niks",
            body: "De workout waar je mee bezig bent wordt bij elke wijziging bewaard. Sluit iOS de app af midden in je sessie, dan vraagt Sets de volgende keer gewoon of je verder wil waar je gestopt was."
          },
          {
            title: "Zonder account kun je ook gewoon trainen",
            body: "Train je zonder in te loggen, dan blijft dat op je gsm staan. Maak je later toch een account, dan neemt de app die workouts mee in plaats van ze te laten vallen."
          }
        ]
      },
      howItWorksTitle: "Snel loggen",
      howItWorks: [
        "De app zet je gewichten en reps van de vorige keer al als placeholder in de velden.",
        "Bij elke set berekent hij live je geschatte 1RM met de Epley-formule. Ga je over je record, dan gloeit het veld goud op.",
        "Cardio krijgt eigen velden voor tijd, afstand en calorieën.",
        "Tik op het setnummer om het te taggen als warm-up, working set, drop set of tot falen. Warm-ups tellen niet mee voor je volume of je PR's.",
        "RPE per set kun je aanzetten als je dat wil. Dan wordt je 1RM-schatting scherper op basis van je reps in reserve."
      ],
      featuresTitle: "Wat het doet",
      features: [
        "Dashboard met je volume, je PR's en grafieken van je laatste 7 sessies",
        "Bronzen, zilveren en gouden badges die oplichten wanneer je ze haalt",
        "Plaatcalculator die je per gym en per eenheid instelt",
        "Kg of lbs, kies zelf: de app rekent het om",
        "Licht of donker thema, en volledig in het Nederlands en het Engels",
        "Eén tik in de instellingen en je hebt een backup van al je data"
      ],
      stackTitle: "Waarmee het gebouwd is",
      stack: [
        "Vanilla ES6+ JavaScript, zonder bundler",
        "Tailwind CSS, op voorhand gecompileerd tot één static bestand",
        "Supabase voor login, database en cloud sync (met row-level security)",
        "PWA met een localStorage-cache zodat de schermen meteen laden"
      ],
      installTitle: "Sets op je gsm zetten",
      installSteps: [
        "Open sets.ink in Safari (iOS) of Chrome (Android).",
        "Tik op het deel-icoon en kies 'Zet op beginscherm'.",
        "Vanaf dan opent hij volledig scherm, zonder browserbalk, alsof het een gewone app is."
      ],
      limitationsTitle: "Dat moet je wel weten",
      limitations: "Train je zonder account, dan staat die data alleen op je gsm. Gooi je de app weg voor je inlogt, dan ben je die historie kwijt. En bewerk je dezelfde training op twee toestellen, dan wint de versie die het laatst gesynct is.",
      openCta: "Open Sets",
      openNote: "sets.ink, gratis, en in een paar tikken op je gsm gezet",
      galleryTitle: "In de app",
      gallery: ["Vandaag", "Workout loggen", "Voeding", "Social", "Progressie", "Geschiedenis"]
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "WAT IK TOT NU TOE GEDAAN HEB",
      download: "Download PDF",
      experienceTitle: "Werkervaring",
      educationTitle: "Opleiding",
      jobs: [
        {
          role: "Magazijnier (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - HEDEN",
          description: [
            "Ik sorteer de producten per rit, zodat mijn collega's ze kunnen inscannen en bij de juiste klant krijgen.",
            "Als het nodig is, scan ik zelf mee.",
            "En ik hou het magazijn opgeruimd."
          ]
        },
        {
          role: "Assistent Voorraadbeheer (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OKT 2025",
          description: [
            "Ik telde de stock in het magazijn na en vergeleek dat met wat het systeem zei.",
            "Klopte er iets niet, dan gaf ik dat meteen door en zocht ik mee uit waar het misgelopen was.",
            "Ik hield het magazijn geordend en schreef alles precies bij, zodat er verderop geen fouten uit voortkwamen.",
            "Het gaat om verse producten, dus alles moest snel én juist gebeuren."
          ]
        },
        {
          role: "Logistiek Assistent (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - HEDEN",
          description: [
            "Ik ben het aanspreekpunt voor de goederenstroom en de transportpapieren.",
            "Orders picken met de scanner, meestal met een vertrektijd die niet opschuift.",
            "En ik sorteer de goederen per regio, zodat elke rit meekrijgt wat erbij hoort."
          ]
        },
        {
          role: "Verkoopmedewerker (Student)",
          company: "Lidl België & Luxemburg | Gent",
          period: "AUG 2022 - OKT 2023",
          description: [
            "Kassa, stock en de bakkerij, in een winkel waar het bijna nooit rustig was. Daar heb ik vooral geleerd om snel te wisselen tussen taken en toch vriendelijk te blijven tegen de klanten."
          ]
        },
        {
          role: "Horecamedewerker (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "Ik hielp mee in de keuken tijdens het hoogseizoen en zorgde dat alles proper bleef volgens de hygiëneregels."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Graduaat Systeem- en Netwerkbeheer",
          period: "2025 - 2027 (Verwacht)",
          description: "Hier zit ik nu. Het gaat vooral over bedrijfsnetwerken, servers beheren en cloud."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "Mijn secundair, richting IT en multimedia."
        }
      ],
      languages: {
        title: "Talen",
        dutch: "Nederlands",
        arabic: "Arabisch",
        english: "Engels",
        french: "Frans",
        native: "MOEDERTAAL",
        fluent: "VLOEIEND",
        basic: "BASIS"
      },
      contact: {
        title: "Contactgegevens"
      }
    },
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "LAATST BIJGEWERKT: 10 JUNI 2026",
      backToHome: "Terug naar home",
      introParagraph: "Deze privacyverklaring legt uit welke gegevens via deze portfoliowebsite verwerkt kunnen worden, waarom dat gebeurt, en welke externe diensten daarbij betrokken zijn.",
      sections: [
        {
          heading: "Wie beheert deze website",
          paragraphs: [
            "Deze website is de persoonlijke portfolio van Mehdi Oulad Khlie. Ze toont projecten, ervaring, contactgegevens en professionele profielen.",
            "Heb je vragen over deze privacyverklaring of over gegevens die je via de website verstuurt, neem dan contact op via de contactpagina."
          ]
        },
        {
          heading: "Gegevens via het contactformulier",
          paragraphs: [
            "Wanneer je het contactformulier gebruikt, worden de gegevens die je zelf invult verstuurd zodat ik op je bericht kan antwoorden.",
            "Het formulier verwerkt de volgende gegevens:"
          ],
          items: [
            "Naam",
            "E-mailadres",
            "Onderwerp",
            "Berichtinhoud",
            "Technische verzendgegevens die de formulierdienst kan verwerken, zoals tijdstip, IP-adres, browser- of netwerkgegevens"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "Het contactformulier verstuurt berichten via Web3Forms, een externe formulierdienst. Je inzending gaat dus eerst naar Web3Forms voor ze bij mij aankomt.",
            "Gebruik het formulier alleen als je ermee akkoord gaat dat Web3Forms de ingevulde gegevens verwerkt om je bericht af te leveren."
          ]
        },
        {
          heading: "Externe links en diensten",
          paragraphs: [
            "Deze website bevat links naar externe diensten zoals GitHub, LinkedIn, Instagram, Credly en projectrepositories. Open je zo'n link, dan geldt het privacybeleid van die dienst.",
            "De website kan externe bestanden laden, zoals lettertypen of hosting-assets. Die externe partijen kunnen technische gegevens verwerken die ze nodig hebben om hun dienst te leveren."
          ]
        },
        {
          heading: "Cookies en analytics",
          paragraphs: [
            "In de huidige codebase staat geen analytics-provider ingesteld, en de website plaatst zelf geen marketingcookies.",
            "Als er later analytics bijkomen, kan een analytics-provider technische gebruiksgegevens verwerken, zoals bezochte pagina's, apparaat- of browserinformatie en algemene interactiedata. Deze privacyverklaring moet dan bijgewerkt worden."
          ]
        },
        {
          heading: "Bewaartermijn",
          paragraphs: [
            "Berichten die via het contactformulier binnenkomen, blijven alleen bewaard zolang dat nodig is om je vraag te beantwoorden, op te volgen of relevante communicatie bij te houden.",
            "Je kunt vragen om eerdere communicatie te laten verwijderen, tenzij er een legitieme reden is om die nog te bewaren."
          ]
        },
        {
          heading: "Jouw rechten",
          paragraphs: [
            "Afhankelijk van de toepasselijke privacywetgeving kun je vragen om inzage, correctie of verwijdering van persoonsgegevens die je via deze website hebt doorgegeven.",
            "Omdat dit een persoonlijke portfolio is, blijven de gegevens beperkt tot wat nodig is voor contact en professionele communicatie."
          ]
        },
        {
          heading: "Beveiliging",
          paragraphs: [
            "Ik ga zorgvuldig om met gegevens die via de website verstuurd worden, maar geen enkele online verzending of externe dienst kan absolute beveiliging garanderen.",
            "Stuur daarom geen gevoelige gegevens, wachtwoorden, financiële informatie of vertrouwelijke documenten via het contactformulier."
          ]
        },
        {
          heading: "Wijzigingen",
          paragraphs: [
            "Deze privacyverklaring kan aangepast worden wanneer de website, het contactformulier of de gebruikte externe diensten veranderen.",
            "De datum bovenaan deze pagina toont wanneer de tekst voor het laatst is bijgewerkt."
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
      role: "System and network admin in training",
      location: "EVERGEM, BE",
      localTime: "Local Time",
      featuredProject: {
        label: "Biggest project",
        title: "Sets",
        description: "An app for typing in your workouts after training, not during. What you type lands on your phone right away and then goes to the cloud, so your sessions are on all your devices.",
        stack: "PWA / VANILLA JS + SUPABASE",
        features: ["Syncs to the cloud by itself", "Live 1RM and PR detection", "Add it to your home screen"],
        cta: "View Sets"
      },
      secondProject: {
        label: "2nd project",
        title: "Muted",
        description: "My mic kept picking up my PC fan, so I built something for it myself. Muted strips that noise out with RNNoise, on your own PC, before your voice reaches Discord, Teams, or your game.",
        stack: "WINDOWS APP / C# .NET 9",
        features: ["Noise gone with RNNoise", "Runs entirely on your own PC", "Voice gate and virtual cable"],
        cta: "View project"
      },
      profile: {
        title: "Profile",
        text: React.createElement(React.Fragment, null,
          "I'm studying ",
          React.createElement("span", { className: "text-textMain font-semibold" }, "System and Network Administration"),
          ", and by now I know what I want to do: work as a sysadmin.",
          React.createElement("br", null),
          React.createElement("br", null),
          "Windows environments suit me best. I've seen plenty of PCs and networks fall over and got just as many running again, from drivers that give up to network errors that make no sense at first. On the side I'm working on my ",
          React.createElement("span", { className: "mono text-textMain text-[0.88em] tracking-[0.04em]" }, "CCNA"),
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
        label: "What I work with",
        sysAdmin: "SYSTEM ADMIN",
        networking: "NETWORKING",
        cloudOps: "CLOUD & OPS",
        softSkills: "SOFT SKILLS",
        items: {
          sysAdmin: ["Windows Server", "Active Directory", "Virtualization (Hyper-V)", "Fixing hardware"],
          networking: ["CCNA Routing & Switching", "Mapping out networks", "TCP/IP", "Setting up firewalls"],
          cloudOps: ["Microsoft 365 Admin", "Azure basics", "Backups", "Inventory systems"],
          softSkills: ["Analytical thinking", "Leading a team", "Solving problems", "Communicating clearly"]
        }
      },
      projects: {
        label: "Personal projects",
        items: [
          {
            title: "Visibility Spoofer",
            stack: "JAVASCRIPT / CHROME EXTENSION",
            desc: "A Chrome extension that spoofs the Page Visibility API so a tab looks open and focused while it's sitting in the background. There's anti-detection in there, it picks up iframes that load later, and you see nothing of it in the console.",
            url: "https://github.com/yyyutakaaa/Visibility-Spoofer"
          },
          {
            title: "FuelTracker PWA",
            stack: "VUE.JS / TAILWIND / PWA",
            desc: "A PWA that works out what a trip costs you in fuel and how much CO₂ comes with it. You type an address and the suggestions show up right away. The maps run on Leaflet/OSM.",
            url: "https://github.com/yyyutakaaa/FuelTracker"
          },
          {
            title: "ShutItDown Server",
            stack: "C# .NET 6 / ASP.NET CORE",
            desc: "A Windows app for shutting your PC down remotely through a web page. Sits behind a PIN code and just runs along in the system tray.",
            url: "https://github.com/yyyutakaaa/ShutItDown"
          },
          {
            title: "InstaDM-Saver v2.0",
            stack: "PYTHON / CRYPTOGRAPHY",
            desc: "Saves your Instagram DMs so you keep them. Everything is encrypted, the script sticks to the rate limits, and you export to JSON or CSV.",
            url: "https://github.com/yyyutakaaa/InstaDM-Saver"
          }
        ]
      },
      education: {
        label: "Education",
        expected: "EXPECTED 2027",
        degree1: "Associate Degree System & Network Admin",
        degree2: "Intermedia / Multimedia",
        degree2desc: "Secondary diploma obtained"
      }
    },
    mutedPage: {
      back: "Back to home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Clean mic, clear voice.",
      screenshotAlt: "Screenshot of the Muted app with the RNNoise filter, the voice gate, and the virtual cable settings",
      intro: "Muted is a Windows app I built because I was sick of everyone on Discord hearing my cooling fan. It strips background noise out of your mic before it reaches Discord, Teams, or your game. All of it happens on your own PC: nothing goes to a server and nothing gets recorded.",
      deepDive: {
        title: "Under the hood",
        signalPathTitle: "The route your voice takes",
        signalPathIntro: "Windows lets an app use the mics and speakers that are already there, but you can't create a new device without a signed kernel driver. So Muted works with what's around: it takes your real mic, cleans it up, and hands the result to a virtual cable your apps can listen to.",
        signalPath: ["Microphone", "Muted (gain · RNNoise · mix · gate · drift)", "Virtual cable in", "Cable's paired output", "Discord / Teams / game"],
        frameMathTitle: "The numbers behind it",
        frameMath: [
          { value: "48 kHz", label: "sample rate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise delay" }
        ],
        points: [
          {
            title: "No driver of its own",
            body: "Windows won't let a normal app add a new mic to the list Discord gets to see. That takes a signed kernel driver, plus the whole signing process that comes with it. Muted skips all that and borrows a virtual audio cable you already have installed, feeding clean audio into it. Everything stays in one regular user-mode app, nothing runs in the kernel."
          },
          {
            title: "The capture thread does almost nothing",
            body: "The thread reading your mic does one thing: copy the audio into a buffer and move on. No filtering, no locks, no memory being allocated there. A second thread pulls exactly 480 samples at a time, worth 10 ms of audio, because that's the frame size RNNoise counts on."
          },
          {
            title: "One frame, start to finish",
            body: "Each frame gets input gain and then splits in two. One copy stays as it is, the other goes through RNNoise. RNNoise adds about 20 ms of delay itself, so the untouched copy is held back by the same amount to keep them lined up sample for sample. Then they get mixed at the ratio you set, an optional voice gate trims the gaps using RNNoise's own voice detection, and output gain goes over it."
          },
          {
            title: "Two clocks that don't agree",
            body: "Your mic and the virtual cable are two separate devices with their own clocks, and over a long call they drift apart. If Muted wrote exactly as many samples as it read, the buffer would slowly run dry or overflow. So a hundred times a second it sends one sample more or fewer, depending on how full the buffer is. You can't hear a single sample, but it keeps everything lined up for hours."
          },
          {
            title: "It won't start into your speakers",
            body: "One check has nothing to do with sound quality. If Muted's output ended up on your speakers instead of a virtual cable, your own voice would come back into the mic and you'd have a loop. So the app checks first whether the output really is a virtual cable, and just won't start if it isn't."
          }
        ]
      },
      howItWorksTitle: "How it works",
      howItWorks: [
        "The app captures your mic in 48kHz mono through WASAPI.",
        "Every 480-sample chunk (20ms) runs through Xiph's RNNoise model, which is trained to tell voice apart from noise.",
        "Turn the voice gate on and it trims the gaps even tighter, so your keyboard or a humming fan doesn't get through.",
        "The app corrects clock drift, so it's still lined up after a long session.",
        "The result goes to a virtual audio cable, and you pick that as your mic in Discord, Teams, or your game."
      ],
      featuresTitle: "What it does",
      features: [
        "Noise gone while you talk, using the official RNNoise model",
        "Runs entirely on your own PC: no account, no cloud, no recordings",
        "You set how much filtering you want with the dry/wet mix",
        "Voice gate for silences that are actually silent",
        "Finds the connected audio devices by itself",
        "Goes to the system tray and can start up with Windows"
      ],
      stackTitle: "What it's built with",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF for the interface", "NAudio + native RNNoise DLL for the audio", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Getting started",
      installSteps: [
        "Install a signed virtual audio cable, e.g. VB-CABLE.",
        "Restart Windows if it asks you to.",
        "Open Muted and set your mic as input and the cable as output.",
        "In Discord, Teams, or your game, pick that cable's recording side as your mic."
      ],
      limitationsTitle: "Worth knowing",
      limitations: "RNNoise takes noise away, but not echo. If you're in a room that echoes, use a headset or something that actually does echo cancellation.",
      downloadCta: "Download the pre-release (.exe)",
      downloadNote: "v0.1.0, Windows only, still very much a work in progress",
      githubCta: "View the code on GitHub"
    },
    setsPage: {
      back: "Back to home",
      badge: "PWA",
      title: "Sets",
      tagline: "Train, log it, done.",
      intro: "Sets is a simple app for keeping track of what you do at the gym, strength and cardio. You go train, and afterward you type in what you did. No subscription and no loading screens holding you up. You add it to your phone in a couple of taps and you're off.",
      deepDive: {
        title: "Under the hood",
        intro: "You don't need to read this to use the app. It's here for anyone who wants to know how it works inside.",
        signalPathTitle: "How a session gets saved",
        signalPathIntro: "What you type goes to your phone first, so it's committed right away and the screen isn't sitting there waiting for an answer. The session then goes to the cloud, so your data is on your other devices too without you having to do anything about it.",
        signalPath: ["Workout", "Local write (localStorage)", "Supabase (cloud sync)"],
        frameMathTitle: "What that means in practice",
        frameMath: [
          { value: "Instant", label: "your data is there with no waiting" },
          { value: "Sync", label: "your sessions are on all your devices" },
          { value: "Live", label: "your 1RM shows up while you're still typing" },
          { value: "Auto", label: "your workout saves itself" }
        ],
        points: [
          {
            title: "Everything is there right away",
            body: "Every screen shows your data immediately, because the app keeps a copy on your phone instead of fetching everything again. That copy gets updated in the background when you log in."
          },
          {
            title: "A crash costs you nothing",
            body: "The workout you're in the middle of gets saved on every change. If iOS closes the app halfway through your session, Sets just asks next time whether you want to carry on where you stopped."
          },
          {
            title: "You can train without an account too",
            body: "Train without logging in and it stays on your phone. Make an account later and the app brings those workouts along instead of dropping them."
          }
        ]
      },
      howItWorksTitle: "Fast logging",
      howItWorks: [
        "The app puts your weights and reps from last time in the fields as placeholders.",
        "On every set it works out your estimated 1RM live with the Epley formula. Go past your record and the field glows gold.",
        "Cardio gets its own fields for time, distance, and calories.",
        "Tap the set number to tag it as warm-up, working set, drop set, or to failure. Warm-ups don't count toward your volume or your PRs.",
        "You can turn on RPE per set if you want. Then your 1RM estimate gets sharper based on your reps in reserve."
      ],
      featuresTitle: "What it does",
      features: [
        "Dashboard with your volume, your PRs, and charts of your last 7 sessions",
        "Bronze, silver, and gold badges that light up when you earn them",
        "Plate calculator you set per gym and per unit",
        "Kg or lbs, pick yourself: the app converts it",
        "Light or dark theme, and fully in Dutch and English",
        "One tap in Settings and you have a backup of all your data"
      ],
      stackTitle: "What it's built with",
      stack: [
        "Vanilla ES6+ JavaScript, no bundler",
        "Tailwind CSS, precompiled into a single static file",
        "Supabase for login, database, and cloud sync (with row-level security)",
        "PWA with a localStorage cache so the screens load right away"
      ],
      installTitle: "Adding Sets to your phone",
      installSteps: [
        "Open sets.ink in Safari (iOS) or Chrome (Android).",
        "Tap the share icon and choose Add to Home Screen.",
        "From then on it opens full screen, no browser bar, like a normal app."
      ],
      limitationsTitle: "Worth knowing",
      limitations: "Train without an account and that data is only on your phone. Delete the app before you log in and that history is gone. And if you edit the same session on two devices, the version that syncs last is the one that wins.",
      openCta: "Open Sets",
      openNote: "sets.ink, free, and a couple of taps to add to your phone",
      galleryTitle: "Inside the app",
      gallery: ["Today", "Logging a workout", "Nutrition", "Social", "Progression", "History"]
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "WHAT I'VE DONE SO FAR",
      download: "Download PDF",
      experienceTitle: "Work Experience",
      educationTitle: "Education",
      jobs: [
        {
          role: "Warehouse Assistant (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - PRESENT",
          description: [
            "I sort the products by delivery route, so my colleagues can scan them in and get them to the right customer.",
            "When it's needed, I scan along myself.",
            "And I keep the warehouse tidy."
          ]
        },
        {
          role: "Inventory Management Assistant (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OCT 2025",
          description: [
            "I counted the stock in the warehouse and compared it with what the system said.",
            "If something didn't add up, I reported it straight away and helped work out where it went wrong.",
            "I kept the warehouse organized and wrote everything down accurately, so no errors came out of it further down the line.",
            "It's fresh produce, so everything had to be fast and correct at the same time."
          ]
        },
        {
          role: "Logistics Assistant (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - PRESENT",
          description: [
            "I'm the point of contact for the flow of goods and the transport paperwork.",
            "Picking orders with the scanner, usually against a departure time that doesn't move.",
            "And I sort the goods by region, so every route gets what belongs to it."
          ]
        },
        {
          role: "Sales Associate (Student)",
          company: "Lidl Belgium & Luxembourg | Gent",
          period: "AUG 2022 - OCT 2023",
          description: [
            "Checkout, stock, and the bakery, in a store that was hardly ever quiet. Mostly I learned there to switch between tasks fast and still stay friendly with the customers."
          ]
        },
        {
          role: "Hospitality Staff (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "I helped out in the kitchen during peak season and made sure everything stayed clean according to the hygiene rules."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Associate Degree System & Network Administration",
          period: "2025 - 2027 (Expected)",
          description: "This is where I am now. It's mostly about enterprise networks, running servers, and cloud."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "My secondary school, IT and multimedia track."
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
      backToHome: "Back to home",
      introParagraph: "This privacy policy explains what data may be processed through this portfolio website, why it is processed, and which external services are involved.",
      sections: [
        {
          heading: "Who runs this website",
          paragraphs: [
            "This website is the personal portfolio of Mehdi Oulad Khlie. It shows projects, experience, contact details, and professional profiles.",
            "If you have questions about this privacy policy or about data you submit through the website, you can contact me through the contact page."
          ]
        },
        {
          heading: "Data submitted through the contact form",
          paragraphs: [
            "When you use the contact form, the information you fill in is sent so I can read and answer your message.",
            "The form processes the following data:"
          ],
          items: [
            "Name",
            "Email address",
            "Subject",
            "Message content",
            "Technical delivery data the form provider may process, such as timestamp, IP address, browser data, or network data"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "The contact form sends messages through Web3Forms, an external form service. Your submission therefore goes to Web3Forms before it reaches me.",
            "Only use the form if you agree that Web3Forms may process the information you fill in to deliver your message."
          ]
        },
        {
          heading: "External links and services",
          paragraphs: [
            "This website links to external services such as GitHub, LinkedIn, Instagram, Credly, and project repositories. When you open one of those links, that service's privacy policy applies.",
            "The website may load external files, such as fonts or hosting assets. Those external parties may process technical data they need to provide their service."
          ]
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "No analytics provider is set up in the current codebase, and the website itself does not set marketing cookies.",
            "If analytics are added later, an analytics provider may process technical usage data, such as visited pages, device or browser information, and general interaction data. This privacy policy has to be updated if that happens."
          ]
        },
        {
          heading: "Retention",
          paragraphs: [
            "Messages received through the contact form are kept only as long as needed to answer your question, follow up, or keep relevant communication records.",
            "You can ask for previous communication to be deleted unless there is a legitimate reason to keep it."
          ]
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Depending on applicable privacy law, you may ask to access, correct, or delete personal data you have submitted through this website.",
            "Because this is a personal portfolio, data stays limited to what is needed for contact and professional communication."
          ]
        },
        {
          heading: "Security",
          paragraphs: [
            "I handle data submitted through the website carefully, but no online transmission or external service can guarantee absolute security.",
            "So do not send sensitive data, passwords, financial information, or confidential documents through the contact form."
          ]
        },
        {
          heading: "Changes",
          paragraphs: [
            "This privacy policy may be updated when the website, the contact form, or the external services it uses change.",
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
