import type { Dictionary } from "./types";

export const es: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Aprende Solana en 5 toques",
    siteDescription:
      "Cinco lecciones de 30 segundos, cada una una Solana Action real: envía USDC, da propinas en SOL, manda remesas al extranjero, entiende los swaps y mintea tu insignia de graduación.",
    lessonMetaTitle: "Lección {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions como lecciones de 30 segundos",
    faucetLink: "Faucet de Devnet",
    languageLabel: "Idioma",

    heroEyebrow: "Solana Devnet · Pruébalo gratis",
    heroTitlePre: "Aprende Solana en ",
    heroTitleHighlight: "cinco toques",
    heroTitlePost: ", no en cinco tutoriales.",
    heroSubtitle:
      "Cada lección es un Blink real: una Solana Action de un solo toque que firmas con tu propia wallet. Envía dólares digitales, dale una propina a un creador, manda una remesa al otro lado de la frontera, entiende los swaps y gradúate con una insignia onchain.",
    statLessons: "lecciones",
    statMinutes: "~{m} min",
    statTotal: "en total",
    statLiveNow: "ya disponibles",
    statBadge: "insignia por mintear",
    pathHeading: "La ruta de aprendizaje",
    footerHome:
      "Funciona en Solana Devnet: cada transacción es real, cada dólar es de mentira. Conecta una wallet de devnet en la página de una lección para empezar.",

    liveBadge: "Disponible",
    comingSoonBadge: "Próximamente",
    durationFormat: "~{s}s",
    earnPrefix: "Gana: ",
    startLesson: "Empezar lección",
    comingSoonCta: "Próximamente",

    backToLessons: "Todas las lecciones",
    lessonXofY: "Lección {x} de {y}",
    lessonWord: "Lección",
    whatYoullLearn: "Qué vas a aprender",
    whyItMatters: "Por qué importa",
    howItWorks: "Cómo funciona",
    doItHere: "Hazlo — aquí mismo",
    wordsYouLearned: "Palabras que acabas de aprender",
    learningObjectives: "Objetivos de aprendizaje",
    prerequisites: "Requisitos previos",
    noPrereqs: "Ninguno — aquí es donde empieza la ruta.",
    comingSoonLesson: "Esta lección llegará pronto.",
    actionApiLabel: "Action API:",
    didYouKnow: "¿Sabías que…?",
    previous: "Anterior",
    next: "Siguiente",
    footerLesson: "Creado para el Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Cargando Blink…",
    blinkError:
      "No se pudo cargar el Blink. Revisa la URL de la Action y las cabeceras CORS.",
    blinkApiNote: "Nota: esta tarjeta proviene de la Action API. Los controles del wallet y las superficies externas (X, wallets) pueden aparecer en inglés.",
    faucetHint: "¿Necesitas fondos de devnet? Consigue SOL y USDC de prueba gratis:",
  },

  lessons: {
    "1": {
      title: "Envía tu primer USDC",
      tagline: "Dólares digitales que se mueven con un toque",
      description:
        "USDC es una stablecoin: un token que se mantiene anclado a $1, emitido por Circle. En Solana vive en una cuenta de token SPL, un saldo separado vinculado a un mint específico. En esta lección envías una pequeña cantidad de USDC a la tesorería del curso y ves cómo una transferencia real se liquida en devnet en cuestión de segundos.",
      whyItMatters:
        "Las stablecoins son el mayor uso de las criptomonedas en el mundo real: ahorros en dólares sin cuenta bancaria en EE. UU., pagos sin redes de tarjetas y valor que no oscila un 10 % de la noche a la mañana. Si solo vas a aprender una habilidad onchain, que sea mover USDC.",
      blinkAction:
        "Conecta una wallet de devnet y toca el botón de envío. Tu wallet te muestra una vista previa de la transferencia de token SPL; cuando firmes, el USDC llega a la cuenta de token de la tesorería — normalmente en menos de dos segundos.",
      steps: [
        {
          title: "Conecta tu wallet",
          body: "Tu wallet guarda SOL para las comisiones y USDC en una cuenta de token SPL. Consigue USDC de devnet en el faucet de Circle si no tienes.",
        },
        {
          title: "Revisa la transferencia",
          body: "El Blink construye la transacción por ti. Comprueba el importe y el destinatario en tu wallet — nunca firmes a ciegas.",
        },
        {
          title: "Firma una vez",
          body: "Una sola firma mueve el USDC onchain. Pagas una pequeña comisión de red en SOL (fracciones de centavo).",
        },
      ],
      concepts: [
        "Stablecoins",
        "Tokens SPL",
        "Cuentas de token",
        "Comisiones de red",
      ],
      glossary: {
        USDC: "Una stablecoin anclada a $1, emitida por Circle.",
        "SPL token":
          "El estándar de tokens de Solana — como ERC-20 en Ethereum.",
        "Cuenta de token":
          "Una cuenta onchain que guarda el saldo de un token específico.",
      },
      funFact:
        "El USDC de devnet usa la misma mecánica SPL que mainnet: estás aprendiendo lo de verdad sin arriesgar ni un dólar.",
      learningObjectives: [
        "Entender USDC como una stablecoin anclada al dólar en Solana",
        "Enviar una transferencia de token SPL (no SOL nativo)",
        "Completar una transacción real desde un Blink en menos de un minuto",
      ],
      badgeLabel: "Remitente de USDC",
      actionLabel: "Envía 0.01 USDC",
      successMessage:
        "Envía 0.01 USDC a la tesorería educativa ({recipient}). Revísalo en tu wallet antes de firmar.",
    },
    "2": {
      title: "Dale una propina en SOL a un creador",
      tagline:
        "Transferencias nativas, lamports y lo que de verdad cuestan las comisiones",
      description:
        "SOL es la moneda nativa de Solana — el activo que paga cada transacción de la red. A diferencia de USDC, no necesita cuenta de token: la propina mueve lamports directamente de tu wallet a la dirección del creador. Enviarás 0.001 SOL (un millón de lamports) y verás exactamente cuánto cuesta una comisión de red.",
      whyItMatters:
        "Las propinas a creadores son la forma en que los pagos se vuelven sociales. Un Blink como este puede vivir dentro de un post en X y permitir que los fans den propinas en segundos, sin comisión de plataforma, sin retenciones de pago de 3 días y sin un banco de por medio.",
      blinkAction:
        "Toca el botón de propina para previsualizar una transferencia de SystemProgram. Confirma en tu wallet para enviar al creador exactamente 1,000,000 de lamports (0.001 SOL) más una comisión de unos 5,000 lamports.",
      steps: [
        {
          title: "Conecta tu wallet",
          body: "Necesitas un poco de SOL de devnet — el faucet te da de sobra.",
        },
        {
          title: "Revisa la propina",
          body: "La wallet muestra 0.001 SOL saliendo de tu cuenta. Fíjate en la línea aparte de la comisión de red: eso es lo que Solana cobra en realidad.",
        },
        {
          title: "Confirma onchain",
          body: "La propina llega a la wallet del creador en segundos, final e irreversible.",
        },
      ],
      concepts: ["SOL nativo", "Lamports", "SystemProgram", "Finalidad"],
      glossary: {
        SOL: "El token nativo de Solana, usado para comisiones y transferencias.",
        Lamport:
          "La unidad más pequeña de SOL — 1 SOL = 1,000,000,000 lamports.",
        "Comisión de red":
          "Un pequeño coste en SOL que se paga a los validadores por procesar tu transacción.",
      },
      funFact:
        "Una comisión típica de transacción en Solana es de 5,000 lamports — alrededor de $0.001. Una transferencia bancaria cuesta unas 25,000 veces más.",
      learningObjectives: [
        "Enviar SOL nativo (no un token SPL) a otra wallet",
        "Leer lamports y comisiones de red en la vista previa de la wallet",
        "Completar una propina onchain real con un solo toque",
      ],
      badgeLabel: "Propinador de SOL",
      actionLabel: "Da una propina de 0.001 SOL",
      successMessage:
        "Da una propina de 0.001 SOL a {recipient}. Revísalo en tu wallet antes de firmar.",
    },
    "3": {
      title: "Envía dinero al otro lado de la frontera",
      tagline: "Remesas en segundos — no en tres días hábiles",
      description:
        "Las remesas — enviar dinero a casa a través de fronteras — son uno de los usos de las criptomonedas con mayor intención real, sobre todo en los corredores Turquía ↔ UE/EE. UU. En esta lección envías un pequeño pago en USDC a la wallet de un familiar en el extranjero y vives una liquidación en segundos, sin las esperas de SWIFT y sin el margen cambiario del banco.",
      whyItMatters:
        "Las remesas tradicionales cuestan entre un 5 y un 7 % en comisiones y tardan días. La misma transferencia en Solana cuesta una fracción de centavo y se liquida antes de que puedas refrescar la página. Para las familias de la diáspora esto no es una demo: es un dolor de cabeza mensual resuelto.",
      blinkAction:
        "Toca el botón de envío para previsualizar una transferencia SPL a la wallet de remesas de demostración — piensa en «Ayşe en Alemania». Firma una vez y el pago se liquida en Solana en segundos.",
      steps: [
        {
          title: "Imagina al destinatario",
          body: "La wallet de demostración representa a tu familia en el extranjero — el mismo flujo funciona con cualquier dirección del planeta.",
        },
        {
          title: "Revisa el pago",
          body: "La misma mecánica de transferencia de USDC que aprendiste en la Lección 1 — a la red no le importan las fronteras.",
        },
        {
          title: "Firma y liquida",
          body: "La liquidación es final en segundos. Compáralo con una transferencia SWIFT de 2–3 días y una comisión del 5 %.",
        },
      ],
      concepts: [
        "Remesas",
        "Velocidad de liquidación",
        "Margen cambiario",
        "Transferencias sin fronteras",
      ],
      glossary: {
        Remesa:
          "Dinero enviado a través de fronteras, normalmente por trabajadores a sus familias.",
        SWIFT:
          "La red de mensajería interbancaria de toda la vida — las transferencias tardan de 1 a 5 días hábiles.",
        Liquidación:
          "El momento en que el valor cambia de manos de verdad, de forma final e irreversible.",
      },
      funFact:
        "La diáspora turca envía miles de millones a casa cada año. Con las comisiones de Solana, el ahorro frente a las transferencias bancarias sería enorme.",
      learningObjectives: [
        "Entender por qué las remesas en USDC superan a las transferencias bancarias tradicionales",
        "Enviar USDC a una segunda wallet (caso de uso de familia / diáspora)",
        "Reconocer la velocidad de liquidación y las bajas comisiones de Solana",
      ],
      badgeLabel: "Experto en remesas",
      actionLabel: "Envía 0.05 USDC",
      successMessage:
        "Envía 0.05 USDC al extranjero para completar la Lección 3. Revisa el destinatario y la cantidad en tu wallet antes de firmar.",
    },
    "4": {
      title: "Entiende tu primer swap",
      tagline: "Cómo los DEX cambian un token por otro",
      description:
        "Un swap cambia un token por otro directamente onchain — sin cuenta en un exchange ni formularios de órdenes. En mainnet, un agregador como Jupiter encuentra la mejor ruta entre los DEX de Solana. Jupiter no tiene liquidez en devnet, así que esta lección es una simulación honesta: firmas una transacción real de devnet que registra onchain un memo de la lección de swap mientras el Blink te guía por cotizaciones, rutas y slippage.",
      whyItMatters:
        "Los swaps son la puerta de entrada a todo DeFi — convertir SOL volátil en USDC estable es como la gente protege su valor, y es la mecánica detrás de cada DEX, agregador y producto de rendimiento que conocerás más adelante.",
      blinkAction:
        "Toca el botón de swap. La Action comprueba que tienes al menos 0.01 SOL (la cantidad que usaría un swap real) y después tu wallet firma una transacción de devnet con un memo de demostración del swap — prueba onchain de que completaste la lección.",
      steps: [
        {
          title: "Ten la cantidad del swap",
          body: "Un swap real cambiaría 0.01 SOL, así que la lección requiere que los tengas — más un poco extra para comisiones.",
        },
        {
          title: "Aprende la ruta",
          body: "En mainnet, Jupiter cotiza SOL → USDC en muchos DEX y elige el mejor precio. La tolerancia de slippage te protege de los movimientos de precio.",
        },
        {
          title: "Firma la transacción de demostración",
          body: "Firmas una transacción real de devnet con un memo que registra la lección — el mismo flujo de firma que usa un swap en mainnet.",
        },
      ],
      concepts: ["Swaps", "Agregadores DEX", "Slippage", "Programa Memo"],
      glossary: {
        Swap: "Cambiar un token por otro directamente onchain.",
        Jupiter:
          "El agregador líder de Solana — encuentra la mejor ruta de swap entre los DEX.",
        Slippage:
          "El movimiento de precio que toleras entre la cotización y la ejecución.",
        Memo: "Una pequeña nota onchain adjunta a una transacción — aquí, tu prueba de que completaste la lección.",
      },
      funFact:
        "Jupiter enruta cada cotización a través de decenas de fuentes de liquidez. Tu memo de devnet usa el mismo programa Memo que las apps de mainnet usan para sus recibos.",
      learningObjectives: [
        "Definir qué es un swap y explicar qué hace un agregador DEX",
        "Entender el slippage y por qué cambian las cotizaciones",
        "Firmar una transacción real de devnet con un memo onchain",
      ],
      badgeLabel: "Swapper",
      actionLabel: "Haz swap de 0.01 SOL (demo de devnet)",
      successMessage:
        "Demo de devnet: firmaste un memo de finalización de la lección de swap. En mainnet, este mismo flujo cambiaría 0.01 SOL por USDC a través de Jupiter.",
    },
    "5": {
      title: "Reclama tu insignia de graduación",
      tagline: "Mintea una credencial onchain que de verdad es tuya",
      description:
        "El broche final. Minteas una insignia de Graduado de Blinks 101 — un token real de devnet con un suministro fijo de exactamente 1, creado en una sola transacción que tu wallet paga y firma. La autoridad de minteo se quema en esa misma transacción, así que nadie podrá mintear jamás una segunda copia: esa es la idea central de los NFT como credenciales.",
      whyItMatters:
        "Las credenciales onchain no se pueden falsificar, ni revocar desde una plataforma, ni perder cuando una empresa cierra. De entradas para eventos a diplomas, los tokens de suministro 1 en tu propia wallet son la base de la propiedad y de la prueba en web3.",
      blinkAction:
        "Toca el botón de reclamar cuando termines las Lecciones 1–4. Tu wallet firma una transacción que crea el mint de la insignia, te mintea exactamente 1 token y bloquea el suministro para siempre. Cuesta unos 0.003 SOL de devnet en renta.",
      steps: [
        {
          title: "Termina el curso",
          body: "Primero las Lecciones 1–4 — la insignia es tu prueba de la ruta completa, bajo palabra en este MVP de devnet.",
        },
        {
          title: "Firma el minteo",
          body: "Una transacción crea un mint de token totalmente nuevo, abre tu cuenta de token y mintea exactamente 1 insignia a tu wallet.",
        },
        {
          title: "Suministro bloqueado para siempre",
          body: "La misma transacción elimina la autoridad de minteo. Suministro: 1. Propietario: tú. Eso es una credencial.",
        },
      ],
      concepts: [
        "NFT como credenciales",
        "Autoridad de minteo",
        "Suministro fijo",
        "Renta",
      ],
      glossary: {
        NFT: "Un token con suministro 1 — único, con dueño y transferible.",
        "Autoridad de minteo":
          "La clave autorizada a crear nuevos tokens. Eliminarla bloquea el suministro para siempre.",
        Renta:
          "Un pequeño depósito en SOL que mantiene viva una cuenta onchain.",
      },
      funFact:
        "Tu insignia es un mint SPL real que puedes consultar en cualquier explorador — busca la dirección del mint y verás suministro: 1, autoridad de minteo: ninguna.",
      learningObjectives: [
        "Entender los NFT como credenciales que viven en tu propia wallet",
        "Ver cómo quemar la autoridad de minteo fija el suministro en 1",
        "Completar la ruta de onboarding de Blinks de 5 lecciones",
      ],
      badgeLabel: "Graduado de Blinks 101",
      actionLabel: "Reclama tu insignia de graduación",
      successMessage:
        "¡Insignia de graduación minteada! El token de suministro 1 {mint} ahora pertenece a tu wallet — búscalo en cualquier explorador de devnet.",
    },
  },
};
