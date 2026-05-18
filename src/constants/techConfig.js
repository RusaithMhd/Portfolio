import * as SiIcons from "react-icons/si";
import { FiBox } from "react-icons/fi";

/* SAFE ICON MAP (runtime fallback) */
export const iconMap = {
    SiReact: SiIcons.SiReact,
    SiJavascript: SiIcons.SiJavascript,
    SiTailwindcss: SiIcons.SiTailwindcss,
    SiHtml5: SiIcons.SiHtml5,
    SiCss3: SiIcons.SiCss3 || FiBox,

    SiMysql: SiIcons.SiMysql,
    SiGit: SiIcons.SiGit,
    SiFigma: SiIcons.SiFigma,
    SiOdoo: SiIcons.SiOdoo,
    SiTypescript: SiIcons.SiTypescript,
    SiBlender: SiIcons.SiBlender,
    SiAutodesk: SiIcons.SiAutodesk,

    SiAdobephotoshop: FiBox,
    SiAdobeillustrator: FiBox,

    default: FiBox,
};


/* descriptions */
export const skillDescriptions = {
    "React JS": "Building dynamic reusable interfaces.",
    JavaScript: "Interactive scripting and logic.",
    MySQL: "Relational data storage and queries.",
    "Odoo ERP": "Business automation workflows.",
    "Tailwind CSS": "Utility-first responsive styling.",
    Git: "Version control collaboration.",
    Photoshop: "Creative image editing.",
    Illustrator: "Vector graphic design.",
    TypeScript: "Statically typed JavaScript for scale.",
    Blender: "3D modeling and animation.",
    "3ds Max": "Professional 3D rendering and design.",
};
