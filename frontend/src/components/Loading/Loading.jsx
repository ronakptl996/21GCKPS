import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Adjust the background color and opacity
        zIndex: 9999, // Ensure it's above other elements
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Loading;
