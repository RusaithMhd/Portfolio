import React, { useRef, useState, useEffect } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn, fadeIn, textVariant } from "../utils/motion";
import { EarthCanvas } from "./canvas";
import { publicUrls, personalInfo } from "../constants";
import Modal from "./Modal";
import MagneticButton from "./MagneticButton";

import { 
  FiMail, 
  FiMessageSquare, 
  FiLinkedin, 
  FiInstagram, 
  FiFacebook, 
  FiGithub,
  FiSend
} from "react-icons/fi";

const ContactCard = ({ icon: Icon, title, value, onClick }) => (
  <motion.div
    variants={fadeIn("up", "spring", 0.5, 0.75)}
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="relative p-[1px] rounded-[2rem] overflow-hidden group cursor-pointer"
  >
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-4 bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[2rem] h-full shadow-2xl backdrop-blur-md">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-orange-500/50 transition-all shadow-xl">
        <Icon className="text-xl md:text-2xl text-white/50 group-hover:text-orange-500 transition-colors" />
      </div>
      <div className="text-center mt-1">
        <p className="text-[8px] md:text-[10px] text-white/50 uppercase tracking-[1px] md:tracking-[3px] mb-1 font-medium">{title}</p>
        <p className="hidden md:block text-xs md:text-sm text-white/90 font-medium truncate max-w-[150px]">{value}</p>
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

  // Listen to dynamic Inquiry events to auto-populate service values
  useEffect(() => {
    const handleInquiry = (e) => {
      const serviceName = e.detail?.service;
      if (serviceName) {
        setForm((prev) => ({
          ...prev,
          message: `Hi Rusaith, I'm interested in inquiring about your "${serviceName}" services. Let's collaborate on this!`,
        }));
      }
    };
    window.addEventListener("inquire-service", handleInquiry);
    return () => window.removeEventListener("inquire-service", handleInquiry);
  }, []);
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

    const whatsappMessage = `*Hello Mr. Rusaith I found You in your Portfolio*
*I want to contact you !!!*
   
*Name:* ${form.name}
*Email:* ${form.email}
*Message:* ${form.message}

Reply Soon as Possible :)`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/94770802365?text=${encodedMessage}`;

    // Direct synchronous execution to bypass mobile popup blockers
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = whatsappUrl;
    } else {
      window.open(whatsappUrl, "_blank");
    }

    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="relative flex flex-col gap-10">
      
      <motion.div variants={textVariant()} className="flex flex-col items-center md:items-start text-center md:text-left">
        <p className="text-[12px] uppercase tracking-[0.3em] text-orange-500/80 font-medium mb-4">Let's Connect</p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-[1.1] text-white">
          Let's Work <span className="font-semibold text-orange-500 italic">Together</span>
        </h2>
        <h1 className="sr-only">Hire a Freelance Developer & Designer in Sri Lanka</h1>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
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
        <ContactCard 
          icon={FiInstagram} 
          title="Lifestyle" 
          value="Follow on Instagram" 
          onClick={() => window.open(publicUrls.socialProfiles.instagram.link, "_blank")}
        />
        <ContactCard 
          icon={FiFacebook} 
          title="Community" 
          value="Connect on Facebook" 
          onClick={() => window.open(publicUrls.socialProfiles.facebook.link, "_blank")}
        />
        <ContactCard 
          icon={FiGithub} 
          title="Repositories" 
          value="View on GitHub" 
          onClick={() => window.open(publicUrls.socialProfiles.github.link, "_blank")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-stretch">
        
        {/* Left Side: Strategic Hub (Socials & Info) */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full">
          <motion.div 
            variants={slideIn("left", "tween", 0.1, 1)}
            className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group shadow-2xl h-full flex flex-col"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FiMessageSquare className="text-6xl text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Strategic Hub</h3>
            <p className="text-white/50 text-xs font-light leading-relaxed mb-8">
              Available for high-impact collaborations and technical leadership opportunities globally.
            </p>
            
            <div className="flex flex-col gap-4 flex-1">
              {[
                { icon: FiMail, label: "Email", value: personalInfo.email, link: `mailto:${personalInfo.email}` },
                { icon: FiLinkedin, label: "LinkedIn", value: "Connect with me", link: publicUrls.socialProfiles.linkedin.link },
                { icon: FiGithub, label: "GitHub", value: "Review Code", link: publicUrls.socialProfiles.github.link }
              ].map((item, i) => (
                <div 
                  key={i}
                  onClick={() => window.open(item.link, "_blank")}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all cursor-pointer group/item"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 group-hover/item:bg-orange-500 group-hover/item:text-black transition-all">
                    <item.icon className="text-lg" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-white/40 uppercase tracking-widest">{item.label}</span>
                    <span className="text-[11px] text-white/80 font-medium truncate max-w-[150px]">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center px-2">
              <div className="flex gap-4">
                <FiInstagram onClick={() => window.open(publicUrls.socialProfiles.instagram.link, "_blank")} className="text-white/40 hover:text-orange-500 cursor-pointer transition-colors" />
                <FiFacebook onClick={() => window.open(publicUrls.socialProfiles.facebook.link, "_blank")} className="text-white/40 hover:text-orange-500 cursor-pointer transition-colors" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] text-white/40 uppercase tracking-widest">Active Status</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Message Portal (Form) */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="lg:col-span-8 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl relative backdrop-blur-md h-full"
        >
          {/* Neural HUD Glow Background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="p-8 md:p-10 relative h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-orange-500/80 font-medium">Message Portal</p>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <span className={`block text-[11px] uppercase tracking-[2px] transition-all duration-300 mb-3 font-medium ${focusedField === 'name' ? 'text-orange-500' : 'text-white/40'}`}>
                    Full Name
                  </span>
                  <div className="flex items-center border-b border-white/10 group-hover:border-white/30 transition-colors pb-2">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your name"
                      className="bg-transparent py-2 px-0 outline-none w-full text-white placeholder:text-white/10 font-light tracking-wide transition-all"
                      required
                    />
                  </div>
                  {focusedField === 'name' && (
                    <motion.div layoutId="input-glow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  )}
                </div>

                <div className="relative group">
                  <span className={`block text-[11px] uppercase tracking-[2px] transition-all duration-300 mb-3 font-medium ${focusedField === 'email' ? 'text-orange-500' : 'text-white/40'}`}>
                    Email Address
                  </span>
                  <div className="flex items-center border-b border-white/10 group-hover:border-white/30 transition-colors pb-2">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@company.com"
                      className="bg-transparent py-2 px-0 outline-none w-full text-white placeholder:text-white/10 font-light tracking-wide transition-all"
                      required
                    />
                  </div>
                  {focusedField === 'email' && (
                    <motion.div layoutId="input-glow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  )}
                </div>
              </div>

              <div className="relative group">
                <span className={`block text-[11px] uppercase tracking-[2px] transition-all duration-300 mb-3 font-medium ${focusedField === 'message' ? 'text-orange-500' : 'text-white/40'}`}>
                  Project Inquiry
                </span>
                <div className="relative rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-white/20 transition-all p-4">
                  <textarea
                    rows={6}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Describe your vision or inquiry here..."
                    className="bg-transparent outline-none w-full text-white placeholder:text-white/10 font-light tracking-wide resize-none"
                    required
                  />
                  {focusedField === 'message' && (
                    <motion.div layoutId="input-glow" className="absolute bottom-0 left-0 right-0 h-[1px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <MagneticButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-orange-500 text-black hover:scale-105 uppercase font-bold tracking-widest !px-12 !py-4 rounded-full transition-all flex items-center justify-center gap-3 group disabled:opacity-50 text-xs shadow-[0_0_20px_rgba(249,115,22,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Initializing...
                    </span>
                  ) : (
                    <>
                      Execute Mission <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </MagneticButton>
              </div>
            </form>
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

