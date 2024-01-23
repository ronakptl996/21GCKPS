import React, { useState } from "react";
import "./AdminHome.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [villageName, setVillageName] = useState("Choose Village Name");
  const data = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "Data",
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
      <section className="adminHome">
        <section className="admin-home-card">
          <div className="admin-home-card-header">
            <h3>Village Details</h3>
          </div>
          <div className="admin-home-card-body">
            <div className="form">
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Choose Village Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  label="Choose Village Name"
                >
                  <MenuItem value="Choose Village Name" disabled>
                    Choose Village Name
                  </MenuItem>
                  <MenuItem value="o-">O-</MenuItem>
                  <MenuItem value="a+">A+</MenuItem>
                  <MenuItem value="a-">A-</MenuItem>
                  <MenuItem value="b+">B+</MenuItem>
                  <MenuItem value="b-">B-</MenuItem>
                  <MenuItem value="ab+">AB+</MenuItem>
                  <MenuItem value="ab-">AB-</MenuItem>
                  <MenuItem value="ab">AB</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="chart-wrapper">
              <div className="chart-details-one">
                <ul>
                  <li>
                    <b>Men: </b>2000
                  </li>
                  <li>
                    <b>Women: </b>2000
                  </li>
                </ul>
              </div>
              <div className="chart-details-two">
                <Doughnut data={data} />
              </div>
            </div>
          </div>
        </section>
        <section className="admin-home-card">
          <div className="admin-home-card-header">
            <h3>Matrimonial Details</h3>
          </div>
          <div className="admin-home-card-body">
            <div className="form">
              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Choose Village Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  label="Choose Village Name"
                >
                  <MenuItem value="Choose Village Name" disabled>
                    Choose Village Name
                  </MenuItem>
                  <MenuItem value="o-">O-</MenuItem>
                  <MenuItem value="a+">A+</MenuItem>
                  <MenuItem value="a-">A-</MenuItem>
                  <MenuItem value="b+">B+</MenuItem>
                  <MenuItem value="b-">B-</MenuItem>
                  <MenuItem value="ab+">AB+</MenuItem>
                  <MenuItem value="ab-">AB-</MenuItem>
                  <MenuItem value="ab">AB</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="chart-wrapper">
              <div className="chart-details-one">
                <ul>
                  <li>
                    <b>Men: </b>2000
                  </li>
                  <li>
                    <b>Women: </b>2000
                  </li>
                </ul>
              </div>
              <div className="chart-details-two">
                <Doughnut data={data} />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="admin-home-details">
        <div className="home-details">
          <p>23</p>
          <h3>Total Family</h3>
        </div>
        <div className="home-details">
          <p>23</p>
          <h3>Total Festival</h3>
        </div>
        <div className="home-details">
          <p>23</p>
          <h3>Total Committee Member</h3>
        </div>
        <div className="home-details">
          <p>23</p>
          <h3>Total Jobs</h3>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
