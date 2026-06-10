import type { Dictionary } from "./types";

export const pt: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Aprenda Solana em 5 toques",
    siteDescription:
      "Cinco lições de 30 segundos, cada uma uma Solana Action de verdade: envie USDC, dê gorjeta em SOL, faça remessas para o exterior, entenda swaps e cunhe um selo de formatura.",
    lessonMetaTitle: "Lição {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions em lições de 30 segundos",
    faucetLink: "Faucet de Devnet",
    languageLabel: "Idioma",

    heroEyebrow: "Solana Devnet · Grátis para testar",
    heroTitlePre: "Aprenda Solana em ",
    heroTitleHighlight: "cinco toques",
    heroTitlePost: ", não em cinco tutoriais.",
    heroSubtitle:
      "Cada lição é um Blink de verdade — uma Solana Action de um toque que você assina com a sua própria carteira. Envie dólares digitais, dê gorjeta a um criador, faça uma remessa internacional, entenda swaps e se forme com um selo onchain.",
    statLessons: "lições",
    statMinutes: "~{m} min",
    statTotal: "no total",
    statLiveNow: "no ar agora",
    statBadge: "selo para cunhar",
    pathHeading: "A trilha de aprendizado",
    footerHome:
      "Roda na Solana Devnet — toda transação é real, todo dólar é de mentira. Conecte uma carteira de devnet na página de uma lição para começar.",

    liveBadge: "No ar",
    comingSoonBadge: "Em breve",
    durationFormat: "~{s}s",
    earnPrefix: "Ganhe: ",
    startLesson: "Começar lição",
    comingSoonCta: "Em breve",

    backToLessons: "Todas as lições",
    lessonXofY: "Lição {x} de {y}",
    lessonWord: "Lição",
    whatYoullLearn: "O que você vai aprender",
    whyItMatters: "Por que isso importa",
    howItWorks: "Como funciona",
    doItHere: "Faça agora — aqui mesmo",
    wordsYouLearned: "Palavras que você acabou de aprender",
    learningObjectives: "Objetivos de aprendizado",
    prerequisites: "Pré-requisitos",
    noPrereqs: "Nenhum — a trilha começa aqui.",
    comingSoonLesson: "Esta lição chega em breve.",
    actionApiLabel: "Action API:",
    didYouKnow: "Você sabia?",
    previous: "Anterior",
    next: "Próxima",
    footerLesson: "Feito para o Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Carregando Blink…",
    blinkError:
      "Não foi possível carregar o Blink. Verifique a URL da Action e os cabeçalhos CORS.",
  },

  lessons: {
    "1": {
      title: "Envie seu primeiro USDC",
      tagline: "Dólares digitais que se movem em um toque",
      description:
        "USDC é uma stablecoin — um token que se mantém atrelado a US$ 1, emitido pela Circle. Na Solana, ele vive em uma conta de SPL token, um saldo separado vinculado a um mint específico. Nesta lição, você envia uma pequena quantia de USDC para o tesouro do curso e vê uma transferência real ser liquidada na devnet em segundos.",
      whyItMatters:
        "Stablecoins são o maior uso real de cripto no mundo: poupança em dólar sem conta em banco americano, pagamentos sem depender de cartões e valor que não oscila 10% da noite para o dia. Se você só aprender uma habilidade onchain, que seja movimentar USDC.",
      blinkAction:
        "Conecte uma carteira de devnet e toque no botão de envio. Sua carteira mostra uma prévia da transferência de SPL token; depois de assinar, o USDC chega à conta de token do tesouro — normalmente em menos de dois segundos.",
      steps: [
        {
          title: "Conecte sua carteira",
          body: "Sua carteira guarda SOL para as taxas e USDC em uma conta de SPL token. Pegue USDC de devnet no faucet da Circle se você ainda não tiver.",
        },
        {
          title: "Revise a transferência",
          body: "O Blink monta a transação para você. Confira o valor e o destinatário na sua carteira — nunca assine às cegas.",
        },
        {
          title: "Assine uma vez",
          body: "Uma assinatura move o USDC onchain. Você paga uma taxa de rede minúscula em SOL (frações de centavo).",
        },
      ],
      concepts: [
        "Stablecoins",
        "SPL tokens",
        "Contas de token",
        "Taxas de rede",
      ],
      glossary: {
        USDC: "Uma stablecoin atrelada a US$ 1, emitida pela Circle.",
        "SPL token": "O padrão de tokens da Solana — como o ERC-20 no Ethereum.",
        "Conta de token":
          "Uma conta onchain que guarda o saldo de um token específico.",
      },
      funFact:
        "O USDC de devnet usa a mesma mecânica SPL da mainnet — você aprende a coisa de verdade com zero dólares em risco.",
      learningObjectives: [
        "Entender o USDC como uma stablecoin atrelada ao dólar na Solana",
        "Enviar uma transferência de SPL token (não de SOL nativo)",
        "Completar uma transação real a partir de um Blink em menos de um minuto",
      ],
      badgeLabel: "Remetente de USDC",
      actionLabel: "Enviar 0.01 USDC",
      successMessage:
        "Envie 0.01 USDC para a tesouraria de educação ({recipient}). Revise na sua carteira antes de assinar.",
    },
    "2": {
      title: "Dê gorjeta a um criador em SOL",
      tagline: "Transferências nativas, lamports e quanto as taxas realmente custam",
      description:
        "SOL é a moeda nativa da Solana — o ativo que paga por toda transação na rede. Diferente do USDC, ele não precisa de conta de token: a gorjeta move lamports direto da sua carteira para o endereço do criador. Você vai enviar 0.001 SOL (um milhão de lamports) e ver exatamente quanto custa uma taxa de rede.",
      whyItMatters:
        "Gorjetas a criadores são como os pagamentos viram algo social. Um Blink como este pode ficar dentro de um post no X, deixando os fãs darem gorjeta em segundos, sem comissão de plataforma, sem espera de 3 dias para receber e sem banco no meio.",
      blinkAction:
        "Toque no botão de gorjeta para ver a prévia de uma transferência via SystemProgram. Confirme na sua carteira para enviar exatamente 1.000.000 de lamports (0.001 SOL), mais uma taxa de cerca de 5.000 lamports, ao criador.",
      steps: [
        {
          title: "Conecte sua carteira",
          body: "Você precisa de um pouco de SOL de devnet — o faucet te dá de sobra.",
        },
        {
          title: "Revise a gorjeta",
          body: "A carteira mostra 0.001 SOL saindo da sua conta. Repare na linha separada da taxa de rede — é isso que a Solana realmente cobra.",
        },
        {
          title: "Confirme onchain",
          body: "A gorjeta chega à carteira do criador em segundos, de forma final e irreversível.",
        },
      ],
      concepts: ["SOL nativo", "Lamports", "SystemProgram", "Finalidade"],
      glossary: {
        SOL: "O token nativo da Solana, usado para taxas e transferências.",
        Lamport: "A menor unidade de SOL — 1 SOL = 1.000.000.000 de lamports.",
        "Taxa de rede":
          "Um custo minúsculo em SOL pago aos validadores por processar a sua transação.",
      },
      funFact:
        "Uma taxa típica de transação na Solana é de 5.000 lamports — cerca de US$ 0,001. Uma transferência bancária internacional custa aproximadamente 25.000× mais.",
      learningObjectives: [
        "Enviar SOL nativo (não um SPL token) para outra carteira",
        "Ler lamports e taxas de rede na prévia da carteira",
        "Completar uma gorjeta onchain de verdade em um toque",
      ],
      badgeLabel: "Gorjeteiro de SOL",
      actionLabel: "Dar gorjeta de 0.001 SOL",
      successMessage:
        "Dê uma gorjeta de 0.001 SOL para {recipient}. Revise na sua carteira antes de assinar.",
    },
    "3": {
      title: "Envie dinheiro para outro país",
      tagline: "Remessa em segundos — não em três dias úteis",
      description:
        "Remessa — mandar dinheiro para casa atravessando fronteiras — é um dos usos de cripto com maior demanda real, especialmente nos corredores Turquia ↔ UE/EUA. Nesta lição, você envia um pequeno pagamento em USDC para a carteira de uma família no exterior e vive a liquidação em segundos, sem atrasos do SWIFT e sem spread cambial de banco.",
      whyItMatters:
        "A remessa tradicional custa de 5 a 7% em taxas e leva dias. A mesma transferência na Solana custa fração de centavo e liquida antes de você conseguir atualizar a página. Para famílias da diáspora, isso não é uma demo — é uma dor mensal resolvida.",
      blinkAction:
        'Toque no botão de envio para ver a prévia de uma transferência SPL para a carteira de remessa da demo — pense na "Ayşe na Alemanha". Assine uma vez e o pagamento liquida na Solana em segundos.',
      steps: [
        {
          title: "Imagine o destinatário",
          body: "A carteira da demo representa a família no exterior — o mesmo fluxo funciona para qualquer endereço do planeta.",
        },
        {
          title: "Revise o pagamento",
          body: "A mesma mecânica de transferência de USDC que você aprendeu na Lição 1 — a rede não liga para fronteiras.",
        },
        {
          title: "Assine e liquide",
          body: "A liquidação é final em segundos. Compare isso com uma transferência SWIFT de 2 a 3 dias e taxa de 5%.",
        },
      ],
      concepts: [
        "Remessa",
        "Velocidade de liquidação",
        "Spread cambial",
        "Transferências sem fronteiras",
      ],
      glossary: {
        Remessa:
          "Dinheiro enviado entre países, geralmente por trabalhadores para a família em casa.",
        SWIFT:
          "A antiga rede de mensagens interbancárias — transferências levam de 1 a 5 dias úteis.",
        Liquidação:
          "O momento em que o valor realmente troca de mãos, de forma final e irreversível.",
      },
      funFact:
        "A diáspora da Turquia envia bilhões para casa todo ano. Com as taxas da Solana, a economia em relação a transferências bancárias seria enorme.",
      learningObjectives: [
        "Entender por que a remessa em USDC supera as transferências bancárias tradicionais",
        "Enviar USDC para uma segunda carteira (caso de uso família / diáspora)",
        "Reconhecer a velocidade de liquidação e as taxas baixas da Solana",
      ],
      badgeLabel: "Remetente Internacional",
      actionLabel: "Enviar 0.05 USDC",
      successMessage:
        "Envie 0.05 USDC para o exterior para completar a Lição 3. Revise o destinatário e o valor na sua carteira antes de assinar.",
    },
    "4": {
      title: "Entenda seu primeiro swap",
      tagline: "Como as DEXs trocam um token por outro",
      description:
        "Um swap troca um token por outro diretamente onchain — sem conta em corretora, sem formulário de ordem. Na mainnet, um agregador como o Jupiter encontra a melhor rota entre as DEXs da Solana. O Jupiter não tem liquidez na devnet, então esta lição é uma simulação honesta: você assina uma transação real de devnet que registra um memo da lição de swap onchain enquanto o Blink te explica cotações, rotas e slippage.",
      whyItMatters:
        "Swaps são a porta de entrada para todo o DeFi — converter SOL volátil em USDC estável é como as pessoas protegem valor, e é a mecânica por trás de toda DEX, agregador e produto de rendimento que você vai encontrar depois.",
      blinkAction:
        "Toque no botão de swap. A Action verifica se você tem pelo menos 0.01 SOL (a quantia que um swap real usaria) e, em seguida, sua carteira assina uma transação de devnet carregando um memo de demonstração de swap — prova onchain de que você completou a lição.",
      steps: [
        {
          title: "Tenha o valor do swap",
          body: "Um swap real trocaria 0.01 SOL, então a lição exige que você tenha essa quantia — mais um pouquinho para as taxas.",
        },
        {
          title: "Aprenda a rota",
          body: "Na mainnet, o Jupiter cota SOL → USDC em várias DEXs e escolhe o melhor preço. A tolerância de slippage te protege do movimento de preço.",
        },
        {
          title: "Assine a transação de demonstração",
          body: "Você assina uma transação real de devnet com um memo registrando a lição — o mesmo fluxo de assinatura que um swap na mainnet usa.",
        },
      ],
      concepts: ["Swaps", "Agregadores de DEX", "Slippage", "Programa Memo"],
      glossary: {
        Swap: "Trocar um token por outro diretamente onchain.",
        Jupiter:
          "O principal agregador da Solana — encontra a melhor rota de swap entre as DEXs.",
        Slippage:
          "O movimento de preço que você tolera entre a cotação e a execução.",
        Memo: "Uma pequena nota onchain anexada a uma transação — aqui, a sua prova de conclusão.",
      },
      funFact:
        "O Jupiter roteia por dezenas de fontes de liquidez a cada cotação. Seu memo de devnet usa o mesmo programa Memo que os apps de mainnet usam para recibos.",
      learningObjectives: [
        "Definir o que é um swap e explicar o que faz um agregador de DEX",
        "Entender slippage e por que as cotações mudam",
        "Assinar uma transação real de devnet com um memo onchain",
      ],
      badgeLabel: "Swapper",
      actionLabel: "Fazer swap de 0.01 SOL (demo de devnet)",
      successMessage:
        "Demo de devnet: você assinou um memo de conclusão da lição de swap. Na mainnet, esse mesmo fluxo trocaria 0.01 SOL por USDC via Jupiter.",
    },
    "5": {
      title: "Resgate seu selo de formatura",
      tagline: "Cunhe uma credencial onchain que é sua de verdade",
      description:
        "O grand finale. Você cunha um selo de Formado em Blinks 101 — um token real de devnet com fornecimento fixo de exatamente 1, criado em uma única transação que a sua carteira paga e assina. A autoridade de cunhagem é queimada na mesma transação, então ninguém jamais poderá cunhar uma segunda cópia: essa é a ideia central por trás dos NFTs como credenciais.",
      whyItMatters:
        "Credenciais onchain não podem ser falsificadas, revogadas por uma plataforma ou perdidas quando uma empresa fecha as portas. De ingressos de eventos a diplomas, tokens de fornecimento 1 na sua própria carteira são como propriedade e prova funcionam na web3.",
      blinkAction:
        "Toque no botão de resgate depois de terminar as Lições 1–4. Sua carteira assina uma transação que cria o mint do selo, cunha exatamente 1 token para você e trava o fornecimento permanentemente. Custa cerca de 0.003 SOL de devnet em rent.",
      steps: [
        {
          title: "Termine o curso",
          body: "Lições 1–4 primeiro — o selo é a sua prova da trilha completa, na base da confiança neste MVP de devnet.",
        },
        {
          title: "Assine a cunhagem",
          body: "Uma transação cria um mint de token novinho em folha, abre a sua conta de token e cunha exatamente 1 selo para a sua carteira.",
        },
        {
          title: "Fornecimento travado para sempre",
          body: "A mesma transação remove a autoridade de cunhagem. Fornecimento: 1. Dono: você. Isso é uma credencial.",
        },
      ],
      concepts: [
        "NFTs como credenciais",
        "Autoridade de cunhagem",
        "Fornecimento fixo",
        "Rent",
      ],
      glossary: {
        NFT: "Um token com fornecimento 1 — único, com dono e transferível.",
        "Autoridade de cunhagem":
          "A chave autorizada a criar novos tokens. Removê-la trava o fornecimento para sempre.",
        Rent: "Um pequeno depósito em SOL que mantém uma conta viva onchain.",
      },
      funFact:
        "Seu selo é um mint SPL de verdade que você pode consultar em qualquer explorador — busque o endereço do mint e verá fornecimento: 1, autoridade de cunhagem: nenhuma.",
      learningObjectives: [
        "Entender NFTs como credenciais que pertencem à sua carteira",
        "Ver como queimar a autoridade de cunhagem fixa o fornecimento em 1",
        "Completar a trilha de onboarding de Blinks com 5 lições",
      ],
      badgeLabel: "Formado em Blinks 101",
      actionLabel: "Resgatar Selo de Formatura",
      successMessage:
        "Selo de formatura cunhado! O token de fornecimento 1 {mint} agora pertence à sua carteira — consulte-o em qualquer explorador de devnet.",
    },
  },
};
