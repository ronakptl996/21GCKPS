import "./AdminDonation.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { setLoading } from "../../../features/auth/authSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import Swal from "sweetalert2";
import {
  handleImageFileValidation,
  validateImageType,
} from "../../../helper/global";
import { donationValidationSchema } from "../../../schemas";

const AdminDonation = () => {
  const [donationData, setDonationData] = useState([]);
  const [donationImage, setDonationImage] = useState("");

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    totalQty: "",
    contact: "",
    description: "",
    donationImage: "",
    donationId: "",
    price: "",
  });

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    totalQty: "",
    contact: "",
    description: "",
    price: "",
  };

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: donationValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleForm(values, resetForm);
      },
    });

  // Add Donation
  const handleForm = async (data, resetForm) => {
    if (!donationImage) {
      toast.error("Donation image is required");
      return;
    }
    // Validate image type
    if (!validateImageType(donationImage)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    const formData = new FormData();
    formData.append("donationImage", donationImage);
    formData.append("name", data.name);
    formData.append("totalQty", data.totalQty);
    formData.append("contact", data.contact);
    formData.append("description", data.description);
    formData.append("price", data.price);

    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/admin/add-donation`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Error while add donation detail");
        return;
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        resetForm();
        setDonationImage("");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Get Donation Data
  const fetchDetails = async () => {
    try {
      const response = await fetch(`/api/admin/donation`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setDonationData(data.data);
      }
    } catch (error) {
      console.log(`Error while fetching donation data`);
    }
  };

  // Edit Modal
  const handleClickOpen = (data) => {
    console.log(data);
    setOpen(true);
    setModalForm({
      name: data.name,
      totalQty: data.totalQty,
      contact: data.contact,
      description: data.description,
      donationImage: data.image,
      donationId: data._id,
      price: data.price,
    });
  };

  const handleEdit = async () => {
    const { name, totalQty, contact, description, donationId, price } =
      modalForm;
    // console.log("userID:::", userId);
    if (
      [name, totalQty, contact, description, price].some(
        (field) => field == "" || field == {}
      )
    ) {
      toast.info("Please, Fill edit donation field");
      return;
    }
    let formData = {
      name,
      totalQty,
      contact,
      description,
      donationId,
      price,
    };
    try {
      dispatch(setLoading(true));
      let response = await fetch(`/api/admin/edit-donation`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        let data = await response.json();
        if (data.success) {
          toast.success(data.message);
          setModalForm({
            name: "",
            totalQty: "",
            contact: "",
            description: "",
            donationImage: "",
            donationId: "",
            price: "",
          });
          setOpen(false);
          fetchDetails();
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
        throw new Error("Error while edit donation detail");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error || "Something went wrong while edit donation detail");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Change Image
  const changeImageModal = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    // Validate image type
    if (!validateImageType(file)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("donationImage", file);
    formData.append("donationId", modalForm.donationId);

    try {
      const response = await fetch(`/api/admin/edit-donation-image`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          dispatch(setLoading(false));
          toast.success(data.message);
        }
      } else {
        toast.error("Error while updating image");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteDonation = async (donationId) => {
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
        let response = await fetch(`/api/admin/delete-donation`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donationId }),
          credentials: "include",
        });

        if (response.ok) {
          let data = await response.json();
          if (data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "Data has been deleted.",
              icon: "success",
            });
            fetchDetails();
          }
        }
      } catch (error) {
        toast.error(error || "Error while deleting user!");
      }
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <section className="admin-donation">
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Donation Details</DialogTitle>
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
            name="totalQty"
            label="Total Qty"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.totalQty}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Mobile No."
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.contact}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price (in rupee₹)"
            type="number"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.price}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            minRows={2}
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }));
            }}
            value={modalForm.description}
          />
          <div className="avatar-wrapper modal-avatar-wrapper">
            <Button variant="outlined" size="small" component="label">
              Upload New Photo
              <input
                type="file"
                hidden
                name="donationImage"
                onChange={changeImageModal}
              />
            </Button>
            {/* <div> */}
            {modalForm.donationImage ? (
              <div className="modal-committee-image-wrapper">
                <img
                  alt={modalForm.name}
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    modalForm.donationImage
                  }`}
                />
              </div>
            ) : (
              <div className="modal-committee-image-wrapper">
                <ImageIcon />
              </div>
            )}
            {/* </div> */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <h2 className="admin-donation-header">Add Donation</h2>
      <form className="admin-donation-form">
        <div className="admin-donation-input-wrapper">
          <TextField
            id="outlined-basic"
            label="Product/Service"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.name && Boolean(errors?.name)}
            helperText={touched?.name && errors?.name}
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Total Qty."
            variant="outlined"
            name="totalQty"
            value={values.totalQty}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.totalQty && Boolean(errors?.totalQty)}
            helperText={touched?.totalQty && errors?.totalQty}
          />
          <TextField
            id="outlined-basic"
            label="Mobile No."
            variant="outlined"
            type="number"
            name="contact"
            value={values.contact}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.contact && Boolean(errors?.contact)}
            helperText={touched?.contact && errors?.contact}
          />
        </div>
        <div className="admin-donation-input-wrapper">
          <div className="donation-image-wrapper">
            <Button variant="contained" component="label">
              <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload Photo
              <input
                type="file"
                name="donationImage"
                hidden
                onChange={(e) => {
                  handleImageFileValidation(e, (file) =>
                    setDonationImage(file)
                  );
                }}
              />
            </Button>
            {donationImage && (
              <div
                className="donation-image"
                onClick={() => setDonationImage("")}
              >
                <img
                  alt="donation image"
                  src={URL.createObjectURL(donationImage)}
                />
              </div>
            )}
          </div>
          <TextField
            id="outlined-basic"
            label="Price (in rupee₹)"
            type="number"
            variant="outlined"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.price && Boolean(errors?.price)}
            helperText={touched?.price && errors?.price}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched?.description && Boolean(errors?.description)}
            helperText={touched?.description && errors?.description}
          />
        </div>
        <div className="committee-btn">
          <Button
            style={{ background: "#a7732b", marginTop: "10px" }}
            variant="contained"
            onClick={handleSubmit}
          >
            Add Donation
          </Button>
        </div>
      </form>

      <div className="admin-details-wrapper">
        <h2 className="admin-details-header">Donation List</h2>
        {donationData && donationData.length > 0 ? (
          <table className="admin-details-table">
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Total Qty</th>
                <th>Price</th>
                <th>Mobile</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {donationData &&
                donationData.length > 0 &&
                donationData.map((data, index) => (
                  <tr key={data._id}>
                    <td>{index + 1}.</td>
                    <td>
                      {data.image ? (
                        <img
                          className="detailImage"
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            data.image
                          }`}
                          alt={data.name}
                        />
                      ) : (
                        <ImageIcon />
                      )}
                    </td>
                    <td>{data.name}</td>
                    <td>{data.totalQty}</td>
                    <td>{data.price}₹</td>
                    <td>{data.contact}</td>
                    <td>
                      {data.description.length > 50
                        ? data.description.slice(0, 50) + "..."
                        : data.description}
                    </td>
                    <td className="button">
                      <Button
                        variant="outlined"
                        onClick={() => handleClickOpen(data)}
                      >
                        <EditIcon />
                      </Button>
                    </td>
                    <td className="button">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteDonation(data._id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Empty Donation List</p>
        )}
      </div>
    </section>
  );
};

export default AdminDonation;
