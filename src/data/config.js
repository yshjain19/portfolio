// ============================================================
// PERSONAL CONFIGURATION FILE
// Update this file to change your details, projects, and links
// ============================================================

export const PERSONAL = {
  name: "Yash Jain",
  username: "@yshjain19",
  location: "Indore, Madhya Pradesh, India",
  role: "Full-Stack Web Developer · Backend Engineer",
  tagline: "Creator of SVVV Notes (9.7K+ Downloads · 1.3K+ Users) · CSE '28",
  avatar: "/avatar.jpg",

  // ── Social & Contact ────────────────────────────────────────
  github: "https://github.com/yshjain19",
  linkedin: "https://www.linkedin.com/in/yash-jain-6b6647320/",
  email: "yshjain19@gmail.com",

  // Status badge shown in hero section
  status: "Open to opportunities",

  // ── Bio paragraphs shown in Hero ────────────────────────────
  heroBio: [
    "I'm a Computer Science Engineering student (CSE '28) and backend-focused full-stack developer from Indore, India. I built and launched SVVV Notes, an academic sharing platform that has scaled to 9,775+ resource downloads and 1,390+ unique student sessions.",
    "My core stack includes Node.js, Express.js, MongoDB, JavaScript, and REST APIs, backed by solid problem-solving fundamentals in C/C++. I love participating in hackathons, architecting server-side workflows, and shipping products that people actually use.",
  ],

  // ── Longer About section ────────────────────────────────────
  about: [
    "I'm Yash Jain, a full-stack developer and Computer Science Engineering student at Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV), Indore (Batch of 2028). I'm passionate about full-stack development, server-side systems, and engineering software with proven real-world adoption.",
    "My flagship project, SVVV Notes, solved the campus-wide problem of fragmented study resources. In production, the platform has surpassed 9,775+ total downloads (8,300+ unique), 1,390+ student sessions across 1,328+ unique IPs, and hosts 211+ curated study materials for university students.",
    "I actively participate in hackathons and rapid prototyping sprints. Outside of project work, I'm diving deeper into database optimization, authentication patterns, and scalable web architectures.",
  ],
};

export const IMPACT_METRICS = [
  {
    value: "9.7k+",
    label: "PDF DOWNLOADS",
    tag: "@SVVV_NOTES",
  },
  {
    value: "1.3k+",
    label: "UNIQUE SESSIONS",
    tag: "STUDENT USERS",
  },
  {
    value: "210+",
    label: "CURATED NOTES",
    tag: "STUDY MATERIALS",
  },
  {
    value: "45+",
    label: "ACTIVE USERS",
    tag: "REGISTERED STUDENTS",
  },
  {
    value: "3",
    label: "FULL-STACK APPS",
    tag: "LIVE ON RENDER",
  },
];

export const EDUCATION = {
  degree: "B.Tech — Computer Science Engineering",
  institution: "Shri Vaishnav Vidyapeeth Vishwavidyalaya (SVVV)",
  location: "Indore, Madhya Pradesh",
  year: "2028",
};

export const PROJECTS = [
  {
    id: "svvv-notes",
    name: "SVVV Notes",
    badge: "9.7K+ Downloads · 1.3K+ Users",
    description:
      "SVVV Notes is a high-traffic student resource platform built to centralize academic materials for SVVV Computer Science Engineering students. In active production, it has served thousands of downloads and streamlined exam preparation across semesters.",
    metrics: [
      { label: "Total Downloads", value: "9,775+", sublabel: "8,309 unique" },
      { label: "Unique Sessions", value: "1,398+", sublabel: "1,328 unique IPs" },
      { label: "Academic Notes", value: "211+", sublabel: "curated materials" },
      { label: "Registered Users", value: "45+", sublabel: "+4 in last 7 days" },
    ],
    features: [
      "Academic notes discovery and browsing",
      "Searchable study materials",
      "PDF and image-based notes uploads",
      "Student-focused resource organisation",
      "Admin workflow for reviewing submissions",
    ],
    tags: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "Bootstrap",
      "Passport.js",
      "Cloudinary",
      "Render",
    ],
    live: "https://svvv-notes.onrender.com/",
    repo: "https://github.com/yshjain19/SVVV_Notes",
    thumbnail: "/svvv-notes.jpg",
    thumbnailAlt: "SVVV Notes — notes-sharing platform interface",
    accent: "#3b82f6",
  },
  {
    id: "prestigestay",
    name: "PrestigeStay",
    description:
      "PrestigeStay is a full-stack accommodation-listing web application inspired by vacation rental platforms. It focuses on browsing properties and managing listings through a server-rendered web experience.",
    features: [
      "Browse accommodation listings",
      "View individual property details",
      "User authentication",
      "Create, edit, and delete listings",
      "Reviews and ratings",
      "Image uploads and cloud storage",
    ],
    tags: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "Bootstrap",
      "Passport.js",
      "Cloudinary",
    ],
    live: "https://prestigestay.onrender.com/",
    repo: "https://github.com/yshjain19/Airbnb",
    thumbnail: "/prestigestay.jpg",
    thumbnailAlt: "PrestigeStay — accommodation listing web app",
    accent: "#f59e0b",
  },
  {
    id: "kisanmitra-ai",
    name: "Kisan Mitra AI",
    description:
      "Kisan Mitra AI is an agricultural advisory and market-linkage project focused on helping farmers access useful agricultural information and market-price insights.",
    features: [
      "Agricultural advisory chat interface",
      "Market price information display",
      "Farmer-focused UX and information access",
    ],
    tags: ["JavaScript", "Node.js", "Express.js", "AI Integration"],
    live: "https://kisanmitraai-d626.onrender.com/",
    repo: "https://github.com/yshjain19/kisanmitra-ai",
    thumbnail: "/kisanmitra.jpg",
    thumbnailAlt: "Kisan Mitra AI — agricultural advisory application",
    accent: "#22c55e",
  },
];

export const TECH_STACK = {
  languages: [
    { name: "JavaScript", learning: false },
    { name: "C / C++", learning: false },
    { name: "SQL", learning: false },
  ],
  backend: [
    { name: "Node.js", learning: false },
    { name: "Express.js", learning: false },
    { name: "REST APIs", learning: false },
    { name: "Auth & Sessions", learning: false },
  ],
  frontend: [
    { name: "HTML5", learning: false },
    { name: "CSS3", learning: false },
    { name: "Bootstrap", learning: false },
    { name: "EJS", learning: false },
    { name: "React.js", learning: true }, // currently learning
  ],
  database: [
    { name: "MongoDB", learning: false },
    { name: "Mongoose", learning: false },
    { name: "MySQL", learning: false },
    { name: "Cloudinary", learning: false },
  ],
  tools: [
    { name: "Git", learning: false },
    { name: "GitHub", learning: false },
    { name: "Postman", learning: false },
    { name: "VS Code", learning: false },
    { name: "Render", learning: false },
  ],
};
