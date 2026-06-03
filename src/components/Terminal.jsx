import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo, experiences, projects } from "../constants";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: `Welcome to ${personalInfo.brandName} Directory.` },
    { type: "system", content: 'Type "help" to explore available categories.' },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: "Categories: about, projects, contact, clear, skills, exp, bio",
    about: personalInfo.about,
    projects: `I have ${projects.length} featured projects. Some include: ${projects.map(p => p.name).join(", ")}.`,
    contact: `Email: ${personalInfo.email} | LinkedIn: /in/rusaith | GitHub: @rusaith`,
    skills: "React, JavaScript, Tailwind, Odoo ERP, Python, PostgreSQL, XML, Photoshop, Illustrator, IT Support",
    exp: `Currently Graphic Designer cum IT Executive at ChillFrost. Previously Web Developer at IMSS and Digital Marketing Asst at Food Champ.`,
    bio: `Currently working as a ${personalInfo.role}. Expert in bridging Graphic Design and Web Development.`,
    clear: "CLEAR",
  };

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.toLowerCase().trim();
      let response = "";

      if (cmd === "clear") {
        setHistory([]);
      } else if (commands[cmd]) {
        response = commands[cmd];
        setHistory([...history, { type: "user", content: input }, { type: "system", content: response }]);
      } else if (cmd !== "") {
        response = `Item not found: ${cmd}. Type "help" for options.`;
        setHistory([...history, { type: "user", content: input }, { type: "system", content: response }]);
      }

      setInput("");
    }
  };

  return (
    <div className="w-full bg-[#050507] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm">
      <div className="bg-white/5 px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
        </div>
        <span className="text-white/30 text-[10px] uppercase tracking-widest ml-2 font-medium">Interactive Console</span>
      </div>

      <div
        ref={scrollRef}
        className="p-5 h-[300px] overflow-y-auto modal-scroll bg-[#050507]"
      >
        {history.map((line, i) => (
          <div key={i} className="mb-3">
            {line.type === "user" ? (
              <div className="flex gap-3">
                <span className="text-white/40">›</span>
                <span className="text-white tracking-wide">{line.content}</span>
              </div>
            ) : (
              <div className="text-white/60 leading-relaxed font-light">{line.content}</div>
            )}
          </div>
        ))}
        <div className="flex gap-3 items-center mt-2">
          <span className="text-white/40 animate-pulse">›</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-white w-full tracking-wide focus:ring-0"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
