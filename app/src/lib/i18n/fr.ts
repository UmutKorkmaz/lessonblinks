import type { Dictionary } from "./types";

export const fr: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Apprends Solana en 5 taps",
    siteDescription:
      "Cinq leçons de 30 secondes, chacune une vraie Action Solana : envoie des USDC, donne un pourboire en SOL, transfère de l'argent à l'étranger, comprends les swaps et frappe ton badge de fin de parcours.",
    lessonMetaTitle: "Leçon {x} : {title} — LessonBlinks",

    brandTagline: "Les Actions Solana en leçons de 30 secondes",
    faucetLink: "Faucet Devnet",
    languageLabel: "Langue",

    heroEyebrow: "Solana Devnet · Essai gratuit",
    heroTitlePre: "Apprends Solana en ",
    heroTitleHighlight: "cinq taps",
    heroTitlePost: ", pas en cinq tutoriels.",
    heroSubtitle:
      "Chaque leçon est un vrai Blink — une Action Solana en un tap, que tu signes avec ton propre wallet. Envoie des dollars numériques, donne un pourboire à un créateur, transfère de l'argent par-delà les frontières, comprends les swaps et termine avec un badge onchain.",
    statLessons: "leçons",
    statMinutes: "~{m} min",
    statTotal: "au total",
    statLiveNow: "en ligne",
    statBadge: "badge à frapper",
    pathHeading: "Le parcours d'apprentissage",
    footerHome:
      "Fonctionne sur Solana Devnet — chaque transaction est réelle, chaque dollar est fictif. Connecte un wallet devnet sur une page de leçon pour commencer.",

    liveBadge: "En ligne",
    comingSoonBadge: "Bientôt disponible",
    durationFormat: "~{s}s",
    earnPrefix: "À gagner : ",
    startLesson: "Commencer la leçon",
    comingSoonCta: "Bientôt disponible",

    backToLessons: "Toutes les leçons",
    lessonXofY: "Leçon {x} sur {y}",
    lessonWord: "Leçon",
    whatYoullLearn: "Ce que tu vas apprendre",
    whyItMatters: "Pourquoi c'est important",
    howItWorks: "Comment ça marche",
    doItHere: "Fais-le — ici même",
    wordsYouLearned: "Les mots que tu viens d'apprendre",
    learningObjectives: "Objectifs d'apprentissage",
    prerequisites: "Prérequis",
    noPrereqs: "Aucun — c'est ici que le parcours commence.",
    comingSoonLesson: "Cette leçon arrive bientôt.",
    actionApiLabel: "Action API :",
    didYouKnow: "Le savais-tu ?",
    previous: "Précédent",
    next: "Suivant",
    footerLesson: "Conçu pour le Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Chargement du Blink…",
    blinkError:
      "Impossible de charger le Blink. Vérifie l'URL de l'Action et les en-têtes CORS.",
  },

  lessons: {
    "1": {
      title: "Envoie tes premiers USDC",
      tagline: "Des dollars numériques qui circulent en un tap",
      description:
        "L'USDC est un stablecoin — un token qui reste arrimé à 1 $, émis par Circle. Sur Solana, il vit dans un compte de token SPL, un solde distinct lié à un mint spécifique. Dans cette leçon, tu envoies un petit montant d'USDC vers la trésorerie du cours et tu regardes un vrai transfert se régler sur le devnet en quelques secondes.",
      whyItMatters:
        "Les stablecoins sont le plus grand usage concret de la crypto : de l'épargne en dollars sans compte bancaire américain, des paiements sans réseaux de cartes, et une valeur qui ne fluctue pas de 10 % du jour au lendemain. Si tu ne devais apprendre qu'une seule compétence onchain, ce serait de déplacer des USDC.",
      blinkAction:
        "Connecte un wallet devnet et tape sur le bouton d'envoi. Ton wallet affiche un aperçu du transfert de token SPL ; après ta signature, les USDC arrivent dans le compte de token de la trésorerie — généralement en moins de deux secondes.",
      steps: [
        {
          title: "Connecte ton wallet",
          body: "Ton wallet contient du SOL pour les frais et des USDC dans un compte de token SPL. Récupère des USDC devnet sur le faucet de Circle si tu n'en as pas.",
        },
        {
          title: "Vérifie le transfert",
          body: "Le Blink construit la transaction pour toi. Vérifie le montant et le destinataire dans ton wallet — ne signe jamais à l'aveugle.",
        },
        {
          title: "Signe une seule fois",
          body: "Une seule signature déplace les USDC onchain. Tu paies des frais de réseau minuscules en SOL (une fraction de centime).",
        },
      ],
      concepts: [
        "Stablecoins",
        "Tokens SPL",
        "Comptes de token",
        "Frais de réseau",
      ],
      glossary: {
        USDC: "Un stablecoin arrimé à 1 $, émis par Circle.",
        "SPL token":
          "Le standard de token de Solana — l'équivalent de l'ERC-20 sur Ethereum.",
        "Compte de token":
          "Un compte onchain qui détient le solde d'un token spécifique.",
      },
      funFact:
        "L'USDC devnet utilise exactement les mêmes mécanismes SPL que le mainnet — tu apprends pour de vrai, sans risquer un seul dollar.",
      learningObjectives: [
        "Comprendre l'USDC comme un stablecoin arrimé au dollar sur Solana",
        "Envoyer un transfert de token SPL (et non du SOL natif)",
        "Réaliser une vraie transaction depuis un Blink en moins d'une minute",
      ],
      badgeLabel: "Expéditeur USDC",
      actionLabel: "Envoie 0,01 USDC",
      successMessage:
        "Envoie 0,01 USDC à la trésorerie du cours ({recipient}). Vérifie dans ton wallet avant de signer.",
    },
    "2": {
      title: "Donne un pourboire en SOL à un créateur",
      tagline:
        "Transferts natifs, lamports, et le vrai coût des frais",
      description:
        "Le SOL est la monnaie native de Solana — l'actif qui paie chaque transaction sur le réseau. Contrairement à l'USDC, il n'a pas besoin de compte de token : le pourboire déplace des lamports directement de ton wallet vers l'adresse du créateur. Tu vas envoyer 0,001 SOL (un million de lamports) et voir exactement ce que coûtent des frais de réseau.",
      whyItMatters:
        "Le pourboire aux créateurs, c'est le moment où les paiements deviennent sociaux. Un Blink comme celui-ci peut s'intégrer directement dans un post sur X, et permettre aux fans de donner en quelques secondes — sans commission de plateforme, sans délai de versement de 3 jours, sans banque au milieu.",
      blinkAction:
        "Tape sur le bouton de pourboire pour afficher un aperçu d'un transfert SystemProgram. Confirme dans ton wallet pour envoyer exactement 1 000 000 lamports (0,001 SOL), plus des frais d'environ 5 000 lamports, au créateur.",
      steps: [
        {
          title: "Connecte ton wallet",
          body: "Il te faut un peu de SOL devnet — le faucet t'en donne largement assez.",
        },
        {
          title: "Vérifie le pourboire",
          body: "Le wallet affiche 0,001 SOL qui quitte ton compte. Remarque la ligne distincte des frais de réseau — c'est ce que Solana facture réellement.",
        },
        {
          title: "Confirme onchain",
          body: "Le pourboire arrive dans le wallet du créateur en quelques secondes, de façon définitive et irréversible.",
        },
      ],
      concepts: ["SOL natif", "Lamports", "SystemProgram", "Finalité"],
      glossary: {
        SOL: "Le token natif de Solana, utilisé pour les frais et les transferts.",
        Lamport:
          "La plus petite unité de SOL — 1 SOL = 1 000 000 000 lamports.",
        "Frais de réseau":
          "Un coût minuscule en SOL versé aux validateurs pour traiter ta transaction.",
      },
      funFact:
        "Des frais de transaction typiques sur Solana s'élèvent à 5 000 lamports — environ 0,001 $. Un virement bancaire coûte à peu près 25 000 fois plus.",
      learningObjectives: [
        "Envoyer du SOL natif (et non un token SPL) vers un autre wallet",
        "Lire les lamports et les frais de réseau dans l'aperçu d'un wallet",
        "Réaliser un vrai pourboire onchain en un seul tap",
      ],
      badgeLabel: "Donateur SOL",
      actionLabel: "Donne un pourboire de 0,001 SOL",
      successMessage:
        "Donne un pourboire de 0,001 SOL à {recipient}. Vérifie dans ton wallet avant de signer.",
    },
    "3": {
      title: "Envoie de l'argent par-delà une frontière",
      tagline:
        "Un transfert international en quelques secondes — pas en trois jours ouvrés",
      description:
        "Les transferts de fonds — envoyer de l'argent au pays, par-delà les frontières — sont l'un des usages les plus concrets de la crypto, en particulier sur les corridors Turquie ↔ UE/États-Unis. Dans cette leçon, tu envoies un petit paiement en USDC vers le wallet d'un proche à l'étranger et tu vis un règlement en quelques secondes, sans les délais de SWIFT et sans la marge de change des banques.",
      whyItMatters:
        "Un transfert international classique coûte 5 à 7 % de frais et prend plusieurs jours. Le même transfert sur Solana coûte une fraction de centime et se règle avant même que tu aies rafraîchi la page. Pour les familles de la diaspora, ce n'est pas une démo — c'est un problème mensuel enfin résolu.",
      blinkAction:
        "Tape sur le bouton d'envoi pour afficher un aperçu d'un transfert SPL vers le wallet de démonstration — imagine « Ayşe en Allemagne ». Signe une seule fois et le paiement se règle sur Solana en quelques secondes.",
      steps: [
        {
          title: "Imagine le destinataire",
          body: "Le wallet de démo représente un proche à l'étranger — le même flux fonctionne pour n'importe quelle adresse sur Terre.",
        },
        {
          title: "Vérifie le paiement",
          body: "Exactement la même mécanique de transfert USDC que dans la Leçon 1 — le réseau se moque des frontières.",
        },
        {
          title: "Signe et règle",
          body: "Le règlement est définitif en quelques secondes. Compare ça avec un virement SWIFT de 2 à 3 jours et 5 % de frais.",
        },
      ],
      concepts: [
        "Transferts de fonds",
        "Vitesse de règlement",
        "Marge de change",
        "Transferts sans frontières",
      ],
      glossary: {
        "Transfert de fonds":
          "De l'argent envoyé par-delà les frontières, généralement par des travailleurs à leur famille restée au pays.",
        SWIFT:
          "Le réseau de messagerie interbancaire historique — les virements prennent 1 à 5 jours ouvrés.",
        Règlement:
          "Le moment où la valeur change réellement de mains, de façon définitive et irréversible.",
      },
      funFact:
        "La diaspora turque envoie des milliards au pays chaque année. Aux frais de Solana, les économies par rapport aux virements bancaires seraient énormes.",
      learningObjectives: [
        "Comprendre pourquoi un transfert en USDC bat le virement bancaire traditionnel",
        "Envoyer des USDC vers un second wallet (cas d'usage famille / diaspora)",
        "Reconnaître la vitesse de règlement et les frais réduits de Solana",
      ],
      badgeLabel: "Expéditeur international",
      actionLabel: "Envoie 0,05 USDC",
      successMessage:
        "Envoie 0,05 USDC à l'étranger pour terminer la Leçon 3. Vérifie le destinataire et le montant dans ton wallet avant de signer.",
    },
    "4": {
      title: "Comprends ton premier swap",
      tagline: "Comment les DEX échangent un token contre un autre",
      description:
        "Un swap échange un token contre un autre, directement onchain — sans compte sur une plateforme, sans formulaire d'ordre. Sur le mainnet, un agrégateur comme Jupiter trouve la meilleure route à travers les DEX de Solana. Jupiter n'a pas de liquidité sur le devnet, cette leçon est donc une simulation honnête : tu signes une vraie transaction devnet qui enregistre un memo de leçon onchain, pendant que le Blink t'explique les cotations, les routes et le slippage.",
      whyItMatters:
        "Les swaps sont la porte d'entrée de toute la DeFi — convertir du SOL volatil en USDC stable, c'est ainsi que les gens protègent leur valeur, et c'est le mécanisme derrière chaque DEX, agrégateur et produit de rendement que tu croiseras plus tard.",
      blinkAction:
        "Tape sur le bouton de swap. L'Action vérifie que tu détiens au moins 0,01 SOL (le montant qu'un vrai swap utiliserait), puis ton wallet signe une transaction devnet portant un memo de démonstration — une preuve onchain que tu as terminé la leçon.",
      steps: [
        {
          title: "Détiens le montant du swap",
          body: "Un vrai swap échangerait 0,01 SOL, la leçon exige donc que tu le détiennes — plus un petit extra pour les frais.",
        },
        {
          title: "Apprends la route",
          body: "Sur le mainnet, Jupiter cote SOL → USDC à travers de nombreux DEX et choisit le meilleur prix. La tolérance de slippage te protège des mouvements de prix.",
        },
        {
          title: "Signe la transaction de démo",
          body: "Tu signes une vraie transaction devnet avec un memo qui enregistre la leçon — le même flux de signature qu'un swap sur le mainnet.",
        },
      ],
      concepts: [
        "Swaps",
        "Agrégateurs de DEX",
        "Slippage",
        "Programme Memo",
      ],
      glossary: {
        Swap: "L'échange d'un token contre un autre, directement onchain.",
        Jupiter:
          "Le principal agrégateur de Solana — il trouve la meilleure route de swap à travers les DEX.",
        Slippage:
          "L'écart de prix que tu tolères entre la cotation et l'exécution.",
        Memo: "Une petite note onchain attachée à une transaction — ici, ta preuve de complétion.",
      },
      funFact:
        "Jupiter passe par des dizaines de sources de liquidité à chaque cotation. Ton memo devnet utilise le même programme Memo que les apps mainnet utilisent pour leurs reçus.",
      learningObjectives: [
        "Définir un swap et expliquer ce que fait un agrégateur de DEX",
        "Comprendre le slippage et pourquoi les cotations changent",
        "Signer une vraie transaction devnet avec un memo onchain",
      ],
      badgeLabel: "Swappeur",
      actionLabel: "Swappe 0,01 SOL (démo devnet)",
      successMessage:
        "Démo devnet : tu as signé un memo de complétion de la leçon de swap. Sur le mainnet, ce même flux échangerait 0,01 SOL contre des USDC via Jupiter.",
    },
    "5": {
      title: "Réclame ton badge de fin de parcours",
      tagline: "Frappe un diplôme onchain qui t'appartient vraiment",
      description:
        "L'épreuve finale. Tu frappes un badge « Blinks 101 Graduate » — un vrai token devnet avec une offre fixe d'exactement 1, créé en une seule transaction que ton wallet paie et signe. L'autorité de mint est détruite dans la même transaction, donc personne ne pourra jamais en frapper un second exemplaire : c'est l'idée fondamentale derrière les NFT comme certificats.",
      whyItMatters:
        "Un certificat onchain ne peut pas être falsifié, révoqué par une plateforme, ni perdu quand une entreprise ferme. Des billets d'événement aux diplômes, les tokens à offre de 1 dans ton propre wallet, c'est ainsi que fonctionnent la propriété et la preuve dans le web3.",
      blinkAction:
        "Tape sur le bouton de réclamation après avoir terminé les Leçons 1 à 4. Ton wallet signe une transaction qui crée le mint du badge, frappe exactement 1 token pour toi et verrouille définitivement l'offre. Coûte environ 0,003 SOL devnet en rent.",
      steps: [
        {
          title: "Termine le cours",
          body: "Les Leçons 1 à 4 d'abord — le badge est la preuve de ton parcours complet, sur l'honneur pour ce MVP devnet.",
        },
        {
          title: "Signe le mint",
          body: "Une seule transaction crée un tout nouveau mint de token, ouvre ton compte de token et frappe exactement 1 badge dans ton wallet.",
        },
        {
          title: "Offre verrouillée pour toujours",
          body: "La même transaction supprime l'autorité de mint. Offre : 1. Propriétaire : toi. Voilà un certificat.",
        },
      ],
      concepts: [
        "Les NFT comme certificats",
        "Autorité de mint",
        "Offre fixe",
        "Rent",
      ],
      glossary: {
        NFT: "Un token avec une offre de 1 — unique, possédable et transférable.",
        "Autorité de mint":
          "La clé autorisée à créer de nouveaux tokens. La supprimer verrouille l'offre pour toujours.",
        Rent: "Un petit dépôt en SOL qui maintient un compte en vie onchain.",
      },
      funFact:
        "Ton badge est un vrai mint SPL que tu peux retrouver sur n'importe quel explorateur — cherche l'adresse du mint et tu verras : offre 1, autorité de mint : aucune.",
      learningObjectives: [
        "Comprendre les NFT comme des certificats détenus dans ton wallet",
        "Voir comment la destruction de l'autorité de mint fige l'offre à 1",
        "Terminer le parcours d'onboarding Blinks en 5 leçons",
      ],
      badgeLabel: "Diplômé Blinks 101",
      actionLabel: "Réclame ton badge de fin de parcours",
      successMessage:
        "Badge de fin de parcours frappé ! Le token à offre de 1 {mint} appartient désormais à ton wallet — retrouve-le sur n'importe quel explorateur devnet.",
    },
  },
};
