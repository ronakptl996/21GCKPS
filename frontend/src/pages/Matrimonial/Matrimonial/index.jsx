import React from "react";
import "./index.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Matrimonial = () => {
  return (
    <div className="matrimonial-profile">
      <section className="matrimonial-profile-wrapper">
        <section className="matrimonial-profile-description">
          <h2>Find your best match.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            dolor, rem suscipit possimus repellendus ad? Quaerat dolores
            aspernatur praesentium nulla iure vitae enim possimus ea voluptatum
            maiores, facere aliquid. Obcaecati?
          </p>
          <div style={{ marginTop: "2rem" }}>
            <div className="button-wrapper">
              <Link to="/create-matrimonial-profile">
                <Button style={{ color: "#fff" }}>Create your profile</Button>
              </Link>
            </div>
            <div className="button-wrapper">
              <Link to="/matrimonial-profile">
                <Button style={{ color: "#fff", fontWeight: "500" }}>
                  I already have profile
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Matrimonial;
