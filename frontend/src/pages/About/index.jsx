import React from "react";
import "./index.css";
import visionImg from "../../assets/images/vision.png";
import missionImg from "../../assets/images/mission-icon.png";
import sharedVision from "../../assets/images/shared-vision.png";

const About = () => {
  return (
    <section className="about">
      <section className="about-hero-section">
        <div className="about-hero-header">
          <h1>About us</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            molestiae, mollitia numquam quod cumque, exercitationem explicabo
            aperiam dolor aspernatur recusandae voluptas consequuntur qui dicta,
            commodi consequatur nobis placeat sed ad!
          </p>
        </div>
      </section>

      <section className="about-info-section">
        <div className="about-info-one">
          <h2>The Happiness & Crafting Artworks</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel cum
            nostrum, culpa aliquid perferendis exercitationem aspernatur id
            tenetur fugiat itaque eum veritatis non beatae veniam mollitia unde
            sint numquam voluptatum!
          </p>
          <div className="about-info-mission">
            <div className="mission-img">
              <img src={missionImg} alt="mission img" />
            </div>
            <div className="about-info-mission-inner-desc">
              <h3>Our Mission</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                libero eius dolor deserunt sint rerum nam quaerat doloribus
                corporis accusantium!
              </p>
            </div>
          </div>
          <div className="about-info-mission">
            <div className="mission-img">
              <img src={sharedVision} alt="vision img" />
            </div>
            <div className="about-info-mission-inner-desc">
              <h3>Our Vision</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                libero eius dolor deserunt sint rerum nam quaerat doloribus
                corporis accusantium!
              </p>
            </div>
          </div>
        </div>
        <div className="about-info-two">
          <img src={visionImg} alt="" />
        </div>
      </section>
    </section>
  );
};

export default About;
