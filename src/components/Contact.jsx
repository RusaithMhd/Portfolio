import React, { useRef, useState } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn, fadeIn, textVariant } from "../utils/motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { publicUrls, personalInfo } from "../constants";
import Modal from "./Modal";
import MagneticButton from "./MagneticButton";
import CyberNetwork from "./CyberNetwork";

import { 
  FiLinkedin, 
  FiGithub, 
  FiInstagram, 
  FiMail, 
  FiPhone, 
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiZap
} from "react-icons/fi";

const ContactCard = ({ icon: Icon, title, value, onClick }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.5, 0.75)}
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="relative p-[1px] rounded-xl overflow-hidden group cursor-pointer"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/0 via-accent-cyan/40 to-accent-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative glass-card p-6 flex flex-col items-center justify-center gap-4 bg-black/60 border border-white/5 rounded-xl h-full">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/5 group-hover:border-accent-cyan/40 transition-colors shadow-xl">
        <Icon className="text-xl text-white/40 group-hover:text-accent-cyan transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-[9px] text-white/30 font-mono uppercase tracking-[3px] mb-2">{title}</p>
        <p className="text-white font-bold uppercase tracking-widest text-xs group-hover:text-white/90 transition-colors">{value}</p>
      </div>
    </div>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    buttonText: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.name || !form.email || !form.message) {
      setModalContent({
        title: "Missing Information",
        message: "Please fill out all fields before sending your message.",
        buttonText: "Try Again",
      });
      setIsModalVisible(true);
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      const whatsappMessage = `
*Hello Mr. Rusaith I found You in your Portfolio*
*I want to contact you !!!*
   
    *Name:*    ${form.name}
    *Email:*   ${form.email}
    *Message:* ${form.message}

Reply Soon as Possible :)
  `;
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/94770802365?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      setForm({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="relative flex flex-col gap-10">
      
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Reach out for collaborations</p>
        <h2 className={styles.sectionHeadText}>Terminal Contact.</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <ContactCard 
          icon={FiMail} 
          title="Direct Mail" 
          value={personalInfo.email} 
          onClick={() => window.location.href = `mailto:${personalInfo.email}`}
        />
        <ContactCard 
          icon={FiMessageSquare} 
          title="Quick Chat" 
          value="WhatsApp Direct" 
          onClick={() => window.open(`https://wa.me/94770802365`, "_blank")}
        />
        <ContactCard 
          icon={FiLinkedin} 
          title="Network" 
          value="Connect on LinkedIn" 
          onClick={() => window.open(publicUrls.socialProfiles.linkedin.link, "_blank")}
        />
      </div>

      <div className="lg:flex-row flex flex-col-reverse gap-8 overflow-hidden mt-8">
        
        {/* Terminal Form Window */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="lg:flex-[1.2] flex-[1] rounded-2xl overflow-hidden border border-white/10 bg-[#050505] shadow-2xl relative"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-500/50" />
            </div>
            <div className="flex items-center gap-2">
              <FiZap className="text-accent-cyan/50 text-[10px]" />
              <span className="text-[10px] font-mono text-white/40 tracking-[2px]">root@rusaith:~</span>
            </div>
          </div>

          <div className="p-8 md:p-12 relative">
            {/* Terminal Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            {/* Console Output Header */}
            <div className="mb-10 font-mono text-xs text-white/50 space-y-1">
              <p>{`> SYSTEM_READY`}</p>
              <p>{`> SECURE_CONNECTION_ESTABLISHED`}</p>
              <p className="text-accent-cyan animate-pulse">{`> WAITING FOR USER INPUT_`}</p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-8 relative z-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <span className={`block text-[10px] font-mono uppercase tracking-[2px] transition-all duration-300 mb-2 ${focusedField === 'name' ? 'text-accent-cyan' : 'text-white/40'}`}>
                    Your Name
                  </span>
                  <div className="flex items-center border-b border-white/10 group-hover:border-white/30 transition-colors">
                    <span className="text-accent-cyan/50 font-mono mr-2">{`>`}</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className="w-full bg-transparent py-3 text-white font-mono text-sm outline-none placeholder:text-white/20"
                    />
                  </div>
                  {focusedField === 'name' && (
                    <motion.div layoutId="input-glow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-cyan shadow-neon-cyan" />
                  )}
                </div>

                <div className="relative group">
                  <span className={`block text-[10px] font-mono uppercase tracking-[2px] transition-all duration-300 mb-2 ${focusedField === 'email' ? 'text-accent-purple' : 'text-white/40'}`}>
                    Your Email
                  </span>
                  <div className="flex items-center border-b border-white/10 group-hover:border-white/30 transition-colors">
                    <span className="text-accent-purple/50 font-mono mr-2">{`>`}</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      className="w-full bg-transparent py-3 text-white font-mono text-sm outline-none placeholder:text-white/20"
                    />
                  </div>
                  {focusedField === 'email' && (
                    <motion.div layoutId="input-glow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-purple shadow-neon-purple" />
                  )}
                </div>
              </div>

              <div className="relative group mt-4">
                <span className={`block text-[10px] font-mono uppercase tracking-[2px] transition-all duration-300 mb-2 ${focusedField === 'message' ? 'text-accent-cyan' : 'text-white/40'}`}>
                  Your Message
                </span>
                <div className="flex items-start border border-white/5 rounded-lg bg-white/[0.01] p-4 group-hover:border-white/20 transition-colors focus-within:border-accent-cyan/50 focus-within:bg-accent-cyan/[0.02]">
                  <span className="text-accent-cyan/50 font-mono mr-3 mt-1">{`>`}</span>
                  <textarea
                    rows={5}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Hello, I'd like to talk about..."
                    className="w-full bg-transparent text-white font-mono text-sm outline-none placeholder:text-white/20 resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Status Bar / Execute Area */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <MagneticButton 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full md:w-auto !bg-transparent border border-accent-cyan text-accent-cyan hover:!bg-accent-cyan hover:text-black uppercase font-mono font-bold tracking-widest !px-8 !py-3 hover:shadow-neon-cyan transition-all flex items-center justify-center gap-3 group disabled:opacity-50 text-xs"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <FiSend className="animate-bounce" /> SENDING...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                      </span>
                    )}
                  </MagneticButton>
                </div>

                {/* Server Diagnostics */}
                <div className="flex items-center gap-6 text-[9px] font-mono uppercase tracking-widest text-white/30 hidden md:flex">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    <span>Secure Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${form.name && form.email && form.message ? "bg-green-500" : "bg-white/10"}`} />
                    <span>Ready to Send</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* 3D Globe Container */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="lg:flex-1 xl:h-auto md:h-[650px] h-[400px] glass-card rounded-2xl overflow-hidden border border-white/5 bg-black/40 relative group"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          <EarthCanvas />
          
          {/* Globe Overlay HUD - Left */}
          <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 uppercase tracking-widest pointer-events-none">
            <p>Location: Global</p>
            <p>Node: Earth_Server_1</p>
          </div>

        </motion.div>
      </div>
      
      {isModalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          buttonText={modalContent.buttonText}
          isError={true}
          setIsModalVisible={() => setIsModalVisible(false)}
        />
      )}
    </div>
  );
};

export default SectionWrapper(Contact, "contact");

