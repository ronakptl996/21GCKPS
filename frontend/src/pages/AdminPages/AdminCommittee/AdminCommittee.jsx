import React, { useState, useEffect } from "react";
import "./AdminCommittee.css";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../features/auth/authSlice";
import {
  handleImageFileValidation,
  validateImageType,
} from "../../../helper/global";
import { committeeValidationSchema } from "../../../schemas";

const AdminCommittee = () => {
  const [avatar, setAvatar] = useState("");
  const [committeeDetails, setCommitteeDetails] = useState();

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    village: "",
    mobile: "",
    committeeName: "Choose Committee",
    avatar: "",
    userId: "",
  });

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    village: "",
    mobile: "",
    committee: "",
  };

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: committeeValidationSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleForm(values, resetForm);
      },
    });

  // Add Committee Details
  const handleForm = async (data, resetForm) => {
    // Validate image type
    if (!validateImageType(avatar)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
      );
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("village", data.village);
    formData.append("mobile", data.mobile);
    formData.append("committeeName", data.committee);
    formData.append("avatar", avatar);

    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/admin/add-committee`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
          resetForm();
          setAvatar("");
          fetchCommitteeDetails();
        }
      } else {
        throw new Error("Error while add committee detail");
      }
    } catch (error) {
      toast.error(error || "Something went wrong while add committee detail");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
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
        let response = await fetch(`/api/admin/delete-committee`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id }),
          credentials: "include",
        });

        if (response.ok) {
          let data = await response.json();
          if (data.success) {
            Swal.fire({
              title: "Deleted!",
              text: "User details has been deleted.",
              icon: "success",
            });
            fetchCommitteeDetails();
          }
        }
      } catch (error) {
        toast.error(error || "Error while deleting user!");
      }
    }
  };

  const fetchCommitteeDetails = async () => {
    try {
      const response = await fetch(`/api/admin/committee`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setCommitteeDetails(data.data);
      } else {
        toast.error("Error while fetching committee details");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Edit Modal Button handler
  const handleEdit = async () => {
    const { name, village, mobile, committeeName, userId } = modalForm;

    if (
      [name, village, mobile, committeeName].some(
        (field) => field == "" || field == {}
      )
    ) {
      alert("Please, Fill edit committee field");
      return;
    }

    const formData = {
      name,
      village,
      mobile,
      committeeName,
      userId,
    };

    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/admin/edit-committee`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          dispatch(setLoading(false));
          toast.success(data.message);
          setModalForm({
            name: "",
            village: "",
            mobile: "",
            committeeName: "Choose Committee",
            avatar: "",
            userId: "",
          });
          setOpen(false);
          fetchCommitteeDetails();
        }
      } else {
        throw new Error("Error while edit committee detail");
      }
    } catch (error) {
      toast.error(error || "Something went wrong while edit committee detail");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClickOpen = (user) => {
    setOpen(true);
    setModalForm({
      name: user.name,
      village: user.village,
      mobile: user.mobile,
      committeeName: user.committeeName,
      avatar: user.avatar,
      userId: user._id,
    });
  };

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
    formData.append("avatar", e.target.files[0]);
    formData.append("userId", modalForm.userId);

    try {
      const response = await fetch(`/api/admin/edit-committee-avatar`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          toast.success(data.message);
        }
      } else {
        toast.error("Error while updating avatar");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchCommitteeDetails();
  }, []);

  return (
    <section className="admin-committee">
      <div className="admin-committee-inner">
        {/* Dialog Form */}
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>Edit Committee Details</DialogTitle>
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
            <FormControl margin="dense" fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">
                Village Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="village"
                label="Village Name"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }}
                value={modalForm.village}
              >
                <MenuItem value="Choose Village" disabled>
                  Choose Village
                </MenuItem>
                <MenuItem value="moraj">Moraj</MenuItem>
                <MenuItem value="jinaj">Jinaj</MenuItem>
                <MenuItem value="rangpur">Rangpur</MenuItem>
                <MenuItem value="undel">Undel</MenuItem>
                <MenuItem value="piploi">Piploi</MenuItem>
                <MenuItem value="malu">Malu</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              name="mobile"
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
              value={modalForm.mobile}
            />
            <FormControl margin="dense" fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">
                Choose Committee
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="committeeName"
                label="Choose Committee"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    [e.target.name]: e.target.value,
                  }));
                }}
                value={modalForm.committeeName}
              >
                <MenuItem value="Choose Committee" disabled>
                  Choose Committee
                </MenuItem>
                <MenuItem value="Account Committee">Account Committee</MenuItem>
                <MenuItem value="Education Committee">
                  Education Committee
                </MenuItem>
                <MenuItem value="Festival Committee">
                  Festival Committee
                </MenuItem>
                <MenuItem value="It Committee">IT Committee</MenuItem>
                <MenuItem value="Mahila Committee">Mahila Committee</MenuItem>
                <MenuItem value="Yuvak Committee">Yuvak Committee</MenuItem>
              </Select>
            </FormControl>
            <div className="avatar-wrapper modal-avatar-wrapper">
              <Button variant="outlined" size="small" component="label">
                Upload New Photo
                <input
                  type="file"
                  hidden
                  name="avatar"
                  onChange={changeImageModal}
                />
              </Button>
              {/* <div> */}
              {modalForm.avatar ? (
                <div className="modal-committee-image-wrapper">
                  <img
                    alt={modalForm.name}
                    width={"250px"}
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      modalForm.avatar
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

        <h2 className="admin-committee-header">Add Committee Member</h2>
        <form className="admin-donation-form">
          <div className="admin-donation-input-wrapper">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <FormControl
              fullWidth
              variant="outlined"
              error={touched?.village && Boolean(errors?.village)}
            >
              <InputLabel id="demo-simple-select-label">
                Village Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="village"
                label="Village Name"
                value={values.village}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Choose Village" disabled>
                  Select Village
                </MenuItem>
                <MenuItem value="moraj">Moraj</MenuItem>
                <MenuItem value="jinaj">Jinaj</MenuItem>
                <MenuItem value="rangpur">Rangpur</MenuItem>
                <MenuItem value="undel">Undel</MenuItem>
                <MenuItem value="piploi">Piploi</MenuItem>
                <MenuItem value="malu">Malu</MenuItem>
              </Select>
              {touched?.village && errors?.village && (
                <FormHelperText>{errors?.village}</FormHelperText>
              )}
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Mobile No."
              variant="outlined"
              type="number"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.mobile && Boolean(errors.mobile)}
              helperText={touched.mobile && errors.mobile}
            />
          </div>
          <div className="admin-donation-input-wrapper">
            <div className="avatar-wrapper donation-image-wrapper">
              <Button variant="contained" component="label">
                <CloudUploadIcon style={{ marginRight: "5px" }} /> Upload Photo
                <input
                  type="file"
                  hidden
                  name="avatar"
                  onChange={(e) => {
                    handleImageFileValidation(e, (file) => setAvatar(file));
                  }}
                />
              </Button>
              {avatar && (
                <div className="donation-image" onClick={() => setAvatar("")}>
                  <img alt="donation image" src={URL.createObjectURL(avatar)} />
                </div>
              )}
            </div>
            <FormControl
              error={touched?.committee && Boolean(errors?.committee)}
            >
              <InputLabel id="demo-simple-select-label">
                Select Committee
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Committee"
                name="committee"
                value={values.committee}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Choose Village" disabled>
                  Select Committee
                </MenuItem>
                <MenuItem value="Account Committee">Account Committee</MenuItem>
                <MenuItem value="Education Committee">
                  Education Committee
                </MenuItem>
                <MenuItem value="Festival Committee">
                  Festival Committee
                </MenuItem>
                <MenuItem value="It Committee">IT Committee</MenuItem>
                <MenuItem value="Mahila Committee">Mahila Committee</MenuItem>
                <MenuItem value="Yuvak Committee">Yuvak Committee</MenuItem>
              </Select>
              {touched?.committee && errors?.committee && (
                <FormHelperText>{errors?.committee}</FormHelperText>
              )}
            </FormControl>
          </div>
          <div className="committee-btn" style={{ display: "flex" }}>
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
          <h2 className="admin-committee-header">Committee Member</h2>
          {committeeDetails && committeeDetails.length > 0 ? (
            <table className="admin-committee-table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Village</th>
                  <th>Mobile</th>
                  <th>Committee</th>
                </tr>
              </thead>
              <tbody>
                {committeeDetails &&
                  committeeDetails.length > 0 &&
                  committeeDetails.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}.</td>
                      <td>
                        {user.avatar ? (
                          <img
                            className="userAvatar"
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                              user.avatar
                            }`}
                            alt={user.name}
                          />
                        ) : (
                          <ImageIcon />
                        )}
                      </td>
                      <td>{user.name}</td>
                      <td>{user.village}</td>
                      <td>{user.mobile}</td>
                      <td>{user.committeeName.split(" ")[0]}</td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          onClick={() => handleClickOpen(user)}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                      <td className="button">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No. Committee member</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminCommittee;
