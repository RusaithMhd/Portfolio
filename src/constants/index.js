import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  java,
  mysql,
  git,
  pos,
  crmnext,
  linkedIn,
  github,
  imss,
  nickelfox,
  newgen,
  skillrisers,
  proximus,
  aptihealthWeb,
  aptihealthApp,
  zealWeb,
  zealApp,
  rollWeb,
  rollApp,
  nextJs,
} from "../assets";

const navigationPaths = {
  home: "/",
  about: "about",
  experience: "experience",
  projects: "projects",
  mediakit: "mediakit",
  contact: "contact",
};

export const navLinks = [
  {
    id: navigationPaths.about,
    title: "About",
  },
  {
    id: navigationPaths.projects,
    title: "Work",
  },
  {
    id: navigationPaths.mediakit,
    title: "Media Kit",
  },
  {
    id: navigationPaths.contact,
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: "FiMonitor",
  },
  {
    title: "Graphic Designer",
    icon: "FiSmartphone",
  },
  {
    title: "IT Executive",
    icon: "FiCpu",
  },
  {
    title: "Digital Marketer",
    icon: "FiTarget",
  },
];

const technologies = [
  { name: "React JS", icon: "SiReact" },
  { name: "JavaScript", icon: "SiJavascript" },
  { name: "Tailwind CSS", icon: "SiTailwindcss" },
  { name: "HTML 5", icon: "SiHtml5" },
  { name: "CSS 3", icon: "SiCss3" },
  { name: "Photoshop", icon: "SiAdobephotoshop" },
  { name: "Illustrator", icon: "SiAdobeillustrator" },
  { name: "Odoo ERP", icon: "FiBox" },
  { name: "MySQL", icon: "SiMysql" },
  { name: "Git", icon: "SiGit" },
];

