import type { Header, Education, Experience, Reference } from "../types";

export const HEADER: Header = {
  name: "MUHAMMAD RACHMAN",
  role: "Web Developer Fullstack",
  location: "Samarinda",
  phone: "085646831030",
  email: "bluekraken9999@gmail.com",
};

export const ABOUT: string = `Web Developer dengan keahlian React, Next.js, dan JavaScript.
Terbiasa membuat website responsive, integrasi REST API, state management,
dan optimasi performa. Terbiasa menggunakan Git, GitHub, dan deployment Vercel.`;

export const SKILLS: string = `HTML, CSS, JavaScript, React, Next.js, Tailwind CSS,
Git, GitHub, REST API, Responsive Design`;

export const EDUCATION: Education = {
  school: "Purwadhika Digital School",
  location: "Surabaya central, Genteng",
  major: "Web Development",
  date: "Jun – Okt 2024",
};

export const EXPERIENCES_2: Experience[] = [
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

export const REFERENCES: Reference[] = [
  { label: "Portfolio", url: "https://next-the-profile.vercel.app" },
  { label: "GitHub", url: "https://github.com/rohmanNEXT" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/muhammad-rachman-7b61b3276" },
  { label: "Website", url: "https://rohman-profile.vercel.app" },
];

