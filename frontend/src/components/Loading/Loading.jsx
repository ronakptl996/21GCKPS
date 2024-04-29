import { CircularProgress, Modal } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Modal
      open={true}
      // onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <section className="loading-wrapper">
        <CircularProgress className="loading" />
        <h3>Loading...</h3>
      </section>
    </Modal>
  );
};

export default Loading;
