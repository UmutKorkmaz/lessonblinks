import type { Dictionary } from "./types";

export const id: Dictionary = {
  ui: {
    siteTitle: "LessonBlinks — Belajar Solana dalam 5 ketukan",
    siteDescription:
      "Lima pelajaran 30 detik, masing-masing berupa Solana Action sungguhan: kirim USDC, beri tip dalam SOL, kirim uang ke luar negeri, pahami swap, dan mint lencana kelulusan.",
    lessonMetaTitle: "Pelajaran {x}: {title} — LessonBlinks",

    brandTagline: "Solana Actions sebagai pelajaran 30 detik",
    faucetLink: "Faucet Devnet",
    languageLabel: "Bahasa",

    heroEyebrow: "Solana Devnet · Gratis dicoba",
    heroTitlePre: "Belajar Solana cukup dengan ",
    heroTitleHighlight: "lima ketukan",
    heroTitlePost: ", bukan lima tutorial.",
    heroSubtitle:
      "Setiap pelajaran adalah Blink sungguhan — Solana Action sekali ketuk yang kamu tandatangani dengan dompetmu sendiri. Kirim dolar digital, beri tip ke kreator, kirim uang lintas negara, pahami swap, dan lulus dengan lencana onchain.",
    statLessons: "pelajaran",
    statMinutes: "~{m} menit",
    statTotal: "total",
    statLiveNow: "aktif sekarang",
    statBadge: "lencana untuk di-mint",
    pathHeading: "Jalur belajar",
    footerHome:
      "Berjalan di Solana Devnet — setiap transaksi nyata, setiap dolarnya palsu. Hubungkan dompet devnet di halaman pelajaran untuk memulai.",

    liveBadge: "Aktif",
    comingSoonBadge: "Segera Hadir",
    durationFormat: "~{s}d",
    earnPrefix: "Dapatkan: ",
    startLesson: "Mulai pelajaran",
    comingSoonCta: "Segera hadir",

    backToLessons: "Semua pelajaran",
    lessonXofY: "Pelajaran {x} dari {y}",
    lessonWord: "Pelajaran",
    whatYoullLearn: "Apa yang akan kamu pelajari",
    whyItMatters: "Kenapa ini penting",
    howItWorks: "Cara kerjanya",
    doItHere: "Coba langsung — di sini",
    wordsYouLearned: "Istilah yang baru kamu pelajari",
    learningObjectives: "Tujuan pembelajaran",
    prerequisites: "Prasyarat",
    noPrereqs: "Tidak ada — jalur belajarnya dimulai dari sini.",
    comingSoonLesson: "Pelajaran ini akan segera hadir.",
    actionApiLabel: "Action API:",
    didYouKnow: "Tahukah kamu?",
    previous: "Sebelumnya",
    next: "Berikutnya",
    footerLesson: "Dibangun untuk Dialect Actions Registry · Solana Devnet",

    loadingBlink: "Memuat Blink…",
    blinkError:
      "Tidak dapat memuat Blink. Periksa URL Action dan header CORS-nya.",
    blinkApiNote: "Catatan: kartu ini berasal dari Action API. Kontrol wallet dan permukaan eksternal (X, wallet) mungkin tampil dalam bahasa Inggris.",
  },

  lessons: {
    "1": {
      title: "Kirim USDC pertamamu",
      tagline: "Dolar digital yang berpindah dalam satu ketukan",
      description:
        "USDC adalah stablecoin — token yang nilainya dipatok ke $1, diterbitkan oleh Circle. Di Solana, USDC tersimpan dalam akun token SPL, saldo terpisah yang terikat pada satu mint tertentu. Di pelajaran ini kamu mengirim sejumlah kecil USDC ke kas kursus dan melihat transfer sungguhan terselesaikan di devnet dalam hitungan detik.",
      whyItMatters:
        "Stablecoin adalah penggunaan kripto terbesar di dunia nyata: menabung dalam dolar tanpa rekening bank AS, pembayaran tanpa jaringan kartu, dan nilai yang tidak berayun 10% dalam semalam. Kalau kamu hanya ingin menguasai satu keterampilan onchain, kuasailah memindahkan USDC.",
      blinkAction:
        "Hubungkan dompet devnet dan ketuk tombol kirim. Dompetmu menampilkan pratinjau transfer token SPL; setelah kamu tanda tangani, USDC mendarat di akun token milik kas — biasanya dalam waktu kurang dari dua detik.",
      steps: [
        {
          title: "Hubungkan dompetmu",
          body: "Dompetmu menyimpan SOL untuk biaya dan USDC di akun token SPL. Ambil USDC devnet dari faucet Circle kalau kamu belum punya.",
        },
        {
          title: "Periksa transfernya",
          body: "Blink menyusun transaksinya untukmu. Cek jumlah dan penerimanya di dompetmu — jangan pernah menandatangani tanpa memeriksa.",
        },
        {
          title: "Tanda tangani sekali",
          body: "Satu tanda tangan memindahkan USDC ke onchain. Kamu hanya membayar biaya jaringan SOL yang sangat kecil (sepersekian sen).",
        },
      ],
      concepts: [
        "Stablecoin",
        "Token SPL",
        "Akun token",
        "Biaya jaringan",
      ],
      glossary: {
        USDC: "Stablecoin yang dipatok ke $1, diterbitkan oleh Circle.",
        "SPL token":
          "Standar token milik Solana — seperti ERC-20 di Ethereum.",
        "Akun token":
          "Akun onchain yang menyimpan saldo dari satu token tertentu.",
      },
      funFact:
        "USDC devnet memakai mekanisme SPL yang sama dengan mainnet — kamu belajar hal yang sungguhan tanpa mempertaruhkan satu dolar pun.",
      learningObjectives: [
        "Memahami USDC sebagai stablecoin berpatokan dolar di Solana",
        "Mengirim transfer token SPL (bukan SOL native)",
        "Menyelesaikan transaksi sungguhan dari sebuah Blink dalam waktu kurang dari satu menit",
      ],
      badgeLabel: "Pengirim USDC",
      actionLabel: "Kirim 0.01 USDC",
      successMessage:
        "Kirim 0.01 USDC ke kas pendidikan ({recipient}). Periksa di dompetmu sebelum menandatangani.",
    },
    "2": {
      title: "Beri tip kreator dalam SOL",
      tagline: "Transfer native, lamport, dan biaya yang sebenarnya",
      description:
        "SOL adalah mata uang native Solana — aset yang membayar setiap transaksi di jaringan. Berbeda dengan USDC, SOL tidak butuh akun token: memberi tip memindahkan lamport langsung dari dompetmu ke alamat kreator. Kamu akan mengirim 0.001 SOL (satu juta lamport) dan melihat persis berapa biaya jaringan sebenarnya.",
      whyItMatters:
        "Tip untuk kreator adalah cara pembayaran menjadi sosial. Blink seperti ini bisa disematkan di dalam postingan di X, sehingga penggemar bisa memberi tip dalam hitungan detik tanpa potongan platform, tanpa penahanan pencairan 3 hari, dan tanpa bank di tengahnya.",
      blinkAction:
        "Ketuk tombol tip untuk melihat pratinjau transfer SystemProgram. Konfirmasi di dompetmu untuk mengirim tepat 1.000.000 lamport (0.001 SOL) plus biaya sekitar 5.000 lamport ke kreator.",
      steps: [
        {
          title: "Hubungkan dompetmu",
          body: "Kamu butuh sedikit SOL devnet — faucet memberimu lebih dari cukup.",
        },
        {
          title: "Periksa tipnya",
          body: "Dompet menampilkan 0.001 SOL keluar dari akunmu. Perhatikan baris biaya jaringan yang terpisah — itulah yang sebenarnya dikenakan Solana.",
        },
        {
          title: "Konfirmasi di onchain",
          body: "Tip mendarat di dompet kreator dalam hitungan detik, final dan tidak bisa dibatalkan.",
        },
      ],
      concepts: ["SOL native", "Lamport", "SystemProgram", "Finalitas"],
      glossary: {
        SOL: "Token native Solana, dipakai untuk biaya dan transfer.",
        Lamport:
          "Satuan terkecil dari SOL — 1 SOL = 1.000.000.000 lamport.",
        "Biaya jaringan":
          "Biaya SOL yang sangat kecil yang dibayarkan ke validator untuk memproses transaksimu.",
      },
      funFact:
        "Biaya transaksi Solana umumnya 5.000 lamport — sekitar $0.001. Transfer bank via wire harganya kira-kira 25.000× lebih mahal.",
      learningObjectives: [
        "Mengirim SOL native (bukan token SPL) ke dompet lain",
        "Membaca lamport dan biaya jaringan di pratinjau dompet",
        "Menyelesaikan tip onchain sungguhan dalam satu ketukan",
      ],
      badgeLabel: "Pemberi Tip SOL",
      actionLabel: "Beri Tip 0.001 SOL",
      successMessage:
        "Beri tip 0.001 SOL ke {recipient}. Periksa di dompetmu sebelum menandatangani.",
    },
    "3": {
      title: "Kirim uang lintas negara",
      tagline: "Remitansi dalam hitungan detik — bukan tiga hari kerja",
      description:
        "Remitansi — mengirim uang ke kampung halaman lintas negara — adalah salah satu penggunaan kripto dengan kebutuhan paling nyata, terutama di koridor Turki ↔ UE/AS. Di pelajaran ini kamu mengirim pembayaran USDC kecil ke dompet keluarga di luar negeri dan merasakan penyelesaian dalam hitungan detik, tanpa keterlambatan SWIFT dan tanpa selisih kurs bank.",
      whyItMatters:
        "Remitansi tradisional memakan biaya 5–7% dan butuh berhari-hari. Transfer yang sama di Solana hanya berbiaya sepersekian sen dan selesai sebelum kamu sempat me-refresh halaman. Bagi keluarga diaspora ini bukan sekadar demo — ini masalah bulanan yang terpecahkan.",
      blinkAction:
        'Ketuk tombol kirim untuk melihat pratinjau transfer SPL ke dompet remitansi demo — bayangkan "Ayşe di Jerman". Tanda tangani sekali dan pembayaran terselesaikan di Solana dalam hitungan detik.',
      steps: [
        {
          title: "Bayangkan penerimanya",
          body: "Dompet demo ini mewakili keluarga di luar negeri — alur yang sama berlaku untuk alamat mana pun di Bumi.",
        },
        {
          title: "Periksa pembayarannya",
          body: "Mekanisme transfer USDC yang sama seperti yang kamu pelajari di Pelajaran 1 — jaringan tidak peduli dengan batas negara.",
        },
        {
          title: "Tanda tangani dan selesaikan",
          body: "Penyelesaian bersifat final dalam hitungan detik. Bandingkan dengan wire SWIFT 2–3 hari dan biaya 5%.",
        },
      ],
      concepts: [
        "Remitansi",
        "Kecepatan penyelesaian",
        "Selisih kurs",
        "Transfer tanpa batas negara",
      ],
      glossary: {
        Remitansi:
          "Uang yang dikirim lintas negara, biasanya oleh pekerja untuk keluarga di kampung halaman.",
        SWIFT:
          "Jaringan pesan antarbank warisan lama — wire butuh 1–5 hari kerja.",
        Penyelesaian:
          "Momen ketika nilai benar-benar berpindah tangan, final dan tidak bisa dibatalkan.",
      },
      funFact:
        "Diaspora Turki mengirim miliaran dolar ke kampung halaman setiap tahun. Dengan biaya Solana, penghematannya dibanding wire transfer akan sangat besar.",
      learningObjectives: [
        "Memahami kenapa remitansi USDC mengalahkan wire transfer tradisional",
        "Mengirim USDC ke dompet kedua (kasus penggunaan keluarga / diaspora)",
        "Mengenali kecepatan penyelesaian dan biaya rendah di Solana",
      ],
      badgeLabel: "Pengirim Remitansi",
      actionLabel: "Kirim 0.05 USDC",
      successMessage:
        "Kirim 0.05 USDC ke luar negeri untuk menyelesaikan Pelajaran 3. Periksa penerima dan jumlahnya di dompetmu sebelum menandatangani.",
    },
    "4": {
      title: "Pahami swap pertamamu",
      tagline: "Bagaimana DEX menukar satu token dengan token lain",
      description:
        "Swap menukar satu token dengan token lain langsung di onchain — tanpa akun bursa, tanpa formulir order. Di mainnet, agregator seperti Jupiter mencari rute terbaik di berbagai DEX Solana. Jupiter tidak punya likuiditas di devnet, jadi pelajaran ini adalah simulasi yang jujur: kamu menandatangani transaksi devnet sungguhan yang mencatat memo pelajaran-swap di onchain, sementara Blink memandu kamu memahami kuotasi, rute, dan slippage.",
      whyItMatters:
        "Swap adalah gerbang menuju seluruh dunia DeFi — mengonversi SOL yang fluktuatif menjadi USDC yang stabil adalah cara orang melindungi nilai, dan inilah mekanisme di balik setiap DEX, agregator, dan produk yield yang akan kamu temui nanti.",
      blinkAction:
        "Ketuk tombol swap. Action memeriksa bahwa kamu memegang setidaknya 0.01 SOL (jumlah yang akan dipakai swap sungguhan), lalu dompetmu menandatangani transaksi devnet yang membawa memo demo-swap — bukti onchain bahwa kamu menyelesaikan pelajaran ini.",
      steps: [
        {
          title: "Pegang jumlah swap-nya",
          body: "Swap sungguhan akan menukar 0.01 SOL, jadi pelajaran ini mewajibkan kamu memegangnya — plus sedikit ekstra untuk biaya.",
        },
        {
          title: "Pelajari rutenya",
          body: "Di mainnet, Jupiter memberi kuotasi SOL → USDC di banyak DEX dan memilih harga terbaik. Toleransi slippage melindungimu dari pergerakan harga.",
        },
        {
          title: "Tanda tangani transaksi demonya",
          body: "Kamu menandatangani transaksi devnet sungguhan dengan memo yang mencatat pelajaran ini — alur tanda tangan yang sama persis dengan swap di mainnet.",
        },
      ],
      concepts: ["Swap", "Agregator DEX", "Slippage", "Program Memo"],
      glossary: {
        Swap: "Menukar satu token dengan token lain langsung di onchain.",
        Jupiter:
          "Agregator terdepan di Solana — mencari rute swap terbaik di berbagai DEX.",
        Slippage:
          "Pergerakan harga yang kamu toleransi antara kuotasi dan eksekusi.",
        Memo: "Catatan kecil onchain yang dilampirkan pada transaksi — di sini, bukti kelulusanmu.",
      },
      funFact:
        "Jupiter merutekan lewat puluhan sumber likuiditas untuk setiap kuotasi. Memo devnet-mu memakai program Memo yang sama dengan yang dipakai aplikasi mainnet untuk tanda terima.",
      learningObjectives: [
        "Mendefinisikan swap dan menjelaskan apa yang dilakukan agregator DEX",
        "Memahami slippage dan kenapa kuotasi bisa berubah",
        "Menandatangani transaksi devnet sungguhan dengan memo onchain",
      ],
      badgeLabel: "Penukar Token",
      actionLabel: "Swap 0.01 SOL (demo devnet)",
      successMessage:
        "Demo devnet: kamu menandatangani memo penyelesaian pelajaran swap. Di mainnet, alur yang sama ini akan menukar 0.01 SOL menjadi USDC lewat Jupiter.",
    },
    "5": {
      title: "Klaim lencana kelulusanmu",
      tagline: "Mint kredensial onchain yang benar-benar milikmu",
      description:
        "Inilah puncaknya. Kamu me-mint lencana Lulusan Blinks 101 — token devnet sungguhan dengan suplai tetap persis 1, dibuat dalam satu transaksi yang dibayar dan ditandatangani oleh dompetmu. Otoritas mint dibakar dalam transaksi yang sama, sehingga tidak ada yang bisa me-mint salinan kedua: itulah ide inti di balik NFT sebagai kredensial.",
      whyItMatters:
        "Kredensial onchain tidak bisa dipalsukan, dicabut oleh platform, atau hilang saat sebuah perusahaan tutup. Dari tiket acara hingga ijazah, token bersuplai 1 di dompetmu sendiri adalah cara kepemilikan dan pembuktian bekerja di web3.",
      blinkAction:
        "Ketuk tombol klaim setelah menyelesaikan Pelajaran 1–4. Dompetmu menandatangani satu transaksi yang membuat mint lencana, me-mint tepat 1 token untukmu, dan mengunci suplainya secara permanen. Biayanya sekitar 0.003 SOL devnet untuk rent.",
      steps: [
        {
          title: "Selesaikan kursusnya",
          body: "Pelajaran 1–4 dulu — lencana ini adalah bukti kamu menyelesaikan seluruh jalur, berdasarkan kejujuranmu untuk MVP devnet ini.",
        },
        {
          title: "Tanda tangani mint-nya",
          body: "Satu transaksi membuat mint token yang sepenuhnya baru, membuka akun tokenmu, dan me-mint tepat 1 lencana ke dompetmu.",
        },
        {
          title: "Suplai terkunci selamanya",
          body: "Transaksi yang sama menghapus otoritas mint. Suplai: 1. Pemilik: kamu. Itulah sebuah kredensial.",
        },
      ],
      concepts: [
        "NFT sebagai kredensial",
        "Otoritas mint",
        "Suplai tetap",
        "Rent",
      ],
      glossary: {
        NFT: "Token dengan suplai 1 — unik, dapat dimiliki, dan dapat dipindahtangankan.",
        "Otoritas mint":
          "Kunci yang berwenang membuat token baru. Menghapusnya mengunci suplai selamanya.",
        Rent: "Deposit SOL kecil yang menjaga sebuah akun tetap hidup di onchain.",
      },
      funFact:
        "Lencanamu adalah mint SPL sungguhan yang bisa kamu cari di explorer mana pun — telusuri alamat mint-nya dan kamu akan melihat suplai: 1, otoritas mint: tidak ada.",
      learningObjectives: [
        "Memahami NFT sebagai kredensial yang dimiliki dompet",
        "Melihat bagaimana membakar otoritas mint mengunci suplai di angka 1",
        "Menyelesaikan jalur onboarding Blinks 5 pelajaran",
      ],
      badgeLabel: "Lulusan Blinks 101",
      actionLabel: "Klaim Lencana Kelulusan",
      successMessage:
        "Lencana kelulusan berhasil di-mint! Token bersuplai 1 {mint} kini milik dompetmu — telusuri di explorer devnet mana pun.",
    },
  },
};
