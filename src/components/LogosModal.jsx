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
      { src: aqsaLogo, alt: "Aqsa Motors brand logo design by Rusaith — graphic designer Colombo Sri Lanka", type: "Automotive", removeBg: false },
      { src: fcLogo, alt: "FC food industry branding and logo designed by MIM Rusaith", type: "Brand Identity", removeBg: false },
      { src: scLogo, alt: "SC corporate brand logo design by Rusaith — freelance designer Colombo", type: "Brand Identity", removeBg: false },
      { src: abeeLogo, alt: "Abee premium white minimal logo design by MIM Rusaith", type: "Corporate", removeBg: false },
      { src: alaanaLogo, alt: "Alaana Distributor brand logo design by Rusaith, Sri Lanka", type: "Distributor Brand", removeBg: false },
      { src: karangkalLogo, alt: "Karangkal brand logo designed by Rusaith — graphic designer Colombo", type: "Brand Identity", removeBg: false },
      { src: mlbLogo, alt: "MLB Transport logistics corporate logo design by Rusaith", type: "Transport Brand", removeBg: false },
      { src: standardLogo, alt: "MLB Stationery corporate logo brand kit designed by Rusaith", type: "Stationery Brand", removeBg: false },
    ],
  },
  {
    id: "branding",
    label: "Branding",
    count: 2,
    items: [
      { src: brandingMock, alt: "Infinity Allianze brand logo mockup design by Rusaith", type: "Brand Mockup", removeBg: false },
      { src: brandingPresentation, alt: "Infinity Allianze brand identity presentation by MIM Rusaith", type: "Brand Presentation", removeBg: false },
    ],
  },
  {
    id: "posters",
    label: "Posters",
    count: 5,
    items: [
      { src: posterBottle, alt: "Bottle sale promotional poster designed by MIM Rusaith", type: "Product Ad", removeBg: false },
      { src: posterChest, alt: "Chest sling bag advertising poster by Rusaith — designer Colombo", type: "Product Ad", removeBg: false },
      { src: posterLaptop, alt: "Laptop bag commercial poster designed by MIM Rusaith", type: "Product Ad", removeBg: false },
      { src: posterTravel, alt: "Travelling bag travel gear poster design by Rusaith, Sri Lanka", type: "Product Ad", removeBg: false },
      { src: posterSide, alt: "Side bag product poster design by Rusaith — graphic designer Colombo", type: "Product Ad", removeBg: false },
    ],
  },
  {
    id: "invitations",
    label: "Invitations",
    count: 3,
    items: [
      { src: inviteWedding, alt: "E-Wedding digital invitation card designed by MIM Rusaith", type: "Wedding", removeBg: false },
      { src: inviteCard, alt: "Creative greeting and invitation card designed by Rusaith", type: "Card", removeBg: false },
      { src: inviteRamadan, alt: "Ramadan Mubarak seasonal invitation card designed by MIM Rusaith", type: "Seasonal", removeBg: false },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    count: 2,
    items: [
      { src: menu1, alt: "Restaurant menu card design by Rusaith — graphic designer Colombo", type: "Food & Beverage", removeBg: false },
      { src: menu2, alt: "Food and beverage menu brochure designed by MIM Rusaith", type: "Food & Beverage", removeBg: false },
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
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-7xl h-[92vh] bg-[#050507] rounded-[2.5rem] overflow-hidden border border-white/10 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-8 border-b border-white/5 bg-white/[0.02] flex-shrink-0">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                  <FiLayers className="text-white/80 text-2xl" />
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-medium uppercase tracking-[4px] mb-1">Creative Archive</p>
                  <h3 className="text-white text-2xl md:text-3xl font-light tracking-wide">Freelance Works</h3>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-widest hidden md:block">
                  © Protected · {totalCount} Assets
                </span>
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-white/60 hover:text-white"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex items-center gap-2 px-5 md:px-8 py-4 border-b border-white/5 bg-white/[0.01] overflow-x-auto flex-shrink-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-3 px-5 py-2.5 rounded-xl text-[11px] font-medium uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === cat.id
                      ? "text-black bg-white shadow-lg"
                      : "text-white/40 hover:text-white/80 bg-white/5 hover:bg-white/10"
                    }`}
                >
                  {cat.label}
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-mono ${activeTab === cat.id ? "bg-black/10 text-black/60" : "bg-white/10 text-white/40"}`}>
                    {cat.id === "all" ? totalCount : cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Grid */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto p-5 md:p-8 modal-scroll">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`grid gap-6 ${activeTab === "logos"
                      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    }`}
                >
                  {currentItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex flex-col gap-3 group"
                    >
                      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
                        <ImageProtector
                          src={item.src}
                          alt={item.alt}
                          removeWhiteBg={item.removeBg}
                          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${activeTab === "logos" ? "h-[180px]" : "h-[260px]"}`}
                        />
                      </div>
                      <div className="flex items-center justify-between px-2">
                        <span className="text-white/80 text-[12px] font-medium tracking-wide truncate">{item.alt}</span>
                        <span className="text-[9px] text-white/40 font-mono uppercase tracking-widest flex-shrink-0 ml-3">
                          {item.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Footer */}
              <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">
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
