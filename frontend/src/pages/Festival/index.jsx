import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./index.css";

const Festival = () => {
  const [festivalData, setFestivalData] = useState([]);
  const fetchFestivalData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/festival`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setFestivalData(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching festival data");
    }
  };

  useEffect(() => {
    fetchFestivalData();
  }, []);
  return (
    <section className="festival-wrapper">
      <h2 className="festival-header">Festivals and Events</h2>
      <section className="festival-table">
        {festivalData && festivalData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Title</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {festivalData.map((festival, i) => (
                <tr key={festival._id}>
                  <td>{i + 1}.</td>
                  <td>{festival.name}</td>
                  <td>
                    <Link to={`detail/${festival._id}`}>View More</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No festival detail</h2>
        )}
      </section>
    </section>
  );
};

export default Festival;
