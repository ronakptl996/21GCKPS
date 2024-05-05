import "./AdminDonation.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { validateImageType } from "../../../helper/global";

const AdminDonation = () => {
  const [donationData, setDonationData] = useState([]);
  const [donationDetail, setDonationDetail] = useState({
    name: "",
    totalQty: "",
    contact: "",
    description: "",
    donationImage: "",
    price: "",
  });

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
  // const { isLoading } = useSelector((store) => store.auth);

  // Add Donation
  const handleSubmit = async () => {
    const { name, totalQty, contact, description, price, donationImage } =
      donationDetail;

    if (
      [name, totalQty, contact, description, donationImage, price].some(
        (field) => field == "" || field == {}
      )
    ) {
      alert("Please, fill donation field");
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
    formData.append("name", name);
    formData.append("totalQty", totalQty);
    formData.append("contact", contact);
    formData.append("description", description);
    formData.append("price", price);

    dispatch(setLoading(true));
    const response = await fetch("/api/admin/add-donation", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      dispatch(setLoading(false));
      toast.error("Error while add donation detail");
      return;
    }

    let data = await response.json();

    if (data.success) {
      dispatch(setLoading(false));
      toast.success(data.message);
      setDonationDetail(() => ({
        name: "",
        contact: "",
        description: "",
        donationImage: "",
        totalQty: "",
        price: "",
      }));
    }
  };

  // Get Donation Data
  const fetchDetails = async () => {
    try {
      const response = await fetch("/api/admin/donation");

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
      let response = await fetch("/api/admin/edit-donation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      const response = await fetch("/api/admin/edit-donation-image", {
        method: "PATCH",
        body: formData,
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
        let response = await fetch("/api/admin/delete-donation", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donationId }),
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
            <Button variant="outlined" component="label">
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
                  src={`${import.meta.env.VITE_BACKEND_URL}${
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
            value={donationDetail.name}
            onChange={(e) => {
              setDonationDetail((prevState) => ({
                ...prevState,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            type="number"
            id="outlined-basic"
            label="Total Qty."
            variant="outlined"
            value={donationDetail.totalQty}
            onChange={(e) => {
              setDonationDetail((prevState) => ({
                ...prevState,
                totalQty: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-basic"
            label="Mobile No."
            variant="outlined"
            type="number"
            value={donationDetail.contact}
            onChange={(e) => {
              setDonationDetail((prevState) => ({
                ...prevState,
                contact: e.target.value,
              }));
            }}
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
                  setDonationDetail((prevState) => ({
                    ...prevState,
                    donationImage: e.target.files[0],
                  }));
                }}
              />
            </Button>
            {donationDetail.donationImage && (
              <div
                className="donation-image"
                onClick={() => {
                  setDonationDetail((prevState) => ({
                    ...prevState,
                    donationImage: "",
                  }));
                }}
              >
                <img
                  alt="donation image"
                  src={URL.createObjectURL(donationDetail.donationImage)}
                />
              </div>
            )}
          </div>
          <TextField
            id="outlined-basic"
            label="Price (in rupee₹)"
            type="number"
            variant="outlined"
            value={donationDetail.price}
            onChange={(e) => {
              setDonationDetail((prevState) => ({
                ...prevState,
                price: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={donationDetail.description}
            onChange={(e) => {
              setDonationDetail((prevState) => ({
                ...prevState,
                description: e.target.value,
              }));
            }}
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
                          src={`${import.meta.env.VITE_BACKEND_URL}${
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
                    <td>{data.description}</td>
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
