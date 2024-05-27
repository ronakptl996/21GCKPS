import React, { useEffect, useState } from "react";
import "./AdminFestival.css";
import { Button, FormHelperText, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { setLoading } from "../../../features/auth/authSlice";
import { festivalValidationSchema } from "../../../schemas";

const AdminFestival = () => {
  const [festivalsData, setFestivalsData] = useState([]);
  const [inputFestivalData, setInputFestivalData] = useState({
    name: "",
    address: "",
    fromDate: "",
    toDate: "",
    description: "",
  });

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    address: "",
    fromDate: "",
    toDate: "",
    description: "",
    festivalId: "",
  });

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    address: "",
    fromDate: "",
    toDate: "",
    description: "",
  };

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: festivalValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleForm(values, resetForm);
      },
    });

  // Add Festival Details
  const handleForm = async (formData, resetForm) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("/api/admin/add-festival", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Error while add festival details");
        return;
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        resetForm();
        fetchFestivalData();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch Festival Details
  const fetchFestivalData = async () => {
    try {
      const response = await fetch("/api/admin/festival");

      const data = await response.json();
      setFestivalsData(data.data);
    } catch (error) {
      toast.error("Error while fetching festival details");
    }
  };

  // Edit Modal Button handler
  const handleEdit = async () => {
    const { name, address, fromDate, toDate, description, festivalId } =
      modalForm;

    if (
      [name, address, fromDate, toDate, description].some(
        (field) => field == "" || field == {}
      )
    ) {
      alert("Please, Fill edit festival field");
      return;
    }

    let formData = {
      name,
      address,
      fromDate,
      toDate,
      description,
      festivalId,
    };

    try {
      dispatch(setLoading(true));
      let response = await fetch("/api/admin/edit-festival", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = await response.json();
      if (data.success) {
        dispatch(setLoading(false));
        toast.success(data.message);
        setModalForm({
          name: "",
          address: "",
          fromDate: "",
          toDate: "",
          description: "",
        });
        setOpen(false);
        fetchFestivalData();
      } else {
        dispatch(setLoading(false));
        throw new Error("Error while edit festival detail");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error || "Something went wrong while edit festival detail");
    }
  };

  // Delete Festival
  const handleDeleteFestival = async (id) => {
    let result = await Swal.fire({
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
        let response = await fetch("/api/admin/delete-festival", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ festivalId: id }),
        });

        let data = await response.json();
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Festival detail has been deleted.",
            icon: "success",
          });
          fetchFestivalData();
        }
      } catch (error) {
        toast.error(error || "Error while deleting user!");
      }
    }
  };

  const handleClickOpen = (festival) => {
    console.log(festival);
    setOpen(true);
    setModalForm({
      name: festival.name,
      address: festival.address,
      fromDate: new Date(festival.fromDate),
      toDate: new Date(festival.toDate),
      description: festival.description,
      festivalId: festival._id,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchFestivalData();
  }, []);

  return (
    <section className="admin-festival">
      <section className="admin-festival-inner">
        {/* Dialog Form */}
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Edit Festival Details</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.name}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.address}
            />
            <div className="modal-date-picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={dayjs(modalForm.fromDate)}
                  onChange={(date) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      fromDate: new Date(date),
                    }));
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From Date"
                  value={dayjs(modalForm.toDate)}
                  onChange={(date) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      toDate: new Date(date),
                    }));
                  }}
                />
              </LocalizationProvider>
            </div>
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }));
              }}
              value={modalForm.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleEdit}>
              Edit
            </Button>
          </DialogActions>
        </Dialog>

        <h2 className="admin-festival-header">Add Festival Details</h2>
        {/* <section className="admin-festival-form-wrapper"> */}
        <form className="admin-festival-form">
          <div className="admin-festival-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Festival Name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              id="outlined-basic"
              label="Festival Address"
              variant="outlined"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
            />
          </div>
          <div className="admin-festival-input-wrapper">
            <TextField
              margin="dense"
              label="Start Date"
              variant="outlined"
              type="date"
              name="fromDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fromDate}
              error={touched.fromDate && Boolean(errors.fromDate)}
              helperText={touched.fromDate && errors.fromDate}
            />
            <TextField
              margin="dense"
              label="End Date"
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              name="toDate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.toDate}
              error={touched.toDate && Boolean(errors.toDate)}
              helperText={touched.toDate && errors.toDate}
            />
          </div>
          <div className="committee-btn">
            <Button
              style={{ background: "#a7732b", marginTop: "10px" }}
              variant="contained"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>

        <div className="admin-committee-wrapper">
          <h2 className="admin-committee-header">Festivals</h2>
          {festivalsData && festivalsData.length > 0 ? (
            <table className="admin-committee-table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {festivalsData &&
                  festivalsData.length > 0 &&
                  festivalsData.map((festival, index) => (
                    <tr key={festival._id}>
                      <td>{index + 1}.</td>
                      <td>{festival.name}</td>
                      <td>{festival.address}</td>
                      <td>
                        {new Date(festival.fromDate).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "full",
                        })}
                      </td>
                      <td>
                        {new Date(festival.toDate).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "full",
                        })}
                      </td>
                      <td>{festival.description}</td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          onClick={() => handleClickOpen(festival)}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteFestival(festival._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No. Festival Detail</p>
          )}
        </div>
        {/* </section> */}
      </section>
    </section>
  );
};

export default AdminFestival;
