import type { LocaleStrings } from "./types";

export const tr: LocaleStrings = {
  locale: "tr",

  landing: {
    pageTitle: "Blinks 101 — Solana'yı 30 Saniyede Öğren",
    metaDescription:
      "Sosyal akışınızın içinde bahşiş, stake, takas ve NFT öğreten beş tek dokunuşluk Solana Action dersi.",
    heroTitle: "Mikro Dersler olarak Blinks",
    heroTagline: "Tek dokunuşluk işlemler, 30 saniyelik dersler",
    heroSubtitle:
      "Statik eğitimleri atlayın. Her Blink, satır içi açıklamalarla gerçek bir zincir üstü işlemdir — USDC bahşişi, SOL gönderimi, token takası, stake ve mezuniyet NFT'nizi talep edin.",
    startLessonCta: "Ders 1'e Başla",
    viewCurriculumCta: "5 dersin tamamını gör",
    howItWorksTitle: "Nasıl çalışır",
    stepConnect:
      "Phantom, Backpack veya herhangi bir Blink istemcisinde cüzdanınızı bağlayın.",
    stepRead: "Satır içi açıklamayı okuyun — ayrı bir dokümantasyon sekmesi gerekmez.",
    stepSign: "Tek bir işlemi imzalayın ve Solana'da yaparak öğrenin.",
    stepGraduate:
      "Beş dersi tamamlayın ve Mezun Rozeti NFT'nizi talep edin.",
    curriculumTitle: "5 derslik yol",
    curriculumSubtitle:
      "Her ders bir öncekinin üzerine inşa edilir. Gerçek fonlar, küçük miktarlar, maksimum öğrenme.",
    graduateTitle: "Zincir üstü rozetle mezun olun",
    graduateDescription:
      "Ders 1–4'ü tamamlayarak sıkıştırılmış bir NFT'nin kilidini açın — Blinks 101'i bitirdiğinizin taşınabilir kanıtı. X, LinkedIn veya cüzdanınızda paylaşın.",
    footerTagline: "Eğitim dağıtımdır. Solana onboarding için tasarlandı.",
  },

  lessons: {
    lesson01: {
      number: 1,
      title: "$1 USDC Bahşiş",
      shortTitle: "USDC Bahşişi",
      description:
        "Dolar sabitli bir stablecoin'i bir içerik üreticisine gönderin. SPL token transferlerini, ilişkili token hesaplarını ve USDC'nin Solana'da günlük ödemeler için neden kullanıldığını öğrenin.",
      concept: "SPL transferleri ve stablecoin'ler",
      durationLabel: "~30 sn",
    },
    lesson02: {
      number: 2,
      title: "İçerik üreticisine 0,001 SOL bahşiş",
      shortTitle: "SOL Bahşişi",
      description:
        "Native SOL'ü — bir SPL token değil — doğrudan bir içerik üreticisinin cüzdanına gönderin. Lamport'ları, ağ ücretlerini ve Solana'nın temel para biriminin USDC'den nasıl farklılaştığını anlayın.",
      concept: "Native SOL transferleri",
      durationLabel: "~30 sn",
    },
    lesson03: {
      number: 3,
      title: "SOL'ü USDC'ye takas et",
      shortTitle: "Token Takası",
      description:
        "Jupiter üzerinden küçük bir 0,01 SOL'ü USDC'ye çevirin. Takasın ne olduğunu, aggregator'ların en iyi rotayı nasıl bulduğunu ve ücretler için neden ekstra SOL tutmanız gerektiğini öğrenin.",
      concept: "DeFi yönlendirme ve slippage",
      durationLabel: "~45 sn",
    },
    lesson04: {
      number: 4,
      title: "0,01 SOL stake et",
      shortTitle: "SOL Stake",
      description:
        "Ağı güvence altına almak ve ödül kazanmak için SOL'ü devredin. Marinade likit stake (mSOL) veya native delegasyon arasından seçim yapın — ikisi de tek bir gerçek devnet işleminde.",
      concept: "Stake ve validator'lar",
      durationLabel: "~45 sn",
    },
    lesson05: {
      number: 5,
      title: "Mezuniyet NFT'nizi talep edin",
      shortTitle: "Mezuniyet NFT",
      description:
        "Blinks 101'i tamamladığınızı kanıtlayan sıkıştırılmış bir NFT basın. Her yerde paylaşabileceğiniz, cüzdanınıza ait kimlik bilgisi — sponsorlu mint, neredeyse sıfır maliyet.",
      concept: "Kimlik bilgisi olarak NFT'ler",
      durationLabel: "~30 sn",
    },
  },

  blink: {
    lesson01: {
      title: "Ders 1 · $1 USDC Bahşiş",
      description: [
        "USDC, Solana üzerinde dolar sabitli bir stablecoin'dir — bahşişler, ödemeler ve SOL fiyat dalgalanması olmadan değer saklamak için idealdir.",
        "",
        "Tam olarak 1 $ USDC'yi bir içerik üreticisine göndereceksiniz. Cüzdanınız bir SPL token transferini imzalar; alıcı USDC'yi token hesabına alır.",
        "",
        "İpucu: ağ ücreti için cüzdanınızda biraz SOL bulundurun.",
      ].join("\n"),
      actionLabel: "$1 USDC Bahşiş Ver",
      postMessage:
        "İçerik üreticisine 1 $ USDC gönderin. İmzalamadan önce alıcıyı ve tutarı cüzdan önizlemenizde kontrol edin.",
      insufficientBalance:
        "Bahşiş için USDC ve ücretler için biraz SOL gerekir. Cüzdanınıza fon ekleyip tekrar deneyin.",
    },
    lesson02: {
      title: "Ders 2 · İçerik üreticisine 0,001 SOL bahşiş",
      description: [
        "SOL, Solana'nın native para birimidir. Bahşiş vermek, lamport'ları cüzdanınızdan doğrudan bir içerik üreticisine gönderir — token hesabı gerekmez.",
        "",
        "Adımlar:",
        "1. Cüzdanınızı bağlayın — Cüzdanınız SOL tutar ve transferi imzalar.",
        "2. Bahşişi gözden geçirin — Tam olarak 0,001 SOL artı küçük bir ağ ücreti göndereceksiniz.",
        "3. Zincir üstünde onaylayın — Bahşiş saniyeler içinde içerik üreticisinin cüzdanına ulaşır.",
        "",
        "1 SOL = 1.000.000.000 lamport. Bu ders 1.000.000 lamport gönderir.",
      ].join("\n"),
      actionLabel: "0,001 SOL Bahşiş Ver",
      postMessage:
        "İçerik üreticisine 0,001 SOL artı küçük bir ağ ücreti gönderin. Cüzdan önizlemenizde onaylayın.",
      insufficientBalance:
        "En az 0,002 SOL gerekir (bahşiş + ücretler). Biraz SOL ekleyip tekrar deneyin.",
    },
    lesson03: {
      title: "Ders 3 · SOL'ü USDC'ye takas et",
      description: [
        "Takas, bir token'ı başka bir token ile değiştirmektir. Burada küçük bir 0,01 SOL'ü USDC'ye — 1 $'a sabitlenmiş bir stablecoin'e — çevireceksiniz.",
        "",
        "Jupiter, Solana DEX'leri arasında en iyi fiyatı bulur. Tek bir işlemi imzalarsınız; cüzdanınız gönderir.",
        "",
        "İpucu: ağ ücretleri için cüzdanınızda biraz SOL tutun.",
        "",
        "Bundan sonra: Ders 4 — SOL stake et.",
      ].join("\n"),
      actionLabel: "0,01 SOL Takas Et",
      postMessage:
        "0,01 SOL → ~{outUsdc} USDC takası Jupiter üzerinden. İmzalamadan önce tutarları cüzdanınızda kontrol edin.",
      insufficientBalance:
        "Bu takas ve ücretler için biraz daha SOL gerekir. Toplam ~0,02 SOL eklemeyi deneyin.",
    },
  },
};