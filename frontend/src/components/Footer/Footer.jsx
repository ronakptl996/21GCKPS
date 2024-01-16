import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallRoundedIcon from "@mui/icons-material/CallRounded";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <section className="footer-inner">
        <div className="footer-social-wrapper">
          <h3>Office Address</h3>
          <p className="office-address">
            37-B GOVERDHAN PARK, near SILVER CITY, Vastral, Ahmedabad, Gujarat
            382418
          </p>
          <div className="social-icons-wrapper">
            <span>
              <FacebookIcon />
            </span>
            <span>
              <TwitterIcon />
            </span>
            <span>
              <LinkedInIcon />
            </span>
            <span>
              <EmailIcon />
            </span>
            <span>
              <WhatsAppIcon />
            </span>
          </div>
        </div>
        <div className="footer-contact-wrapper">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <p>
                <CallRoundedIcon />
              </p>
              <Link to="">+91 98989898989</Link>
            </li>
            <li>
              <p>
                <WhatsAppIcon />
              </p>
              <Link to="">+91 98989898989</Link>
            </li>
            <li>
              <p>
                <EmailIcon />
              </p>
              <Link to="">contact@gmail.com</Link>
            </li>
            <li>
              <p>
                <EmailIcon />
              </p>
              <Link to="">complain@mail.com</Link>
            </li>
          </ul>
        </div>
        <div className="footer-pages-wrapper">
          <h3>Important Pages</h3>
          <ul>
            <li>
              <Link to="">Remark & Sugession</Link>
            </li>
            <li>
              <Link to="">Donate Now</Link>
            </li>
            <li>
              <Link to="">Matromonial</Link>
            </li>
            <li>
              <Link to="">Business</Link>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
