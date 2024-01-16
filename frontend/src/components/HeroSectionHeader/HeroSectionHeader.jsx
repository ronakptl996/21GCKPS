import React from "react";
import "./HeroSectionHeader.css";

const HeroSectionHeader = ({ heading, paragraph }) => {
  return (
    <section className="hero-section-header">
      <section className="hero-section-header-inner">
        <h2>{heading}</h2>
        <p>{paragraph}</p>
      </section>
    </section>
  );
};

export default HeroSectionHeader;
