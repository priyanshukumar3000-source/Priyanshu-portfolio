// ─────────────────────────────────────────────────────────────
//  EDIT ME — every word, link, project and skill on the site
//  lives in this single file. Add a project by appending to
//  PROJECTS; add a skill by appending to the right category.
// ─────────────────────────────────────────────────────────────

export const OWNER = {
  name: "Priyanshu Kumar",
  roles: ["Web Developer", "UI/UX Designer", "Creative Technologist"],
  headline: ["I Design.", "I Build.", "I Evolve."],
  tagline:
    "Building immersive digital experiences by combining code, design, and emerging technology.",
  intro:
    "I'm a B.Tech Computer Science Engineering student and passionate developer focused on Full-Stack Web Development, UI/UX Design, and AI-powered solutions. I've trained in the field through two internships — UI/UX Design at Finsentsis OS and Web Development at Averisix Solution — and I enjoy turning ideas into practical, user-friendly digital products.",
};

export const SOCIALS = [
  { name: "GitHub", handle: "@priyanshukumar3000", url: "https://github.com/priyanshukumar3000", icon: "github" },
  { name: "LinkedIn", handle: "in/priyanshu-kumar-1a282b203", url: "https://www.linkedin.com/in/priyanshu-kumar-1a282b203", icon: "linkedin" },
  { name: "Email", handle: "priyanshukumar3000@gmail.com", url: "mailto:priyanshukumar3000@gmail.com", icon: "mail" },
];

export const EXPERIENCE = [
  {
    role: "UI/UX Design Intern",
    company: "Finsentsis OS Pvt Ltd",
    kind: "DESIGN_GUILD",
    points: [
      "Designed product interfaces and interactive prototypes in Figma",
      "Crafted design-system components and developer handoff specs",
    ],
    tags: ["Figma", "UI/UX", "Prototyping", "Design Systems"],
  },
  {
    role: "Web Developer Intern",
    company: "Averisix Solution",
    kind: "DEV_GUILD",
    points: [
      "Built and shipped responsive, production web features",
      "Integrated frontends with REST APIs and real data flows",
    ],
    tags: ["React", "JavaScript", "REST APIs", "Tailwind CSS"],
  },
];

const IMG = "https://static.prod-images.emergentagent.com/jobs/2e3eda51-2c79-42d9-9c7e-9a236e2359c7/images";

export const IMAGES = {
  heroCharacter: `${IMG}/04572dc44e73a9b2284328e736127ce282d4f2badc54f70b7f135d3284970ed5.jpeg`,
  aboutAnime:
    "https://customer-assets-0z36b82j.emergentagent.net/job_2e3eda51-2c79-42d9-9c7e-9a236e2359c7/artifacts/pwhmgist_WhatsApp%20Image%202026-09-15%20at%201.26.24%20AM.jpeg",
  aboutBW:
    "https://customer-assets-0z36b82j.emergentagent.net/job_2e3eda51-2c79-42d9-9c7e-9a236e2359c7/artifacts/en1vtown_WhatsApp%20Image%202026-09-15%20at%201.26.03%20AM.jpeg",
  healthguard: `${IMG}/8d2c157b7e2f47195ccecbe9682d8778608bb8d42d8e1d536306ea9455434a6e.jpeg`,
  huguen: `${IMG}/d6e8677fec0ca650680fbb2a6b183fe87528274636fce832b769558e042662ab.jpeg`,
};

export const STATS = [
  { label: "Web Development", value: 15, suffix: "+", note: "Projects shipped", icon: "code" },
  { label: "UI/UX Design", value: 20, suffix: "+", note: "Screens & systems", icon: "pen" },
  { label: "AI & Technology", value: 6, suffix: "+", note: "AI integrations", icon: "cpu" },
  { label: "Hackathons", value: 3, suffix: "", note: "Arenas cleared", icon: "trophy" },
  { label: "Creative Problem Solving", value: 100, suffix: "%", note: "Always on", icon: "spark" },
];

