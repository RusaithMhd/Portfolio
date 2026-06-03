import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { close, menu, rusaith, name } from "../assets";
import {
  navLinks,
  navigationPaths,
  personalInfo,
} from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-[#050507]/80 backdrop-blur-lg border-b border-white/10" : "py-5 bg-transparent"
        }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to={navigationPaths.home}
          className="flex items-center gap-4 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <div className="relative w-12 h-12 flex justify-center items-center rounded-xl bg-white/[0.03] border border-orange-500/20 group-hover:border-orange-500/50 transition-all duration-500 overflow-hidden shadow-2xl">
            {/* Custom Premium SVG Logo */}
            <svg viewBox="0 0 100 100" className="w-8 h-8 z-10 transition-transform duration-500 group-hover:scale-110">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              <path 
                d="M30 20 L70 20 L70 45 L30 45 L30 80" 
                fill="none" 
                stroke="url(#logo-grad)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
              />
              <path 
                d="M50 45 L70 80" 
                fill="none" 
                stroke="url(#logo-grad)" 
                strokeWidth="8" 
                strokeLinecap="round" 
                className="drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-[16px] font-bold tracking-wider uppercase leading-tight transition-all flex items-center group-hover:text-orange-500">
              <span>{personalInfo.brandName || "MIM Rusaith"}</span>
            </div>
            <span className="text-white/40 text-[9px] font-medium tracking-[3px] uppercase mt-0.5">
              Portfolio
            </span>
          </div>
        </Link>

        <ul className="list-none hidden md:flex flex-row gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title ? "text-orange-500" : "text-white/60"
                } text-[13px] font-medium uppercase tracking-wider cursor-pointer hover:text-white transition-colors duration-300 relative group`}
            >
              {link.path ? (
                <Link 
                  to={link.path}
                  onClick={() => setActive(link.title)}
                >
                  {link.title}
                </Link>
              ) : (
                <a 
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.location.pathname !== '/') {
                      window.location.href = `/#${link.id}`;
                    } else {
                      setActive(link.title);
                      document.querySelector(`#${link.id}`)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.title}
                </a>
              )}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-orange-500 transition-all duration-300 ${active === link.title ? "w-full" : "w-0 group-hover:w-full"}`} />
            </li>
          ))}

          <li className="ml-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2 rounded-full text-[13px] font-semibold bg-orange-500 text-black hover:scale-105 transition-all duration-300 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.2)]"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <div className="md:hidden flex justify-end items-center">
          <div
            className="w-10 h-10 flex items-center justify-center glass rounded-xl cursor-pointer border border-white/10"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-5 h-5 object-contain invert"
            />
          </div>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-20 right-0 mx-4 my-2 p-8 bg-[#050507]/95 backdrop-blur-2xl rounded-[2rem] z-[999] min-w-[240px] border border-white/10 shadow-2xl flex flex-col gap-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] text-orange-500/80 font-medium uppercase tracking-[3px]">Menu</span>
                </div>

                <ul className="list-none flex flex-col gap-6 w-full">
                  {navLinks.map((link) => (
                    <li
                      key={link.id}
                      className={`${active === link.title ? "text-orange-500 pl-2 border-l-2 border-orange-500" : "text-white/60 hover:text-white pl-2 border-l-2 border-transparent"} text-[14px] font-medium uppercase tracking-widest cursor-pointer transition-all duration-300`}
                    >
                      {link.path ? (
                        <Link 
                          to={link.path}
                          onClick={() => {
                            setActive(link.title);
                            setToggle(!toggle);
                          }}
                          className="block w-full"
                        >
                          {link.title}
                        </Link>
                      ) : (
                        <a 
                          href={`#${link.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setToggle(!toggle);
                            if (window.location.pathname !== '/') {
                              window.location.href = `/#${link.id}`;
                            } else {
                              setActive(link.title);
                              document.querySelector(`#${link.id}`)?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="block w-full"
                        >
                          {link.title}
                        </a>
                      )}
                    </li>
                  ))}

                  <li className="w-full pt-6 mt-2 border-t border-white/10">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        setToggle(!toggle);
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="flex items-center justify-center w-full py-3 rounded-xl bg-orange-500 text-black text-[12px] font-bold uppercase tracking-widest transition-all duration-300"
                    >
                      Contact Me
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
