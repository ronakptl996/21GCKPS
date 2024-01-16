import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./index.css";

const Job = () => {
  return (
    <section className="jobs-wrapper">
      <section className="job-description">
        <h2>Hire the Best Talent.</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          dolor, rem suscipit possimus repellendus ad? Quaerat dolores
          aspernatur praesentium nulla iure vitae enim possimus ea voluptatum
          maiores, facere aliquid. Obcaecati?
        </p>
        <div style={{ marginTop: "2rem" }}>
          <div className="button-wrapper">
            <Link to="/job-poster">
              <Button style={{ color: "#fff" }}>Job Poster</Button>
            </Link>
          </div>
          <div className="button-wrapper">
            <Link to="/job-seeker">
              <Button style={{ color: "#fff", fontWeight: "500" }}>
                Job Seeker
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Job;
