import React, { useState, useEffect } from "react";
import "./AdminCommittee.css";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
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
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../../features/auth/authSlice";

const AdminCommittee = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [committee, setCommittee] = useState("Choose Committee");
  const [committeeDetails, setCommitteeDetails] = useState();

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    name: "",
    address: "",
    mobile: "",
    committeeName: "Choose Committee",
    avatar: "",
    userId: "",
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => store.auth);

  // Add Committee Detail
  const handleSubmit = async () => {
    if (
      [name, address, mobile, avatar, committee].some(
        (field) => field == "" || field == {}
      )
    ) {
      toast.error("Please, Fill committee field");
      return;
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("address", address);
    formData.append("mobile", mobile);
    formData.append("avatar", avatar);
    formData.append("committeeName", committee);

    try {
      dispatch(setLoading(true));
      let response = await fetch("/api/admin/add-committee", {
        method: "POST",
        body: formData,
      });

      let data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setName("");
        setAddress("");
        setAvatar("");
        setCommittee("Choose Committee");
        setMobile("");
        fetchCommitteeDetails();
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        throw new Error("Error while add committee detail");
      }
    } catch (error) {
      dispatch(setLoading(false));
      toast.error(error || "Something went wrong while add committee detail");
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
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
        let response = await fetch("/api/admin/delete-committee", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: id }),
        });

        let data = await response.json();
        if (data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "User details has been deleted.",
            icon: "success",
          });
          fetchCommitteeDetails();
        }
      } catch (error) {
        toast.error(error || "Error while deleting user!");
      }
    }
  };

  const fetchCommitteeDetails = async () => {
    const response = await fetch("/api/admin/committee");

    const data = await response.json();
    setCommitteeDetails(data.data);
  };

  // Edit Modal Button handler
  const handleEdit = async () => {
    const { name, address, mobile, committeeName, userId } = modalForm;
    console.log("userID:::", userId);
    if (
      [name, address, mobile, committeeName].some(
        (field) => field == "" || field == {}
      )
    ) {
      alert("Please, Fill edit committee field");
      return;
    }

    let formData = {
      name,
      address,
      mobile,
      committeeName,
      userId,
    };

    try {
      let response = await fetch("/api/admin/edit-committee", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = await response.json();
      if (data.success) {
        toast.success(data.message);
        setModalForm({
          name: "",
          address: "",
          mobile: "",
          committeeName: "Choose Committee",
          avatar: "",
          userId: "",
        });
        setOpen(false);
        fetchCommitteeDetails();
      } else {
        throw new Error("Error while edit committee detail");
      }
    } catch (error) {
      toast.error(error || "Something went wrong while edit committee detail");
    }
  };

  const handleClickOpen = (user) => {
    console.log(user);
    setOpen(true);
    setModalForm({
      name: user.name,
      address: user.address,
      mobile: user.mobile,
      committeeName: user.committeeName,
      avatar: user.avatar,
      userId: user._id,
    });
  };

  const changeImageModal = async (e) => {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    formData.append("userId", modalForm.userId);

    const response = await fetch("/api/admin/edit-committee-avatar", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      dispatch(setLoading(false));
      toast.success(data.message);
      setModalForm((prevState) => ({
        ...prevState,
        avatar: data.data.avatar,
      }));
    } else {
      dispatch(setLoading(false));
      toast.error("Error while updating avatar");
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
              <Button variant="outlined" component="label">
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
                    src={modalForm.avatar}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Mobile No."
              variant="outlined"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Button>
              {avatar && (
                <div className="donation-image" onClick={() => setAvatar("")}>
                  <img alt="donation image" src={URL.createObjectURL(avatar)} />
                </div>
              )}
            </div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Choose Committee
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={committee}
                label="Choose Committee"
                onChange={(e) => setCommittee(e.target.value)}
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
          <h2 className="admin-committee-header">Committee Member</h2>
          {committeeDetails && committeeDetails.length > 0 ? (
            <table className="admin-committee-table">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Address</th>
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
                            src={user.avatar}
                            alt={user.name}
                          />
                        ) : (
                          <ImageIcon />
                        )}
                      </td>
                      <td>{user.name}</td>
                      <td>{user.address}</td>
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
