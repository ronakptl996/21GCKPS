import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BusinessDetail.css";
import Bus1 from "../../assets/images/Business/bus-1.avif";
import Bus2 from "../../assets/images/Business/bus-2.avif";
import Bus3 from "../../assets/images/Business/bus-3.avif";
import Logo from "../../assets/images/Business/logo.webp";
import CallRounded from "@mui/icons-material/CallRounded";
import LocationOn from "@mui/icons-material/LocationOn";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Email from "@mui/icons-material/Email";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";

const BusinessDetail = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const { businessID } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/business/${businessID}`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data.data);
      } else {
        throw new Error("Data not found!");
      }
    } catch (error) {
      toast.error(error || "Something went wrong!");
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
      <div className="businessDetail-info">
        <div className="businessDetail-image-wrapper">
          <img src={Bus1} alt="" />
          <img src={Bus2} alt="" />
          <img src={Bus3} alt="" />
        </div>
        <div className="businessDetail-header">
          <div className="businessDetail-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="businessDetail-name-info">
            <h2>Maharaj Bhog (Oberoi Mall)</h2>
            <div className="businessDetail-location">
              <ul>
                <li>
                  <LocationOn /> Goregaon East, India
                </li>
                <li>(Opening hours 9:30AM to 8:00PM)</li>
              </ul>
            </div>
            <div className="businessDetail-description">
              <h3>Business Heading</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam
                debitis suscipit reprehenderit fugiat incidunt? Placeat
                consequuntur quia veniam ratione quas quo suscipit, autem
                asperiores consequatur quod quaerat aspernatur obcaecati eaque!
              </p>
            </div>
            <div className="call-detail">
              <div>
                <CallRounded /> +91 9313535461
              </div>
              <div>
                <Email /> info@calmcoders.com
              </div>
              <div>
                <Facebook /> Facebook
              </div>
              <div>
                <Instagram /> Instagram
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessDetail;
