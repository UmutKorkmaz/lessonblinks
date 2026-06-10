import type { Dictionary } from "./types";

export const hi: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — 5 टैप में Solana सीखें",
    siteDescription:
      "पाँच 30-सेकंड के पाठ, हर एक असली Solana Action: USDC भेजें, SOL में टिप दें, विदेश पैसे भेजें, swap समझें, और ग्रेजुएशन बैज mint करें।",
    lessonMetaTitle: "पाठ {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions, 30-सेकंड के पाठों के रूप में",
    faucetLink: "Devnet Faucet",
    languageLabel: "भाषा",

    heroEyebrow: "Solana Devnet · मुफ़्त में आज़माएँ",
    heroTitlePre: "Solana सीखें ",
    heroTitleHighlight: "पाँच टैप में",
    heroTitlePost: " — पाँच ट्यूटोरियल में नहीं।",
    heroSubtitle:
      "हर पाठ एक असली Blink है — एक one-tap Solana Action जिसे आप अपने ही wallet से sign करते हैं। डिजिटल डॉलर भेजें, किसी क्रिएटर को टिप दें, सरहद पार पैसे भेजें, swap समझें, और एक onchain बैज के साथ ग्रेजुएट हों।",
    statLessons: "पाठ",
    statMinutes: "~{m} मिनट",
    statTotal: "कुल",
    statLiveNow: "अभी लाइव",
    statBadge: "mint के लिए बैज",
    pathHeading: "सीखने की राह",
    footerHome:
      "Solana Devnet पर चलता है — हर ट्रांज़ैक्शन असली है, हर डॉलर नकली। शुरू करने के लिए किसी पाठ पेज पर devnet wallet कनेक्ट करें।",

    liveBadge: "लाइव",
    comingSoonBadge: "जल्द आ रहा है",
    durationFormat: "~{s} सेकंड",
    earnPrefix: "पाएँ: ",
    startLesson: "पाठ शुरू करें",
    comingSoonCta: "जल्द आ रहा है",

    backToLessons: "सभी पाठ",
    lessonXofY: "{y} में से पाठ {x}",
    lessonWord: "पाठ",
    whatYoullLearn: "आप क्या सीखेंगे",
    whyItMatters: "यह क्यों मायने रखता है",
    howItWorks: "यह कैसे काम करता है",
    doItHere: "करके देखें — यहीं पर",
    wordsYouLearned: "जो शब्द आपने अभी सीखे",
    learningObjectives: "सीखने के लक्ष्य",
    prerequisites: "पूर्व-आवश्यकताएँ",
    noPrereqs: "कोई नहीं — राह यहीं से शुरू होती है।",
    comingSoonLesson: "यह पाठ जल्द आ रहा है।",
    actionApiLabel: "Action API:",
    didYouKnow: "क्या आप जानते हैं?",
    previous: "पिछला",
    next: "अगला",
    footerLesson: "Dialect Actions Registry के लिए बनाया गया · Solana Devnet",

    loadingBlink: "Blink लोड हो रहा है…",
    blinkError:
      "Blink लोड नहीं हो सका। Action URL और CORS headers जाँचें।",
    blinkApiNote: "नोट: यह कार्ड Action API से आता है। Wallet नियंत्रण और बाहरी सतहें (X, wallets) अंग्रेज़ी में दिख सकती हैं।",
    faucetHint: "Devnet फंड चाहिए? मुफ़्त टेस्ट SOL और USDC पाएं:",
  },

  lessons: {
    "1": {
      title: "अपना पहला USDC भेजें",
      tagline: "डिजिटल डॉलर जो एक टैप में चल पड़ते हैं",
      description:
        "USDC एक stablecoin है — एक ऐसा token जिसकी कीमत $1 पर टिकी रहती है और जिसे Circle जारी करता है। Solana पर यह एक SPL token account में रहता है — एक अलग बैलेंस जो किसी खास mint से जुड़ा होता है। इस पाठ में आप कोर्स treasury को थोड़ा-सा USDC भेजते हैं और देखते हैं कि एक असली transfer devnet पर सेकंडों में settle हो जाता है।",
      whyItMatters:
        "Stablecoins crypto का सबसे बड़ा असल दुनिया वाला इस्तेमाल हैं: बिना अमेरिकी बैंक खाते के डॉलर में बचत, बिना कार्ड नेटवर्क के पेमेंट, और ऐसी वैल्यू जो रातों-रात 10% नहीं झूलती। अगर आपको onchain का सिर्फ़ एक हुनर सीखना हो, तो वह USDC भेजना ही हो।",
      blinkAction:
        "Devnet wallet कनेक्ट करें और send बटन टैप करें। आपका wallet एक SPL token transfer का preview दिखाता है; आपके sign करते ही USDC treasury के token account में पहुँच जाता है — आमतौर पर दो सेकंड से भी कम में।",
      steps: [
        {
          title: "अपना wallet कनेक्ट करें",
          body: "आपका wallet फ़ीस के लिए SOL और एक SPL token account में USDC रखता है। अगर आपके पास USDC नहीं है, तो Circle के faucet से devnet USDC ले लें।",
        },
        {
          title: "Transfer की जाँच करें",
          body: "Blink आपके लिए ट्रांज़ैक्शन तैयार करता है। अपने wallet में रकम और पाने वाले का address जाँचें — कभी आँख मूँदकर sign न करें।",
        },
        {
          title: "एक बार sign करें",
          body: "एक signature से USDC onchain चला जाता है। आप बस एक छोटी-सी SOL नेटवर्क फ़ीस देते हैं (एक सेंट का भी छोटा-सा हिस्सा)।",
        },
      ],
      concepts: ["Stablecoins", "SPL tokens", "Token accounts", "नेटवर्क फ़ीस"],
      glossary: {
        USDC: "Circle द्वारा जारी, $1 से जुड़ा एक stablecoin।",
        "SPL token": "Solana का token standard — जैसे Ethereum पर ERC-20।",
        "Token account":
          "एक onchain account जो किसी एक खास token का बैलेंस रखता है।",
      },
      funFact:
        "Devnet USDC mainnet जैसी ही SPL मशीनरी इस्तेमाल करता है — आप असली चीज़ सीख रहे हैं, और एक भी असली डॉलर दाँव पर नहीं।",
      learningObjectives: [
        "USDC को Solana पर डॉलर से जुड़े stablecoin के रूप में समझें",
        "एक SPL token transfer भेजें (native SOL नहीं)",
        "एक मिनट से कम में Blink से असली ट्रांज़ैक्शन पूरा करें",
      ],
      badgeLabel: "USDC सेंडर",
      actionLabel: "0.01 USDC भेजें",
      successMessage:
        "एजुकेशन treasury ({recipient}) को 0.01 USDC भेजें। Sign करने से पहले अपने wallet में जाँच लें।",
    },
    "2": {
      title: "किसी क्रिएटर को SOL में टिप दें",
      tagline: "Native transfers, lamports, और फ़ीस की असली कीमत",
      description:
        "SOL Solana की native currency है — वह asset जिससे नेटवर्क पर हर ट्रांज़ैक्शन की कीमत चुकाई जाती है। USDC के उलट इसे किसी token account की ज़रूरत नहीं: टिप देने पर lamports सीधे आपके wallet से क्रिएटर के address तक जाते हैं। आप 0.001 SOL (दस लाख lamports) भेजेंगे और ठीक-ठीक देखेंगे कि नेटवर्क फ़ीस कितनी पड़ती है।",
      whyItMatters:
        "क्रिएटर टिपिंग वह तरीका है जिससे पेमेंट सोशल बन जाते हैं। ऐसा ही एक Blink X की किसी पोस्ट के अंदर बैठ सकता है, ताकि फ़ैन सेकंडों में टिप दे सकें — न प्लेटफ़ॉर्म की कटौती, न 3 दिन की payout होल्ड, न बीच में कोई बैंक।",
      blinkAction:
        "Tip बटन टैप करके SystemProgram transfer का preview देखें। अपने wallet में confirm करें और क्रिएटर को ठीक 1,000,000 lamports (0.001 SOL) भेजें, साथ में लगभग 5,000 lamports की फ़ीस।",
      steps: [
        {
          title: "अपना wallet कनेक्ट करें",
          body: "आपको थोड़े-से devnet SOL चाहिए — faucet से भरपूर मिल जाते हैं।",
        },
        {
          title: "टिप की जाँच करें",
          body: "Wallet दिखाता है कि आपके account से 0.001 SOL जा रहे हैं। नेटवर्क फ़ीस की अलग लाइन पर ध्यान दें — Solana असल में यही चार्ज करता है।",
        },
        {
          title: "Onchain confirm करें",
          body: "टिप सेकंडों में क्रिएटर के wallet में पहुँच जाती है — final और अपरिवर्तनीय।",
        },
      ],
      concepts: ["Native SOL", "Lamports", "SystemProgram", "Finality"],
      glossary: {
        SOL: "Solana का native token, जो फ़ीस और transfers के लिए इस्तेमाल होता है।",
        Lamport: "SOL की सबसे छोटी इकाई — 1 SOL = 1,000,000,000 lamports।",
        "नेटवर्क फ़ीस":
          "आपके ट्रांज़ैक्शन को process करने के बदले validators को दी जाने वाली नन्ही-सी SOL लागत।",
      },
      funFact:
        "एक आम Solana ट्रांज़ैक्शन फ़ीस 5,000 lamports होती है — करीब $0.001। एक बैंक वायर इससे लगभग 25,000 गुना महँगा पड़ता है।",
      learningObjectives: [
        "किसी दूसरे wallet को native SOL भेजें (SPL token नहीं)",
        "Wallet preview में lamports और नेटवर्क फ़ीस पढ़ें",
        "एक टैप में असली onchain टिप पूरी करें",
      ],
      badgeLabel: "SOL टिपर",
      actionLabel: "0.001 SOL टिप दें",
      successMessage:
        "{recipient} को 0.001 SOL की टिप दें। Sign करने से पहले अपने wallet में जाँच लें।",
    },
    "3": {
      title: "सरहद पार पैसे भेजें",
      tagline: "Remittance सेकंडों में — तीन कारोबारी दिनों में नहीं",
      description:
        "Remittance — यानी सरहद पार घर पैसे भेजना — crypto के सबसे ज़रूरी इस्तेमालों में से एक है, खासकर तुर्की ↔ EU/US कॉरिडोर पर। इस पाठ में आप विदेश में किसी पारिवारिक wallet को छोटा-सा USDC पेमेंट भेजते हैं और सेकंडों में settlement का अनुभव करते हैं — न SWIFT की देरी, न बैंक का FX spread।",
      whyItMatters:
        "पारंपरिक remittance में 5–7% फ़ीस लगती है और दिनों का समय लगता है। वही transfer Solana पर एक सेंट के छोटे-से हिस्से में हो जाता है और पेज refresh करने से पहले settle हो जाता है। प्रवासी परिवारों के लिए यह कोई demo नहीं — हर महीने की एक तकलीफ़ का हल है।",
      blinkAction:
        'Send बटन टैप करके demo remittance wallet को SPL transfer का preview देखें — सोचिए "जर्मनी में Ayşe"। एक बार sign करें और पेमेंट Solana पर सेकंडों में settle हो जाता है।',
      steps: [
        {
          title: "पाने वाले की कल्पना करें",
          body: "यह demo wallet विदेश में रह रहे परिवार की जगह है — यही flow धरती के किसी भी address के लिए काम करता है।",
        },
        {
          title: "पेमेंट की जाँच करें",
          body: "वही USDC transfer मैकेनिक्स जो आपने पाठ 1 में सीखे — नेटवर्क को सरहदों से कोई मतलब नहीं।",
        },
        {
          title: "Sign करें और settle होने दें",
          body: "Settlement सेकंडों में final हो जाता है। इसकी तुलना 2–3 दिन की SWIFT वायर और 5% फ़ीस से करके देखिए।",
        },
      ],
      concepts: [
        "Remittance",
        "Settlement की रफ़्तार",
        "FX spread",
        "बिना सरहद के transfers",
      ],
      glossary: {
        Remittance:
          "सरहद पार भेजा गया पैसा — आमतौर पर कामगार अपने घरवालों को भेजते हैं।",
        SWIFT:
          "बैंकों के बीच का पुराना मैसेजिंग नेटवर्क — वायर पहुँचने में 1–5 कारोबारी दिन लगते हैं।",
        Settlement:
          "वह पल जब वैल्यू सचमुच हाथ बदलती है — final और अपरिवर्तनीय।",
      },
      funFact:
        "तुर्की के प्रवासी हर साल अरबों डॉलर घर भेजते हैं। Solana की फ़ीस पर, वायर transfers के मुकाबले बचत बहुत बड़ी होती।",
      learningObjectives: [
        "समझें कि USDC remittance पारंपरिक वायर transfers से बेहतर क्यों है",
        "किसी दूसरे wallet को USDC भेजें (परिवार / प्रवासी use case)",
        "Solana पर settlement की रफ़्तार और कम फ़ीस को पहचानें",
      ],
      badgeLabel: "रेमिटर",
      actionLabel: "0.05 USDC भेजें",
      successMessage:
        "पाठ 3 पूरा करने के लिए 0.05 USDC विदेश भेजें। Sign करने से पहले अपने wallet में पाने वाले का address और रकम जाँच लें।",
    },
    "4": {
      title: "अपना पहला swap समझें",
      tagline: "DEX एक token को दूसरे से कैसे बदलते हैं",
      description:
        "Swap में एक token सीधे onchain दूसरे token से बदला जाता है — न exchange account, न कोई order form। Mainnet पर Jupiter जैसा aggregator Solana के DEXs में सबसे अच्छा route ढूँढता है। Jupiter के पास devnet पर liquidity नहीं है, इसलिए यह पाठ एक ईमानदार simulation है: आप एक असली devnet ट्रांज़ैक्शन sign करते हैं जो onchain एक swap-lesson memo दर्ज करता है, और Blink आपको quotes, routes और slippage समझाता चलता है।",
      whyItMatters:
        "Swaps पूरे DeFi का दरवाज़ा हैं — उतार-चढ़ाव वाले SOL को स्थिर USDC में बदलना ही वह तरीका है जिससे लोग अपनी वैल्यू बचाते हैं, और यही मैकेनिक हर उस DEX, aggregator और yield product के पीछे है जिनसे आप आगे मिलेंगे।",
      blinkAction:
        "Swap बटन टैप करें। Action जाँचता है कि आपके पास कम-से-कम 0.01 SOL है (जितना एक असली swap इस्तेमाल करता), फिर आपका wallet swap-demo memo वाला एक devnet ट्रांज़ैक्शन sign करता है — onchain सबूत कि आपने पाठ पूरा किया।",
      steps: [
        {
          title: "Swap की रकम पास रखें",
          body: "एक असली swap 0.01 SOL trade करता, इसलिए पाठ के लिए आपके पास उतना होना चाहिए — साथ में फ़ीस के लिए थोड़ा और।",
        },
        {
          title: "Route समझें",
          body: "Mainnet पर Jupiter कई DEXs से SOL → USDC के quote लेकर सबसे अच्छी कीमत चुनता है। Slippage tolerance आपको कीमत के उतार-चढ़ाव से बचाती है।",
        },
        {
          title: "Demo ट्रांज़ैक्शन sign करें",
          body: "आप एक असली devnet ट्रांज़ैक्शन sign करते हैं जिसमें पाठ दर्ज करने वाला memo होता है — वही signing flow जो mainnet swap में चलता है।",
        },
      ],
      concepts: ["Swaps", "DEX aggregators", "Slippage", "Memo program"],
      glossary: {
        Swap: "एक token को सीधे onchain दूसरे token से बदलना।",
        Jupiter:
          "Solana का अग्रणी aggregator — DEXs में सबसे अच्छा swap route ढूँढता है।",
        Slippage:
          "Quote और execution के बीच कीमत में जितना बदलाव आप सहने को तैयार हैं।",
        Memo: "ट्रांज़ैक्शन से जुड़ा एक छोटा-सा onchain नोट — यहाँ, आपके पाठ पूरा करने का सबूत।",
      },
      funFact:
        "Jupiter हर quote के लिए दर्जनों liquidity sources से route निकालता है। आपका devnet memo वही Memo program इस्तेमाल करता है जो mainnet ऐप्स रसीदों के लिए इस्तेमाल करते हैं।",
      learningObjectives: [
        "Swap को परिभाषित करें और बताएँ कि DEX aggregator क्या करता है",
        "Slippage समझें और जानें कि quotes क्यों बदलते हैं",
        "Onchain memo के साथ एक असली devnet ट्रांज़ैक्शन sign करें",
      ],
      badgeLabel: "स्वैपर",
      actionLabel: "0.01 SOL swap करें (devnet demo)",
      successMessage:
        "Devnet demo: आपने swap पाठ पूरा होने का memo sign किया। Mainnet पर यही flow Jupiter के ज़रिए 0.01 SOL को USDC में trade करता।",
    },
    "5": {
      title: "अपना ग्रेजुएशन बैज claim करें",
      tagline: "एक ऐसा onchain credential mint करें जो सचमुच आपका हो",
      description:
        "यह है फ़ाइनल कदम। आप एक Blinks 101 Graduate बैज mint करते हैं — एक असली devnet token जिसकी fixed supply ठीक 1 है, और जो एक ही ट्रांज़ैक्शन में बनता है जिसकी फ़ीस आपका wallet देता है और जिसे वही sign करता है। उसी ट्रांज़ैक्शन में mint authority हमेशा के लिए हटा दी जाती है, इसलिए कोई कभी दूसरी कॉपी mint नहीं कर सकता — credentials के तौर पर NFTs का मूल विचार यही है।",
      whyItMatters:
        "Onchain credentials न नकली बनाए जा सकते हैं, न कोई प्लेटफ़ॉर्म उन्हें छीन सकता है, और न ही किसी कंपनी के बंद होने पर वे खोते हैं। इवेंट टिकटों से लेकर डिप्लोमा तक — आपके अपने wallet में रखे supply-1 tokens ही web3 में मालिकाना हक़ और सबूत का तरीका हैं।",
      blinkAction:
        "पाठ 1–4 पूरे करने के बाद claim बटन टैप करें। आपका wallet एक ही ट्रांज़ैक्शन sign करता है जो बैज mint बनाता है, आपको ठीक 1 token mint करता है, और supply को हमेशा के लिए lock कर देता है। Rent में करीब 0.003 devnet SOL लगते हैं।",
      steps: [
        {
          title: "कोर्स पूरा करें",
          body: "पहले पाठ 1–4 — बैज पूरी राह का आपका सबूत है, और इस devnet MVP में यह आपकी ईमानदारी पर छोड़ा गया है।",
        },
        {
          title: "Mint sign करें",
          body: "एक ट्रांज़ैक्शन एक बिल्कुल नया token mint बनाता है, आपका token account खोलता है, और आपके wallet में ठीक 1 बैज mint करता है।",
        },
        {
          title: "Supply हमेशा के लिए lock",
          body: "वही ट्रांज़ैक्शन mint authority हटा देता है। Supply: 1. मालिक: आप। यही तो credential है।",
        },
      ],
      concepts: [
        "Credentials के रूप में NFTs",
        "Mint authority",
        "Fixed supply",
        "Rent",
      ],
      glossary: {
        NFT: "Supply 1 वाला token — अनोखा, आपके मालिकाना हक़ वाला, और transfer करने लायक।",
        "Mint authority":
          "वह key जिसे नए tokens बनाने की इजाज़त है। इसे हटाते ही supply हमेशा के लिए lock हो जाती है।",
        Rent: "एक छोटी-सी SOL जमा जो किसी account को onchain ज़िंदा रखती है।",
      },
      funFact:
        "आपका बैज एक असली SPL mint है जिसे आप किसी भी explorer पर देख सकते हैं — mint address खोजें और आपको दिखेगा supply: 1, mint authority: none।",
      learningObjectives: [
        "NFTs को wallet में रखे credentials के रूप में समझें",
        "देखें कि mint authority हटाने से supply 1 पर कैसे fix हो जाती है",
        "5 पाठों वाली Blinks onboarding राह पूरी करें",
      ],
      badgeLabel: "Blinks 101 ग्रेजुएट",
      actionLabel: "ग्रेजुएशन बैज claim करें",
      successMessage:
        "ग्रेजुएशन बैज mint हो गया! Supply-1 token {mint} अब आपके wallet का है — इसे किसी भी devnet explorer पर खोजकर देख लें।",
    },
  },
};
