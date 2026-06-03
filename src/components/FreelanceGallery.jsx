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
  { src: aqsaLogo, alt: "Aqsa Motors brand logo design by Rusaith — graphic designer Colombo Sri Lanka", removeWhiteBg: true },
  { src: fcLogo, alt: "FC food industry branding and logo designed by MIM Rusaith", removeWhiteBg: false },
  { src: scLogo, alt: "SC corporate brand logo design by Rusaith — freelance designer Colombo Sri Lanka", removeWhiteBg: false },
  { src: abeeLogo, alt: "Abee premium white minimal logo design by MIM Rusaith", removeWhiteBg: false },
  { src: mlbLogo, alt: "MLB modern typography logo designed by Rusaith, Sri Lanka", removeWhiteBg: false },
  { src: standardLogo, alt: "Standard luxury logo design by Rusaith — graphic designer Colombo Sri Lanka", removeWhiteBg: false },
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
