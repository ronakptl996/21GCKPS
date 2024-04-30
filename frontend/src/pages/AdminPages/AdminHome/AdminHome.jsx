import React, { useEffect, useState } from "react";
import "./AdminHome.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminHome = () => {
  const [statistics, setStatistics] = useState({});
  const [villageName, setVillageName] = useState("moraj");
  const [matrimonialVillageName, setMatrimonialVillageName] = useState("moraj");
  const [villageData, setVillageData] = useState({
    menCount: 0,
    womenCount: 0,
  });
  const [matrimonialData, setMatrimonialData] = useState({
    menCount: 0,
    womenCount: 0,
  });

  // ^village wise men/women count - CHART DATA
  const villageChartData = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "Data",
        data: [villageData?.menCount, villageData?.womenCount],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  // ^Matrimonial Village wise men/women count - CHART DATA
  const matrimonialChartData = {
    labels: ["Men", "Women"],
    datasets: [
      {
        label: "Data",
        data: [matrimonialData?.menCount, matrimonialData?.womenCount],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  // ^village wise men/women count
  const getVillageWiseMenWomenCount = async (villageName) => {
    try {
      const response = await fetch(
        `/api/admin/village-wise-men-women/${villageName}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          setVillageData(data.data[0]);
        }
      } else {
        throw new Error("Data not found!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // ^Matrimonial village wise men/women count
  const getMatrimonialMenWomenCount = async (villageName) => {
    try {
      const response = await fetch(
        `/api/admin/matrimonial-men-women-count/${villageName}`
      );

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          setMatrimonialData(data.data[0]);
        }
      } else {
        throw new Error("Data not found!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // ^Get Statistics
  const getStatistics = async () => {
    try {
      const response = await fetch(`/api/admin/statictics`);

      if (response.ok) {
        const data = await response.json();

        if (data && data.success) {
          setStatistics(data.data);
        }
      } else {
        throw new Error("Data not found!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  // ^village wise men/women count
  useEffect(() => {
    if (villageName) {
      getVillageWiseMenWomenCount(villageName); // Fetch data when village name changes
    }
  }, [villageName]);

  // ^Matrimonial village wise men/women count
  useEffect(() => {
    if (matrimonialVillageName) {
      getMatrimonialMenWomenCount(matrimonialVillageName); // Fetch data when village name changes
    }
  }, [matrimonialVillageName]);

  useEffect(() => {
    getStatistics();
  }, []);

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
                  Choose Village
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  label="Choose Village"
                >
                  <MenuItem value="Choose Village" disabled>
                    Choose Village
                  </MenuItem>
                  <MenuItem value="moraj">Moraj</MenuItem>
                  <MenuItem value="jinaj">Jinaj</MenuItem>
                  <MenuItem value="rangpur">Rangpur</MenuItem>
                  <MenuItem value="undel">Undel</MenuItem>
                  <MenuItem value="piploi">Piploi</MenuItem>
                  <MenuItem value="malu">Malu</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="chart-wrapper">
              <div className="chart-details-one">
                <ul>
                  <li>
                    <b>Men: </b>
                    {villageData?.menCount ? villageData?.menCount : 0}
                  </li>
                  <li>
                    <b>Women: </b>
                    {villageData?.womenCount ? villageData?.womenCount : 0}
                  </li>
                </ul>
              </div>
              <div className="chart-details-two">
                <Doughnut data={villageChartData} />
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
                  Choose Village
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={matrimonialVillageName}
                  onChange={(e) => setMatrimonialVillageName(e.target.value)}
                  label="Choose Village"
                >
                  <MenuItem value="Choose Village" disabled>
                    Choose Village
                  </MenuItem>
                  <MenuItem value="moraj">Moraj</MenuItem>
                  <MenuItem value="jinaj">Jinaj</MenuItem>
                  <MenuItem value="rangpur">Rangpur</MenuItem>
                  <MenuItem value="undel">Undel</MenuItem>
                  <MenuItem value="piploi">Piploi</MenuItem>
                  <MenuItem value="malu">Malu</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="chart-wrapper">
              <div className="chart-details-one">
                <ul>
                  <li>
                    <b>Men: </b>{" "}
                    {matrimonialData?.menCount ? matrimonialData?.menCount : 0}
                  </li>
                  <li>
                    <b>Women: </b>
                    {matrimonialData?.womenCount
                      ? matrimonialData?.womenCount
                      : 0}
                  </li>
                </ul>
              </div>
              <div className="chart-details-two">
                <Doughnut data={matrimonialChartData} />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="admin-home-details">
        <div className="home-details">
          <p>{statistics?.totalFamily}</p>
          <h3>Total Family</h3>
        </div>
        <div className="home-details">
          <p>{statistics?.totalFestival}</p>
          <h3>Total Festival</h3>
        </div>
        <div className="home-details">
          <p>{statistics?.totalCommittee}</p>
          <h3>Total Committee Member</h3>
        </div>
        <div className="home-details">
          <p>{statistics?.totalJob}</p>
          <h3>Total Jobs</h3>
        </div>
      </section>
    </>
  );
};

export default AdminHome;
