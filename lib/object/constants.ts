import { Skill, Project, Experience } from "../types";

export const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: "N", experience: "2+ Yr" },
      { name: "Vite", icon: "V", experience: "1+ Yr" },
      { name: "React", icon: "R", experience: "1+ Yr" },
      { name: "Cypress", icon: "Cy", experience: "1+ Yr" },
      { name: "Css", icon: "3", experience: "4+ Yr" },
      { name: "Css Animation", icon: "3", experience: "1+ Yr" },
      { name: "Html", icon: "5", experience: "4+ Yr" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "JS", experience: "4+ Yr" },
      { name: "Express", icon: "ex", experience: "1+ Yr" },
      { name: "Prisma", icon: "P", experience: "1+ Yr" },
      { name: "Jest", icon: "J", experience: "Beginner" },
    ],
  },
  {
    category: "Database & Cloud",
    items: [
      { name: "Supabase", icon: "S", experience: "1+ Yr" },
      { name: "PostgreSQL", icon: "P", experience: "1+ Yr" },
      { name: "Railway", icon: "R", experience: "1+ Yr" },
      { name: "DigitalOcean", icon: "D", experience: "1+ Yr" },
      { name: "Hostinger", icon: "H", experience: "1+ Yr" },
      { name: "Vercel", icon: "V", experience: "2+ Yr" },
    ],
  },
  {
    category: "UI & Tools",
    items: [
      { name: "JavaScript", icon: "JS", experience: "2+ Yr" },
      { name: "Core UI", icon: "C", experience: "1+ Yr" },
      { name: "HeroUI", icon: "H", experience: "1+ Yr" },
      { name: "Shadcn UI", icon: "S", experience: "1+ Yr" },
      { name: "Zustand", icon: "Z", experience: "1+ Yr" },
      { name: "TailwindCSS", icon: "T", experience: "2+ Yr" },
      { name: "GitHub", icon: "G", experience: "1+ Yr" },
      { name: "TypeScript", icon: "TS", experience: "1+ Yr" },
      { name: "VS Code", icon: "</>", experience: "4+ Yr" },
      { name: "Motion", icon: "M", experience: "Beginner" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Evently CMS",
    description:
      "A comprehensive event management system with a powerful CMS for organizing and tracking events.",
    image: "https://picsum.photos/seed/evently/800/600",
    tags: ["Frontend", "Next.js"],
    githubUrl: "https://github.com/rohmanNEXT/EventlyCms",
    demoUrl: "https://evently-cms.vercel.app",
    features: {
      fe: [
        {
          title: "Explore Menu",
          items: ["Search", "Filtering Data (Category, Location)", "Result Dari Search", "Carousel", "Pagination", "Explore/[id]"]
        },
        {
          title: "Insights Menu",
          items: ["Visitors", "Visit", "Page Views", "Visual Grafik (24 Jam, 7 Hari, 30 Hari)"]
        },
        "Contact Form",
        {
          title: "Overview",
          items: ["Search", "Sponsors", "All Event", "Carousel", "Pagination"]
        },
        "Skleton section", 
        "Footer",
        "Navbar (Overview, Explore, Insight, Contact)" 
      ],
      be: []
    }
  },
  {
    title: "Netflix Clone",
    description:
      "A high-fidelity Netflix clone featuring movie browsing, trailers, and a responsive user interface.",
    image: "https://picsum.photos/seed/netflix/800/600",
    tags: ["Fullstack", "Next.js", "Express.js"],
    githubUrl: "https://github.com/rohmanNEXT/movie-next",
    demoUrl: "http://testing-348.my.id",
    features: {
      fe: [
        {
          title: "OAuth",
          items: ["Login", "Register", "Role"]
        },
        "Forgot Password",
        {
          title: "Hoc",
          items: ["Admin (Superadmin, Admin)", "Auth (Redirect ke Login)"]
        },
        "Subscribe (plan Essential, plan Professional, plan Ultimate)",
        "Saldo (top up, trarik tunai, history transaksi, komisi referal)",
        "Movie/[id]",
        "All Movie",
        "Toast",
        "Footer",
        "Carousel", 
        "Profile (profile utama, user profile)",
        "kelola film (upload img, url, dan lainnya)",
        {
          title: "Navbar", 
          items: ["Series", "Daftar Saya", "Dashboard (profile, kelola film, saldo, keluar)", "Search (input search, mini list film)", "Profile"]
        }
      ],
      be: [
        {
          title: "Database",
          items: ["Prisma", "PostgreSQL"]
        },
        {
          title: "Controller",
          items: ["Movie", "Auth", "Wishlist", "Profile", "Payment"]
        },
        {
          title: "Middleware",
          items: ["Rate Limit (Register, Login, Forgot Password)", "Auth (Verify Token)"]
        },
        {
          title: "Helpers",
          items: ["Jwt (Create Token)", "Multer (Uploader)", "Email (resetPass.hbs)", "Crypto (ID, Reset Password)"]
        }
      ]
    }
  },
  {
    title: "ToDo",
    description:
      "A simple and modern ToDo List app for managing daily tasks with a clean UI and smooth user experience.",
    image: "https://picsum.photos/seed/todo/800/600",
    tags: ["Frontend", "React.js"], 
    githubUrl: "https://github.com/rohmanNEXT/ToDo",
    demoUrl: "https://rohman-to-do.vercel.app/",
    features: {
      fe: [
        "User -> Product Designer",
        "Level Task (Low, Medium, High)",
        "Tanggal -> Mulai Task (Terlambat, Masih Proses)",
        "Tanggal Hari Ini",
        "ToDo Harian (Belum Selesai, Selesai)",
        "Hapus ToDo"
      ],
      be: []
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Purwadhika Surabaya",
    role: "Full Stack Developer Bootcamp",
    period: "Feb 2024 - Aug 2024",
    location: "Central Surabaya, Genteng, Indonesia",
    duration: "6 months",
    salary: " ",
    category: "Full Stack Developer Bootcamp",
    achievements: [
      "Menyelesaikan tugas harian dengan tanggung jawab",
      "Aktif berkolaborasi dalam tim",
      "Lingkungan belajar sangat nyaman dan mendukung perkembangan",
      "Mendapat pengalaman belajar dan wawasan budaya yang menarik",
      "Alasan lain: Tidak mendapatkan job connector karena sakit parah (pembengkakan dan gangguan saraf rahang)",
    ],
  },
  {
  company: "Pak Suriyono Fish Farming",
  role: "Fish Farming",
  period: "Jan 16, 2023 - Feb 26, 2024",
  location: "Kediri, Kalilanang, Indonesia",
  duration: "1 Years 1 Month",
  salary: "Rp500.000 / month",
  category: "Fish Farming",
  achievements: [
    "Mengecek kondisi ikan pagi, siang, sore, dan malam",
    "Tidak ada hari libur kecuali keadaan tertentu",
    "Memberi makan ikan pagi, siang, dan sore",
    "Melayani pembeli dan menyortir ikan berdasarkan ukuran saat ada pesanan",
  ],
}
];

export const AWARDS = [
  {
    title: "Purwadhika Bootcamp Graduation Certificate",
    description:
      "Graduation award as proof of completing the learning program.",
    image: "https://picsum.photos/seed/cert/800/600",
    link: "https://drive.google.com/drive/folders/your-cert-folder",
  },
];

export const DOCUMENTATION = [
  {
    category: "Methods Fullstack",
    links: [
      {
        title: "Modul Methods fullstack",
        url: "https://getupnote.com/share/notes/yfLE2hupecUMjw0gN8MYDDLfbjy1/019d469b-7c67-733a-b993-0708ef9516cf",
      },
    ],
  },
  {
    category: "Js basic",
    links: [
      {
        title: "Modul 1",
        url: "https://getupnote.com/share/notes/yfLE2hupecUMjw0gN8MYDDLfbjy1/019d469a-8011-77d9-91cd-bcfd813940bc",
      },
    ],
  }, 
  {
    category: "Frontend",
    links: [
      {
        title: "Modul 2",
        url: "https://getupnote.com/share/notes/yfLE2hupecUMjw0gN8MYDDLfbjy1/019d4698-fac9-72f9-a67f-be412fd71d33",
      },
      {
        title: "Modul 2.1",
        url: "https://getupnote.com/share/notes/yfLE2hupecUMjw0gN8MYDDLfbjy1/019d4699-b158-778d-b7d5-bf4057699182",
      },
    ],
  },
  {
    category: "Backend",
    links: [
      {
        title: "Modul 3",
        url: "https://getupnote.com/share/notes/yfLE2hupecUMjw0gN8MYDDLfbjy1/019d4698-6f54-7117-a2ab-056cbcdd57ec",
      },
    ],
  },
];

