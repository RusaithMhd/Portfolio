import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ImageProtector from "./ImageProtector";
import { FiX, FiLayers, FiGrid } from "react-icons/fi";

// --- Logos ---
import aqsaLogo from "../assets/Works/freelance-logo/AQSA MOTORS LOGO-01.jpg";
import fcLogo from "../assets/Works/freelance-logo/FC-01.png";
import scLogo from "../assets/Works/freelance-logo/SC-01.png";
import abeeLogo from "../assets/Works/freelance-logo/abee white-01.png";
import mlbLogo from "../assets/Works/freelance-logo/mlb-02.png";
import standardLogo from "../assets/Works/freelance-logo/logo.png";
import alaanaLogo from "../assets/Works/freelance-logo/Alaana DIstributor-02.jpg";
import karangkalLogo from "../assets/Works/freelance-logo/Karangkal.png";
// --- Branding ---
import brandingMock from "../assets/Works/Branding/Infinity Allianze Logo mock.jpg";
import brandingPresentation from "../assets/Works/Branding/Infinity Allianze Logo presentation-01.jpg";

// --- Posters ---
import posterBottle from "../assets/Works/Freelance-posters/BOTTLE SALE.jpg";
import posterChest from "../assets/Works/Freelance-posters/CHEST SLING BAG.jpg";
import posterLaptop from "../assets/Works/Freelance-posters/LAPTOP BAG.jpg";
import posterTravel from "../assets/Works/Freelance-posters/TRAVELLING BAG.jpg";
import posterSide from "../assets/Works/Freelance-posters/side bag.jpg";

// --- Invitations ---
import inviteWedding from "../assets/Works/Invitations/E - Wedding invitation.jpg";
import inviteCard from "../assets/Works/Invitations/jkkjk.jpg";
import inviteRamadan from "../assets/Works/Invitations/m024t0323_c_ramadan_29jan23.jpg";

// --- Menu ---
import menu1 from "../assets/Works/Menu/menu-01.jpg";
import menu2 from "../assets/Works/Menu/menu-02.jpg";

const categories = [
  {
    id: "all",
    label: "All",
    count: 18,
  },
  {
    id: "logos",
    label: "Logos",
    count: 8,
    items: [
      { src: aqsaLogo, alt: "Aqsa Motors Logo", type: "Automotive", removeBg: false },
      { src: fcLogo, alt: "FC Logo", type: "Brand Identity", removeBg: false },
      { src: scLogo, alt: "SC Logo", type: "Brand Identity", removeBg: false },
      { src: abeeLogo, alt: "Abee White Logo", type: "Corporate", removeBg: false },
      { src: alaanaLogo, alt: "Alaana Distributor", type: "Distributor Brand", removeBg: false },
      { src: karangkalLogo, alt: "Karangkal", type: "Brand Identity", removeBg: false },
      { src: mlbLogo, alt: "MLB Transport", type: "Transport Brand", removeBg: false },
      { src: standardLogo, alt: "MLB Stationery", type: "Stationery Brand", removeBg: false },
    ],
  },
  {
    id: "branding",
    label: "Branding",
    count: 2,
    items: [
      { src: brandingMock, alt: "Infinity Allianze Mock", type: "Brand Mockup", removeBg: false },
      { src: brandingPresentation, alt: "Infinity Allianze Presentation", type: "Brand Presentation", removeBg: false },
    ],
  },
  {
    id: "posters",
    label: "Posters",
    count: 5,
    items: [
      { src: posterBottle, alt: "Bottle Sale Poster", type: "Product Ad", removeBg: false },
      { src: posterChest, alt: "Chest Sling Bag", type: "Product Ad", removeBg: false },
      { src: posterLaptop, alt: "Laptop Bag Poster", type: "Product Ad", removeBg: false },
      { src: posterTravel, alt: "Travelling Bag Poster", type: "Product Ad", removeBg: false },
      { src: posterSide, alt: "Side Bag Poster", type: "Product Ad", removeBg: false },
    ],
  },
  {
    id: "invitations",
    label: "Invitations",
    count: 3,
    items: [
      { src: inviteWedding, alt: "E-Wedding Invitation", type: "Wedding", removeBg: false },
      { src: inviteCard, alt: "Invitation Card", type: "Card", removeBg: false },
      { src: inviteRamadan, alt: "Ramadan Invitation", type: "Seasonal", removeBg: false },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    count: 2,
    items: [
      { src: menu1, alt: "Menu Design 01", type: "Food & Beverage", removeBg: false },
      { src: menu2, alt: "Menu Design 02", type: "Food & Beverage", removeBg: false },
    ],
  },
];

// Flatten all for "All" tab
const allItems = categories
  .filter((c) => c.id !== "all")
  .flatMap((c) => c.items);

const LogosModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("all");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentItems =
    activeTab === "all"
      ? allItems
      : categories.find((c) => c.id === activeTab)?.items || [];

  const totalCount = allItems.length;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/95 backdrop-blur-3xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-7xl h-[92vh] glass-card rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#080808] flex flex-col shadow-[0_0_100px_rgba(0,0,0,1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-8 border-b border-white/5 bg-black/40 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/5 border border-accent-cyan/20 flex items-center justify-center">
                  <FiLayers className="text-accent-cyan text-xl" />
                </div>
                <div>
                  <p className="text-[9px] text-accent-cyan/60 font-black uppercase tracking-[4px] mb-0.5">Creative Archive</p>
                  <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter">Freelance Works</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[9px] text-white/20 font-mono uppercase tracking-widest hidden md:block">
                  © Protected · {totalCount} Assets
                </span>
                <button
                  onClick={onClose}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all border border-white/10 text-white/60 hover:text-white"
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex items-center gap-1 px-4 md:px-8 py-3 border-b border-white/5 bg-black/20 overflow-x-auto flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-[2px] whitespace-nowrap transition-all ${activeTab === cat.id
                      ? "text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20"
                      : "text-white/30 hover:text-white/60 border border-transparent"
                    }`}
                >
                  {cat.label}
                  <span className={`text-[8px] px-1.5 py-0.5 rounded-sm font-mono ${activeTab === cat.id ? "bg-accent-cyan/20 text-accent-cyan" : "bg-white/5 text-white/20"}`}>
                    {cat.id === "all" ? totalCount : cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-4 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`grid gap-5 ${activeTab === "logos"
                      ? "grid-cols-2 sm:grid-cols-3"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col gap-2"
                    >
                      <ImageProtector
                        src={item.src}
                        alt={item.alt}
                        removeWhiteBg={item.removeBg}
                        className={`w-full ${activeTab === "logos" ? "h-[160px]" : "h-[220px]"}`}
                      />
                      <div className="flex items-center justify-between px-1">
                        <span className="text-white/60 text-[10px] font-black uppercase tracking-wider truncate">{item.alt}</span>
                        <span className="text-[8px] text-accent-cyan/50 font-mono uppercase tracking-widest bg-accent-cyan/5 border border-accent-cyan/10 px-2 py-0.5 rounded-sm flex-shrink-0 ml-2">
                          {item.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                <p className="text-[9px] text-white/20 font-mono uppercase tracking-[3px]">
                  All assets protected · Right-click & download disabled
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default LogosModal;