const experiences = [
  {
    title: "Graphic Designer cum IT Executive",
    company_name: "ChillFrost (Pvt) Ltd",
    company_website: "#",
    icon: proximus, // Placeholder for ChillFrost
    iconBg: "#383E56",
    date: "2025 - Present",
    points: [
      "Design marketing materials and ensure brand consistency across digital platforms.",
      "Manage IT systems, provide technical support, and maintain Odoo ERP to streamline business operations.",
      "Developing high-impact visual content for corporate branding and marketing campaigns.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Infinity Marketing Services and Solutions (Pvt) Ltd",
    company_website: "https://imss.lk",
    icon: imss,
    iconBg: "#E6DEDD",
    date: "2024 - 2025",
    points: [
      "Developed responsive websites using HTML, CSS, JavaScript, and React.",
      "Supported ERP web applications and system modules to improve business flow.",
      "Managed digital marketing campaigns and improved website/ERP performance for better user experience.",
    ],
  },
  {
    title: "Graphic Designer / Digital Marketing Assistant",
    company_name: "Food Champ",
    company_website: "#",
    icon: skillrisers, // Placeholder for Food Champ
    iconBg: "#383E56",
    date: "2022 - 2024",
    points: [
      "Created digital content for marketing and promotions across social media.",
      "Managed Instagram and Facebook pages with a 30%+ engagement increase.",
      "Designed branding and advertising materials for food industry products.",
    ],
  },
];

const projects = [
  {
    name: "IMSS POS",
    description: "Responsive Point of Sale system developed using React, integrated with ERP modules for seamless business management.",
    fullDescription: "A comprehensive, high-performance Point of Sale (POS) system engineered for Infinity Marketing Services. This application bridges the gap between retail operations and ERP backend systems, providing real-time synchronization of inventory, sales, and customer data with a focus on speed and reliability in a corporate environment.",
    objectives: [
      "Real-time Inventory Sync",
      "Encrypted Transaction Processing",
      "Cross-Platform Accessibility",
      "Dynamic ERP Integration"
    ],
    stackDetails: [
      { name: "React", description: "Powering the reactive user interface for sub-second state management." },
      { name: "JavaScript", description: "Core logic for transaction processing and data validation." },
      { name: "ERP Systems", description: "Seamless backend integration for centralized business intelligence." }
    ],
    specs: [
      { label: "Architecture", value: "Micro-Frontend" },
      { label: "Data Integrity", value: "Verified SHA-256" },
      { label: "Sync Speed", value: "< 250ms" },
      { label: "Uptime Status", value: "99.9% Active" }
    ],
    tags: [
      { name: "react", color: "" },
      { name: "javascript", color: "" },
      { name: "erp", color: "" },
    ],
    icon: "FiShoppingCart",
    hosted_link: "https://imss.lk",
  },
  {
    name: "ChillFrost Brand Kit",
    description: "Complete branding and marketing asset collection for a corporate environment, including social media design and ERP maintenance.",
    fullDescription: "A strategic brand identity and digital infrastructure overhaul for ChillFrost. This mission involved creating a cohesive visual language across all corporate touchpoints, from marketing collateral to the internal ERP interface, ensuring high-fidelity brand consistency and operational efficiency.",
    objectives: [
      "Visual Identity Consolidation",
      "UI/UX ERP Enhancement",
      "Automated Marketing Assets",
      "Infrastructure Optimization"
    ],
    stackDetails: [
      { name: "Graphic Design", description: "Elite-level visual content creation for brand dominance." },
      { name: "Branding", description: "Strategic positioning via consistent visual storytelling." },
      { name: "IT Support", description: "Critical system maintenance and Odoo ERP optimization." }
    ],
    specs: [
      { label: "Brand Scale", value: "Corporate Level" },
      { label: "System Reach", value: "Global Uplink" },
      { label: "Design Sync", value: "100% Consistent" },
      { label: "IT Stability", value: "Verified Secure" }
    ],
    tags: [
      { name: "graphic-design", color: "" },
      { name: "branding", color: "" },
      { name: "it-support", color: "" },
    ],
    icon: "FiBox",
    hosted_link: "#",
  },
  {
    name: "Food Champ",
    description: "Digital marketing and content creation for Food Champ, achieving 30% engagement growth via Instagram and Facebook.",
    fullDescription: "A data-driven digital marketing campaign and high-impact content strategy for Food Champ. By leveraging advanced social media algorithms and high-fidelity visual storytelling, this project successfully scaled user engagement by 30% and established a dominant market presence.",
    objectives: [
      "Algorithmic Engagement Growth",
      "High-Fidelity Visual Narrative",
      "Social Media Optimization",
      "User Retention Strategy"
    ],
    stackDetails: [
      { name: "Digital Marketing", description: "Strategic campaign deployment for maximum reach." },
      { name: "Social Media", description: "Advanced community management and algorithm tuning." },
      { name: "Content", description: "Cinematic media creation for high-impact engagement." }
    ],
    specs: [
      { label: "Engagement Lift", value: "+30% Baseline" },
      { label: "Market Depth", value: "Deep Reach" },
      { label: "Retention Rate", value: "Verified High" },
      { label: "Campaign Sync", value: "Fully Optimized" }
    ],
    tags: [
      { name: "digital-marketing", color: "" },
      { name: "social-media", color: "" },
      { name: "content", color: "" },
    ],
    icon: "FiTrello",
    hosted_link: "https://food-champ.netlify.app/",
  },
  {
    name: "Mr. Chai",
    description: "A premium Dark Luxury ordering system for a modern tea house, featuring a cinematic UI and seamless reservation flow.",
    fullDescription: "An elite-tier digital ordering and reservation platform designed with a 'Dark Luxury' aesthetic. This system provides a seamless, high-end user journey from menu exploration to table booking, optimized for high-performance neural response and visual excellence.",
    objectives: [
      "Dark Luxury UI Implementation",
      "Cinematic Reservation Flow",
      "Mobile-First Optimization",
      "Dynamic Menu Management"
    ],
    stackDetails: [
      { name: "React JS", description: "High-performance framework for smooth cinematic transitions." },
      { name: "Tailwind CSS", description: "Precision styling for the elite Dark Luxury design system." },
      { name: "Framer Motion", description: "Fluid, high-fidelity animations for immersive interaction." }
    ],
    specs: [
      { label: "Design Style", value: "Dark Luxury" },
      { label: "Response Time", value: "Sub-100ms" },
      { label: "Visual Fidelity", value: "Ultra-High" },
      { label: "System Sync", value: "Live Verified" }
    ],
    tags: [
      { name: "react", color: "" },
      { name: "tailwind", color: "" },
      { name: "animation", color: "" },
    ],
    icon: "FiShoppingCart",
    hosted_link: "https://mr-chai.netlify.app/",
  },
];

const personalInfo = {
  name: "M I Muhammathu Rusaith",
  brandName: "MIM RUSAITH",
  fullName: "Muhammathu Ismail Muhammathu Rusaith",
  email: "rusa.rock72@gmail.com",
  phone: "+94 77 080 2365",
  role: "Graphic Designer | Web Developer | IT Executive",
  about: `I am a creative and detail-oriented Graphic Designer and Web Developer with hands-on experience in digital marketing, branding, and responsive web development. 
  I have a proven ability to create high-impact marketing materials, manage social media platforms, and develop user-friendly websites using modern technologies. 
  Currently working as a Graphic Designer cum IT Executive in a corporate environment.`,
  projectsIntro: `My work spans across web development, branding, and digital marketing. From developing responsive React applications to managing corporate IT infrastructure and scaling social media engagement.`,
};

const publicUrls = {
  resume:
    "https://drive.google.com/file/d/1J5z3XBVOxDJuc0iiFTMNjBKKpkio-uS6/view?usp=drive_link",
  socialProfiles: {
    linkedin: {
      title: "linkedin",
      link: "https://www.linkedin.com/in/muhammadh-rusaith-65004131b/",
      icon: linkedIn,
    },
    github: {
      title: "github",
      link: "https://github.com/RusaithMhd",
      icon: github,
    },
  },
};

export {
  services,
  technologies,
  experiences,
  projects,
  navigationPaths,
  personalInfo,
  publicUrls,
};
