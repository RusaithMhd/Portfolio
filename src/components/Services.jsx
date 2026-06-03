import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { FiMonitor, FiCpu, FiLayers, FiTarget, FiArrowRight } from "react-icons/fi";

const ServiceCard = ({ index, title, subtitle, description, icon: Icon, features, onInquire }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.85)}
      whileHover={{ y: -8, scale: 1.01 }}
      onClick={onInquire}
      className="group relative flex flex-col p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-orange-500/30 transition-all duration-500 overflow-hidden shadow-2xl backdrop-blur-md cursor-pointer"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-orange-500/20" />

      {/* Top Border Line Highlight */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-orange-500/40 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500">
          <Icon className="text-2xl text-white/80 group-hover:text-black group-hover:scale-110 transition-all" />
        </div>
        <span className="text-[10px] font-medium tracking-[3px] text-white/30 uppercase group-hover:text-orange-500/80 transition-colors">
          0{index + 1} / Service
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-4">
        <h3 className="text-white text-2xl font-semibold tracking-wide group-hover:text-orange-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-white/40 text-[11px] font-medium uppercase tracking-[2px] mt-1.5">
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="text-white/60 text-sm leading-relaxed font-light mb-6 relative z-10">
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-3 mt-auto pt-6 border-t border-white/5 relative z-10">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-xs text-white/50 group-hover:text-white/80 transition-colors font-light">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500/50 group-hover:bg-orange-500 transition-all" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action link */}
      <div className="mt-8 flex items-center gap-2 text-white/30 group-hover:text-orange-500 transition-colors relative z-10 text-xs font-semibold uppercase tracking-wider">
        <span className="group-hover:text-orange-500 transition-colors">Inquire Now</span>
        <FiArrowRight className="group-hover:translate-x-1.5 group-hover:text-orange-500 transition-all" />
      </div>
    </motion.div>
  );
};

const Services = () => {
  const serviceList = [
    {
      title: "Custom Website Development",
      subtitle: "Performance & SEO Focused",
      description: "Building fast, standard-compliant, and secure landing pages and corporate websites tailored to command your local and global presence.",
      icon: FiMonitor,
      features: ["Responsive & Mobile-First Layouts", "SEO Best Practices Integrated", "Clean, Fast HTML5 & CSS Architecture", "W3C Standards Compliant"]
    },
    {
      title: "React Application Development",
      subtitle: "Modern & Dynamic Web Apps",
      description: "Engineering single-page applications (SPAs) with reactive states, fluid animated frames, and seamless third-party APIs.",
      icon: FiCpu,
      features: ["Framer Motion Dynamic Animations", "State Management & Performance Optimization", "Tailwind CSS Premium Aesthetics", "Interactive Dashboards & REST Integrations"]
    },
    {
      title: "UI/UX Design Services",
      subtitle: "Aesthetics That Convert",
      description: "Designing dark luxury, futuristic, and premium layouts featuring radial glows, volumetric highlights, and clear interaction points.",
      icon: FiLayers,
      features: ["Figma Interactive Wireframing", "Premium Glassmorphic Aesthetics", "User Journey & Experience Mapping", "Micro-interaction & Prototype Design"]
    },
    {
      title: "Graphic Design & Branding",
      subtitle: "Dominating Visual Identities",
      description: "Curating high-authority marketing kits, logo graphics, menus, and posters that establish consistent, premium brand authority globally.",
      icon: FiTarget,
      features: ["Premium Vector & Logo Design", "Corporate Identity & Brand Guidelines", "Print-Ready Promotional Assets", "Social Media Templates & Engagement Kits"]
    }
  ];

  const handleInquire = (title) => {
    // Dispatch custom browser event to communicate seamlessly with Contact form component
    const event = new CustomEvent("inquire-service", { detail: { service: title } });
    window.dispatchEvent(event);
    
    // Smooth scroll down to Contact form
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Title */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left mb-16 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          <p className="text-[12px] uppercase tracking-[0.3em] text-orange-500/80 font-medium">My Offerings</p>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
          Web Development & <span className="font-semibold text-orange-500 italic">Design Services</span>
        </h2>
        {/* SEO Header */}
        <h1 className="sr-only">Web Development & Design Services — MIM Rusaith | Sri Lanka</h1>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {serviceList.map((service, index) => (
          <ServiceCard
            key={index}
            index={index}
            title={service.title}
            subtitle={service.subtitle}
            description={service.description}
            icon={service.icon}
            features={service.features}
            onInquire={() => handleInquire(service.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Services, "services");
