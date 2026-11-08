export const translations = {
  nl: {
    mutedPage: {
      back: "Terug naar home",
      badge: "WINDOWS APP",
      title: "Muted",
      tagline: "Ruisfilter voor je micro op Windows, nu met Studio Voice.",
      intro: "Muted is een Windows-app die ik gemaakt heb omdat mijn micro in Discord constant mijn pc-ventilator mee opnam. Ze filtert achtergrondgeluid uit je micro voor het bij Discord, Teams of je game terechtkomt. Alles gebeurt lokaal op je pc. Er gaat niks naar een server en er wordt niks opgenomen. Wat begon als een kleine pre-release is ondertussen een volledige app, met echo-onderdrukking, sneltoetsen, profielen en sinds versie 0.9 ook Studio Voice.",
      galleryTitle: "In de app",
      gallery: ["Startscherm met Studio Voice", "Een model kiezen", "Fine-tune", "Processing"],
      galleryAlt: [
        "Het startscherm van Muted met de aan-knop, de keuze van je micro en de schakelaar voor Studio Voice",
        "De pagina Sound met Studio Voice aan en de drie modellen Classic, Balanced en Maximum",
        "De pagina Fine-tune met sliders voor input gain, output gain, ruisonderdrukking en de voice gate",
        "De pagina Processing met ruisonderdrukking, echo-onderdrukking, de voice gate en Tune to my voice"
      ],
      spotlight: {
        title: "Studio Voice",
        intro: "Studio Voice is de feature waar ik het meest trots op ben. RNNoise haalt vooral ruis weg, zoals een ventilator of gesis. Studio Voice gaat verder en haalt ook de galm van je kamer weg. Je klinkt dan alsof je in een kleine studio zit, ook al zit je gewoon aan je bureau. Je zet het aan met één schakelaar op het startscherm.",
        modelsTitle: "Drie modellen, jij kiest",
        models: [
          {
            title: "Classic",
            body: "DeepFilterNet3. Het lichtste model, en voor de meeste pc's ruim genoeg."
          },
          {
            title: "Balanced",
            body: "DPDFNet 2. Dit model werkt met dual-path recurrente blokken. Daardoor haalt het ook ruis weg die in dezelfde frequenties zit als je stem, iets waar een gewone filter moeite mee heeft."
          },
          {
            title: "Maximum",
            body: "DPDFNet 8. Het sterkste van de drie. Het vraagt het meeste van je processor, maar houdt ook het meeste detail in je stem."
          }
        ],
        statsTitle: "Wat het kost",
        stats: [
          { value: "3", label: "AI-modellen" },
          { value: "50 ms", label: "vertraging" },
          { value: "6 ms", label: "rekentijd per 10 ms audio, op Maximum" },
          { value: "1", label: "processorthread" }
        ],
        pointsTitle: "Hoe ik het gebouwd heb",
        points: [
          {
            title: "Wisselen zonder dat je micro wegvalt",
            body: "Kies je een ander model, dan laadt Muted dat op de achtergrond, naast het model dat nog aan het filteren is. Het nieuwe model draait eerst 0,3 seconden mee zonder dat je het hoort, zodat het je kamer al kent. Daarna gaat Muted in 0,1 seconde vloeiend over. Je micro valt dus nooit stil, ook niet midden in een call."
          },
          {
            title: "Alle drie dezelfde vertraging",
            body: "Ik heb ervoor gezorgd dat de drie modellen exact dezelfde 50 ms vertraging hebben. Zo verschuift je stem niet als je van model wisselt, en blijft de rest van de keten in sync."
          },
          {
            title: "Studio Voice neemt het volledig over",
            body: "Staat Studio Voice aan, dan doet het alle ruisonderdrukking alleen. Er wordt niks van het originele geluid terug bijgemengd. Je gate, je niveau, de high-pass en de limiter blijven wel werken zoals je ze had ingesteld."
          },
          {
            title: "Een gate die naar twee modellen luistert",
            body: "De voice gate gaat pas open als zowel Studio Voice als RNNoise een stem horen. Een klik van je muis of toetsenbord laat de gate dus niet meer openspringen."
          },
          {
            title: "Een waakhond voor het model",
            body: "Een AI-model kan soms in een rare toestand vastraken, en dan laat het de ruis gewoon door. Muted houdt dat in het oog. Haalt het model twee seconden lang minder dan 6 dB weg terwijl je stil bent, dan start Muted het zelf opnieuw. Vroeger moest je daarvoor Studio Voice uit en terug aan zetten."
          },
          {
            title: "Altijd een plan B",
            body: "Zolang een model nog laadt, of als het op jouw pc niet kan draaien, blijft RNNoise de ruis wegfilteren. Je zit dus nooit zonder ruisonderdrukking."
          }
        ]
      },
      deepDive: {
        title: "Achter de schermen",
        signalPathTitle: "Waar je stem eigenlijk langsgaat",
        signalPathIntro: "Windows laat een app gebruikmaken van micro's en boxen die al geïnstalleerd staan, maar een nieuw apparaat toevoegen mag alleen met een ondertekende kernel-driver. Muted werkt dus met wat er al is: het neemt je echte micro, maakt het geluid proper, en stuurt dat resultaat naar een virtuele kabel waar andere apps naar kunnen luisteren.",
        signalPath: ["Microfoon", "Muted (echo · RNNoise of Studio Voice · gate · limiter · drift)", "Virtuele kabel in", "Gekoppelde kabel-uitgang", "Discord / Teams / game"],
        frameMathTitle: "De cijfers in detail",
        frameMath: [
          { value: "48 kHz", label: "samplerate" },
          { value: "480", label: "samples per frame" },
          { value: "20 ms", label: "vertraging met RNNoise" },
          { value: "50 ms", label: "vertraging met Studio Voice" }
        ],
        points: [
          {
            title: "Zonder eigen driver",
            body: "Windows laat een gewone app niet zomaar een nieuwe micro toevoegen aan de lijst die Discord ziet. Daarvoor is een ondertekende kernel-driver nodig, met het hele certificeringsproces erbij. Muted omzeilt dat: het leent een virtuele audiokabel die je toch al hebt staan, en stuurt daar proper geluid naartoe. Het geheel blijft één gewone user-mode app, er draait niks in de kernel."
          },
          {
            title: "De opnamethread heeft weinig te doen",
            body: "De thread die je micro uitleest heeft maar één taak: de audio in een buffer zetten en doorgaan. Geen filtering, geen locks, geen geheugen dat daar wordt vrijgemaakt. Een tweede thread haalt er telkens exact 480 samples uit, 10 ms aan audio, en doet daar al het rekenwerk op."
          },
          {
            title: "Echo-onderdrukking zonder headset",
            body: "Muted luistert via loopback mee met wat je boxen afspelen. Een adaptief filter leert hoe dat geluid in je micro terechtkomt en trekt het er terug af. Praat je zelf terwijl er iets uit je boxen komt, dan merkt de app dat en past ze het filter even niet aan. Anders zou het filter je eigen stem leren wegfilteren."
          },
          {
            title: "Twee klokken die uit elkaar lopen",
            body: "Je micro en de virtuele kabel zijn twee losse apparaten met elk hun eigen klok, en tijdens een lange call lopen die stilaan uit elkaar. Schrijft Muted exact evenveel samples weg als het inleest, dan raakt de buffer op een gegeven moment leeg of net vol. Daarom stuurt het af en toe één sample meer of minder door, naargelang hoe vol de buffer op dat moment is. Eén sample hoor je nooit, maar op die manier blijft alles urenlang synchroon."
          },
          {
            title: "Het start niet als het naar je boxen zou gaan",
            body: "Eén van de controles heeft niks te maken met geluidskwaliteit. Zou de uitgang van Muted op je boxen staan in plaats van op een virtuele kabel, dan komt je eigen stem terug in je micro en krijg je een lus. Daarom controleert de app eerst of de uitgang echt een virtuele kabel is, en start ze niet als dat niet zo is."
          }
        ]
      },
      howItWorksTitle: "In grote lijnen",
      howItWorks: [
        "De app neemt je micro op in 48 kHz mono, via WASAPI.",
        "Zet je echo-onderdrukking aan, dan haalt Muted eerst weg wat je boxen afspelen. Zo heb je geen headset meer nodig.",
        "Elk blokje van 10 ms gaat dan door RNNoise, of door Studio Voice als je dat aan hebt staan.",
        "Een voice gate, automatisch niveau, een shout guard en een limiter zorgen dat je stil bent als je niet praat en nooit te luid binnenkomt.",
        "Het resultaat gaat naar een virtuele audiokabel, en die kies je als micro in Discord, Teams of je game."
      ],
      featuresTitle: "Functies",
      features: [
        "Studio Voice, met drie AI-modellen die ruis en de galm van je kamer weghalen",
        "Ruisonderdrukking met het officiële RNNoise-model",
        "Echo-onderdrukking, zodat je met boxen kan bellen in plaats van met een headset",
        "Voice gate, automatisch niveau, high-pass, limiter en een shout guard",
        "Tune to my voice, een kalibratie van 24 seconden die alles op jouw stem afstelt",
        "Profielen die zelf wisselen als je een game of call-app opent",
        "Push to talk en andere sneltoetsen die ook in fullscreen games werken",
        "Ook het geluid van anderen proper maken",
        "Draait volledig lokaal, zonder account, cloud of telemetrie",
        "Indicator in je game, bediening vanuit de systeemtray en automatische updates"
      ],
      stackTitle: "Gebouwd met",
      stack: ["C# en .NET 9", "WPF voor de interface", "NAudio en WASAPI voor de audio", "RNNoise als native DLL", "ONNX Runtime voor Studio Voice", "DeepFilterNet3 en DPDFNet"],
      installTitle: "Zo installeer je het",
      installSteps: [
        "Installeer een virtuele audiokabel, bijvoorbeeld de gratis VB-CABLE, en herstart Windows als dat gevraagd wordt.",
        "Download de installer van de laatste release. Via Scoop of als portable zip kan ook.",
        "Bij de eerste start helpt een korte setup van vier stappen je op weg.",
        "Kies je micro en de kabel, en druk op de aan-knop.",
        "Kies daarna in Discord, Teams of je game de opnamekant van de kabel als micro."
      ],
      limitationsTitle: "Goed om te weten",
      limitations: "Muted heeft nog altijd een virtuele kabel nodig, want Windows laat alleen ondertekende drivers een nieuwe micro toevoegen. De installer is ook niet code signed, dus Windows SmartScreen kan een waarschuwing tonen. Studio Voice voegt 50 ms vertraging toe en vraagt meer van je processor dan RNNoise. Op een tragere pc kies je dus best Classic.",
      downloadCta: "Download Muted",
      downloadNote: "Gratis en open source, voor Windows 10 en 11",
      githubCta: "Bekijk de broncode op GitHub"
    },
    setsPage: {
      back: "Terug naar home",
      badge: "PWA",
      title: "Sets",
      tagline: "Een app om je trainingen achteraf bij te houden.",
      intro: "Sets is een eenvoudige app om bij te houden wat je in de gym doet, zowel krachttraining als cardio. Je traint eerst, en typt achteraf in wat je gedaan hebt. Er is geen abonnement, de schermen laden meteen en je zet de app in een paar tikken op je gsm.",
      deepDive: {
        title: "Achter de schermen",
        intro: "Dit moet je niet lezen om de app te gebruiken. Het is voor wie wil weten hoe ze vanbinnen werkt.",
        signalPathTitle: "Wat er gebeurt als je een sessie opslaat",
        signalPathIntro: "Wat je intikt wordt eerst op je gsm zelf opgeslagen, dus het staat meteen vast en het scherm moet nergens op wachten. Pas daarna gaat de sessie naar de cloud, zodat je data ook op je andere toestellen belandt zonder dat je daar zelf iets voor moet doen.",
        signalPath: ["Workout", "Lokale write (localStorage)", "Supabase (cloud sync)"],
        frameMathTitle: "Wat je daarvan merkt",
        frameMath: [
          { value: "Meteen", label: "geen wachttijd voor je data" },
          { value: "Sync", label: "je sessies op al je toestellen" },
          { value: "Live", label: "je 1RM past zich aan terwijl je typt" },
          { value: "Auto", label: "je workout slaat zichzelf op" }
        ],
        points: [
          {
            title: "Schermen laden meteen",
            body: "Elk scherm toont je gegevens onmiddellijk, omdat de app een eigen kopie op je gsm bijhoudt in plaats van steeds alles opnieuw op te halen. Die kopie wordt op de achtergrond bijgewerkt zodra je inlogt."
          },
          {
            title: "Een crash kost geen data",
            body: "De workout waar je middenin zit wordt bij elke aanpassing bewaard. Sluit iOS de app af tijdens je sessie, dan vraagt Sets de volgende keer of je wil verdergaan waar je gebleven was."
          },
          {
            title: "Trainen zonder account kan gewoon",
            body: "Train je zonder in te loggen, dan blijft dat op je gsm staan. Maak je later toch een account, dan neemt de app die eerdere workouts mee in plaats van ze te laten vallen."
          }
        ]
      },
      howItWorksTitle: "Snel noteren",
      howItWorks: [
        "De app zet je gewichten en reps van de vorige keer al klaar als placeholder.",
        "Bij elke set berekent de app meteen je geschatte 1RM met de Epley-formule. Verbreek je je record, dan licht het veld goud op.",
        "Voor cardio zijn er apart velden voor tijd, afstand en calorieën.",
        "Tik op het setnummer om hem te taggen als warm-up, working set, drop set of tot falen. Warm-ups tellen niet mee voor je volume of je PR's.",
        "RPE per set is optioneel, en maakt je 1RM-schatting nauwkeuriger op basis van je reps in reserve."
      ],
      featuresTitle: "Functies",
      features: [
        "Een dashboard met je volume, je PR's en grafieken van je laatste 7 sessies",
        "Bronzen, zilveren en gouden badges die oplichten zodra je ze verdient",
        "Een plaatcalculator die je per gym en per eenheid instelt",
        "Kg of lbs, de app rekent zelf om",
        "Licht of donker thema, in het Nederlands en het Engels",
        "Eén tik in de instellingen maakt een backup van al je data"
      ],
      stackTitle: "Gebouwd met",
      stack: [
        "Vanilla ES6+ JavaScript, zonder bundler",
        "Tailwind CSS, op voorhand gecompileerd tot één statisch bestand",
        "Supabase voor login, database en cloud sync (met row-level security)",
        "PWA met een localStorage-cache, zodat schermen meteen laden"
      ],
      installTitle: "Zo zet je de app op je gsm",
      installSteps: [
        "Open sets.ink in Safari (iOS) of Chrome (Android).",
        "Tik op het deel-icoon en kies 'Zet op beginscherm'.",
        "Daarna opent Sets op volledig scherm, zonder browserbalk, net als een gewone app."
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
            "Ik zorg dat alles klaarstaat voor de chauffeurs, tijdens de nachtdienst."
          ]
        },
        {
          role: "Assistent Voorraadbeheer (Student)",
          company: "Thiry Gent - PRIMAMUNDO Group | Evergem",
          period: "DEC 2024 - OKT 2025",
          description: [
            "Ik telde de stock in het magazijn en vergeleek dat met de cijfers in het systeem.",
            "Klopte er iets niet, dan meldde ik dat meteen en zocht ik mee naar waar het fout ging.",
            "Ik hield het magazijn op orde en noteerde alles nauwkeurig.",
            "Het ging om verse producten, dus de telling moest snel gebeuren."
          ]
        },
        {
          role: "Magazijnier (Student)",
          company: "AMP (bpost group) | Lokeren",
          period: "JUL 2024 - JUL 2026",
          description: [
            "'s Nachts kreeg ik pallets met kranten binnen, die ik verdeelde over de juiste ritten.",
            "Ik deed ook dispatching: pallets met tijdschriften verdelen over de verschillende sites.",
            "Ik hielp ook mee met het verwerken van retourzendingen.",
            "Ik controleerde de leveringen en hield het magazijn netjes.",
            "Dat was 's nachts, ergens tussen 1 en 6 uur."
          ]
        },
        {
          role: "Verkoopmedewerker (Student)",
          company: "Lidl België & Luxemburg | Gent",
          period: "AUG 2022 - OKT 2023",
          description: [
            "Ik hielp lange rijen aan de kassa wegwerken.",
            "Ik hield de winkel proper, onder andere met de poetsmachine door de gangen.",
            "Ik beantwoordde vragen van klanten en hield de groente- en fruitafdeling in de gaten.",
            "'s Ochtends bakte ik de croissants af, en af en toe begeleidde ik nieuwe collega's."
          ]
        },
        {
          role: "Horecamedewerker (Student)",
          company: "Plopsaland De Panne",
          period: "JUN 2021 - SEP 2021",
          description: [
            "Ik verwelkomde gasten en hielp hen aan de kassa.",
            "Ik verwerkte de bestellingen en zorgde dat ze klopten.",
            "Ik hielp mee in de keuken bij het klaarmaken van de gerechten.",
            "Ik hield de zaak netjes en volgde de hygiëne- en veiligheidsregels."
          ]
        }
      ],
      educationList: [
        {
          school: "HOGENT",
          degree: "Graduaat Systeem- en Netwerkbeheer",
          period: "2025 - 2027 (Verwacht)",
          description: "Mijn huidige opleiding, met vooral bedrijfsnetwerken, serverbeheer en cloud."
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
      tagline: "Noise filter for your mic on Windows, now with Studio Voice.",
      intro: "Muted is a Windows app I built because my mic kept picking up my PC fan in Discord. It filters the background noise out of your microphone before it reaches Discord, Teams or your game. Everything happens locally on your PC. Nothing is sent to a server and nothing gets recorded. What started as a small pre-release is now a full app, with echo cancellation, shortcuts, profiles and, since version 0.9, Studio Voice.",
      galleryTitle: "Inside the app",
      gallery: ["Home screen with Studio Voice", "Picking a model", "Fine-tune", "Processing"],
      galleryAlt: [
        "Muted's home screen with the power button, the microphone picker and the Studio Voice switch",
        "The Sound page with Studio Voice on and the three models Classic, Balanced and Maximum",
        "The Fine-tune page with sliders for input gain, output gain, noise reduction and the voice gate",
        "The Processing page with noise suppression, echo cancellation, the voice gate and Tune to my voice"
      ],
      spotlight: {
        title: "Studio Voice",
        intro: "Studio Voice is the feature I'm most proud of. RNNoise mainly removes noise, like a fan or hiss. Studio Voice goes further and also removes the echo of your room. You sound like you're in a small studio, even though you're just sitting at your desk. You turn it on with one switch on the home screen.",
        modelsTitle: "Three models, you pick",
        models: [
          {
            title: "Classic",
            body: "DeepFilterNet3. The lightest model, and plenty for most PCs."
          },
          {
            title: "Balanced",
            body: "DPDFNet 2. This model uses dual-path recurrent blocks. That lets it remove noise that sits in the same frequencies as your voice, something a regular filter struggles with."
          },
          {
            title: "Maximum",
            body: "DPDFNet 8. The strongest of the three. It asks the most of your processor, but it also keeps the most detail in your voice."
          }
        ],
        statsTitle: "What it costs",
        stats: [
          { value: "3", label: "AI models" },
          { value: "50 ms", label: "delay" },
          { value: "6 ms", label: "processing per 10 ms of audio, on Maximum" },
          { value: "1", label: "processor thread" }
        ],
        pointsTitle: "How I built it",
        points: [
          {
            title: "Switching without your mic dropping out",
            body: "When you pick another model, Muted loads it in the background, next to the model that is still filtering. The new model first runs for 0.3 seconds without you hearing it, so it already knows your room. Then Muted crossfades over in 0.1 seconds. Your mic never goes silent, not even in the middle of a call."
          },
          {
            title: "All three have the same delay",
            body: "I made sure the three models have exactly the same 50 ms of delay. That way your voice doesn't shift when you switch models, and the rest of the chain stays in sync."
          },
          {
            title: "Studio Voice takes over completely",
            body: "When Studio Voice is on, it does all the noise removal by itself. Nothing of the original sound is mixed back in. Your gate, your level, the high-pass and the limiter keep working the way you set them."
          },
          {
            title: "A gate that listens to two models",
            body: "The voice gate only opens when both Studio Voice and RNNoise hear a voice. A mouse or keyboard click no longer pops the gate open."
          },
          {
            title: "A watchdog for the model",
            body: "An AI model can sometimes get stuck in a strange state, and then it just lets the noise through. Muted keeps an eye on that. If the model removes less than 6 dB for two seconds while you're quiet, Muted restarts it by itself. That used to take turning Studio Voice off and on again."
          },
          {
            title: "Always a plan B",
            body: "While a model is still loading, or if it can't run on your PC, RNNoise keeps filtering the noise. So you're never left without noise suppression."
          }
        ]
      },
      deepDive: {
        title: "Behind the scenes",
        signalPathTitle: "Where your voice actually goes",
        signalPathIntro: "Windows will let an app use whatever mics and speakers are already installed, but adding a brand new device needs a signed kernel driver. Muted sidesteps that: it grabs your actual mic, cleans up what it hears, and passes the result to a virtual cable that other apps can pick up as their input.",
        signalPath: ["Microphone", "Muted (echo · RNNoise or Studio Voice · gate · limiter · drift)", "Virtual cable in", "Cable's paired output", "Discord / Teams / game"],
        frameMathTitle: "What that looks like in numbers",
        frameMath: [
          { value: "48 kHz", label: "sample rate" },
          { value: "480", label: "samples per frame" },
          { value: "20 ms", label: "delay with RNNoise" },
          { value: "50 ms", label: "delay with Studio Voice" }
        ],
        points: [
          {
            title: "It doesn't install its own driver",
            body: "A regular app can't add itself to the list of mics Discord sees. For that you'd need a signed kernel driver, plus the whole certification process behind it. Muted avoids all of that by borrowing a virtual audio cable you've already installed, and just feeding it clean audio. The whole thing runs as one ordinary user-mode app; nothing touches the kernel."
          },
          {
            title: "The thread reading your mic barely does anything",
            body: "The thread that reads your mic has exactly one job: put the audio in a buffer and move on. No filtering, no locks, no memory being freed there. A second thread takes out exactly 480 samples at a time, 10 ms of audio, and does all the processing on that."
          },
          {
            title: "Echo cancellation without a headset",
            body: "Muted listens along to what your speakers play, through loopback. An adaptive filter learns how that sound ends up in your mic and subtracts it again. When you talk while something comes out of your speakers, the app notices and stops adapting the filter for a moment. Otherwise the filter would learn to remove your own voice."
          },
          {
            title: "Two clocks that drift apart",
            body: "Your microphone and the virtual cable are separate devices, each running on its own clock, and during a long call those clocks slowly drift apart. If Muted wrote out exactly the number of samples it read in, the buffer would eventually empty out or overflow. Instead, every now and then, it adds or drops a single sample depending on how full the buffer currently is. One sample is inaudible, but doing this keeps everything in sync for hours at a stretch."
          },
          {
            title: "It refuses to start if it's pointed at your speakers",
            body: "One safeguard has nothing to do with audio quality at all. If Muted's output somehow pointed at your speakers instead of a virtual cable, your own voice would feed straight back into the mic and create a loop. So before doing anything else, the app checks whether the output device is actually a virtual cable, and simply refuses to start if it isn't."
          }
        ]
      },
      howItWorksTitle: "The gist",
      howItWorks: [
        "The app records your mic at 48 kHz mono, through WASAPI.",
        "With echo cancellation on, Muted first removes what your speakers play. So you no longer need a headset.",
        "Each 10 ms block then goes through RNNoise, or through Studio Voice if you have it on.",
        "A voice gate, automatic level, a shout guard and a limiter keep you silent when you're not talking and never too loud.",
        "The result goes to a virtual audio cable, and you pick that as your mic in Discord, Teams or your game."
      ],
      featuresTitle: "Features",
      features: [
        "Studio Voice, with three AI models that remove noise and the echo of your room",
        "Noise suppression with the official RNNoise model",
        "Echo cancellation, so you can call with speakers instead of a headset",
        "Voice gate, automatic level, high-pass, limiter and a shout guard",
        "Tune to my voice, a 24-second calibration that sets everything up for your voice",
        "Profiles that switch by themselves when you open a game or call app",
        "Push to talk and other shortcuts that also work in full-screen games",
        "Cleaning up other people's audio too",
        "Runs fully locally, without an account, cloud or telemetry",
        "An in-game indicator, controls in the system tray and automatic updates"
      ],
      stackTitle: "Built with",
      stack: ["C# and .NET 9", "WPF for the interface", "NAudio and WASAPI for the audio", "RNNoise as a native DLL", "ONNX Runtime for Studio Voice", "DeepFilterNet3 and DPDFNet"],
      installTitle: "Setting it up",
      installSteps: [
        "Install a virtual audio cable, for example the free VB-CABLE, and restart Windows if it asks.",
        "Download the installer from the latest release. Scoop or a portable zip work too.",
        "On first start, a short four-step setup gets you going.",
        "Pick your mic and the cable, and hit the power button.",
        "Then pick the cable's recording side as your mic in Discord, Teams or your game."
      ],
      limitationsTitle: "Good to know",
      limitations: "Muted still needs a virtual cable, because Windows only lets signed drivers add a new microphone. The installer isn't code signed either, so Windows SmartScreen may show a warning. Studio Voice adds 50 ms of delay and asks more of your processor than RNNoise. On a slower PC, Classic is the best pick.",
      downloadCta: "Download Muted",
      downloadNote: "Free and open source, for Windows 10 and 11",
      githubCta: "See the source on GitHub"
    },
    setsPage: {
      back: "Back to home",
      badge: "PWA",
      title: "Sets",
      tagline: "An app for logging your workouts afterwards.",
      intro: "Sets is a straightforward app for tracking what you do at the gym, both lifting and cardio. You train first, then type in what you did afterward. There is no subscription, screens load straight away, and you can put it on your phone in a couple of taps.",
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
            title: "Screens load straight away",
            body: "Every screen loads your data instantly, because the app keeps its own copy on your phone rather than fetching everything fresh each time. That local copy gets refreshed in the background whenever you log in."
          },
          {
            title: "A crash loses no data",
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
        "Kg or lbs, and the app converts between them",
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
            "I make sure everything is ready for the drivers on the night shift."
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
            "It was fresh produce, so the counts had to be done quickly."
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
            "I helped clear long lines at the register.",
            "I kept the store clean, including running the scrubber machine through the aisles.",
            "I answered customer questions and kept an eye on the fruit and vegetable section.",
            "In the mornings I'd finish baking the croissants, and sometimes helped guide new colleagues."
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
            "I kept the place clean and followed the hygiene and safety rules."
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
