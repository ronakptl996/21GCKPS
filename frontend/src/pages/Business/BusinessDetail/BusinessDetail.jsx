import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BusinessDetail.css";
import Bus1 from "../../../assets/images/Business/bus-1.avif";
import Bus2 from "../../../assets/images/Business/bus-2.avif";
import Bus3 from "../../../assets/images/Business/bus-3.avif";
import Logo from "../../../assets/images/Business/logo.webp";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CallRounded from "@mui/icons-material/CallRounded";
import LocationOn from "@mui/icons-material/LocationOn";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { Chip, Stack, Tooltip } from "@mui/material";

const BusinessDetail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const { businessID } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/business/${businessID}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setData(data.data);
      } else {
        throw new Error("Data not found!");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      navigate("/business");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <section className="businessDetail">
      {data && (
        <div className="businessDetail-info">
          <div className="businessDetail-image-wrapper">
            {/* // & ADD IMAGES */}
            <img src={Bus1} alt="" />
            <img src={Bus2} alt="" />
            <img src={Bus3} alt="" />
          </div>
          <div className="businessDetail-header">
            <div className="businessDetail-logo">
              {/* // & ADD LOGO */}
              <img src={Logo} alt="" />
            </div>
            <div className="businessDetail-name-info">
              <h2>{data.businessName.toUpperCase()}</h2>
              <div className="businessDetail-location">
                <ul>
                  <li>
                    <BusinessCenterIcon />
                    {data.businessCategory}
                  </li>
                  <li>
                    <LocationOn /> {data.businessAddress}
                  </li>
                  <li>
                    <WatchLaterIcon />
                    {data.openingHours}
                  </li>
                  <li>
                    <RoomPreferencesIcon />
                    {data.yearOfEstablishment}
                  </li>
                </ul>
              </div>
              <div className="businessDetail-description">
                <h4>{data.quickInfo}</h4>
                {data.detailedInfo && <p>{data.detailedInfo}</p>}
              </div>

              {data.provideServices && data.provideServices.length > 0 && (
                <div className="business-services">
                  <Stack direction="row" spacing={1}>
                    {data.provideServices.map((service) => (
                      <Chip label={service} key={service} />
                    ))}
                  </Stack>
                </div>
              )}
              <div className="call-detail">
                <div>
                  <CallRounded /> {data.businessContact}
                </div>
                <div>
                  <Email /> {data.businessEmail}
                </div>
                {data.businessInstagramUsername && (
                  <div>
                    <Instagram /> {data.businessInstagramUsername}
                  </div>
                )}
                {data.businessFacebookUsername && (
                  <div>
                    <Facebook /> {data.businessFacebookUsername}
                  </div>
                )}
                {data.businessTwitterUsername && (
                  <div>
                    <Facebook /> {data.businessTwitterUsername}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BusinessDetail;
