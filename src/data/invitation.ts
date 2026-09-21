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

export const PHOTOS = {
  photo1: "/photo1.jpg",
  photo2: "/photo2.jpg",
  photo3: "/photo3.jpg",
  photo4: "/photo4.jpg",
} as const;

export const AUDIO_SRC = "/wedding-song.mp3";

export const DEFAULT_GUEST = "Tamu Undangan Istimewa";