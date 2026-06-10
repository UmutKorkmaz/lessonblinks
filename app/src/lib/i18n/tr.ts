import type { Dictionary } from "./types";

export const tr: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Solana'yı 5 dokunuşta öğren",
    siteDescription:
      "Her biri gerçek bir Solana Action olan beş 30 saniyelik ders: USDC gönder, SOL ile bahşiş ver, yurt dışına para yolla, takası öğren ve mezuniyet rozetini mintle.",
    lessonMetaTitle: "Ders {x}: {title} — LessonBlinks",

    brandTagline: "30 saniyelik dersler hâlinde Solana Actions",
    faucetLink: "Devnet Musluğu",
    languageLabel: "Dil",

    heroEyebrow: "Solana Devnet · Denemesi ücretsiz",
    heroTitlePre: "Solana'yı beş eğitimle değil, ",
    heroTitleHighlight: "beş dokunuşta",
    heroTitlePost: " öğren.",
    heroSubtitle:
      "Her ders gerçek bir Blink — kendi cüzdanınla imzaladığın tek dokunuşluk bir Solana Action. Dijital dolar gönder, bir içerik üreticisine bahşiş ver, sınır ötesine para yolla, takası kavra ve zincir üstü bir rozetle mezun ol.",
    statLessons: "ders",
    statMinutes: "~{m} dk",
    statTotal: "toplam",
    statLiveNow: "şu an yayında",
    statBadge: "mintlenecek rozet",
    pathHeading: "Öğrenme yolu",
    footerHome:
      "Solana Devnet üzerinde çalışır — her işlem gerçek, her dolar sahtedir. Başlamak için bir ders sayfasında devnet cüzdanı bağla.",

    liveBadge: "Yayında",
    comingSoonBadge: "Çok Yakında",
    durationFormat: "~{s} sn",
    earnPrefix: "Kazan: ",
    startLesson: "Derse başla",
    comingSoonCta: "Çok yakında",

    backToLessons: "Tüm dersler",
    lessonXofY: "Ders {x} / {y}",
    lessonWord: "Ders",
    whatYoullLearn: "Ne öğreneceksin",
    whyItMatters: "Neden önemli",
    howItWorks: "Nasıl çalışır",
    doItHere: "Hemen burada yap",
    wordsYouLearned: "Az önce öğrendiğin kavramlar",
    learningObjectives: "Öğrenme hedefleri",
    prerequisites: "Ön koşullar",
    noPrereqs: "Yok — yol tam burada başlıyor.",
    comingSoonLesson: "Bu ders çok yakında geliyor.",
    actionApiLabel: "Action API:",
    didYouKnow: "Biliyor muydun?",
    previous: "Önceki",
    next: "Sonraki",
    footerLesson: "Dialect Actions Registry için geliştirildi · Solana Devnet",

    loadingBlink: "Blink yükleniyor…",
    blinkError: "Blink yüklenemedi. Action URL'sini ve CORS başlıklarını kontrol et.",
  },

  lessons: {
    "1": {
      title: "İlk USDC'ni gönder",
      tagline: "Tek dokunuşla hareket eden dijital dolarlar",
      description:
        "USDC bir stablecoin'dir — Circle tarafından ihraç edilen, değeri 1 dolara sabit kalan bir token. Solana'da SPL token hesabında yaşar; bu, belirli bir mint'e bağlı ayrı bir bakiyedir. Bu derste kurs kasasına küçük bir USDC gönderecek ve gerçek bir transferin devnet'te saniyeler içinde kesinleştiğini göreceksin.",
      whyItMatters:
        "Stablecoin'ler kriptonun gerçek dünyadaki en büyük kullanım alanı: ABD banka hesabı olmadan dolar birikimi, kart altyapısı olmadan ödeme ve bir gecede %10 oynamayan değer. Zincir üstünde tek bir beceri öğreneceksen, o beceri USDC taşımak olsun.",
      blinkAction:
        "Bir devnet cüzdanı bağla ve gönder düğmesine dokun. Cüzdanın bir SPL token transferi önizler; imzaladıktan sonra USDC, kasanın token hesabına ulaşır — çoğunlukla iki saniyeden kısa sürede.",
      steps: [
        {
          title: "Cüzdanını bağla",
          body: "Cüzdanında ücretler için SOL, SPL token hesabında ise USDC bulunur. Devnet USDC'n yoksa Circle musluğundan alabilirsin.",
        },
        {
          title: "Transferi incele",
          body: "İşlemi Blink senin için oluşturur. Tutarı ve alıcıyı cüzdanında kontrol et — asla körlemesine imzalama.",
        },
        {
          title: "Bir kez imzala",
          body: "Tek imza USDC'yi zincir üstünde taşır. Sen yalnızca çok küçük bir SOL ağ ücreti ödersin (bir sentin kesirleri).",
        },
      ],
      concepts: ["Stablecoin'ler", "SPL token'lar", "Token hesapları", "Ağ ücretleri"],
      glossary: {
        USDC: "Circle tarafından ihraç edilen, 1 dolara sabitlenmiş stablecoin.",
        "SPL token": "Solana'nın token standardı — Ethereum'daki ERC-20 gibi.",
        "Token hesabı": "Belirli bir token'ın bakiyesini tutan zincir üstü hesap.",
      },
      funFact:
        "Devnet USDC, mainnet ile aynı SPL mekaniğini kullanır — gerçek olanı, hiç dolar riske atmadan öğreniyorsun.",
      learningObjectives: [
        "USDC'yi Solana üzerinde dolara sabit bir stablecoin olarak kavra",
        "Bir SPL token transferi gönder (native SOL değil)",
        "Bir Blink'ten gerçek bir işlemi bir dakikadan kısa sürede tamamla",
      ],
      badgeLabel: "USDC Göndericisi",
    },
    "2": {
      title: "Bir üreticiye SOL ile bahşiş ver",
      tagline: "Native transferler, lamport'lar ve ücretlerin gerçek maliyeti",
      description:
        "SOL, Solana'nın yerel para birimidir — ağdaki her işlemin bedelini ödeyen varlık. USDC'den farklı olarak token hesabı gerektirmez: bahşiş, lamport'ları doğrudan senin cüzdanından üreticinin adresine taşır. 0,001 SOL (bir milyon lamport) gönderecek ve bir ağ ücretinin tam olarak ne kadar tuttuğunu göreceksin.",
      whyItMatters:
        "Üreticilere bahşiş, ödemelerin sosyalleşme biçimidir. Böyle bir Blink, X'teki bir gönderinin içine yerleşebilir; hayranlar saniyeler içinde, platform kesintisi olmadan, 3 günlük ödeme beklemeden ve arada banka olmadan bahşiş verebilir.",
      blinkAction:
        "Bahşiş düğmesine dokunarak bir SystemProgram transferini önizle. Cüzdanında onayla: üreticiye tam 1.000.000 lamport (0,001 SOL) artı yaklaşık 5.000 lamport ücret gönderilir.",
      steps: [
        {
          title: "Cüzdanını bağla",
          body: "Biraz devnet SOL yeterli — musluk fazlasıyla verir.",
        },
        {
          title: "Bahşişi incele",
          body: "Cüzdan, hesabından çıkan 0,001 SOL'u gösterir. Ayrı ağ ücreti satırına dikkat et — Solana'nın gerçekte aldığı budur.",
        },
        {
          title: "Zincir üstünde onayla",
          body: "Bahşiş saniyeler içinde üreticinin cüzdanına ulaşır; kesin ve geri alınamaz.",
        },
      ],
      concepts: ["Native SOL", "Lamport'lar", "SystemProgram", "Kesinlik"],
      glossary: {
        SOL: "Solana'nın ücretler ve transferler için kullanılan yerel token'ı.",
        Lamport: "SOL'un en küçük birimi — 1 SOL = 1.000.000.000 lamport.",
        "Ağ ücreti": "İşlemini işleyen doğrulayıcılara ödenen çok küçük SOL bedeli.",
      },
      funFact:
        "Tipik bir Solana işlem ücreti 5.000 lamport'tur — yaklaşık 0,001 $. Bir banka havalesi bunun kabaca 25.000 katına mal olur.",
      learningObjectives: [
        "Başka bir cüzdana native SOL gönder (SPL token değil)",
        "Cüzdan önizlemesinde lamport'ları ve ağ ücretlerini oku",
        "Tek dokunuşla gerçek bir zincir üstü bahşişi tamamla",
      ],
      badgeLabel: "SOL Bahşişçisi",
    },
    "3": {
      title: "Sınırın ötesine para gönder",
      tagline: "Saniyeler içinde havale — üç iş günü değil",
      description:
        "Remitans — sınır ötesine, eve para göndermek — kriptonun en yüksek talepli kullanım alanlarından biridir; özellikle Türkiye ↔ AB/ABD koridorlarında. Bu derste yurt dışındaki bir aile cüzdanına küçük bir USDC ödemesi gönderecek; SWIFT gecikmesi ve banka kur makası olmadan, saniyeler içinde kesinleşen bir transferi deneyimleyeceksin.",
      whyItMatters:
        "Geleneksel havale %5–7 ücret alır ve günler sürer. Aynı transfer Solana'da bir sentin kesri kadar tutar ve sen sayfayı yenileyemeden kesinleşir. Gurbetçi aileler için bu bir demo değil — her ay yaşanan bir derdin çözümü.",
      blinkAction:
        'Gönder düğmesine dokunarak demo remitans cüzdanına yapılacak SPL transferini önizle — "Almanya\'daki Ayşe"yi düşün. Bir kez imzala; ödeme Solana\'da saniyeler içinde kesinleşir.',
      steps: [
        {
          title: "Alıcıyı zihninde canlandır",
          body: "Demo cüzdan, yurt dışındaki ailenin yerini tutuyor — aynı akış dünyadaki her adres için çalışır.",
        },
        {
          title: "Ödemeyi incele",
          body: "Ders 1'de öğrendiğin USDC transfer mekaniğinin aynısı — ağ, sınırları umursamaz.",
        },
        {
          title: "İmzala ve kesinleşsin",
          body: "Mutabakat saniyeler içinde kesinleşir. Bunu 2–3 günlük SWIFT havalesi ve %5 ücretle karşılaştır.",
        },
      ],
      concepts: ["Remitans", "Mutabakat hızı", "Kur makası", "Sınırsız transfer"],
      glossary: {
        Remitans: "Genellikle çalışanların memleketteki ailelerine gönderdiği sınır ötesi para.",
        SWIFT: "Eski bankalar arası mesajlaşma ağı — havaleler 1–5 iş günü sürer.",
        Mutabakat: "Değerin gerçekten el değiştirdiği an; kesin ve geri alınamaz.",
      },
      funFact:
        "Türkiye diasporası her yıl milyarlarca doları eve gönderiyor. Solana ücretleriyle, banka havalesine kıyasla tasarruf devasa olurdu.",
      learningObjectives: [
        "USDC remitansının geleneksel havaleyi neden geride bıraktığını kavra",
        "İkinci bir cüzdana USDC gönder (aile / diaspora senaryosu)",
        "Solana'daki mutabakat hızını ve düşük ücretleri fark et",
      ],
      badgeLabel: "Havaleci",
    },
    "4": {
      title: "İlk takasını kavra",
      tagline: "DEX'ler bir token'ı diğeriyle nasıl takas eder",
      description:
        "Takas (swap), bir token'ı doğrudan zincir üstünde diğeriyle değiştirir — borsa hesabı yok, emir formu yok. Mainnet'te Jupiter gibi bir toplayıcı, Solana DEX'leri arasında en iyi rotayı bulur. Jupiter'in devnet likiditesi yoktur; bu yüzden bu ders dürüst bir simülasyondur: Blink sana kotasyonları, rotaları ve kaymayı anlatırken, sen takas dersi notu (memo) taşıyan gerçek bir devnet işlemi imzalarsın.",
      whyItMatters:
        "Takaslar tüm DeFi'nin kapısıdır — oynak SOL'u istikrarlı USDC'ye çevirmek insanların değerini koruma yoludur ve ileride karşılaşacağın her DEX, toplayıcı ve getiri ürününün arkasındaki mekanizmadır.",
      blinkAction:
        "Takas düğmesine dokun. Action, en az 0,01 SOL (gerçek bir takasın kullanacağı tutar) tuttuğunu doğrular; ardından cüzdanın, takas demosu notu taşıyan bir devnet işlemi imzalar — dersi tamamladığının zincir üstü kanıtı.",
      steps: [
        {
          title: "Takas tutarını bulundur",
          body: "Gerçek bir takas 0,01 SOL kullanırdı; bu yüzden ders, bu tutarı — artı ücretler için biraz fazlasını — bulundurmanı ister.",
        },
        {
          title: "Rotayı öğren",
          body: "Mainnet'te Jupiter, SOL → USDC için birçok DEX'ten fiyat alır ve en iyisini seçer. Kayma toleransı seni fiyat hareketinden korur.",
        },
        {
          title: "Demo işlemi imzala",
          body: "Dersi kaydeden notuyla gerçek bir devnet işlemi imzalarsın — mainnet'teki bir takasın kullandığı imza akışının aynısı.",
        },
      ],
      concepts: ["Takaslar", "DEX toplayıcıları", "Kayma", "Memo programı"],
      glossary: {
        Takas: "Bir token'ı doğrudan zincir üstünde diğeriyle değiştirmek.",
        Jupiter: "Solana'nın önde gelen toplayıcısı — DEX'ler arasında en iyi takas rotasını bulur.",
        Kayma: "Kotasyon ile gerçekleşme arasında tolere ettiğin fiyat hareketi.",
        Memo: "İşleme iliştirilen küçük bir zincir üstü not — burada, tamamlama kanıtın.",
      },
      funFact:
        "Jupiter her kotasyonda onlarca likidite kaynağını tarar. Devnet notun, mainnet uygulamalarının makbuz için kullandığı Memo programının aynısını kullanır.",
      learningObjectives: [
        "Takası tanımla ve DEX toplayıcısının ne yaptığını açıkla",
        "Kaymayı ve kotasyonların neden değiştiğini kavra",
        "Zincir üstü notuyla gerçek bir devnet işlemi imzala",
      ],
      badgeLabel: "Takasçı",
    },
    "5": {
      title: "Mezuniyet rozetini al",
      tagline: "Gerçekten sana ait zincir üstü bir sertifika mintle",
      description:
        "Bitirme dersi. Blinks 101 Mezunu rozetini mintliyorsun — arzı tam olarak 1'e sabitlenmiş, cüzdanının ödeyip imzaladığı tek bir işlemle oluşturulan gerçek bir devnet token'ı. Mint yetkisi aynı işlemde yakılır; böylece hiç kimse ikinci bir kopya basamaz: NFT'lerin sertifika olarak özünde yatan fikir tam da budur.",
      whyItMatters:
        "Zincir üstü sertifikalar sahtelenemez, bir platform tarafından iptal edilemez ve bir şirket kapandığında kaybolmaz. Etkinlik biletlerinden diplomalara kadar, kendi cüzdanındaki arzı 1 token'lar web3'te sahipliğin ve kanıtın çalışma biçimidir.",
      blinkAction:
        "Ders 1–4'ü bitirdikten sonra al düğmesine dokun. Cüzdanın tek bir işlem imzalar: rozet mint'ini oluşturur, sana tam 1 token mintler ve arzı kalıcı olarak kilitler. Kira (rent) için yaklaşık 0,003 devnet SOL tutar.",
      steps: [
        {
          title: "Kursu bitir",
          body: "Önce Ders 1–4 — rozet, tüm yolun kanıtı; bu devnet MVP'sinde beyana dayalı.",
        },
        {
          title: "Mint'i imzala",
          body: "Tek işlem yepyeni bir token mint'i oluşturur, token hesabını açar ve cüzdanına tam 1 rozet mintler.",
        },
        {
          title: "Arz sonsuza dek kilitli",
          body: "Aynı işlem mint yetkisini kaldırır. Arz: 1. Sahibi: sen. İşte sertifika budur.",
        },
      ],
      concepts: ["Sertifika olarak NFT'ler", "Mint yetkisi", "Sabit arz", "Kira (rent)"],
      glossary: {
        NFT: "Arzı 1 olan token — benzersiz, sahiplenilebilir ve devredilebilir.",
        "Mint yetkisi": "Yeni token basmaya yetkili anahtar. Kaldırılması arzı sonsuza dek kilitler.",
        "Kira (rent)": "Bir hesabı zincir üstünde canlı tutan küçük SOL depozitosu.",
      },
      funFact:
        "Rozetin, herhangi bir explorer'da arayabileceğin gerçek bir SPL mint'idir — mint adresini arat; arz: 1, mint yetkisi: yok göreceksin.",
      learningObjectives: [
        "NFT'leri cüzdana ait sertifikalar olarak kavra",
        "Mint yetkisini yakmanın arzı 1'e nasıl sabitlediğini gör",
        "5 derslik Blinks öğrenme yolunu tamamla",
      ],
      badgeLabel: "Blinks 101 Mezunu",
    },
  },
};
