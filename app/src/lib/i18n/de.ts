import type { Dictionary } from "./types";

export const de: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Lerne Solana in 5 Taps",
    siteDescription:
      "Fünf 30-Sekunden-Lektionen, jede eine echte Solana Action: USDC senden, in SOL Trinkgeld geben, Geld ins Ausland überweisen, Swaps verstehen und ein Abschluss-Badge minten.",
    lessonMetaTitle: "Lektion {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions als 30-Sekunden-Lektionen",
    faucetLink: "Devnet-Faucet",
    languageLabel: "Sprache",

    heroEyebrow: "Solana Devnet · Kostenlos ausprobieren",
    heroTitlePre: "Lerne Solana mit ",
    heroTitleHighlight: "fünf Taps",
    heroTitlePost: " statt fünf Tutorials.",
    heroSubtitle:
      "Jede Lektion ist ein echter Blink — eine Solana Action, die du mit einem Tap und deiner eigenen Wallet signierst. Sende digitale Dollar, gib einem Creator Trinkgeld, überweise Geld über eine Grenze, verstehe Swaps und schließe mit einem Onchain-Badge ab.",
    statLessons: "Lektionen",
    statMinutes: "~{m} Min.",
    statTotal: "insgesamt",
    statLiveNow: "jetzt live",
    statBadge: "Badge zum Minten",
    pathHeading: "Der Lernpfad",
    footerHome:
      "Läuft auf dem Solana Devnet — jede Transaktion ist echt, jeder Dollar ist Spielgeld. Verbinde auf einer Lektionsseite eine Devnet-Wallet, um loszulegen.",

    liveBadge: "Live",
    comingSoonBadge: "Bald verfügbar",
    durationFormat: "~{s} s",
    earnPrefix: "Verdiene: ",
    startLesson: "Lektion starten",
    comingSoonCta: "Bald verfügbar",

    backToLessons: "Alle Lektionen",
    lessonXofY: "Lektion {x} von {y}",
    lessonWord: "Lektion",
    whatYoullLearn: "Was du lernst",
    whyItMatters: "Warum das wichtig ist",
    howItWorks: "So funktioniert's",
    doItHere: "Mach es — direkt hier",
    wordsYouLearned: "Begriffe, die du gerade gelernt hast",
    learningObjectives: "Lernziele",
    prerequisites: "Voraussetzungen",
    noPrereqs: "Keine — hier beginnt der Pfad.",
    comingSoonLesson: "Diese Lektion erscheint bald.",
    actionApiLabel: "Action API:",
    didYouKnow: "Schon gewusst?",
    previous: "Zurück",
    next: "Weiter",
    footerLesson: "Gebaut für die Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Blink wird geladen …",
    blinkError:
      "Blink konnte nicht geladen werden. Prüfe die Action-URL und die CORS-Header.",
  },

  lessons: {
    "1": {
      title: "Sende deine ersten USDC",
      tagline: "Digitale Dollar, die sich mit einem Tap bewegen",
      description:
        "USDC ist ein Stablecoin — ein Token, der stabil an den Wert von 1 $ gekoppelt ist und von Circle herausgegeben wird. Auf Solana liegt er in einem SPL-Token-Konto, einem separaten Guthaben, das an einen bestimmten Mint gebunden ist. In dieser Lektion sendest du einen kleinen USDC-Betrag an die Kurs-Treasury und siehst zu, wie ein echter Transfer in Sekunden auf dem Devnet abgewickelt wird.",
      whyItMatters:
        "Stablecoins sind der größte reale Anwendungsfall von Krypto: Dollar-Ersparnisse ohne US-Bankkonto, Zahlungen ohne Kartennetzwerke und Werte, die nicht über Nacht um 10 % schwanken. Wenn du nur eine Onchain-Fähigkeit lernst, dann das Bewegen von USDC.",
      blinkAction:
        "Verbinde eine Devnet-Wallet und tippe auf den Senden-Button. Deine Wallet zeigt dir eine Vorschau des SPL-Token-Transfers; nachdem du signiert hast, landen die USDC im Token-Konto der Treasury — meistens in unter zwei Sekunden.",
      steps: [
        {
          title: "Verbinde deine Wallet",
          body: "Deine Wallet hält SOL für Gebühren und USDC in einem SPL-Token-Konto. Hol dir Devnet-USDC vom Faucet von Circle, falls du noch keine hast.",
        },
        {
          title: "Prüfe den Transfer",
          body: "Der Blink baut die Transaktion für dich. Kontrolliere Betrag und Empfänger in deiner Wallet — signiere niemals blind.",
        },
        {
          title: "Einmal signieren",
          body: "Eine Signatur bewegt die USDC onchain. Du zahlst eine winzige SOL-Netzwerkgebühr (Bruchteile eines Cents).",
        },
      ],
      concepts: [
        "Stablecoins",
        "SPL-Token",
        "Token-Konten",
        "Netzwerkgebühren",
      ],
      glossary: {
        USDC: "Ein Stablecoin, der an 1 $ gekoppelt ist und von Circle herausgegeben wird.",
        "SPL token":
          "Solanas Token-Standard — vergleichbar mit ERC-20 auf Ethereum.",
        "Token-Konto":
          "Ein Onchain-Konto, das ein Guthaben eines bestimmten Tokens hält.",
      },
      funFact:
        "Devnet-USDC nutzt dieselbe SPL-Mechanik wie das Mainnet — du lernst das Echte, ohne einen einzigen Dollar zu riskieren.",
      learningObjectives: [
        "USDC als dollargebundenen Stablecoin auf Solana verstehen",
        "Einen SPL-Token-Transfer senden (kein natives SOL)",
        "Eine echte Transaktion aus einem Blink in unter einer Minute abschließen",
      ],
      badgeLabel: "USDC-Sender",
      actionLabel: "Sende 0,01 USDC",
      successMessage:
        "Sende 0,01 USDC an die Bildungs-Treasury ({recipient}). Prüfe alles in deiner Wallet, bevor du signierst.",
    },
    "2": {
      title: "Gib einem Creator Trinkgeld in SOL",
      tagline: "Native Transfers, Lamports und was Gebühren wirklich kosten",
      description:
        "SOL ist Solanas native Währung — der Asset, der jede Transaktion im Netzwerk bezahlt. Anders als USDC braucht es kein Token-Konto: Beim Trinkgeld wandern Lamports direkt von deiner Wallet zur Adresse des Creators. Du sendest 0,001 SOL (eine Million Lamports) und siehst genau, was eine Netzwerkgebühr kostet.",
      whyItMatters:
        "Creator-Trinkgeld macht Zahlungen sozial. Ein Blink wie dieser kann direkt in einem Post auf X stecken und Fans in Sekunden Trinkgeld geben lassen — ohne Plattform-Anteil, ohne 3 Tage Auszahlungssperre und ohne Bank dazwischen.",
      blinkAction:
        "Tippe auf den Trinkgeld-Button, um eine Vorschau des SystemProgram-Transfers zu sehen. Bestätige in deiner Wallet, um genau 1.000.000 Lamports (0,001 SOL) plus eine Gebühr von etwa 5.000 Lamports an den Creator zu senden.",
      steps: [
        {
          title: "Verbinde deine Wallet",
          body: "Du brauchst ein wenig Devnet-SOL — der Faucet gibt dir mehr als genug.",
        },
        {
          title: "Prüfe das Trinkgeld",
          body: "Die Wallet zeigt, dass 0,001 SOL dein Konto verlassen. Achte auf die separate Zeile für die Netzwerkgebühr — das ist, was Solana tatsächlich verlangt.",
        },
        {
          title: "Onchain bestätigen",
          body: "Das Trinkgeld landet in Sekunden in der Wallet des Creators — endgültig und unumkehrbar.",
        },
      ],
      concepts: ["Natives SOL", "Lamports", "SystemProgram", "Finalität"],
      glossary: {
        SOL: "Solanas nativer Token, genutzt für Gebühren und Transfers.",
        Lamport:
          "Die kleinste Einheit von SOL — 1 SOL = 1.000.000.000 Lamports.",
        Netzwerkgebühr:
          "Winzige SOL-Kosten, die an Validatoren für die Verarbeitung deiner Transaktion gehen.",
      },
      funFact:
        "Eine typische Solana-Transaktionsgebühr liegt bei 5.000 Lamports — etwa 0,001 $. Eine Banküberweisung per Wire kostet rund 25.000-mal mehr.",
      learningObjectives: [
        "Natives SOL (keinen SPL-Token) an eine andere Wallet senden",
        "Lamports und Netzwerkgebühren in der Wallet-Vorschau lesen",
        "Ein echtes Onchain-Trinkgeld mit einem Tap abschließen",
      ],
      badgeLabel: "SOL-Tipper",
      actionLabel: "Gib 0,001 SOL Trinkgeld",
      successMessage:
        "Gib 0,001 SOL Trinkgeld an {recipient}. Prüfe alles in deiner Wallet, bevor du signierst.",
    },
    "3": {
      title: "Sende Geld über eine Grenze",
      tagline: "Überweisung in Sekunden — nicht in drei Werktagen",
      description:
        "Remittance — Geld über Grenzen hinweg nach Hause schicken — ist einer der relevantesten Anwendungsfälle von Krypto, besonders auf Korridoren wie Türkei ↔ EU/USA. In dieser Lektion sendest du eine kleine USDC-Zahlung an eine Familien-Wallet im Ausland und erlebst Settlement in Sekunden — ohne SWIFT-Verzögerung und ohne Bank-Wechselkursaufschlag.",
      whyItMatters:
        "Klassische Auslandsüberweisungen kosten 5–7 % Gebühren und dauern Tage. Derselbe Transfer auf Solana kostet einen Bruchteil eines Cents und ist abgewickelt, bevor du die Seite neu laden kannst. Für Familien in der Diaspora ist das keine Demo — es löst ein monatliches Problem.",
      blinkAction:
        "Tippe auf den Senden-Button, um eine Vorschau des SPL-Transfers an die Demo-Remittance-Wallet zu sehen — stell dir „Ayşe in Deutschland“ vor. Einmal signieren, und die Zahlung ist in Sekunden auf Solana abgewickelt.",
      steps: [
        {
          title: "Stell dir den Empfänger vor",
          body: "Die Demo-Wallet steht stellvertretend für Familie im Ausland — derselbe Ablauf funktioniert für jede Adresse auf der Welt.",
        },
        {
          title: "Prüfe die Zahlung",
          body: "Dieselbe USDC-Transfer-Mechanik wie in Lektion 1 — dem Netzwerk sind Grenzen egal.",
        },
        {
          title: "Signieren und abwickeln",
          body: "Das Settlement ist in Sekunden final. Vergleich das mit einer SWIFT-Überweisung von 2–3 Tagen und 5 % Gebühren.",
        },
      ],
      concepts: [
        "Remittance",
        "Settlement-Geschwindigkeit",
        "Wechselkursaufschlag",
        "Grenzenlose Transfers",
      ],
      glossary: {
        Remittance:
          "Geld, das über Grenzen geschickt wird — meist von Arbeitenden an die Familie zu Hause.",
        SWIFT:
          "Das alte Interbanken-Nachrichtennetzwerk — Überweisungen dauern 1–5 Werktage.",
        Settlement:
          "Der Moment, in dem der Wert tatsächlich den Besitzer wechselt — final und unumkehrbar.",
      },
      funFact:
        "Die türkische Diaspora schickt jedes Jahr Milliarden nach Hause. Bei Solana-Gebühren wären die Einsparungen gegenüber Banküberweisungen enorm.",
      learningObjectives: [
        "Verstehen, warum USDC-Remittance klassische Auslandsüberweisungen schlägt",
        "USDC an eine zweite Wallet senden (Familien-/Diaspora-Anwendungsfall)",
        "Settlement-Geschwindigkeit und niedrige Gebühren auf Solana erkennen",
      ],
      badgeLabel: "Remitter",
      actionLabel: "Sende 0,05 USDC",
      successMessage:
        "Sende 0,05 USDC ins Ausland, um Lektion 3 abzuschließen. Prüfe Empfänger und Betrag in deiner Wallet, bevor du signierst.",
    },
    "4": {
      title: "Verstehe deinen ersten Swap",
      tagline: "Wie DEXs einen Token gegen einen anderen tauschen",
      description:
        "Ein Swap tauscht einen Token direkt onchain gegen einen anderen — kein Börsenkonto, kein Orderformular. Auf dem Mainnet findet ein Aggregator wie Jupiter die beste Route über Solanas DEXs. Jupiter hat keine Devnet-Liquidität, deshalb ist diese Lektion eine ehrliche Simulation: Du signierst eine echte Devnet-Transaktion, die ein Swap-Lektions-Memo onchain festhält, während der Blink dich durch Quotes, Routen und Slippage führt.",
      whyItMatters:
        "Swaps sind das Tor zu ganz DeFi — volatiles SOL in stabiles USDC zu tauschen ist, wie Menschen Werte schützen, und es ist der Mechanismus hinter jeder DEX, jedem Aggregator und jedem Yield-Produkt, das dir später begegnet.",
      blinkAction:
        "Tippe auf den Swap-Button. Die Action prüft, ob du mindestens 0,01 SOL hältst (den Betrag, den ein echter Swap nutzen würde), dann signiert deine Wallet eine Devnet-Transaktion mit einem Swap-Demo-Memo — dein Onchain-Beweis, dass du die Lektion abgeschlossen hast.",
      steps: [
        {
          title: "Halte den Swap-Betrag",
          body: "Ein echter Swap würde 0,01 SOL tauschen, deshalb verlangt die Lektion, dass du sie hältst — plus ein bisschen extra für Gebühren.",
        },
        {
          title: "Lerne die Route",
          body: "Auf dem Mainnet holt Jupiter Quotes für SOL → USDC über viele DEXs ein und wählt den besten Preis. Die Slippage-Toleranz schützt dich vor Preisbewegungen.",
        },
        {
          title: "Signiere die Demo-Transaktion",
          body: "Du signierst eine echte Devnet-Transaktion mit einem Memo, das die Lektion festhält — derselbe Signier-Ablauf wie bei einem Mainnet-Swap.",
        },
      ],
      concepts: ["Swaps", "DEX-Aggregatoren", "Slippage", "Memo-Programm"],
      glossary: {
        Swap: "Der direkte Tausch eines Tokens gegen einen anderen, onchain.",
        Jupiter:
          "Solanas führender Aggregator — findet die beste Swap-Route über alle DEXs.",
        Slippage:
          "Die Preisbewegung, die du zwischen Quote und Ausführung tolerierst.",
        Memo: "Eine kleine Onchain-Notiz an einer Transaktion — hier dein Abschlussnachweis.",
      },
      funFact:
        "Jupiter routet pro Quote durch Dutzende Liquiditätsquellen. Dein Devnet-Memo nutzt dasselbe Memo-Programm, das Mainnet-Apps für Belege verwenden.",
      learningObjectives: [
        "Einen Swap definieren und erklären, was ein DEX-Aggregator macht",
        "Slippage verstehen und warum sich Quotes ändern",
        "Eine echte Devnet-Transaktion mit einem Onchain-Memo signieren",
      ],
      badgeLabel: "Swapper",
      actionLabel: "Swappe 0,01 SOL (Devnet-Demo)",
      successMessage:
        "Devnet-Demo: Du hast ein Abschluss-Memo der Swap-Lektion signiert. Auf dem Mainnet würde derselbe Ablauf 0,01 SOL über Jupiter in USDC tauschen.",
    },
    "5": {
      title: "Hol dir dein Abschluss-Badge",
      tagline: "Minte einen Onchain-Nachweis, der wirklich dir gehört",
      description:
        "Das Finale. Du mintest ein Blinks-101-Graduate-Badge — einen echten Devnet-Token mit einem festen Supply von genau 1, erstellt in einer einzigen Transaktion, die deine Wallet bezahlt und signiert. Die Mint Authority wird in derselben Transaktion verbrannt, sodass niemand jemals eine zweite Kopie minten kann: Genau das ist die Kernidee hinter NFTs als Nachweisen.",
      whyItMatters:
        "Onchain-Nachweise können nicht gefälscht, von einer Plattform widerrufen oder verloren werden, wenn ein Unternehmen schließt. Von Event-Tickets bis zu Diplomen: Supply-1-Token in deiner eigenen Wallet sind, wie Eigentum und Nachweis in Web3 funktionieren.",
      blinkAction:
        "Tippe nach Abschluss der Lektionen 1–4 auf den Claim-Button. Deine Wallet signiert eine Transaktion, die den Badge-Mint erstellt, genau 1 Token an dich mintet und den Supply dauerhaft sperrt. Kostet etwa 0,003 Devnet-SOL an Rent.",
      steps: [
        {
          title: "Schließe den Kurs ab",
          body: "Erst Lektion 1–4 — das Badge ist dein Nachweis für den ganzen Pfad, in diesem Devnet-MVP auf Ehrenwort.",
        },
        {
          title: "Signiere den Mint",
          body: "Eine Transaktion erstellt einen brandneuen Token-Mint, öffnet dein Token-Konto und mintet genau 1 Badge in deine Wallet.",
        },
        {
          title: "Supply für immer gesperrt",
          body: "Dieselbe Transaktion entfernt die Mint Authority. Supply: 1. Besitzer: du. Das ist ein Nachweis.",
        },
      ],
      concepts: [
        "NFTs als Nachweise",
        "Mint Authority",
        "Fester Supply",
        "Rent",
      ],
      glossary: {
        NFT: "Ein Token mit Supply 1 — einzigartig, besitzbar und übertragbar.",
        "Mint Authority":
          "Der Schlüssel, der neue Tokens erstellen darf. Wird er entfernt, ist der Supply für immer gesperrt.",
        Rent: "Eine kleine SOL-Kaution, die ein Konto onchain am Leben hält.",
      },
      funFact:
        "Dein Badge ist ein echter SPL-Mint, den du in jedem Explorer nachschlagen kannst — such die Mint-Adresse und du siehst: Supply 1, Mint Authority: keine.",
      learningObjectives: [
        "NFTs als Wallet-eigene Nachweise verstehen",
        "Sehen, wie das Verbrennen der Mint Authority den Supply auf 1 fixiert",
        "Den 5-Lektionen-Blinks-Onboarding-Pfad abschließen",
      ],
      badgeLabel: "Blinks-101-Absolvent",
      actionLabel: "Abschluss-Badge claimen",
      successMessage:
        "Abschluss-Badge gemintet! Der Supply-1-Token {mint} gehört jetzt deiner Wallet — schlag ihn in einem beliebigen Devnet-Explorer nach.",
    },
  },
};
