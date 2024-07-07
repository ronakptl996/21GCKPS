import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillageData } from "../../../features/auth/authSlice";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminAllVillage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { villageWiseData } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchVillageData());
  }, []);
  return (
    <div>
      {villageWiseData && (
        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {villageWiseData.map((data) => (
            <Grid
              key={data.villageName}
              className="carousel-card"
              sx={{ width: "400px" }}
            >
              <h2>{data.villageName.toUpperCase()}</h2>
              <p className="total-family">Total Family ({data.totalFamily})</p>
              <div className="carousel-comeeti-details">
                <div className="carousel-comeeti-gender">
                  <h4>Sons ({data.totalSon})</h4>
                  <h4>Daughters ({data.totalDaughter})</h4>
                </div>
                <div>
                  <button
                    className="carousel-comeeti-btn"
                    onClick={() => navigate(`/village/${data.villageName}`)}
                  >
                    Know More
                  </button>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AdminAllVillage;
