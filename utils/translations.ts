export const translations = {
  nl: {
    mutedPage: {
      back: "Terug naar home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Minder ruis, dezelfde stem.",
      screenshotAlt: "Screenshot van Muted met het RNNoise-filter, de voice gate en de instellingen van de virtuele kabel",
      intro: "Muted is een Windows-app die ik in elkaar heb gezet omdat ik er genoeg van had dat mijn ventilator via Discord meeluisterde. Ze filtert achtergrondgeluid uit je micro voor het bij Discord, Teams of je game terechtkomt. Dat gebeurt allemaal lokaal op je pc: niks gaat naar een server, en er wordt niks opgenomen.",
      deepDive: {
        title: "Achter de schermen",
        signalPathTitle: "Waar je stem eigenlijk langsgaat",
        signalPathIntro: "Windows laat een app gebruikmaken van micro's en boxen die al geïnstalleerd staan, maar een nieuw apparaat toevoegen mag alleen met een ondertekende kernel-driver. Muted werkt dus met wat er al is: het neemt je echte micro, maakt het geluid proper, en stuurt dat resultaat naar een virtuele kabel waar andere apps naar kunnen luisteren.",
        signalPath: ["Microfoon", "Muted (gain · RNNoise · mix · gate · drift)", "Virtuele kabel in", "Gekoppelde kabel-uitgang", "Discord / Teams / game"],
        frameMathTitle: "De cijfers in detail",
        frameMath: [
          { value: "48 kHz", label: "samplerate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise-vertraging" }
        ],
        points: [
          {
            title: "Zonder eigen driver",
            body: "Windows laat een gewone app niet zomaar een nieuwe micro toevoegen aan de lijst die Discord ziet. Daarvoor is een ondertekende kernel-driver nodig, met het hele certificeringsproces erbij. Muted omzeilt dat gewoon: het leent een virtuele audiokabel die je toch al hebt staan, en stuurt daar proper geluid naartoe. Het geheel blijft één gewone user-mode app, er draait niks in de kernel."
          },
          {
            title: "De opnamethread heeft weinig te doen",
            body: "De thread die je micro uitleest heeft maar één taak: de audio in een buffer zetten en doorgaan. Geen filtering, geen locks, geen geheugen dat daar wordt vrijgemaakt. Een tweede thread haalt er telkens exact 480 samples uit, 10 ms aan audio, omdat dat de framegrootte is waarop RNNoise rekent."
          },
          {
            title: "Eén frame, stap voor stap",
            body: "Elk frame krijgt eerst input-gain en wordt dan in twee gesplitst. De ene kopie blijft onaangeroerd, de andere gaat door RNNoise. Omdat RNNoise zelf ongeveer 20 ms vertraging toevoegt, wordt die onaangeroerde kopie precies zo lang opgehouden, zodat ze sample per sample synchroon blijven. Daarna worden ze gemengd volgens de verhouding die jij kiest, knipt een optionele voice gate de stiltes weg op basis van RNNoise's eigen stemdetectie, en komt de output-gain er als laatste over."
          },
          {
            title: "Twee klokken die uit elkaar lopen",
            body: "Je micro en de virtuele kabel zijn twee losse apparaten met elk hun eigen klok, en tijdens een lange call lopen die stilaan uit elkaar. Schrijft Muted exact evenveel samples weg als het inleest, dan raakt de buffer op een gegeven moment leeg of net vol. Daarom stuurt het honderd keer per seconde één sample meer of minder door, naargelang hoe vol de buffer op dat moment is. Eén sample hoor je nooit, maar op die manier blijft alles urenlang synchroon."
          },
          {
            title: "Het start niet als het naar je boxen zou gaan",
            body: "Eén van de controles heeft niks te maken met geluidskwaliteit. Zou de uitgang van Muted op je boxen staan in plaats van op een virtuele kabel, dan komt je eigen stem terug in je micro en krijg je een lus. Daarom checkt de app eerst of de uitgang echt een virtuele kabel is, en weigert hij gewoon te starten als dat niet het geval is."
          }
        ]
      },
      howItWorksTitle: "In grote lijnen",
      howItWorks: [
        "De app neemt je micro op in 48kHz mono, via WASAPI.",
        "Elk blokje van 480 samples, 20ms, gaat door het RNNoise-model van Xiph, getraind om stem van ruis te onderscheiden.",
        "Zet je de voice gate aan, dan worden stiltes nog strakker weggeknipt, zodat een tikkend toetsenbord of een zoemende ventilator er niet doorkomt.",
        "Ondertussen corrigeert de app klokdrift, zodat alles ook na een lange sessie nog synchroon loopt.",
        "Het eindresultaat komt op een virtuele audiokabel terecht, en die stel je in als micro in Discord, Teams of je game."
      ],
      featuresTitle: "Wat je krijgt",
      features: [
        "Filtert ruis terwijl je praat, met het officiële RNNoise-model",
        "Draait volledig lokaal: geen account, geen cloud, geen opnames",
        "Bepaal zelf hoeveel filtering je wil via de dry/wet-mix",
        "Voice gate zodat stilte ook echt stil is",
        "Herkent zelf welke audioapparaten aangesloten zijn",
        "Verdwijnt in de systeemtray en kan mee opstarten met Windows"
      ],
      stackTitle: "Gebouwd met",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF voor de interface", "NAudio + native RNNoise DLL voor de audio", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Zo installeer je het",
      installSteps: [
        "Installeer eerst een ondertekende virtuele audiokabel, VB-CABLE bijvoorbeeld.",
        "Herstart Windows als daar om gevraagd wordt.",
        "Open Muted en stel je micro in als input en de kabel als output.",
        "Kies daarna in Discord, Teams of je game de opnamekant van die kabel als micro."
      ],
      limitationsTitle: "Goed om te weten",
      limitations: "RNNoise haalt ruis weg, maar geen echo. In een kamer die galmt kom je verder met een headset of iets dat wel echt aan echo-onderdrukking doet.",
      downloadCta: "Haal de pre-release binnen (.exe)",
      downloadNote: "v0.1.0, enkel Windows, en nog volop in ontwikkeling",
      githubCta: "Bekijk de broncode op GitHub"
    },
    setsPage: {
      back: "Terug naar home",
      badge: "PWA",
      title: "Sets",
      tagline: "Eerst trainen, dan pas noteren.",
      intro: "Sets is een eenvoudige app om bij te houden wat je in de gym doet, zowel krachttraining als cardio. Je traint eerst, en typt achteraf in wat je gedaan hebt. Geen abonnement, geen laadschermen die je ophouden. In een paar tikken staat hij op je gsm en kan je aan de slag.",
      deepDive: {
        title: "Achter de schermen",
        intro: "Om de app te gebruiken moet je dit niet lezen. Het is er voor wie graag weet hoe het er vanbinnen aan toegaat.",
        signalPathTitle: "Wat er gebeurt als je een sessie opslaat",
        signalPathIntro: "Wat je intikt wordt eerst op je gsm zelf opgeslagen, dus het staat meteen vast en het scherm moet niet wachten op een reactie van waar dan ook. Pas daarna gaat de sessie naar de cloud, zodat je data ook op je andere toestellen belandt zonder dat je daar zelf iets voor moet doen.",
        signalPath: ["Workout", "Lokale write (localStorage)", "Supabase (cloud sync)"],
        frameMathTitle: "Wat je daar dagelijks van voelt",
        frameMath: [
          { value: "Meteen", label: "geen wachttijd voor je data" },
          { value: "Sync", label: "je sessies volgen je overal" },
          { value: "Live", label: "je 1RM update terwijl je typt" },
          { value: "Auto", label: "je workout slaat zichzelf op" }
        ],
        points: [
          {
            title: "Niks houdt je op",
            body: "Elk scherm toont je gegevens onmiddellijk, omdat de app een eigen kopie op je gsm bijhoudt in plaats van steeds alles opnieuw op te halen. Die kopie wordt op de achtergrond bijgewerkt zodra je inlogt."
          },
          {
            title: "Crashen kost je niks",
            body: "De workout waar je middenin zit wordt bij elke aanpassing bewaard. Sluit iOS de app af tijdens je sessie, dan vraagt Sets de volgende keer gewoon of je wil verdergaan waar je gebleven was."
          },
          {
            title: "Trainen zonder account kan gewoon",
            body: "Train je zonder in te loggen, dan blijft dat gewoon op je gsm staan. Maak je later toch een account, dan neemt de app die eerdere workouts mee in plaats van ze te laten vallen."
          }
        ]
      },
      howItWorksTitle: "Snel noteren",
      howItWorks: [
        "De app zet je gewichten en reps van de vorige keer al klaar als placeholder.",
        "Bij elke set berekent hij meteen je geschatte 1RM met de Epley-formule. Verbreek je je record, dan licht het veld goud op.",
        "Voor cardio zijn er apart velden voor tijd, afstand en calorieën.",
        "Tik op het setnummer om hem te taggen als warm-up, working set, drop set of tot falen. Warm-ups tellen niet mee voor je volume of je PR's.",
        "RPE per set is optioneel, en maakt je 1RM-schatting nauwkeuriger op basis van je reps in reserve."
      ],
      featuresTitle: "Wat je krijgt",
      features: [
        "Een dashboard met je volume, je PR's en grafieken van je laatste 7 sessies",
        "Bronzen, zilveren en gouden badges die oplichten zodra je ze verdient",
        "Een plaatcalculator die je per gym en per eenheid instelt",
        "Kg of lbs, jouw keuze, de app rekent zelf om",
        "Licht of donker thema, volledig vertaald naar het Nederlands en Engels",
        "Eén tik in de instellingen maakt een backup van al je data"
      ],
      stackTitle: "Gebouwd met",
      stack: [
        "Vanilla ES6+ JavaScript, zonder bundler",
        "Tailwind CSS, op voorhand gecompileerd tot één static bestand",
        "Supabase voor login, database en cloud sync (met row-level security)",
        "PWA met een localStorage-cache, zodat schermen meteen laden"
      ],
      installTitle: "Zo krijg je hem op je gsm",
      installSteps: [
        "Open sets.ink in Safari (iOS) of Chrome (Android).",
        "Tik op het deel-icoon en kies 'Zet op beginscherm'.",
        "Vanaf dan opent hij op volledig scherm, zonder browserbalk, net als een normale app."
      ],
      limitationsTitle: "Goed om te weten",
      limitations: "Train je zonder account, dan bestaat die data alleen op je gsm. Verwijder je de app voor je inlogt, dan is die geschiedenis weg. En pas je dezelfde training aan op twee toestellen, dan wint de versie die het laatst gesynct is.",
      openCta: "Open Sets",
      openNote: "sets.ink, gratis, en in een paar tikken op je gsm",
      galleryTitle: "In de app",
      gallery: ["Vandaag", "Workout loggen", "Voeding", "Social", "Progressie", "Geschiedenis"]
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "WAAR IK ZOAL MEE BEZIG WAS",
      download: "Download PDF",
      experienceTitle: "Werkervaring",
      educationTitle: "Opleiding",
      jobs: [
        {
          role: "Medewerker Expeditie Nacht (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - HEDEN",
          description: [
            "Ik controleer de binnengekomen producten op aantal en kwaliteit.",
            "Ik sorteer de kratten per klant en rit, en verwerk dat in het WMS.",
            "Ik zorg dat alles klaarstaat voor de chauffeurs, tijdens de nachtdienst.",
            "Komt er veel tegelijk binnen, dan werk ik onder tijdsdruk maar blijf ik het overzicht houden.",
            "Ik werk in een team dat er samen voor zorgt dat de nacht vlot verloopt.",
            "Zo krijgen klanten hun bestelling volledig en op tijd binnen."
          ]
        },
        {
          role: "Assistent Voorraadbeheer (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OKT 2025",
          description: [
            "Ik telde de stock in het magazijn en vergeleek dat met de cijfers in het systeem.",
            "Klopte er iets niet, dan meldde ik dat meteen en zocht ik mee naar waar het fout ging.",
            "Ik hield het magazijn geordend en noteerde alles nauwkeurig, zodat fouten zich niet verder doorzetten.",
            "Omdat het om verse producten gaat, moest alles snel en correct verlopen."
          ]
        },
        {
          role: "Magazijnier (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - JUL 2026",
          description: [
            "'s Nachts kreeg ik pallets met kranten binnen, die ik verdeelde over de juiste ritten.",
            "Daarnaast deed ik er ook dispatcher-werk bij: pallets met magazines en tijdschriften verdelen over de verschillende sites.",
            "Ik hielp ook mee met het verwerken van retourzendingen.",
            "Ik controleerde de leveringen en hield het magazijn netjes.",
            "Dat gebeurde vroeg in de nacht, ergens tussen 1 en 6 uur."
          ]
        },
        {
          role: "Verkoopmedewerker (Student)",
          company: "Lidl België & Luxemburg | Gent",
          period: "AUG 2022 - OKT 2023",
          description: [
            "Kassa, stock en de bakkerij, in een winkel die bijna nooit rustig was. Daar heb ik vooral geleerd om snel te schakelen tussen taken en toch vriendelijk te blijven tegen klanten."
          ]
        },
        {
          role: "Horecamedewerker (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "Ik verwelkomde gasten en hielp hen aan de kassa.",
            "Ik verwerkte de bestellingen nauwkeurig en zorgde dat elke order klopte.",
            "Ik hielp mee in de keuken bij het klaarmaken van de gerechten.",
            "Ik hield de zaak netjes en volgde de hygiëne- en veiligheidsregels op.",
            "Dat deed ik samen met een team, tijdens het hoogseizoen."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Graduaat Systeem- en Netwerkbeheer",
          period: "2025 - 2027 (Verwacht)",
          description: "Hier zit ik nu, met vooral bedrijfsnetwerken, serverbeheer en cloud."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "Mijn middelbare school, richting IT en multimedia."
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
      introParagraph: "Deze pagina legt uit welke gegevens deze portfoliosite kan verzamelen, waarom, en welke externe diensten daar een rol in spelen.",
      sections: [
        {
          heading: "Wie zit hierachter",
          paragraphs: [
            "Deze site is de persoonlijke portfolio van Mehdi Oulad Khlie, met projecten, werkervaring, contactgegevens en links naar professionele profielen.",
            "Vragen over deze verklaring, of over gegevens die je via de site doorstuurt, kunnen via de contactpagina."
          ]
        },
        {
          heading: "Wat het contactformulier verzamelt",
          paragraphs: [
            "Gebruik je het contactformulier, dan verstuur je zelf de gegevens die ik nodig heb om te kunnen antwoorden.",
            "Dat gaat om:"
          ],
          items: [
            "Naam",
            "E-mailadres",
            "Onderwerp",
            "Berichtinhoud",
            "Technische verzendgegevens die de formulierdienst kan bijhouden, zoals tijdstip, IP-adres, browser- of netwerkinfo"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "Berichten via het contactformulier lopen langs Web3Forms, een externe dienst, voor ze bij mij terechtkomen.",
            "Door het formulier te gebruiken, ga je ermee akkoord dat Web3Forms je gegevens verwerkt om het bericht af te leveren."
          ]
        },
        {
          heading: "Links naar andere plekken",
          paragraphs: [
            "Deze site linkt door naar plekken zoals GitHub, LinkedIn, Instagram, Credly en verschillende projectrepositories. Klik je door, dan geldt vanaf dan het privacybeleid van die dienst.",
            "Ook laadt de site soms externe bestanden, zoals lettertypes of hosting-assets. Die partijen kunnen de technische gegevens verwerken die ze daarvoor nodig hebben."
          ]
        },
        {
          heading: "Cookies en analytics",
          paragraphs: [
            "Er staat momenteel geen analytics-tool ingesteld, en de site zelf plaatst geen marketingcookies.",
            "Komt daar later verandering in, dan zou die tool dingen kunnen verwerken zoals bezochte pagina's, je apparaat of browser, en algemeen gebruiksgedrag. Deze pagina wordt dan aangepast."
          ]
        },
        {
          heading: "Hoelang gegevens bewaard blijven",
          paragraphs: [
            "Berichten via het contactformulier blijven bewaard zolang nodig om je vraag te beantwoorden, op te volgen of relevante communicatie bij te houden.",
            "Je mag altijd vragen om eerdere communicatie te verwijderen, tenzij er een goede reden is om die toch te bewaren."
          ]
        },
        {
          heading: "Jouw rechten",
          paragraphs: [
            "Naargelang de privacywetgeving die op jou van toepassing is, kun je inzage, correctie of verwijdering vragen van gegevens die je via deze site hebt doorgegeven.",
            "Omdat dit een persoonlijke portfolio is en geen bedrijf, blijft alles beperkt tot wat nodig is voor contact en professionele communicatie."
          ]
        },
        {
          heading: "Beveiliging",
          paragraphs: [
            "Gegevens die via de site verstuurd worden, behandel ik zorgvuldig, maar geen enkele online verzending of externe dienst kan volledige beveiliging garanderen.",
            "Verstuur daarom geen gevoelige gegevens, wachtwoorden, financiële info of vertrouwelijke documenten via het contactformulier."
          ]
        },
        {
          heading: "Wijzigingen",
          paragraphs: [
            "Deze verklaring kan wijzigen zodra de site, het contactformulier of de externe diensten die gebruikt worden, veranderen.",
            "De datum bovenaan toont wanneer de tekst voor het laatst is aangepast."
          ]
        }
      ],
      contact: {
        heading: "Contact",
        text: "Vragen over deze verklaring kunnen hier terecht:",
        url: "https://www.mehdioul.dev/#/contact"
      }
    }
  },
  en: {
    mutedPage: {
      back: "Back to home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Less noise, same voice.",
      screenshotAlt: "Screenshot of Muted showing the RNNoise filter, the voice gate, and the virtual cable settings",
      intro: "Muted is a Windows app I put together after getting tired of Discord picking up the sound of my cooling fan. It filters the background noise out of your microphone before it ever reaches Discord, Teams, or whatever game you're in. Everything runs locally on your PC: nothing is sent to a server, and nothing gets recorded.",
      deepDive: {
        title: "Behind the scenes",
        signalPathTitle: "Where your voice actually goes",
        signalPathIntro: "Windows will let an app use whatever mics and speakers are already installed, but adding a brand new device needs a signed kernel driver. Muted sidesteps that: it grabs your actual mic, cleans up what it hears, and passes the result to a virtual cable that other apps can pick up as their input.",
        signalPath: ["Microphone", "Muted (gain · RNNoise · mix · gate · drift)", "Virtual cable in", "Cable's paired output", "Discord / Teams / game"],
        frameMathTitle: "What that looks like in numbers",
        frameMath: [
          { value: "48 kHz", label: "sample rate" },
          { value: "480", label: "samples per frame" },
          { value: "10 ms", label: "per frame" },
          { value: "20 ms", label: "RNNoise delay" }
        ],
        points: [
          {
            title: "It doesn't install its own driver",
            body: "A regular app can't add itself to the list of mics Discord sees. For that you'd need a signed kernel driver, plus the whole certification process behind it. Muted avoids all of that by borrowing a virtual audio cable you've already installed, and just feeding it clean audio. The whole thing runs as one ordinary user-mode app; nothing touches the kernel."
          },
          {
            title: "The thread reading your mic barely does anything",
            body: "The thread that reads your mic has exactly one job: copy the audio into a buffer and get out of the way. No filtering, no locking, no memory allocation happening there. A separate thread then pulls out exactly 480 samples at a time, 10 ms worth of audio, since that's the frame size RNNoise expects."
          },
          {
            title: "Following one frame from start to finish",
            body: "Every frame first gets input gain applied, then splits into two copies. One is left alone, the other runs through RNNoise. Since RNNoise itself adds roughly 20 ms of delay, the untouched copy gets held back by the same amount so both stay in sync sample for sample. After that they're blended at whatever ratio you've chosen, an optional voice gate cuts out the silences using RNNoise's own voice detection, and output gain is applied last."
          },
          {
            title: "Two clocks that drift apart",
            body: "Your microphone and the virtual cable are separate devices, each running on its own clock, and during a long call those clocks slowly drift apart. If Muted wrote out exactly the number of samples it read in, the buffer would eventually empty out or overflow. Instead, a hundred times per second, it adds or drops a single sample depending on how full the buffer currently is. One sample is inaudible, but doing this constantly keeps everything in sync for hours at a stretch."
          },
          {
            title: "It refuses to start if it's pointed at your speakers",
            body: "One safeguard has nothing to do with audio quality at all. If Muted's output somehow pointed at your speakers instead of a virtual cable, your own voice would feed straight back into the mic and create a loop. So before doing anything else, the app checks whether the output device is actually a virtual cable, and simply refuses to start if it isn't."
          }
        ]
      },
      howItWorksTitle: "The gist",
      howItWorks: [
        "It captures your mic through WASAPI at 48kHz mono.",
        "Every chunk of 480 samples, 20 ms, gets run through Xiph's RNNoise model, trained to separate voice from noise.",
        "Switch on the voice gate and the gaps get trimmed even further, so keyboard clatter or a humming fan won't slip through.",
        "It corrects for clock drift along the way, so everything's still in sync after a long session.",
        "The cleaned-up result lands on a virtual audio cable, which you then select as your mic in Discord, Teams, or your game."
      ],
      featuresTitle: "What you get",
      features: [
        "Removes noise while you're talking, using the official RNNoise model",
        "Runs completely on your own PC, no account, no cloud, nothing recorded",
        "Lets you control how much filtering happens with a dry/wet mix",
        "A voice gate that actually keeps silence silent",
        "Detects your connected audio devices on its own",
        "Tucks itself into the system tray and can launch with Windows"
      ],
      stackTitle: "Built with",
      stack: ["C# (.NET 9 Desktop Runtime)", "WPF for the interface", "NAudio + native RNNoise DLL for the audio", "PowerShell / Visual Studio 2022 C++ build pipeline"],
      installTitle: "Setting it up",
      installSteps: [
        "Install a signed virtual audio cable, VB-CABLE works fine.",
        "Restart Windows if it prompts you to.",
        "Open Muted and point it at your mic as input and the cable as output.",
        "In Discord, Teams, or your game, select that cable's recording side as your microphone."
      ],
      limitationsTitle: "Good to know",
      limitations: "RNNoise deals with noise, not echo. In a room with a lot of echo, you'll want a headset or something with real echo cancellation instead.",
      downloadCta: "Get the pre-release (.exe)",
      downloadNote: "v0.1.0, Windows only, and still very much in progress",
      githubCta: "See the source on GitHub"
    },
    setsPage: {
      back: "Back to home",
      badge: "PWA",
      title: "Sets",
      tagline: "Train first, log it after.",
      intro: "Sets is a straightforward app for tracking what you do at the gym, both lifting and cardio. You train first, then type in what you did afterward. No subscription, no loading screens getting in your way. A couple of taps and it's on your phone, ready to go.",
      deepDive: {
        title: "Behind the scenes",
        intro: "None of this is required reading to use the app. It's here for anyone curious about what's happening underneath.",
        signalPathTitle: "What happens when you save a session",
        signalPathIntro: "Whatever you type is written to your phone first, so it's saved instantly and the screen never has to wait on a response. The session then makes its way to the cloud, which means your data ends up on your other devices too, without you lifting a finger for it.",
        signalPath: ["Workout", "Local write (localStorage)", "Supabase (cloud sync)"],
        frameMathTitle: "What that feels like day to day",
        frameMath: [
          { value: "Instant", label: "no waiting for your data to show up" },
          { value: "Sync", label: "your sessions follow you across devices" },
          { value: "Live", label: "your 1RM updates while you type" },
          { value: "Auto", label: "your workout saves without you asking" }
        ],
        points: [
          {
            title: "Nothing makes you wait",
            body: "Every screen loads your data instantly, because the app keeps its own copy on your phone rather than fetching everything fresh each time. That local copy gets refreshed in the background whenever you log in."
          },
          {
            title: "Crashing costs you nothing",
            body: "Whatever workout you're partway through gets saved with every change you make. If iOS kills the app mid-session, Sets simply asks the next time you open it whether you'd like to pick up where you left off."
          },
          {
            title: "An account isn't required to train",
            body: "Train without ever logging in, and everything just stays on your phone. If you decide to create an account later, the app carries those earlier workouts over instead of leaving them behind."
          }
        ]
      },
      howItWorksTitle: "Logging, fast",
      howItWorks: [
        "It pre-fills the fields with your weights and reps from last time, as placeholders.",
        "Each set gets a live estimated 1RM using the Epley formula. Beat your record and the field lights up gold.",
        "Cardio has its own fields for time, distance, and calories.",
        "Tapping the set number lets you tag it as a warm-up, working set, drop set, or to failure. Warm-up sets are excluded from your volume and your PRs.",
        "RPE per set is optional, and turning it on sharpens your 1RM estimate using your reps in reserve."
      ],
      featuresTitle: "What you get",
      features: [
        "A dashboard showing your volume, your PRs, and charts of your last 7 sessions",
        "Bronze, silver, and gold badges that light up as you earn them",
        "A plate calculator you configure per gym and per unit",
        "Kg or lbs, your choice, the app handles the conversion",
        "A light or dark theme, fully translated into Dutch and English",
        "A single tap in Settings backs up all of your data"
      ],
      stackTitle: "Built with",
      stack: [
        "Vanilla ES6+ JavaScript, no bundler",
        "Tailwind CSS, precompiled into a single static file",
        "Supabase for login, database, and cloud sync (with row-level security)",
        "PWA with a localStorage cache, so screens load instantly"
      ],
      installTitle: "Getting it on your phone",
      installSteps: [
        "Open sets.ink in Safari (iOS) or Chrome (Android).",
        "Tap the share icon, then choose Add to Home Screen.",
        "From that point on it opens full screen with no browser bar, just like any other app."
      ],
      limitationsTitle: "Good to know",
      limitations: "Training without an account means that data only exists on your phone. Delete the app before creating an account, and that history is gone for good. Edit the same session from two devices, and whichever one syncs last is the version that sticks.",
      openCta: "Open Sets",
      openNote: "sets.ink, free, and on your phone in a couple of taps",
      galleryTitle: "Inside the app",
      gallery: ["Today", "Logging a workout", "Nutrition", "Social", "Progression", "History"]
    },
    resume: {
      title: "Curriculum Vitae",
      subtitle: "WHAT I'VE BEEN UP TO",
      download: "Download PDF",
      experienceTitle: "Work Experience",
      educationTitle: "Education",
      jobs: [
        {
          role: "Night Shift Dispatch Assistant (Student)",
          company: "Sligro Evergem",
          period: "JUN 2026 - PRESENT",
          description: [
            "I check everything that comes in for quantity and quality.",
            "I sort the crates by customer and route, and log that in the WMS.",
            "I make sure everything's ready for the drivers, on the night shift.",
            "When a lot comes in at once, it gets busy fast, but I keep track of everything.",
            "I work as part of a team that keeps the whole night running smoothly.",
            "That way customers get their order complete and on time."
          ]
        },
        {
          role: "Inventory Management Assistant (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OCT 2025",
          description: [
            "I counted stock in the warehouse and checked it against what the system showed.",
            "When something didn't match, I flagged it right away and helped trace where it went wrong.",
            "I kept the warehouse organized and logged everything precisely, so mistakes didn't carry over further down the line.",
            "Since it's fresh produce, speed and accuracy both mattered at once."
          ]
        },
        {
          role: "Warehouse Assistant (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - JUL 2026",
          description: [
            "At night, I'd get pallets of newspapers in and split those across the right routes.",
            "On top of that I did dispatcher work: splitting pallets of magazines and periodicals across the different sites.",
            "I also helped process returns.",
            "I checked deliveries and kept the warehouse tidy.",
            "All of that happened early in the night, somewhere between 1 and 6 in the morning."
          ]
        },
        {
          role: "Sales Associate (Student)",
          company: "Lidl Belgium & Luxembourg | Gent",
          period: "AUG 2022 - OCT 2023",
          description: [
            "Checkout, stock, and the bakery, in a store that was almost never quiet. What I mostly learned there was switching between tasks quickly while staying friendly with customers."
          ]
        },
        {
          role: "Hospitality Staff (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "I welcomed guests and helped out at the register.",
            "I processed orders accurately and made sure each one came out right.",
            "I helped prepare food in the kitchen.",
            "I kept the place clean and followed the hygiene and safety rules.",
            "All of that as part of a team, during peak season."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Associate Degree System & Network Administration",
          period: "2025 - 2027 (Expected)",
          description: "This is where I am right now, mostly focused on enterprise networks, running servers, and cloud."
        },
        {
          school: "Vrij Instituut voor Secundair Onderwijs (VISO)",
          degree: "TSO Intermedia / Multimedia",
          period: "2018 - 2024",
          description: "My secondary school, on the IT and multimedia track."
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
      introParagraph: "This page explains what data this portfolio site might collect, why, and which outside services are involved in that.",
      sections: [
        {
          heading: "Who's behind this site",
          paragraphs: [
            "This site is Mehdi Oulad Khlie's personal portfolio. It shows projects, work experience, contact details, and links to professional profiles.",
            "Questions about this policy, or about data you've sent through the site, can go through the contact page."
          ]
        },
        {
          heading: "What the contact form collects",
          paragraphs: [
            "Using the contact form sends me whatever you fill in, so I can read it and reply.",
            "That includes:"
          ],
          items: [
            "Name",
            "Email address",
            "Subject",
            "Message content",
            "Technical delivery details the form provider might log, like a timestamp, IP address, browser, or network information"
          ]
        },
        {
          heading: "Web3Forms",
          paragraphs: [
            "Messages from the contact form pass through Web3Forms, an external service, before they reach me.",
            "By using the form, you're agreeing that Web3Forms can process what you enter in order to deliver it."
          ]
        },
        {
          heading: "Links to other places",
          paragraphs: [
            "This site links out to places like GitHub, LinkedIn, Instagram, Credly, and various project repositories. Once you click through, that service's own privacy policy takes over.",
            "It also loads some external files, fonts and hosting assets mainly. Whoever provides those may process the technical data they need to do so."
          ]
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "There's no analytics tool set up right now, and the site itself doesn't drop any marketing cookies.",
            "If that changes down the line, whatever analytics tool gets added would process things like which pages you visited, your device or browser, and general usage data. This page would get updated to reflect that."
          ]
        },
        {
          heading: "How long things are kept",
          paragraphs: [
            "Messages from the contact form stick around only as long as it takes to answer you, follow up, or keep a relevant record of the conversation.",
            "You're free to ask for earlier messages to be deleted, unless there's a good reason to hold onto them."
          ]
        },
        {
          heading: "Your rights",
          paragraphs: [
            "Depending on the privacy law that applies to you, you can request access to, a correction of, or deletion of personal data you've submitted here.",
            "Since this is a personal portfolio rather than a business, the data involved stays limited to what's needed for contact and professional communication."
          ]
        },
        {
          heading: "Security",
          paragraphs: [
            "Data sent through the site is handled carefully, but no online transmission or third-party service can promise complete security.",
            "So it's best not to send sensitive information, passwords, financial details, or confidential documents through the contact form."
          ]
        },
        {
          heading: "Changes",
          paragraphs: [
            "This policy might get updated whenever the site, the contact form, or the outside services it relies on change.",
            "The date at the top shows when it was last revised."
          ]
        }
      ],
      contact: {
        heading: "Contact",
        text: "Questions about this policy can go here:",
        url: "https://www.mehdioul.dev/#/contact"
      }
    }
  }
};
