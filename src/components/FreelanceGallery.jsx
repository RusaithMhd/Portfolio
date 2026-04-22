import React from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { textVariant, fadeIn } from "../utils/motion";
import { styles } from "../styles";
import ImageProtector from "./ImageProtector";

// Import all logos from the freelance folder
import aqsaLogo from "../assets/Works/freelance-logo/AQSA MOTORS LOGO-01.jpg";
import fcLogo from "../assets/Works/freelance-logo/FC-01.png";
import scLogo from "../assets/Works/freelance-logo/SC-01.png";
import abeeLogo from "../assets/Works/freelance-logo/abee white-01.png";
import mlbLogo from "../assets/Works/freelance-logo/mlb-02.png";
import standardLogo from "../assets/Works/freelance-logo/logo.png";

const freelanceLogos = [
  { src: aqsaLogo, alt: "Aqsa Motors Logo", removeWhiteBg: true },
  { src: fcLogo, alt: "FC Logo", removeWhiteBg: false },
  { src: scLogo, alt: "SC Logo", removeWhiteBg: false },
  { src: abeeLogo, alt: "Abee Logo", removeWhiteBg: false },
  { src: mlbLogo, alt: "MLB Logo", removeWhiteBg: false },
  { src: standardLogo, alt: "Standard Logo", removeWhiteBg: false },
];

const FreelanceGallery = () => {
  return (
    <div className="flex flex-col gap-10">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My commercial assets</p>
        <h2 className={styles.sectionHeadText}>Freelance Logos.</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelanceLogos.map((logo, index) => (
          <motion.div 
            key={index} 
            variants={fadeIn("up", "spring", index * 0.1, 0.75)}
            className="w-full h-[250px]"
          >
            <ImageProtector 
              src={logo.src} 
              alt={logo.alt} 
              removeWhiteBg={logo.removeWhiteBg}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(FreelanceGallery, "freelance");
