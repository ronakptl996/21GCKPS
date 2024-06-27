import React from "react";
import "./index.css";
import HeroSectionHeader from "../HeroSectionHeader/HeroSectionHeader";
import CommitteeTable from "../CommitteeTable";

const Committee = ({ header }) => {
  return (
    <section className="">
      <HeroSectionHeader heading={header} />
      <section className="committee-wrapper">
        <div className="committee-card-wrapper">
          <CommitteeTable key={header} />
        </div>
      </section>
    </section>
  );
};

export default Committee;
