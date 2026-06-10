import type { Dictionary } from "./types";

export const it: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Impara Solana in 5 tap",
    siteDescription:
      "Cinque lezioni da 30 secondi, ognuna una vera Solana Action: invia USDC, lascia una mancia in SOL, manda soldi all'estero, capisci gli swap e conia il tuo badge di diploma.",
    lessonMetaTitle: "Lezione {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions come lezioni da 30 secondi",
    faucetLink: "Faucet Devnet",
    languageLabel: "Lingua",

    heroEyebrow: "Solana Devnet · Gratis da provare",
    heroTitlePre: "Impara Solana in ",
    heroTitleHighlight: "cinque tap",
    heroTitlePost: ", non in cinque tutorial.",
    heroSubtitle:
      "Ogni lezione è un vero Blink — una Solana Action da un tap che firmi con il tuo wallet. Invia dollari digitali, lascia una mancia a un creator, manda soldi oltre confine, capisci gli swap e diplomati con un badge onchain.",
    statLessons: "lezioni",
    statMinutes: "~{m} min",
    statTotal: "in totale",
    statLiveNow: "attive ora",
    statBadge: "badge da coniare",
    pathHeading: "Il percorso di apprendimento",
    footerHome:
      "Gira su Solana Devnet — ogni transazione è vera, ogni dollaro è finto. Collega un wallet devnet nella pagina di una lezione per iniziare.",

    liveBadge: "Attiva",
    comingSoonBadge: "In arrivo",
    durationFormat: "~{s}s",
    earnPrefix: "Ottieni: ",
    startLesson: "Inizia la lezione",
    comingSoonCta: "In arrivo",

    backToLessons: "Tutte le lezioni",
    lessonXofY: "Lezione {x} di {y}",
    lessonWord: "Lezione",
    whatYoullLearn: "Cosa imparerai",
    whyItMatters: "Perché è importante",
    howItWorks: "Come funziona",
    doItHere: "Fallo — proprio qui",
    wordsYouLearned: "Parole che hai appena imparato",
    learningObjectives: "Obiettivi di apprendimento",
    prerequisites: "Prerequisiti",
    noPrereqs: "Nessuno — il percorso inizia da qui.",
    comingSoonLesson: "Questa lezione è in arrivo.",
    actionApiLabel: "Action API:",
    didYouKnow: "Lo sapevi?",
    previous: "Precedente",
    next: "Successiva",
    footerLesson: "Creato per il Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Caricamento del Blink…",
    blinkError:
      "Impossibile caricare il Blink. Controlla l'URL della Action e gli header CORS.",
    blinkApiNote: "Nota: questa card proviene dalla Action API. I controlli del wallet e le superfici esterne (X, wallet) possono apparire in inglese.",
    faucetHint: "Ti servono fondi devnet? Ottieni SOL e USDC di prova gratis:",
  },

  lessons: {
    "1": {
      title: "Invia i tuoi primi USDC",
      tagline: "Dollari digitali che si muovono in un tap",
      description:
        "USDC è una stablecoin — un token ancorato a 1 $, emesso da Circle. Su Solana vive in un token account SPL, un saldo separato legato a un mint specifico. In questa lezione invii una piccola somma di USDC alla tesoreria del corso e vedi un vero trasferimento regolarsi su devnet in pochi secondi.",
      whyItMatters:
        "Le stablecoin sono l'uso reale più grande delle cripto: risparmi in dollari senza un conto in una banca americana, pagamenti senza circuiti di carte e un valore che non oscilla del 10% da un giorno all'altro. Se devi imparare una sola competenza onchain, che sia muovere USDC.",
      blinkAction:
        "Collega un wallet devnet e tocca il pulsante di invio. Il wallet ti mostra l'anteprima di un trasferimento di token SPL; dopo la firma, gli USDC arrivano nel token account della tesoreria — di solito in meno di due secondi.",
      steps: [
        {
          title: "Collega il tuo wallet",
          body: "Il tuo wallet contiene SOL per le commissioni e USDC in un token account SPL. Se non ne hai, prendi degli USDC devnet dal faucet di Circle.",
        },
        {
          title: "Controlla il trasferimento",
          body: "Il Blink costruisce la transazione per te. Verifica importo e destinatario nel wallet — non firmare mai alla cieca.",
        },
        {
          title: "Firma una volta sola",
          body: "Una firma sposta gli USDC onchain. Paghi una minuscola commissione di rete in SOL (frazioni di centesimo).",
        },
      ],
      concepts: [
        "Stablecoin",
        "Token SPL",
        "Token account",
        "Commissioni di rete",
      ],
      glossary: {
        USDC: "Una stablecoin ancorata a 1 $, emessa da Circle.",
        "SPL token": "Lo standard dei token di Solana — come ERC-20 su Ethereum.",
        "Token account":
          "Un account onchain che contiene il saldo di un singolo token specifico.",
      },
      funFact:
        "Gli USDC su devnet usano la stessa meccanica SPL di mainnet — stai imparando quella vera, con zero dollari a rischio.",
      learningObjectives: [
        "Capire USDC come stablecoin ancorata al dollaro su Solana",
        "Inviare un trasferimento di token SPL (non SOL nativi)",
        "Completare una transazione reale da un Blink in meno di un minuto",
      ],
      badgeLabel: "Mittente USDC",
      actionLabel: "Invia 0.01 USDC",
      successMessage:
        "Invia 0.01 USDC alla tesoreria educativa ({recipient}). Controlla nel tuo wallet prima di firmare.",
    },
    "2": {
      title: "Lascia una mancia in SOL a un creator",
      tagline: "Trasferimenti nativi, lamport e quanto costano davvero le commissioni",
      description:
        "SOL è la valuta nativa di Solana — l'asset che paga ogni transazione sulla rete. A differenza di USDC, non serve un token account: la mancia sposta i lamport direttamente dal tuo wallet all'indirizzo del creator. Invierai 0.001 SOL (un milione di lamport) e vedrai esattamente quanto costa una commissione di rete.",
      whyItMatters:
        "Le mance ai creator sono il modo in cui i pagamenti diventano social. Un Blink come questo può stare dentro un post su X e permettere ai fan di lasciare una mancia in pochi secondi, senza commissioni della piattaforma, senza attese di 3 giorni per l'accredito e senza banche di mezzo.",
      blinkAction:
        "Tocca il pulsante della mancia per vedere l'anteprima di un trasferimento SystemProgram. Conferma nel wallet per inviare esattamente 1.000.000 di lamport (0.001 SOL) più una commissione di circa 5.000 lamport al creator.",
      steps: [
        {
          title: "Collega il tuo wallet",
          body: "Ti serve un po' di SOL devnet — il faucet te ne dà in abbondanza.",
        },
        {
          title: "Controlla la mancia",
          body: "Il wallet mostra 0.001 SOL in uscita dal tuo account. Nota la riga separata della commissione di rete — è quello che Solana fa pagare davvero.",
        },
        {
          title: "Conferma onchain",
          body: "La mancia arriva nel wallet del creator in pochi secondi, definitiva e irreversibile.",
        },
      ],
      concepts: ["SOL nativi", "Lamport", "SystemProgram", "Finalità"],
      glossary: {
        SOL: "Il token nativo di Solana, usato per commissioni e trasferimenti.",
        Lamport: "L'unità più piccola di SOL — 1 SOL = 1.000.000.000 di lamport.",
        "Commissione di rete":
          "Un costo minimo in SOL pagato ai validatori per elaborare la tua transazione.",
      },
      funFact:
        "Una tipica commissione di transazione su Solana è di 5.000 lamport — circa 0,001 $. Un bonifico bancario costa più o meno 25.000 volte di più.",
      learningObjectives: [
        "Inviare SOL nativi (non un token SPL) a un altro wallet",
        "Leggere lamport e commissioni di rete nell'anteprima del wallet",
        "Completare una vera mancia onchain in un tap",
      ],
      badgeLabel: "Tipper di SOL",
      actionLabel: "Lascia una mancia di 0.001 SOL",
      successMessage:
        "Lascia una mancia di 0.001 SOL a {recipient}. Controlla nel tuo wallet prima di firmare.",
    },
    "3": {
      title: "Manda soldi oltre confine",
      tagline: "Rimesse in pochi secondi — non in tre giorni lavorativi",
      description:
        "Le rimesse — inviare denaro a casa oltre i confini — sono uno degli usi più concreti delle cripto, soprattutto sui corridoi Turchia ↔ UE/USA. In questa lezione invii un piccolo pagamento in USDC al wallet di un familiare all'estero e sperimenti un regolamento in pochi secondi, senza i ritardi di SWIFT e senza lo spread di cambio della banca.",
      whyItMatters:
        "Le rimesse tradizionali costano il 5–7% di commissioni e richiedono giorni. Lo stesso trasferimento su Solana costa una frazione di centesimo e si regola prima che tu riesca a ricaricare la pagina. Per le famiglie della diaspora non è una demo — è un problema mensile risolto.",
      blinkAction:
        'Tocca il pulsante di invio per vedere l\'anteprima di un trasferimento SPL verso il wallet demo delle rimesse — pensa "Ayşe in Germania". Firma una volta e il pagamento si regola su Solana in pochi secondi.',
      steps: [
        {
          title: "Immagina il destinatario",
          body: "Il wallet demo rappresenta la famiglia all'estero — lo stesso flusso funziona per qualsiasi indirizzo sulla Terra.",
        },
        {
          title: "Controlla il pagamento",
          body: "La stessa meccanica di trasferimento USDC che hai imparato nella Lezione 1 — alla rete i confini non interessano.",
        },
        {
          title: "Firma e regola",
          body: "Il regolamento è definitivo in pochi secondi. Confrontalo con un bonifico SWIFT di 2–3 giorni e una commissione del 5%.",
        },
      ],
      concepts: [
        "Rimesse",
        "Velocità di regolamento",
        "Spread di cambio",
        "Trasferimenti senza confini",
      ],
      glossary: {
        Rimessa:
          "Denaro inviato oltre confine, di solito da chi lavora all'estero alla famiglia rimasta a casa.",
        SWIFT:
          "La storica rete di messaggistica interbancaria — i bonifici richiedono 1–5 giorni lavorativi.",
        Regolamento:
          "Il momento in cui il valore passa davvero di mano, in modo definitivo e irreversibile.",
      },
      funFact:
        "La diaspora turca manda a casa miliardi ogni anno. Con le commissioni di Solana, il risparmio rispetto ai bonifici sarebbe enorme.",
      learningObjectives: [
        "Capire perché le rimesse in USDC battono i bonifici tradizionali",
        "Inviare USDC a un secondo wallet (caso d'uso famiglia / diaspora)",
        "Riconoscere la velocità di regolamento e le commissioni basse di Solana",
      ],
      badgeLabel: "Rimettente",
      actionLabel: "Invia 0.05 USDC",
      successMessage:
        "Invia 0.05 USDC all'estero per completare la Lezione 3. Controlla destinatario e importo nel tuo wallet prima di firmare.",
    },
    "4": {
      title: "Capisci il tuo primo swap",
      tagline: "Come i DEX scambiano un token con un altro",
      description:
        "Uno swap scambia un token con un altro direttamente onchain — niente account su un exchange, niente moduli d'ordine. Su mainnet, un aggregatore come Jupiter trova il percorso migliore tra i DEX di Solana. Jupiter non ha liquidità su devnet, quindi questa lezione è una simulazione onesta: firmi una vera transazione devnet che registra onchain un memo della lezione sugli swap, mentre il Blink ti guida tra quotazioni, percorsi e slippage.",
      whyItMatters:
        "Gli swap sono la porta d'ingresso a tutta la DeFi — convertire SOL volatili in USDC stabili è il modo in cui le persone proteggono il proprio valore, ed è il meccanismo dietro ogni DEX, aggregatore e prodotto di rendimento che incontrerai più avanti.",
      blinkAction:
        "Tocca il pulsante dello swap. La Action verifica che tu abbia almeno 0.01 SOL (l'importo che userebbe uno swap reale), poi il tuo wallet firma una transazione devnet con un memo demo dello swap — la prova onchain che hai completato la lezione.",
      steps: [
        {
          title: "Tieni l'importo dello swap",
          body: "Uno swap reale scambierebbe 0.01 SOL, quindi la lezione richiede che tu li abbia — più un piccolo extra per le commissioni.",
        },
        {
          title: "Impara il percorso",
          body: "Su mainnet, Jupiter quota SOL → USDC su molti DEX e sceglie il prezzo migliore. La tolleranza di slippage ti protegge dai movimenti di prezzo.",
        },
        {
          title: "Firma la transazione demo",
          body: "Firmi una vera transazione devnet con un memo che registra la lezione — lo stesso flusso di firma che usa uno swap su mainnet.",
        },
      ],
      concepts: ["Swap", "Aggregatori DEX", "Slippage", "Programma Memo"],
      glossary: {
        Swap: "Scambiare un token con un altro direttamente onchain.",
        Jupiter:
          "Il principale aggregatore di Solana — trova il miglior percorso di swap tra i DEX.",
        Slippage:
          "Il movimento di prezzo che tolleri tra la quotazione e l'esecuzione.",
        Memo: "Una piccola nota onchain allegata a una transazione — qui, la tua prova di completamento.",
      },
      funFact:
        "Jupiter instrada attraverso decine di fonti di liquidità per ogni quotazione. Il tuo memo devnet usa lo stesso programma Memo che le app mainnet usano per le ricevute.",
      learningObjectives: [
        "Definire uno swap e spiegare cosa fa un aggregatore DEX",
        "Capire lo slippage e perché le quotazioni cambiano",
        "Firmare una vera transazione devnet con un memo onchain",
      ],
      badgeLabel: "Swapper",
      actionLabel: "Scambia 0.01 SOL (demo devnet)",
      successMessage:
        "Demo devnet: hai firmato un memo di completamento della lezione sugli swap. Su mainnet lo stesso flusso scambierebbe 0.01 SOL in USDC tramite Jupiter.",
    },
    "5": {
      title: "Riscatta il tuo badge di diploma",
      tagline: "Conia una credenziale onchain che possiedi davvero",
      description:
        "Il gran finale. Conii un badge Blinks 101 Graduate — un vero token devnet con una supply fissa di esattamente 1, creato in una singola transazione che il tuo wallet paga e firma. La mint authority viene bruciata nella stessa transazione, quindi nessuno potrà mai coniarne una seconda copia: è l'idea centrale dietro gli NFT come credenziali.",
      whyItMatters:
        "Le credenziali onchain non si possono falsificare, revocare da una piattaforma o perdere quando un'azienda chiude. Dai biglietti per gli eventi ai diplomi, i token con supply 1 nel tuo wallet sono il modo in cui funzionano proprietà e prova nel web3.",
      blinkAction:
        "Tocca il pulsante di riscatto dopo aver finito le Lezioni 1–4. Il tuo wallet firma una transazione che crea il mint del badge, conia esattamente 1 token per te e blocca la supply per sempre. Costa circa 0.003 SOL devnet di rent.",
      steps: [
        {
          title: "Finisci il corso",
          body: "Prima le Lezioni 1–4 — il badge è la prova del percorso completo, sulla tua parola per questo MVP su devnet.",
        },
        {
          title: "Firma il mint",
          body: "Una transazione crea un token mint nuovo di zecca, apre il tuo token account e conia esattamente 1 badge nel tuo wallet.",
        },
        {
          title: "Supply bloccata per sempre",
          body: "La stessa transazione rimuove la mint authority. Supply: 1. Proprietario: tu. Questa è una credenziale.",
        },
      ],
      concepts: [
        "NFT come credenziali",
        "Mint authority",
        "Supply fissa",
        "Rent",
      ],
      glossary: {
        NFT: "Un token con supply 1 — unico, possedibile e trasferibile.",
        "Mint authority":
          "La chiave autorizzata a creare nuovi token. Rimuoverla blocca la supply per sempre.",
        Rent: "Un piccolo deposito in SOL che mantiene vivo un account onchain.",
      },
      funFact:
        "Il tuo badge è un vero mint SPL che puoi cercare su qualsiasi explorer — cerca l'indirizzo del mint e vedrai supply: 1, mint authority: nessuna.",
      learningObjectives: [
        "Capire gli NFT come credenziali possedute dal wallet",
        "Vedere come bruciare la mint authority fissa la supply a 1",
        "Completare il percorso di onboarding Blinks in 5 lezioni",
      ],
      badgeLabel: "Blinks 101 Graduate",
      actionLabel: "Riscatta il badge di diploma",
      successMessage:
        "Badge di diploma coniato! Il token con supply 1 {mint} ora appartiene al tuo wallet — cercalo su qualsiasi explorer devnet.",
    },
  },
};
