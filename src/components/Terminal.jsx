import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo, experiences, projects } from "../constants";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: `Welcome to ${personalInfo.name}'s Portfolio OS v2.9.0` },
    { type: "system", content: 'Type "help" to see available commands.' },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: "Available commands: about, projects, contact, clear, skills, exp, bio",
    about: personalInfo.about,
    projects: `I have ${projects.length} featured projects. Some include: ${projects.map(p => p.name).join(", ")}.`,
    contact: `Email: ${personalInfo.email} | LinkedIn: /in/rusaith | GitHub: @rusaith`,
    skills: "React, JavaScript, Tailwind, Photoshop, Illustrator, Odoo ERP, IT Support",
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
        response = `Command not found: ${cmd}. Type "help" for options.`;
        setHistory([...history, { type: "user", content: input }, { type: "system", content: response }]);
      }

      setInput("");
    }
  };

  return (
    <div className="w-full glass-morphism rounded-xl overflow-hidden border border-white/5 shadow-2xl font-mono text-sm">
      <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-accent-purple/40" />
          <div className="w-3 h-3 rounded-full bg-accent-cyan/40" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
        </div>
        <span className="text-white/20 text-[10px] ml-2">rusaith@cyber-core: ~</span>
      </div>

      <div
        ref={scrollRef}
        className="p-4 h-[300px] overflow-y-auto custom-scrollbar bg-black/40"
      >
        {history.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === "user" ? (
              <div className="flex gap-2">
                <span className="text-accent-cyan drop-shadow-neon-cyan">➜</span>
                <span className="text-white-100">{line.content}</span>
              </div>
            ) : (
              <div className="text-secondary leading-relaxed">{line.content}</div>
            )}
          </div>
        ))}
        <div className="flex gap-2 items-center">
          <span className="text-accent-cyan drop-shadow-neon-cyan animate-pulse">➜</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none text-white w-full"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
