import React, { useEffect, useState } from "react";
import "./AdminAddJobPosting.css";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";

const AdminAddJobPosting = () => {
  const [jobData, setJobData] = useState();

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    jobId: "",
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    minExperience: "",
    maxExperience: "",
    salary: "",
    opening: "",
    companyName: "",
    companyContact: "",
    companyEmail: "",
    companyIndustry: "",
    companyAddress: "",
    createdBy: "",
  });

  const handleClickOpen = async (job) => {
    setOpen(true);
    setModalForm({
      jobId: job._id,
      jobTitle: job.jobTitle,
      jobLocation: job.jobLocation,
      jobDescription: job.jobDescription,
      minExperience: job.minExperience,
      maxExperience: job.maxExperience,
      salary: job.salary,
      opening: job.opening,
      companyName: job.companyName,
      companyContact: job.companyContact,
      companyEmail: job.companyEmail,
      companyIndustry: job.companyIndustry,
      companyAddress: job.companyAddress,
      createdBy: job.createdBy,
    });
  };

  // Edit
  const handleEdit = async () => {
    try {
      const response = await fetch("/api/job/update-job", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modalForm),
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setOpen(false);
        fetchJobDetails();
        setModalForm({
          jobId: "",
          jobTitle: "",
          jobLocation: "",
          jobDescription: "",
          minExperience: "",
          maxExperience: "",
          salary: "",
          opening: "",
          companyName: "",
          companyContact: "",
          companyEmail: "",
          companyIndustry: "",
          companyAddress: "",
          createdBy: "",
        });
      } else {
        throw new Error("Error while edit job detail");
      }
    } catch (error) {
      toast.error(error || "Something went wrong while edit job detail");
    }
  };

  // Delete
  const handleDeleteJob = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        let response = await fetch("/api/job/delete-job", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jobId: id }),
          credentials: "include",
        });

        let data = await response.json();
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Job details has been deleted.",
            icon: "success",
          });
          fetchJobDetails();
        }
      } catch (error) {
        toast.error(error || "Error while deleting job!");
      }
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await fetch("/api/job", { credentials: "include" });
      const data = await response.json();
      if (data.success) {
        setJobData(data.data);
      }
    } catch (error) {
      toast.error("Error, while fetching job details");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);
  return (
    <section className="admin-job-posting">
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Job Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Job Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                jobTitle: e.target.value,
              }));
            }}
            value={modalForm.jobTitle}
          />
          <TextField
            margin="dense"
            label="Job Location"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                jobLocation: e.target.value,
              }));
            }}
            value={modalForm.jobLocation}
          />
          <TextField
            margin="dense"
            label="Job Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                jobDescription: e.target.value,
              }));
            }}
            value={modalForm.jobDescription}
          />
          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              style={{ marginRight: "5px" }}
              label="Min Experience"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  minExperience: e.target.value,
                }));
              }}
              value={modalForm.minExperience}
            />
            <TextField
              margin="dense"
              label="Max Experience"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  maxExperience: e.target.value,
                }));
              }}
              value={modalForm.maxExperience}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              style={{ marginRight: "5px" }}
              label="Salary"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  salary: e.target.value,
                }));
              }}
              value={modalForm.salary}
            />
            <TextField
              margin="dense"
              label="Opening"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  opening: e.target.value,
                }));
              }}
              value={modalForm.opening}
            />
          </div>
          <TextField
            margin="dense"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                companyName: e.target.value,
              }));
            }}
            value={modalForm.companyName}
          />
          <div style={{ display: "flex" }}>
            <TextField
              margin="dense"
              style={{ marginRight: "5px" }}
              label="Company Contact"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  companyContact: e.target.value,
                }));
              }}
              value={modalForm.companyContact}
            />
            <TextField
              margin="dense"
              label="Company Email"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  companyEmail: e.target.value,
                }));
              }}
              value={modalForm.companyEmail}
            />
          </div>
          <TextField
            margin="dense"
            label="Company Industry"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                companyIndustry: e.target.value,
              }));
            }}
            value={modalForm.companyIndustry}
          />
          <TextField
            margin="dense"
            label="Company Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                companyAddress: e.target.value,
              }));
            }}
            value={modalForm.companyAddress}
          />
          <TextField
            margin="dense"
            label="Created By"
            type="text"
            fullWidth
            variant="standard"
            disabled
            value={modalForm.createdBy}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <section className="admin-job-posting-inner">
        <div className="admin-committee-wrapper">
          <h2 className="admin-job-posting-header">Job Details</h2>
          {jobData && jobData.length > 0 ? (
            <table className="admin-job-table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Job Title</th>
                  <th>Company Name</th>
                  <th>Company Contact</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {jobData &&
                  jobData.length > 0 &&
                  jobData.map((job, index) => (
                    <tr key={job._id}>
                      <td>{index + 1}.</td>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td>{job.companyContact}</td>
                      <td>{job.salary}</td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          onClick={() => handleClickOpen(job)}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteJob(job._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No. Job Details</p>
          )}
        </div>
      </section>
    </section>
  );
};

export default AdminAddJobPosting;