export interface SkillGroup {
  name: string;
  code: string;
  skills: { name: string; level: number }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend",
    code: "FRONT_END",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "React", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    name: "Backend",
    code: "BACK_END",
    skills: [
      { name: "Node.js", level: 84 },
      { name: "Express", level: 82 },
      { name: "REST APIs", level: 88 },
      { name: "Authentication", level: 80 },
      { name: "Database Integration", level: 83 },
    ],
  },
  {
    name: "Programming",
    code: "LANG_CORE",
    skills: [
      { name: "Python", level: 86 },
      { name: "Java", level: 78 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    name: "Design",
    code: "DESIGN_SYS",
    skills: [
      { name: "Figma", level: 90 },
      { name: "UI/UX", level: 88 },
      { name: "Prototyping", level: 85 },
      { name: "Design Systems", level: 82 },
      { name: "Canva", level: 92 },
    ],
  },
  {
    name: "AI & Data",
    code: "AI_DATA",
    skills: [
      { name: "AI Integration", level: 82 },
      { name: "Machine Learning", level: 72 },
      { name: "Data Analytics", level: 75 },
    ],
  },
  {
    name: "Tools",
    code: "TOOL_BELT",
    skills: [
      { name: "Git", level: 88 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 94 },
      { name: "Vercel", level: 86 },
    ],
  },
];

export const DESIGN_WORKS = [
  {
    title: "Aether UI Case Studies",
    category: "UI/UX · Web Interfaces",
    desc: "Dark-mode dashboard and analytics interfaces with dense data made readable.",
    image: `${IMG}/caf2abbf87e23dc109f0deeb3ecc50dd4fc87a1c2f7e1a683081765af96312fd.jpeg`,
    wide: true,
  },
  {
    title: "Pulse — Mobile UI",
    category: "Mobile · App Design",
    desc: "Anime-inspired music player concept with neon equalizer and glass controls.",
    image: `${IMG}/21bcabe58a22267f7a21a223be8bcffab02a6b5d7ddc036c36ad1466e006c15e.jpeg`,
    wide: false,
  },
  {
    title: "Code The Future",
    category: "Poster · Event Branding",
    desc: "Typography-led hackathon poster series with Japanese graphic accents.",
    image: `${IMG}/97628d4ef6cd97f14a910f743cb5764f3542631872217f2e56bc6ff969bc4456.jpeg`,
    wide: false,
  },
  {
    title: "ARXIS Identity",
    category: "Branding · Logo System",
    desc: "Geometric neon monogram and stationery system for a fictional tech studio.",
    image: `${IMG}/9c76fe19a80b34ab800168f079a15adb7d90aa7866c0caa0bca93c7322560a5b.jpeg`,
    wide: true,
  },
];

export interface Project {
  id: string;
  index: string;
  title: string;
  kind: string;
  tagline: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
  image: string;
  demo: string;
  code: string;
  caseStudy: string;
}

export const PROJECTS: Project[] = [
  {
    id: "healthguard",
    index: "01",
    title: "HealthGuard",
    kind: "HEALTH-TECH PLATFORM",
    tagline: "Care, engineered for everyone.",
    problem:
      "Rural and busy urban patients struggle to track vitals, find the right care, and keep medical history in one place.",
    solution:
      "A healthcare-focused web platform that centralizes vitals tracking, appointments and health records behind one calm, accessible interface.",
    features: [
      "Real-time vitals dashboard with trend graphs",
      "Doctor discovery & appointment scheduling",
      "Secure digital health records",
      "Symptom-aware guidance powered by AI",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST API"],
    image: IMAGES.healthguard,
    demo: "#",
    code: "https://github.com/priyanshukumar",
    caseStudy: "#",
  },
  {
    id: "huguen",
    index: "02",
    title: "Huguen",
    kind: "HOTEL BOOKING · UI/UX",
    tagline: "Stays that feel designed, not listed.",
    problem:
      "Hotel booking apps feel transactional and cluttered — discovery is joyless and trust is hard to build from a list of cards.",
    solution:
      "A design-led hotel booking experience: immersive photography, transparent pricing and a three-tap booking flow crafted in Figma and prototyped end-to-end.",
    features: [
      "Design system with 40+ reusable components",
      "Immersive hotel discovery with editorial cards",
      "Calendar-based booking flow prototype",
      "Micro-interaction library for delight",
    ],
    tech: ["Figma", "UI/UX", "Prototyping", "Design Systems", "React"],
    image: IMAGES.huguen,
    demo: "#",
    code: "https://github.com/priyanshukumar",
    caseStudy: "#",
  },
];

// Sample hackathon entries — swap in your real events & results
export const HACKATHONS = [
  {
    rank: "FINALIST",
    event: "Smart India Hackathon",
    year: "2025",
    project: "HealthGuard",
    team: "Team of 4 · Full-Stack + Design",
    mission:
      "Build an accessible health-tech platform for underserved communities in 36 hours.",
    achievement: "Pitched a working full-stack prototype with live vitals dashboard to the finals panel.",
    level: 86,
  },
  {
    rank: "TOP 10",
    event: "Inter-College Code Sprint",
    year: "2025",
    project: "Campus Connect",
    team: "Team of 3 · Frontend Lead",
    mission: "Solve one real campus problem with a shippable web app, overnight.",
    achievement: "Led UI architecture and shipped a realtime notice-board app used in the demo by judges.",
    level: 72,
  },
  {
    rank: "PARTICIPANT",
    event: "AI Builders Hack",
    year: "2026",
    project: "Vision Assist",
    team: "Solo · Design + ML Integration",
    mission: "Prototype an AI-powered accessibility tool in 24 hours.",
    achievement: "Integrated a vision model with a voice-first interface and shipped a working demo solo.",
    level: 64,
  },
];

export const JOURNEY = [
  {
    phase: "LEVEL 01",
    name: "LEARN",
    years: "2023",
    desc: "Fell into computer science. Devoured HTML, CSS and JavaScript, then data structures with Python and Java.",
    tags: ["HTML/CSS", "JavaScript", "Python"],
  },
  {
    phase: "LEVEL 02",
    name: "DESIGN",
    years: "2024",
    desc: "Discovered that great software starts before the code. Figma, typography, grids, and the psychology of interfaces.",
    tags: ["Figma", "UI/UX", "Design Systems"],
  },
  {
    phase: "LEVEL 03",
    name: "BUILD",
    years: "2024",
    desc: "Went full-stack: React frontends, Node & Express APIs, real databases, auth, and deployments on Vercel.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    phase: "LEVEL 04",
    name: "COMPETE",
    years: "2025",
    desc: "Entered the hackathon arena. Learned to scope ruthlessly, design fast, and ship under brutal time pressure.",
    tags: ["Hackathons", "Teamwork", "Pitching"],
  },
  {
    phase: "LEVEL 05",
    name: "IMPROVE",
    years: "2025",
    desc: "Started folding AI into real products — integrations, ML experiments and data-driven interfaces.",
    tags: ["AI Integration", "ML", "Analytics"],
  },
  {
    phase: "LEVEL 06",
    name: "EVOLVE",
    years: "NOW",
    desc: "Crafting immersive digital products where engineering discipline meets cinematic design. The grind continues.",
    tags: ["Creative Tech", "3D Web", "Emerging Tech"],
  },
];

export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami      → identify the protagonist",
    "  skills      → list core abilities",
    "  mission     → current objective",
    "  experience  → guild training records",
    "  projects    → things I've built",
    "  contact     → open a channel",
    "  sudo hire   → initiate recruitment protocol",
    "  clear       → wipe the terminal",
  ],
  whoami: ["B.Tech CSE student • Full-Stack Developer + Designer"],
  skills: ["React • JavaScript • Python • UI/UX • AI"],
  mission: ["Build meaningful digital experiences."],
  experience: [
    "UI/UX Design Intern — Finsentsis OS Pvt Ltd",
    "Web Developer Intern — Averisix Solution",
    "3 hackathons cleared • more quests incoming",
  ],
  projects: ["[01] HealthGuard — health-tech platform", "[02] Huguen — hotel booking UI/UX", "→ scroll to PROJECTS for the full showcase"],
  contact: ["email → priyanshukumar3000@gmail.com", "github → github.com/priyanshukumar3000", "or use the transmission form below ↓"],
  "sudo hire": [
    "[sudo] password for recruiter: ********",
    "ACCESS GRANTED ✦",
    "Status: OPEN to internships, freelance & full-time quests.",
    "Initializing handshake... scroll to CONTACT.",
  ],
};

export const MARQUEE_ITEMS = [
  "FULL-STACK DEVELOPMENT",
  "UI/UX DESIGN",
  "CREATIVE TECHNOLOGY",
  "AI-POWERED PRODUCTS",
  "IMMERSIVE INTERFACES",
  "DESIGN SYSTEMS",
];

export const NAV_LINKS = [
  { id: "home", label: "Home", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "design", label: "Design", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "journey", label: "Journey", num: "05" },
  { id: "contact", label: "Contact", num: "06" },
];
