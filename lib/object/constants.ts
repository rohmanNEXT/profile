import { Skill, Project, Experience } from "../types";

export const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: "N", experience: "2+ Yr" },
      { name: "React (Vite)", icon: "R", experience: "1+ Yr" },
      { name: "Jest", icon: "J", experience: "1+ Yr" },
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
      { name: "RESTful API", icon: "API", experience: "1+ Yr" },
    ],
  },
  {
    category: "Database & Cloud",
    items: [
      { name: "Supabase", icon: "S", experience: "1+ Yr" },
      { name: "PostgreSQL", icon: "P", experience: "1+ Yr" },
      { name: "DigitalOcean", icon: "D", experience: "1+ Yr" },
      { name: "Vercel", icon: "V", experience: "2+ Yr" },
      { name: "Nginx", icon: "Ng", experience: "1+ Yr" },
      { name: "PM2", icon: "P2", experience: "1+ Yr" },
    ],
  },
  {
    category: "Ui & Tools",
    items: [
      { name: "JavaScript", icon: "JS", experience: "2+ Yr" },
      { name: "Core Ui", icon: "C", experience: "1+ Yr" },
      { name: "Hero Ui", icon: "H", experience: "1+ Yr" },
      { name: "Shadcn Ui", icon: "S", experience: "1+ Yr" },
      { name: "Zustand", icon: "Z", experience: "1+ Yr" },
      { name: "Tailwind Css", icon: "T", experience: "2+ Yr" },
      { name: "GitHub", icon: "G", experience: "1+ Yr" },
      { name: "TypeScript", icon: "TS", experience: "1+ Yr" },
      { name: "VS Code", icon: "</>", experience: "4+ Yr" },
      { name: "Framer Motion", icon: "FM", experience: "Beginner" },
      { name: "Agile Scrum", icon: "AS", experience: "1+ Yr" },
      { name: "Microservices", icon: "Mc", experience: "Beginner" },
    ],
  },
];

