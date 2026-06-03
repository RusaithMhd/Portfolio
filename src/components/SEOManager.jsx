import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const seoConfig = {
  "/": {
    title: "MIM Rusaith | Freelance Web Developer & Graphic Designer — Sri Lanka",
    description: "MIM Rusaith is a freelance Full Stack Web Developer, React Developer, and Graphic Designer based in Colombo, Sri Lanka. Available for custom websites, UI/UX design, and branding projects worldwide.",
    canonical: "https://rusaith.com/",
  },
  "/portfolio": {
    title: "Portfolio — Web Design & Graphic Design Projects | MIM Rusaith",
    description: "Browse Rusaith's portfolio of custom web development, React applications, UI/UX design, and graphic design work. Based in Sri Lanka, available globally.",
    canonical: "https://rusaith.com/portfolio",
  },
  "/about": {
    title: "About MIM Rusaith — Full Stack Developer & Designer in Sri Lanka",
    description: "Learn about MIM Rusaith — a Colombo-based Full Stack Web Developer and Graphic Designer with expertise in React, UI/UX, and custom web experiences.",
    canonical: "https://rusaith.com/about",
  },
  "/services": {
    title: "Web Development & Graphic Design Services — MIM Rusaith | Sri Lanka",
    description: "Hire MIM Rusaith for custom web development, React apps, UI/UX design, and graphic design. Freelance services from Colombo, Sri Lanka — working with clients worldwide.",
    canonical: "https://rusaith.com/services",
  },
  "/contact": {
    title: "Hire MIM Rusaith — Freelance Developer & Designer | Contact",
    description: "Get in touch with MIM Rusaith to hire a freelance web developer or graphic designer based in Sri Lanka. Available for remote projects globally.",
    canonical: "https://rusaith.com/contact",
  }
};

export const updateSEOMetadata = (path, customMeta = null) => {
  const meta = customMeta || seoConfig[path] || seoConfig["/"];
  
  // Update Title
  document.title = meta.title;
  
  // Update Meta Description
  let descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", meta.description);
  }
  
  // Update Canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    canonicalLink.setAttribute("href", meta.canonical);
  }

  // Update Open Graph (og:url, og:title, og:description)
  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", meta.canonical);

  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", meta.title);

  let ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", meta.description);

  // Update Twitter Cards (twitter:url, twitter:title, twitter:description)
  let twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) twitterUrl.setAttribute("content", meta.canonical);

  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute("content", meta.title);

  let twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute("content", meta.description);
};

const SEOManager = ({ isLoading }) => {
  const location = useLocation();

  // Scroll to section on initial load if pathname matches a route
  useEffect(() => {
    if (isLoading) return;

    const initialPath = window.location.pathname;
    let targetId = "";

    if (initialPath === "/about") targetId = "about";
    else if (initialPath === "/services") targetId = "services";
    else if (initialPath === "/portfolio") targetId = "projects";
    else if (initialPath === "/contact") targetId = "contact";

    if (targetId) {
      // Small timeout to allow React to render fully and smoothscroll to initialize
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [isLoading]);

  // Set up intersection observer to dynamically change URL path and meta data as user scrolls
  useEffect(() => {
    if (isLoading) return;

    const sections = [
      { id: "home", path: "/" },
      { id: "about", path: "/about" },
      { id: "services", path: "/services" },
      { id: "projects", path: "/portfolio" },
      { id: "contact", path: "/contact" }
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Detect active section when it occupies the middle part of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionConfig = sections.find((s) => s.id === sectionId);
          if (sectionConfig) {
            // Update browser history URL path without reloading the page
            window.history.replaceState(null, "", sectionConfig.path);
            
            // Update head tag SEO metadata
            updateSEOMetadata(sectionConfig.path);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section element
    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    // Also observe Hero top container as "home"
    const heroSection = document.querySelector("section");
    if (heroSection) {
      heroSection.id = "home";
      observer.observe(heroSection);
    }

    return () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
      if (heroSection) observer.unobserve(heroSection);
    };
  }, [isLoading]);

  // Set initial SEO on render
  useEffect(() => {
    updateSEOMetadata(location.pathname);
  }, [location]);

  return null;
};

export default SEOManager;
