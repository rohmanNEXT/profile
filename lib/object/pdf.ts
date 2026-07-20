import type { Header, Education, Experience, Reference, CvSkillCategory, CvProject } from "../types";

export const HEADER: Header = {
  name: "MUHAMMAD RACHMAN",
  role: "Full Stack Web Developer",
  location: "Samarinda, Kalimantan Timur, Indonesia",
  phone: "085646831030",
  email: "bluekraken9999@gmail.com",
};

export const ABOUT: string = `Full Stack Web Developer with hands-on experience in building modern, responsive web applications using React, Next.js, Node.js, and TypeScript. Proficient in front-end development with React and Next.js, back-end development with Node.js and Express.js, database management with PostgreSQL and Prisma ORM, and cloud deployment with Vercel, DigitalOcean, and Railway. Experienced in REST API integration, state management with Zustand, Ui/UX design, and unit/integration testing with Jest. Passionate about clean code, modular architecture, and delivering high-quality user experiences.`;

export const CV_SKILLS: CvSkillCategory[] = [
  {
    category: "Frontend",
    items: ["Next.js", "React (Vite)", "HTML5", "CSS3", "CSS Animation", "Tailwind CSS", "Responsive Design", "Jest"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Prisma ORM", "RESTful API", "JWT Authentication"],
  },
  {
    category: "Database & Cloud",
    items: ["PostgreSQL", "Supabase", "Vercel", "DigitalOcean", "Nginx", "PM2"],
  },
  {
    category: "Languages & Tools",
    items: ["JavaScript", "TypeScript", "GitHub", "VS Code", "Zustand", "Framer Motion", "Shadcn Ui", "Hero Ui", "Agile Scrum", "Microservices"],
  },
];

export const SKILLS: string = `HTML, CSS, JavaScript, React, Next.js, Tailwind CSS,
GitHub, REST API, Responsive Design`;

export const EDUCATION_LIST: Education[] = [
  {
    school: "Harisenin Bootcamp",
    location: "Jakarta, Indonesia (Remote)",
    major: "Full Stack Web Development",
    date: "Feb 2026 – Aug 2026",
  },
  {
    school: "Purwadhika Bootcamp",
    location: "Central Surabaya, Genteng, Indonesia",
    major: "Full Stack Web Development",
    date: "Feb 2024 – Aug 2024",
  },
];

export const EXPERIENCES_2: Experience[] = [
  {
    company: "Pak Suriyono Fish Farming",
    role: "Fish Farming Worker",
    period: "Jan 2023 – Feb 2024",
    location: "Kediri, Kalilanang, Indonesia",
    duration: "1 Year 1 Month",
    salary: "Rp500.000/month",
    category: "Fish Farming",
    achievements: [
      "Monitored fish health during multiple daily shifts to ensure optimal conditions",
      "Handled fish feeding schedules and maintained optimal feeding routines",
      "Served customers and sorted fish by size for order fulfillment",
      "Maintained high attention to detail and consistent routine execution, demonstrating operational discipline transferable to system monitoring and developer workflows",
    ],
  },
];

export const CV_PROJECTS: CvProject[] = [
  {
    title: "Movie Next",
    description:
      "Full-stack movie browsing platform with user authentication, subscription plans, wishlist, and admin dashboard. Includes OAuth login, payment integration, and role-based access control.",
    techStack: ["Next.js", "Express.js", "Prisma", "PostgreSQL", "TypeScript", "Zustand", "Tailwind CSS", "JWT", "Nodemailer"],
    demoUrl: "https://hallo-4672.my.id",
    githubUrl: "https://github.com/rohmanNEXT/MovieNext",
  },
  {
    title: "Evently CMS",
    description:
      "Event management platform with CMS-powered content, analytics dashboard using Umami API, event exploration with search and filtering, and responsive design.",
    techStack: ["Next.js", "Contentful CMS", "TypeScript", "Tailwind CSS", "Recharts", "React Hook Form", "Zod"],
    demoUrl: "https://evently-cms.vercel.app",
    githubUrl: "https://github.com/rohmanNEXT/EventlyCms",
  },
  {
    title: "To Do App",
    description:
      "Modern task management application with priority levels, date tracking, daily task completion status, and responsive Ui with animations.",
    techStack: ["React.js", "Vite", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://rohman-to-do.vercel.app",
    githubUrl: "https://github.com/rohmanNEXT/ToDo",
  },
  {
    title: "Sleep Penginapan",
    description:
      "Hotel booking and management system with accommodation reservations, coupon management, reporting, and multi-role dashboard. Features search, filtering, and payment integration.",
    techStack: ["Next.js", "Express.js", "Prisma", "PostgreSQL", "TypeScript", "Zustand", "Tailwind CSS"],
    demoUrl: "https://486-penginapan.my.id",
    githubUrl: "https://github.com/rohmanNEXT/sleep-penginapan",
  },
];

export const REFERENCES: Reference[] = [
  { label: "Portfolio", url: "https://rohman-profile.vercel.app" },
  { label: "GitHub", url: "https://github.com/rohmanNEXT" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/muhammad-rachman-12a556423",
  },
];
