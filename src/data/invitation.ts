export const COUPLE = {
  bride: {
    name: "Jannati Wulandhari",
    nickname: "Wulan",
    parents: "Bapak Sukari & Ibu Markhamah",
  },
  groom: {
    name: "Moch. Jalal Adinegoro",
    nickname: "Adi",
    parents: "Bapak Rois & Ibu Tumini",
  },
} as const;

export const EVENT = {
  marriedDateLabel: "Minggu, 11 Oktober 2026",
  akad: {
    title: "Akad Nikah",
    tag: "Khidmat",
    time: "09.00 WIB s/d Selesai",
  },
  resepsi: {
    title: "Resepsi Pernikahan",
    tag: "Perayaan",
    time: "10.00 WIB s/d Selesai",
  },
  venue:
    "Jl. KH. Agus Salim RT/RW 08/01 Dusun Krajan 1 Alasbuluh, Wongsorejo, Banyuwangi",
  mapsUrl: "https://maps.app.goo.gl/DqSzVMSURr9dGtkH7",
  countdownUTC: Date.UTC(2026, 9, 11, 2, 0, 0),
  saveTheDateUrl:
    "https://www.google.com/calendar/render?action=TEMPLATE" +
    "&text=" +
    encodeURIComponent("The Wedding of Wulan & Adi") +
    "&dates=20261011T020000Z/20261011T050000Z" +
    "&details=" +
    encodeURIComponent(
      "Akad nikah & resepsi pernikahan Wulan & Adi. Mohon doa restunya."
    ) +
    "&location=" +
    encodeURIComponent(
      "Jl. KH. Agus Salim RT/RW 08/01 Dusun Krajan 1 Alasbuluh, Wongsorejo, Banyuwangi"
    ),
} as const;

export const GIFT_CARDS = [
  {
    bank: "BCA Digital",
    color: "text-blue-800",
    holder: "a.n. Jannati Wulandhari",
    number: "",
  },
  {
    bank: "Bank Mandiri",
    color: "text-emerald-800",
    holder: "a.n. Moch. Jalal Adinegoro",
    number: "",
  },
] as const;

export const E_WALLETS = [
  {
    bank: "DANA",
    color: "text-blue-700",
    holder: "a.n. Jannati Wulandhari",
    number: "",
  },
  {
    bank: "OVO",
    color: "text-purple-700",
    holder: "a.n. Moch. Jalal Adinegoro",
    number: "",
  },
] as const;

export const PHOTOS = {
  // Gallery photos — hanya dari root public/
  photo1: "/IMG-20260719-WA0109.jpg.jpeg",
  photo2: "/IMG-20260719-WA0118.jpg.jpeg",
  photo3: "/photo3.jpg",
  photo4: "/photo4.jpg",
  placeholder: "/IMG-20260719-WA0109.jpg.jpeg",
  // Foto mempelai individual (dari folder 2-mempelai)
  bride: "/2-mempelai/photo1.jpg",
  groom: "/2-mempelai/photo2.jpg",
  // Foto bersama (cover & couple section)
  coupleVintage: "/IMG-20260914-WA0005.jpg.jpeg",
} as const;

export const VERSES = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  greeting: "Assalamu'alaikum Wr. Wb.",
  translation:
    "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
  source: "QS. Ar-Rum: 21",
  note: "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami akan menyelenggarakan acara pernikahan kami.",
} as const;

export const AUDIO_SRC = "/wedding-song.mp3";

export const DEFAULT_GUEST = "Tamu Undangan Istimewa";