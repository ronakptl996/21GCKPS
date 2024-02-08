import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./MatrimonialProfiles.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ClearIcon from "@mui/icons-material/Clear";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HeroSectionHeader from "../../../components/HeroSectionHeader/HeroSectionHeader";
import MatrimonialUserCard from "../../../components/MatrimonialUserCard";
import { setLoading } from "../../../features/auth/authSlice";
import Loading from "../../../components/Loading/Loading";

const MatrimonialProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchOption, setSearchOption] = useState({
    gender: "Select Gender",
    age: "Select Age",
    villageName: "",
    initialLoad: true,
  });

  const { isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const fetchMatrimonialProfiles = async () => {
    const data = await fetch("/api/matrimonial");
    const response = await data.json();
    setProfiles(response.data);
  };

  // Clear Search
  const clearFilterSearch = () => {
    setSearchOption({
      gender: "Select Gender",
      age: "Select Age",
      villageName: "",
      initialLoad: true,
    });
    fetchMatrimonialProfiles();
  };

  // Search Profiles
  useEffect(() => {
    const handleSearch = async () => {
      if (searchOption.initialLoad) {
        setSearchOption((prevState) => ({
          ...prevState,
          initialLoad: false,
        }));
        return;
      }
      try {
        const response = await fetch(
          `/api/matrimonial/profiles?gender=${searchOption.gender}&age=${searchOption.age}&village=${searchOption.villageName}`
        );

        let data = await response.json();
        if (data.success) {
          setProfiles(data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error While Searching Profile");
      }
    };

    handleSearch();
  }, [
    searchOption.gender,
    searchOption.villageName,
    searchOption.age,
    // searchOption.initialLoad,
  ]);

  useEffect(() => {
    fetchMatrimonialProfiles();
  }, []);

  return (
    <section className="matrimonialProfile">
      <HeroSectionHeader heading="Matrimonial Profile" />
      <section className="matrimonialProfile-inner">
        <div className="matrimonialProfile-wrapper">
          <aside className="matrimonialProfile-sidebar">
            <div className="matrimonialProfile-sidebar-wrapper">
              <div className="search-section">
                <div className="search-description">
                  <div className="search-icon">
                    <SearchIcon />
                  </div>
                  <p>I'm Looking For</p>
                </div>
                <FormControl fullWidth>
                  <InputLabel id={`demo-simple-select-label`}>
                    Select Gender
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label`}
                    id={`demo-simple-select`}
                    value={searchOption.gender}
                    label="Select Gender"
                    onChange={(e) => {
                      setSearchOption((prevState) => ({
                        ...prevState,
                        gender: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="Select Gender" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="search-section">
                <div className="search-description">
                  <div className="search-icon">
                    <AccessTimeIcon />
                  </div>
                  <p>Age</p>
                </div>
                <FormControl fullWidth>
                  <InputLabel id={`demo-simple-select-label`}>
                    Select Age
                  </InputLabel>
                  <Select
                    labelId={`demo-simple-select-label`}
                    id={`demo-simple-select`}
                    value={searchOption.age}
                    label="Select Age"
                    onChange={(e) => {
                      setSearchOption((prevState) => ({
                        ...prevState,
                        age: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value="Select Age" disabled>
                      Select Age
                    </MenuItem>
                    <MenuItem value="18-25">18 to 25</MenuItem>
                    <MenuItem value="26-30">26 to 30</MenuItem>
                    <MenuItem value="31-35">31 to 35</MenuItem>
                    <MenuItem value="36-40">36 to 40</MenuItem>
                    <MenuItem value="41-45">41 to 45</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="search-section">
                <div className="search-description">
                  <div className="search-icon">
                    <HomeIcon />
                  </div>
                  <p>Village</p>
                </div>
                <TextField
                  id="outlined-basic"
                  label="Village"
                  variant="outlined"
                  value={searchOption.villageName}
                  onChange={(e) => {
                    setSearchOption((prevState) => ({
                      ...prevState,
                      villageName: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </aside>
          <div className="matrimonialProfile-profile-box-wrapper">
            <div className="matrimonialProfile-profile-box-header">
              <h3>
                Showing{" "}
                {profiles.length >= 2
                  ? `${profiles.length} Profiles`
                  : `${profiles.length} Profile`}
              </h3>
              {(searchOption.age != "Select Age" ||
                searchOption.gender != "Select Gender" ||
                searchOption.villageName != "") && (
                <Button
                  size="small"
                  style={{
                    border: "1px solid rgb(233 135 0)",
                    color: "rgb(233 135 0)",
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 20px",
                    fontWeight: "600",
                    background: "#fff",
                  }}
                  onClick={clearFilterSearch}
                >
                  <ClearIcon
                    style={{
                      marginRight: "4px",
                    }}
                  />
                  Clear filter
                </Button>
              )}
            </div>
            <div className="matrimonialProfile-profile-box">
              {profiles && profiles.length > 0 ? (
                profiles.map((user) => (
                  <div key={user._id}>
                    <MatrimonialUserCard user={user} />
                  </div>
                ))
              ) : (
                <h2>No Profile found</h2>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MatrimonialProfile;
