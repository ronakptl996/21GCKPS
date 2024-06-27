import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { indiaTimeFormat } from "../../helper/global";

const EventDetails = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFestivalDetails = async () => {
    try {
      const response = await fetch(`/api/admin/festival/${id}`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setData(data.data);
      }
    } catch (error) {
      toast.error("Festival detail not found!");
      navigate("/festivals");
    }
  };
  useEffect(() => {
    fetchFestivalDetails();
  }, [id]);
  return (
    <section className="festival-wrapper">
      <h2 className="festival-header">Events Details</h2>
      <section className="event-descriptions">
        <h3>Event Details</h3>
        <hr />
        <div className="event-more-info">
          <div>
            <p>
              <span className="bold">Title: </span>
              <span className="text-span">{data.name}</span>
            </p>
            <p>
              <span className="bold">From Date: </span>
              <span className="text-span">
                {indiaTimeFormat(data.fromDate)}
              </span>
            </p>
            <p>
              <span className="bold">To Date: </span>
              <span className="text-span">{indiaTimeFormat(data.toDate)}</span>
            </p>
            <p>
              <span className="bold">Description: </span>
              <span className="text-span">{data.description}</span>
            </p>
          </div>
          <div>
            <p>
              <span className="bold">Current Address: </span>
              <span className="text-span">{data.address}</span>
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default EventDetails;
