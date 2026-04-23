import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { Link } from "react-router-dom";
import { close, menu, rusaith } from "../assets";
import {
  navLinks,
  navigationPaths,
  personalInfo,
} from "../constants";

const ScrambleText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text);
  const symbols = "@#$%&*01<>{}[]-_+";

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startScramble = () => {
      clearInterval(interval);
      iteration = 0;

      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return symbols[Math.floor(Math.random() * symbols.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    };

    const timeout = setTimeout(startScramble, delay * 1000);
    const repeatInterval = setInterval(startScramble, 15000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
      clearInterval(repeatInterval);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

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
      className={`${styles.paddingX} w-full flex items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3 bg-primary/40 backdrop-blur-lg border-b border-white/10" : "py-5 bg-transparent"
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
          <div className="relative w-12 h-12 flex justify-center items-center rounded-xl glass border-accent-cyan/10 group-hover:bg-accent-cyan/10 transition-all duration-300 shadow-neon-cyan overflow-hidden">
            <ScrambleText text="R" className="bg-cyber-gradient bg-clip-text text-transparent font-black text-2xl tracking-tighter z-10" />
            <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col">
            <div className="text-white-100 text-[16px] font-black tracking-tighter uppercase leading-tight group-hover:text-accent-cyan transition-all flex items-center">
              <span>MIM</span>
              <span className="ml-1 flex items-center">
                <ScrambleText text="R" className="text-accent-cyan font-serif" delay={0.2} />
                <ScrambleText text="USAITH" delay={0.4} />
              </span>
            </div>
            <span className="text-accent-cyan/40 text-[9px] font-bold tracking-[3px] uppercase">
              Operational.
            </span>
          </div>
        </Link>

        <ul className="list-none hidden md:flex flex-row gap-8">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${active === link.title ? "text-accent-cyan" : "text-secondary"
                } text-[15px] font-semibold uppercase tracking-wider cursor-pointer hover:text-accent-cyan transition-colors duration-300 relative group`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-accent-cyan shadow-neon-cyan transition-all duration-300 ${active === link.title ? "w-full" : "w-0 group-hover:w-full"}`} />
            </li>
          ))}

          <li className="ml-4">
            <a
              href="#contact"
              className="px-6 py-2 glass rounded-full text-sm font-black hover:bg-accent-cyan/10 transition-all duration-300 border-accent-cyan/20 shadow-neon-cyan bg-cyber-gradient bg-clip-text text-transparent hover:border-accent-cyan/40"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <div className="md:hidden flex justify-end items-center">
          <div
            className="w-10 h-10 flex items-center justify-center glass rounded-xl cursor-pointer border border-white/5"
            onClick={() => setToggle(!toggle)}
          >
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-6 h-6 object-contain"
            />
          </div>

          <div
            className={`${!toggle ? "hidden" : "flex"} absolute top-20 right-0 mx-4 my-2 p-8 bg-[#050505] rounded-[2rem] z-[999] min-w-[240px] border border-accent-cyan/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex-col gap-6`}
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className="text-[10px] text-white/40 font-black uppercase tracking-[3px]">Navigation_Uplink</span>
            </div>

            <ul className="list-none flex flex-col gap-6 w-full">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${active === link.title ? "text-accent-cyan pl-2 border-l-2 border-accent-cyan" : "text-secondary hover:text-white pl-2 border-l-2 border-transparent"} text-[14px] font-black uppercase tracking-widest cursor-pointer transition-all duration-300`}
                  onClick={() => {
                    setActive(link.title);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}

              <li className="w-full pt-6 mt-2 border-t border-white/5">
                <a
                  href="#contact"
                  onClick={() => setToggle(!toggle)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-white/5 border border-white/10 text-accent-cyan text-[12px] font-black uppercase tracking-widest hover:bg-accent-cyan/10 hover:border-accent-cyan/30 transition-all duration-300 shadow-neon-cyan"
                >
                  Initialize Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