export const PROJECTS: Project[] = [
   {
    title: "Movie next",
    description:
      "A high-fidelity Movie next featuring movie browsing, trailers, and a responsive user interface.",
    image: "https://picsum.photos/seed/netflix/800/600",
    tags: ["Fullstack", "Next.js", "Express.js"],
    githubUrl: "https://github.com/rohmanNEXT/MovieNext",
    demoUrl: "https://hallo-4672.my.id",
    testLogin: {
      user: {
        email: "user@user.com",
        password: "user123"
      },
      admin: {
        email: "admin@admin.com",
        password: "admin123"
      },
      superadmin: {
        email: "superadmin@superadmin.com",
        password: "superadmin123"
      }
    },
    features: {
      fe: [
        {
          title: "OAuth (google, jwt)",
          items: ["Login (email, password)", "Register (email, password, role)"]
        },
        {
          title: "Password",
          items: ["Forgot Password", "Reset password"]
        },
        { 
          title: "Navbar", 
          items: ["Rilis Baru", "Daftar Saya (save film)", "Dasboard (profile, kelola film, saldo, keluar)", "Subscribe (plan essential, plan professional, plan ultimate)", "Search (input search, mini list film)", "Profile"]
        },
        {
          title: "Hoc",
          items: ["Admin (superadmin, admin)", "Auth (redirect ke login)"]
        }, 
        "Sonner (alert)",
        "Carousel", 
        "Footer",
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
          items: ["Rate Limit (register, login, forgot password)", "Auth (verify token)"]
        },
        {
          title: "Helpers",
          items: ["Jwt (create token)", "Multer (uploader)", "Email (ResetPass.hbs, VerifyEmail.hsb)", "Crypto  (hash password, compare password, generate crypto token)"]
        }
      ],
      allLib: [
        {
          title: "Frontend",
          items: ["Next.js", "Formik", "Yup", "Axios", "React", "Zustand", "React Icon", "Tailwind Css", "Sonner"]
        },
        {
          title: "Backend",
          items: ["Express", "Multer", "Prisma", "PostgreSQL", "Jwt", "Crypto", "Uuid", "Nodemailer"]
        },
        {
          title: "Development",
          items: ["TypeScript", "ESLint", "Turbo", "Json-Server", "Express Rate Limit"]
        }
      ]
    }
  }, 
 {
    title: "Sleep Penginapan",
    description:
      "A hotel booking and management system for accommodation reservations with modern features.",
    image: "https://picsum.photos/seed/sleep-penginapan/800/600",
    tags: ["Fullstack", "Next.js"],
    githubUrl: "https://github.com/rohmanNEXT/sleep-penginapan",
    demoUrl: "https://486-penginapan.my.id",
        testLogin: {
      user: {
        email: "user@user.com",
        password: "user123"
      },
      admin: {
        email: "admin@admin.com",
        password: "admin123"
      },
      superadmin: {
        email: "superadmin@superadmin.com",
        password: "superadmin123"
      }
    },
    features: {
      fe: [
         {
          title: "OAuth (google, jwt)",
          items: ["Login (email, password)", "Register (email, password, role)"]
        },
        {
          title: "Password",
          items: ["Forgot Password", "Reset password"]
        },
        {
          title: "Navbar", 
          items: ["Home (hero, sponsosor, stay cupon, top countries, trend provinsi, kenapa pilih app ini, faq)", "Penginapan (hero, dan lainnya)", "Cupon (global cupon, spesipic cupon)", "Report"]
        },
        {
          title: "Hoc",
          items: ["WithAdmin (superadmin, admin)", "WithAuth (redirect ke login)", "WithAll (semua user bisa lihat tapi harus login dulu)"]
        },
        {
          title: "Dashboard",
          items: ["Profile", "Save Penginapan", "Kelola Penginapan", "Kelola Kupon", "Saldo", "Keluar"]
        }, 
        "Sonner (alert)",
        "Carousel",
        "Footer", 
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
          items: ["Rate Limit (register, login, forgot password)", "Auth (verify token)"]
        },
        {
          title: "Helpers",
          items: ["Jwt (create token)", "Multer (uploader)", "Email (Report.hbs, ResetPass.hbs, VerifyEmail.hsb)", "Crypto (hash password, compare password, generate crypto token)"]
        }
      ],
      allLib: [
        {
          title: "Frontend",
          items: ["Next.js", "Formik", "Yup", "React", "Zustand", "Axios", "Tailwind Css", "Lucide React", "Cookie", "Sonner"]
        },
        {
          title: "Backend",
          items: ["Express", "Prisma", "PostgreSQL", "Jwt", "Crypto", "Nodemailer", "Multer"]
        },
        {
          title: "Development",
          items: ["TypeScript", "ESLint", "Turbo", "Json-Server", "Express Rate Limit"]
        }
      ]
    }
  }, 
  {
    title: "Evently Cms",
    description:
      "A comprehensive event management system with a powerful CMS for organizing and tracking events.",
    image: "https://picsum.photos/seed/evently/800/600",
    tags: ["Frontend", "Next.js"],
    githubUrl: "https://github.com/rohmanNEXT/EventlyCms",
    demoUrl: "https://evently-cms.vercel.app",
    features: {
      fe: [
        {
          title: "Navbar",
          items: ["Overview (hero, sponsors, all event, pagination)", "Explore (Hero, dan lainnya)", "Insight (umami api)", "Contact"]
        }, 
        {
          title: "Explore Menu",
          items: ["Search", "Filtering Data (Category, Location)", "Result Dari Search", "Carousel", "Pagination", "Explore/[id]"]
        },
        {
          title: "Insights Menu",
          items: ["Visitors", "Visit", "Page Views", "Visual Grafik (24 Jam, 7 Hari, 30 Hari)"]
        }, 
        {
          title: "Overview",
          items: ["Search", "Sponsors", "All Event", "Carousel", "Pagination"]
        }, 
        "Skeleton section", 
        "Carousel", 
        "Footer" 
      ],
      be: [],
      allLib: [
        {
          title: "Frontend",
          items: ["Next.js", "@heroui/react", "@coreui/react", "Framer Motion", "React Icons", "Radix Ui", "Tailwind Css", "Contentful (CMS)", "React Hook Form", "Zod", "Recharts", "ApexCharts", "React Markdown"]
        },
        {
          title: "Development",
          items: ["TypeScript", "ESLint", "Resend"]
        }
      ]
    }
  },
  {
    title: "To Do",
    description:
      "A simple and modern ToDo List app for managing daily tasks with a clean Ui and smooth user experience.",
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
      be: [],
      allLib: [
        {
          title: "Frontend",
          items: ["React.js", "Vite", "Tailwind Css 4", "React Icons", "Motion"]
        },
        {
          title: "Development",
          items: ["TypeScript"]
        }
      ]
    }
  } 
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Harisenin Bootcamp",
    role: "Full Stack Developer Bootcamp",
    period: "Feb 2026 - Aug 2026",
    location: "Jakarta, Indonesia (Remote)",
    duration: "6 months",
    salary: " ",
    category: "Full Stack Developer Bootcamp",
    achievements: [
      "Menyelesaikan kurikulum full stack developer dengan fokus pada JavaScript dan TypeScript",
      "Membangun aplikasi web responsive dan integrasi API menggunakan React dan Node.js",
    ],
  },
  {
    company: "Purwadhika Bootcamp",
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

