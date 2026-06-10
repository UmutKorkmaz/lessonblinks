import type { Dictionary } from "./types";

export const ko: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — 탭 5번으로 배우는 Solana",
    siteDescription:
      "각각 진짜 Solana Action으로 이루어진 30초짜리 레슨 5개: USDC 보내기, SOL로 팁 주기, 해외 송금, 스왑 이해하기, 그리고 수료 배지 민팅까지.",
    lessonMetaTitle: "레슨 {x}: {title} — LessonBlinks",

    brandTagline: "30초 레슨으로 만나는 Solana Actions",
    faucetLink: "Devnet 파우셋",
    languageLabel: "언어",

    heroEyebrow: "Solana Devnet · 무료 체험",
    heroTitlePre: "튜토리얼 다섯 개 대신, ",
    heroTitleHighlight: "다섯 번의 탭",
    heroTitlePost: "으로 Solana를 배워요.",
    heroSubtitle:
      "모든 레슨은 진짜 Blink예요 — 내 지갑으로 직접 서명하는 원탭 Solana Action이죠. 디지털 달러를 보내고, 크리에이터에게 팁을 주고, 국경 너머로 송금하고, 스왑을 이해하고, 온체인 배지로 수료해 보세요.",
    statLessons: "개의 레슨",
    statMinutes: "약 {m}분",
    statTotal: "총 소요 시간",
    statLiveNow: "지금 이용 가능",
    statBadge: "민팅할 배지",
    pathHeading: "학습 경로",
    footerHome:
      "Solana Devnet에서 실행돼요 — 모든 트랜잭션은 진짜지만, 모든 달러는 가짜예요. 레슨 페이지에서 devnet 지갑을 연결하고 시작해 보세요.",

    liveBadge: "오픈",
    comingSoonBadge: "오픈 예정",
    durationFormat: "약 {s}초",
    earnPrefix: "획득: ",
    startLesson: "레슨 시작하기",
    comingSoonCta: "오픈 예정",

    backToLessons: "전체 레슨",
    lessonXofY: "레슨 {x} / {y}",
    lessonWord: "레슨",
    whatYoullLearn: "무엇을 배우나요",
    whyItMatters: "왜 중요한가요",
    howItWorks: "어떻게 동작하나요",
    doItHere: "바로 여기서 해보세요",
    wordsYouLearned: "방금 배운 용어",
    learningObjectives: "학습 목표",
    prerequisites: "선행 레슨",
    noPrereqs: "없음 — 여기가 학습 경로의 출발점이에요.",
    comingSoonLesson: "이 레슨은 곧 오픈돼요.",
    actionApiLabel: "Action API:",
    didYouKnow: "알고 계셨나요?",
    previous: "이전",
    next: "다음",
    footerLesson: "Dialect Actions Registry를 위해 제작 · Solana Devnet",

    loadingBlink: "Blink 불러오는 중…",
    blinkError:
      "Blink를 불러오지 못했어요. Action URL과 CORS 헤더를 확인해 주세요.",
  },

  lessons: {
    "1": {
      title: "첫 USDC 보내기",
      tagline: "한 번의 탭으로 움직이는 디지털 달러",
      description:
        "USDC는 스테이블코인이에요 — Circle이 발행하고 가치가 1달러에 고정된 토큰이죠. Solana에서는 특정 민트에 연결된 별도 잔고인 SPL 토큰 계정에 보관돼요. 이번 레슨에서는 소액의 USDC를 코스 트레저리로 보내면서, 진짜 전송이 devnet에서 몇 초 만에 확정되는 걸 직접 확인해요.",
      whyItMatters:
        "스테이블코인은 크립토의 가장 큰 실사용 사례예요: 미국 은행 계좌 없이 달러로 저축하고, 카드망 없이 결제하고, 하룻밤 사이 10%씩 출렁이지 않는 가치를 보관할 수 있죠. 온체인 스킬을 딱 하나만 배운다면, USDC 옮기기를 배우세요.",
      blinkAction:
        "devnet 지갑을 연결하고 보내기 버튼을 탭하세요. 지갑이 SPL 토큰 전송 내용을 미리 보여주고, 서명하면 USDC가 트레저리의 토큰 계정에 도착해요 — 보통 2초도 안 걸려요.",
      steps: [
        {
          title: "지갑 연결하기",
          body: "지갑에는 수수료용 SOL과 SPL 토큰 계정에 담긴 USDC가 있어야 해요. USDC가 없다면 Circle의 파우셋에서 devnet USDC를 받아오세요.",
        },
        {
          title: "전송 내용 확인하기",
          body: "트랜잭션은 Blink가 대신 만들어줘요. 지갑에서 금액과 받는 주소를 꼭 확인하세요 — 내용을 모르고 서명하면 안 돼요.",
        },
        {
          title: "한 번만 서명하기",
          body: "서명 한 번이면 USDC가 온체인으로 이동해요. 아주 작은 SOL 네트워크 수수료(1센트의 몇 분의 일)만 내면 돼요.",
        },
      ],
      concepts: ["스테이블코인", "SPL 토큰", "토큰 계정", "네트워크 수수료"],
      glossary: {
        USDC: "Circle이 발행하고 가치가 1달러에 고정된 스테이블코인.",
        "SPL token": "Solana의 토큰 표준 — Ethereum의 ERC-20에 해당해요.",
        "토큰 계정": "특정 토큰 하나의 잔고를 보관하는 온체인 계정.",
      },
      funFact:
        "devnet USDC는 mainnet과 똑같은 SPL 메커니즘을 사용해요 — 진짜를 배우면서도 잃을 돈은 0달러죠.",
      learningObjectives: [
        "Solana에서 달러에 고정된 스테이블코인인 USDC 이해하기",
        "네이티브 SOL이 아닌 SPL 토큰 전송 보내기",
        "Blink로 진짜 트랜잭션을 1분 안에 완료하기",
      ],
      badgeLabel: "USDC 전송자",
    },
    "2": {
      title: "크리에이터에게 SOL로 팁 주기",
      tagline: "네이티브 전송, lamport, 그리고 수수료의 진짜 가격",
      description:
        "SOL은 Solana의 네이티브 통화예요 — 네트워크의 모든 트랜잭션 비용을 지불하는 자산이죠. USDC와 달리 토큰 계정이 필요 없어요: 팁은 내 지갑에서 크리에이터의 주소로 lamport를 곧장 옮겨요. 0.001 SOL(100만 lamport)을 보내면서 네트워크 수수료가 정확히 얼마인지 직접 확인해요.",
      whyItMatters:
        "크리에이터 팁은 결제가 소셜이 되는 방식이에요. 이런 Blink는 X의 게시물 안에 들어갈 수 있어서, 팬들이 플랫폼 수수료도, 3일짜리 정산 대기도, 중간에 낀 은행도 없이 몇 초 만에 팁을 보낼 수 있죠.",
      blinkAction:
        "팁 버튼을 탭하면 SystemProgram 전송 내용을 미리 볼 수 있어요. 지갑에서 확인을 누르면 정확히 1,000,000 lamport(0.001 SOL)와 약 5,000 lamport의 수수료가 크리에이터에게 전송돼요.",
      steps: [
        {
          title: "지갑 연결하기",
          body: "devnet SOL이 조금 필요해요 — 파우셋에서 넉넉하게 받을 수 있어요.",
        },
        {
          title: "팁 내용 확인하기",
          body: "지갑에 0.001 SOL이 계정에서 나가는 게 표시돼요. 별도로 표시되는 네트워크 수수료 항목을 눈여겨보세요 — 그게 Solana가 실제로 청구하는 금액이에요.",
        },
        {
          title: "온체인으로 확정하기",
          body: "팁은 몇 초 만에 크리에이터의 지갑에 도착하고, 최종적이며 되돌릴 수 없어요.",
        },
      ],
      concepts: ["네이티브 SOL", "Lamport", "SystemProgram", "최종성"],
      glossary: {
        SOL: "수수료와 전송에 쓰이는 Solana의 네이티브 토큰.",
        Lamport: "SOL의 최소 단위 — 1 SOL = 1,000,000,000 lamport.",
        "네트워크 수수료":
          "트랜잭션 처리의 대가로 밸리데이터에게 지불하는 아주 작은 SOL 비용.",
      },
      funFact:
        "일반적인 Solana 트랜잭션 수수료는 5,000 lamport — 약 $0.001이에요. 은행 송금은 대략 25,000배 더 비싸죠.",
      learningObjectives: [
        "SPL 토큰이 아닌 네이티브 SOL을 다른 지갑으로 보내기",
        "지갑 미리보기에서 lamport와 네트워크 수수료 읽기",
        "탭 한 번으로 진짜 온체인 팁 완료하기",
      ],
      badgeLabel: "SOL 팁퍼",
    },
    "3": {
      title: "국경 너머로 돈 보내기",
      tagline: "영업일 3일이 아니라 몇 초 만에 끝나는 송금",
      description:
        "해외 송금 — 국경을 넘어 고향으로 돈을 보내는 일 — 은 크립토의 가장 절실한 사용 사례 중 하나예요. 특히 튀르키예 ↔ EU/미국 구간에서요. 이번 레슨에서는 해외에 있는 가족 지갑으로 소액의 USDC를 보내면서, SWIFT 지연도 은행 환전 스프레드도 없이 몇 초 만에 정산되는 경험을 해봐요.",
      whyItMatters:
        "기존 해외 송금은 수수료가 5–7%에 며칠씩 걸려요. 같은 전송이 Solana에서는 1센트의 몇 분의 일 비용으로, 페이지를 새로고침하기도 전에 정산돼요. 해외에 사는 가족들에게 이건 데모가 아니라 매달 겪는 고통이 해결되는 순간이죠.",
      blinkAction:
        '보내기 버튼을 탭하면 데모 송금 지갑으로 가는 SPL 전송 내용을 미리 볼 수 있어요 — "독일에 있는 아이셰(Ayşe)"라고 생각해 보세요. 한 번 서명하면 결제가 Solana에서 몇 초 만에 정산돼요.',
      steps: [
        {
          title: "받는 사람 떠올리기",
          body: "데모 지갑은 해외에 있는 가족을 대신해요 — 같은 흐름이 지구상 어떤 주소에도 똑같이 적용돼요.",
        },
        {
          title: "결제 내용 확인하기",
          body: "레슨 1에서 배운 것과 똑같은 USDC 전송 방식이에요 — 네트워크는 국경을 신경 쓰지 않아요.",
        },
        {
          title: "서명하고 정산하기",
          body: "정산은 몇 초 만에 최종 확정돼요. 2–3일 걸리는 SWIFT 송금과 5% 수수료에 견주어 보세요.",
        },
      ],
      concepts: ["해외 송금", "정산 속도", "환전 스프레드", "국경 없는 전송"],
      glossary: {
        "해외 송금":
          "국경을 넘어 보내는 돈 — 보통 해외 노동자가 고향의 가족에게 보내요.",
        SWIFT:
          "구시대 은행 간 메시징 네트워크 — 송금에 영업일 기준 1–5일이 걸려요.",
        정산: "가치가 실제로 주인을 바꾸는 순간 — 최종적이며 되돌릴 수 없어요.",
      },
      funFact:
        "튀르키예의 해외 거주자들은 매년 수십억 달러를 고향으로 보내요. Solana 수수료라면 은행 송금 대비 절감액이 어마어마할 거예요.",
      learningObjectives: [
        "USDC 송금이 기존 은행 송금보다 나은 이유 이해하기",
        "두 번째 지갑으로 USDC 보내기 (가족 / 해외 거주 사용 사례)",
        "Solana의 정산 속도와 낮은 수수료 체감하기",
      ],
      badgeLabel: "송금자",
    },
    "4": {
      title: "첫 스왑 이해하기",
      tagline: "DEX가 토큰을 다른 토큰으로 교환하는 방법",
      description:
        "스왑은 한 토큰을 다른 토큰으로 온체인에서 직접 교환하는 거예요 — 거래소 계정도, 주문서도 필요 없죠. mainnet에서는 Jupiter 같은 애그리게이터가 Solana DEX들을 가로질러 가장 좋은 경로를 찾아줘요. Jupiter에는 devnet 유동성이 없기 때문에 이 레슨은 정직한 시뮬레이션이에요: 스왑 레슨 memo를 온체인에 기록하는 진짜 devnet 트랜잭션에 서명하면서, Blink가 견적, 경로, 슬리피지를 차근차근 안내해요.",
      whyItMatters:
        "스왑은 모든 DeFi로 들어가는 관문이에요 — 변동성 큰 SOL을 안정적인 USDC로 바꾸는 건 사람들이 가치를 지키는 방법이고, 앞으로 만나게 될 모든 DEX, 애그리게이터, 수익 상품의 기본 메커니즘이기도 하죠.",
      blinkAction:
        "스왑 버튼을 탭하세요. Action이 최소 0.01 SOL(실제 스왑에 쓰일 금액)을 보유하고 있는지 확인한 뒤, 지갑이 스왑 데모 memo가 담긴 devnet 트랜잭션에 서명해요 — 레슨을 완료했다는 온체인 증거죠.",
      steps: [
        {
          title: "스왑 금액 보유하기",
          body: "실제 스왑이라면 0.01 SOL을 교환하게 되니, 레슨에서도 그만큼 보유해야 해요 — 수수료용 여유분도 약간 필요하고요.",
        },
        {
          title: "경로 배우기",
          body: "mainnet에서는 Jupiter가 여러 DEX에 걸쳐 SOL → USDC 견적을 내고 가장 좋은 가격을 골라요. 슬리피지 허용치가 가격 변동으로부터 나를 지켜줘요.",
        },
        {
          title: "데모 트랜잭션에 서명하기",
          body: "레슨을 기록하는 memo가 담긴 진짜 devnet 트랜잭션에 서명해요 — mainnet 스왑과 똑같은 서명 흐름이죠.",
        },
      ],
      concepts: ["스왑", "DEX 애그리게이터", "슬리피지", "Memo 프로그램"],
      glossary: {
        스왑: "한 토큰을 다른 토큰으로 온체인에서 직접 교환하는 것.",
        Jupiter:
          "Solana 대표 애그리게이터 — 여러 DEX를 가로질러 최적의 스왑 경로를 찾아줘요.",
        슬리피지: "견적과 실행 사이에 허용하는 가격 변동 폭.",
        Memo: "트랜잭션에 붙는 작은 온체인 메모 — 여기서는 레슨 완료 증명이에요.",
      },
      funFact:
        "Jupiter는 견적 한 번에 수십 개의 유동성 소스를 거쳐 경로를 찾아요. 여러분의 devnet memo는 mainnet 앱들이 영수증 용도로 쓰는 것과 같은 Memo 프로그램을 사용해요.",
      learningObjectives: [
        "스왑을 정의하고 DEX 애그리게이터가 하는 일 설명하기",
        "슬리피지와 견적이 변하는 이유 이해하기",
        "온체인 memo가 담긴 진짜 devnet 트랜잭션에 서명하기",
      ],
      badgeLabel: "스왑퍼",
    },
    "5": {
      title: "수료 배지 받기",
      tagline: "진짜 내 것이 되는 온체인 자격 증명 민팅하기",
      description:
        "마지막 관문이에요. Blinks 101 Graduate 배지를 민팅해요 — 공급량이 정확히 1로 고정된 진짜 devnet 토큰으로, 내 지갑이 비용을 내고 서명하는 단 하나의 트랜잭션으로 만들어지죠. 같은 트랜잭션 안에서 민트 권한이 소각되기 때문에 누구도 두 번째 사본을 민팅할 수 없어요: 이게 바로 자격 증명으로서의 NFT의 핵심 아이디어예요.",
      whyItMatters:
        "온체인 자격 증명은 위조할 수 없고, 플랫폼이 회수할 수도 없고, 회사가 문을 닫아도 사라지지 않아요. 행사 티켓부터 졸업장까지, 내 지갑에 담긴 공급량 1짜리 토큰이 web3에서 소유와 증명이 작동하는 방식이에요.",
      blinkAction:
        "레슨 1–4를 마친 뒤 받기 버튼을 탭하세요. 지갑이 트랜잭션 하나에 서명하면 배지 민트가 생성되고, 정확히 1개의 토큰이 나에게 민팅되고, 공급량이 영구적으로 잠겨요. 렌트로 약 0.003 devnet SOL이 들어요.",
      steps: [
        {
          title: "코스 완주하기",
          body: "레슨 1–4가 먼저예요 — 배지는 전체 경로를 완주했다는 증명이에요. 이 devnet MVP에서는 여러분의 양심에 맡길게요.",
        },
        {
          title: "민트에 서명하기",
          body: "트랜잭션 하나로 완전히 새로운 토큰 민트가 생성되고, 내 토큰 계정이 열리고, 정확히 1개의 배지가 내 지갑으로 민팅돼요.",
        },
        {
          title: "공급량 영구 잠금",
          body: "같은 트랜잭션이 민트 권한을 제거해요. 공급량: 1. 소유자: 나. 그게 바로 자격 증명이죠.",
        },
      ],
      concepts: ["자격 증명으로서의 NFT", "민트 권한", "고정 공급량", "렌트"],
      glossary: {
        NFT: "공급량이 1인 토큰 — 유일하고, 소유할 수 있고, 양도할 수 있어요.",
        "민트 권한":
          "새 토큰을 만들 수 있는 키. 이를 제거하면 공급량이 영원히 잠겨요.",
        렌트: "계정을 온체인에 살아 있게 유지하는 소액의 SOL 보증금.",
      },
      funFact:
        "여러분의 배지는 어떤 익스플로러에서든 조회할 수 있는 진짜 SPL 민트예요 — 민트 주소를 검색하면 공급량: 1, 민트 권한: 없음이 보일 거예요.",
      learningObjectives: [
        "지갑이 소유하는 자격 증명으로서의 NFT 이해하기",
        "민트 권한 소각이 공급량을 1로 고정하는 원리 확인하기",
        "5개 레슨으로 이루어진 Blinks 온보딩 경로 완주하기",
      ],
      badgeLabel: "Blinks 101 수료생",
    },
  },
};
