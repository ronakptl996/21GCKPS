import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled } from "@mui/material/styles";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(255, 172, 58, 1)",
    color: "#000000bf",
    fontWeight: 600,
    fontSize: 15,
  },
}));

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const BusinessTable = ({ data, header, handleDelete, handleEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [hour, setHour] = useState({
    open: "Start Time",
    close: "Close Time",
    openMeridiem: "AM/PM",
    closeMeridiem: "AM/PM",
  });

  const [provideServices, setProvideServices] = useState("");
  const [modalForm, setModalForm] = useState({
    businessId: "",
    businessOwner: "",
    businessName: "",
    businessContact: "",
    businessEmail: "",
    businessAddress: "",
    businessLogo: "",
    businessVisitingCard: "",
    provideServices: [],
    openingHours: "",
    businessWebsite: "",
    businessInstagramUsername: "",
    businessTwitterUsername: "",
    businessFacebookUsername: "",
    quickInfo: "",
    detailedInfo: "",
    yearOfEstablishment: "",
    businessCategory: "",
    packageType: "",
  });

  const { pathname } = useLocation();

  // Logic for pagination
  const emptyRows =
    page > 0
      ? Math.max(0, rowsPerPage - (data.length - page * rowsPerPage))
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // *Interest Chip
  const handleProvideServiceAddChip = () => {
    if (
      provideServices.trim() !== "" &&
      !modalForm.provideServices.includes(provideServices)
    ) {
      // setChips((prevChips) => [...prevChips, inputValue]);
      setModalForm((prevState) => ({
        ...prevState,
        provideServices: [...modalForm.provideServices, provideServices],
      }));
      setProvideServices("");
    }
  };

  // *Delete handleServicesDeleteChip
  const handleServicesDeleteChip = (chipToDelete) => {
    setModalForm((prevState) => ({
      ...prevState,
      provideServices: [
        ...modalForm.provideServices.filter((chip) => chip !== chipToDelete),
      ],
    }));
  };

  // OPEN Modal
  const handleModal = (data) => {
    setOpen(true);
    setHour((prevState) => ({
      ...prevState,
      open: data?.openingHours?.split(" ")[0],
      close: data?.openingHours?.split(" ")[3],
      openMeridiem: data?.openingHours?.split(" ")[1],
      closeMeridiem: data?.openingHours?.split(" ")[4],
    }));

    setModalForm((prevState) => ({
      ...prevState,
      businessId: data?._id,
      packageType: data?.packageType,
      businessOwner: data?.businessOwner,
      businessName: data?.businessName,
      businessContact: data?.businessContact,
      businessEmail: data?.businessEmail,
      businessAddress: data?.businessAddress,
      businessCategory: data?.businessCategory,
      provideServices: data?.provideServices,
      quickInfo: data?.quickInfo,
      businessWebsite: data?.businessWebsite,
      yearOfEstablishment: data?.yearOfEstablishment,
      businessInstagramUsername: data?.businessInstagramUsername,
      businessFacebookUsername: data?.businessFacebookUsername,
      businessTwitterUsername: data?.businessTwitterUsername,
      detailedInfo: data?.detailedInfo,
      businessVisitingCard: data?.businessVisitingCard,
      businessLogo: data?.businessLogo,
    }));
  };

  return (
    <>
      {/* Dialog Form */}
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle style={{ fontWeight: "600" }}>
          {`Create Your ${modalForm.packageType} Business Listing`}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name of Owner"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessOwner: e.target.value,
              }));
            }}
            value={modalForm.businessOwner}
          />
          <TextField
            margin="dense"
            label="Business Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessName: e.target.value,
              }));
            }}
            value={modalForm.businessName}
          />
          <div style={{ display: "flex" }}>
            <TextField
              style={{ paddingRight: "20px" }}
              margin="dense"
              label="Business Contact"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessContact: e.target.value,
                }));
              }}
              value={modalForm.businessContact}
            />
            <TextField
              margin="dense"
              label="Business Email"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessEmail: e.target.value,
                }));
              }}
              value={modalForm.businessEmail}
            />
          </div>
          <TextField
            margin="dense"
            label="Business Address"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                businessAddress: e.target.value,
              }));
            }}
            value={modalForm.businessAddress}
          />
          <FormControl margin="dense" fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">
              Choose Business Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Choose Business Category"
              onChange={(e) => {
                setModalForm((prevState) => ({
                  ...prevState,
                  businessCategory: e.target.value,
                }));
              }}
              value={modalForm.businessCategory}
            >
              <MenuItem value="Choose Business Category" disabled>
                Choose Business Category
              </MenuItem>
              <MenuItem value="Agriculture">Agriculture</MenuItem>
              <MenuItem value="Services">Services</MenuItem>
              <MenuItem value="Manufacturing">Manufacturing</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Information Technology">
                Information Technology
              </MenuItem>
              <MenuItem value="Healthcare">Healthcare</MenuItem>
              <MenuItem value="Finance and Banking">
                Finance and Banking
              </MenuItem>
              <MenuItem value="Real Estate">Real Estate</MenuItem>
              <MenuItem value="Hospitality">Hospitality</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* // ^UPLOAD DATA FOR ELITE PACKAGE */}
          {modalForm.packageType !== "FREE" && (
            <>
              <div className="businessPackage-services">
                <TextField
                  variant="standard"
                  label="Type and press Enter to add a service (e.g., 'Cleaning', 'Maintenance')"
                  value={provideServices}
                  onChange={(e) => setProvideServices(e.target.value)}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleProvideServiceAddChip();
                    }
                  }}
                />
                <Stack direction="row" spacing={1} mt={1}>
                  {modalForm?.provideServices?.map((chip, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={chip}
                      onDelete={() => handleServicesDeleteChip(chip)}
                      color="primary"
                    />
                  ))}
                </Stack>
              </div>
              <TextField
                label="Business Quick Info"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    quickInfo: e.target.value,
                  }));
                }}
                value={modalForm.quickInfo}
              />
              <div className="openingHours-wrapper">
                <Input disabled placeholder="Business Hour" />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Start Time"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      open: e.target.value,
                    }));
                  }}
                  value={hour.open}
                >
                  <MenuItem value="Start Time" disabled>
                    Start time
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="AM/PM"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      openMeridiem: e.target.value,
                    }));
                  }}
                  value={hour.openMeridiem}
                >
                  <MenuItem value="AM/PM" disabled>
                    AM/PM
                  </MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Close Time"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      close: e.target.value,
                    }));
                  }}
                  value={hour.close}
                >
                  <MenuItem value="Close Time" disabled>
                    End time
                  </MenuItem>
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                  <MenuItem value="6">6</MenuItem>
                  <MenuItem value="7">7</MenuItem>
                  <MenuItem value="8">8</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="12">12</MenuItem>
                </Select>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="AM/PM"
                  variant="standard"
                  onChange={(e) => {
                    setHour((prevState) => ({
                      ...prevState,
                      closeMeridiem: e.target.value,
                    }));
                  }}
                  value={hour.closeMeridiem}
                >
                  <MenuItem value="AM/PM" disabled>
                    AM/PM
                  </MenuItem>
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </div>
            </>
          )}

          {/* // ^UPLOAD DATA FOR PREMIER PACKAGE */}
          {modalForm.packageType === "PREMIUM" && (
            <>
              <div style={{ display: "flex" }}>
                <TextField
                  style={{ paddingRight: "20px" }}
                  margin="dense"
                  label="Website URL"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      businessWebsite: e.target.value,
                    }));
                  }}
                  value={modalForm.businessWebsite}
                />
                <TextField
                  margin="dense"
                  label="Year of Establishment"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    setModalForm((prevState) => ({
                      ...prevState,
                      yearOfEstablishment: e.target.value,
                    }));
                  }}
                  value={modalForm.yearOfEstablishment}
                />
              </div>

              <Grid container spacing={1} my={0}>
                <Grid item xs={4}>
                  <TextField
                    label="Business Instagram"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessInstagramUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessInstagramUsername}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Business Twitter"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessTwitterUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessTwitterUsername}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Business Facebook"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessFacebookUsername: e.target.value,
                      }));
                    }}
                    value={modalForm.businessFacebookUsername}
                  />
                </Grid>
              </Grid>

              <TextField
                margin="dense"
                label="Detailed Info (min 200 characters)"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setModalForm((prevState) => ({
                    ...prevState,
                    detailedInfo: e.target.value,
                  }));
                }}
                value={modalForm.detailedInfo}
              />
            </>
          )}

          {/* // ^IMAGE UPLOAD */}
          <Grid container spacing={0} my={1}>
            <Grid item xs={6}>
              <div className="businessmodal-image-wrapper">
                <Button variant="outlined" size="small" component="label">
                  Upload Visiting Card
                  <input
                    type="file"
                    hidden
                    name="businessVisitingCard"
                    onChange={(e) => {
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessVisitingCard: e.target.files[0],
                      }));
                    }}
                  />
                </Button>
                {modalForm.businessVisitingCard ? (
                  <div
                    className="businessmodal-image donation-image"
                    onClick={() =>
                      setModalForm((prevState) => ({
                        ...prevState,
                        businessVisitingCard: "",
                      }))
                    }
                  >
                    <img
                      alt="businessVisitingCard"
                      src={modalForm.businessVisitingCard}
                    />
                  </div>
                ) : (
                  <div className="businessmodal-image">
                    <ImageIcon />
                  </div>
                )}
              </div>
            </Grid>

            <Grid item xs={6}>
              {/* IMAGE FOR BUSINESS LOGO */}
              {modalForm.packageType !== "FREE" && (
                <div className="businessmodal-image-wrapper">
                  <Button variant="outlined" size="small" component="label">
                    Upload Business Logo
                    <input
                      type="file"
                      hidden
                      name="businessLogo"
                      onChange={(e) => {
                        setModalForm((prevState) => ({
                          ...prevState,
                          businessLogo: e.target.files[0],
                        }));
                      }}
                    />
                  </Button>
                  {modalForm.businessLogo ? (
                    <div
                      className="businessmodal-image donation-image"
                      onClick={() =>
                        setModalForm((prevState) => ({
                          ...prevState,
                          businessLogo: "",
                        }))
                      }
                    >
                      <img alt="businessLogo" src={modalForm.businessLogo} />
                    </div>
                  ) : (
                    <div className="businessmodal-image">
                      <ImageIcon />
                    </div>
                  )}
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => handleEdit(modalForm, hour)}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mb: "35px" }}>
        <Box sx={{ margin: "5px 0" }}>
          <Typography variant="h6" fontWeight={700} color={"#000000bf"}>
            {header}
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Business Name</StyledTableCell>
                <StyledTableCell align="right">Business Owner</StyledTableCell>
                <StyledTableCell align="right">
                  Business Contact
                </StyledTableCell>
                <StyledTableCell align="right">Expire Date</StyledTableCell>
                {pathname !== "/my-business" && (
                  <StyledTableCell align="right">Created By</StyledTableCell>
                )}
                <StyledTableCell align="right">Package Type</StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : data
              ).map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.businessName}</TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {item.businessOwner}
                  </TableCell>
                  <TableCell align="right">{item.businessContact}</TableCell>
                  <TableCell align="right">
                    {new Date(item.expiryDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "full",
                    })}
                  </TableCell>
                  {pathname !== "/my-business" && (
                    <TableCell align="right">{item.creatorFullName}</TableCell>
                  )}
                  <TableCell align="right">{item.packageType}</TableCell>
                  <TableCell align="right">
                    {handleDelete && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    )}

                    {handleEdit && (
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleModal(item)}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={7}
                  count={data.length} // Total row count
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions} // Custom pagination controls
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default BusinessTable;
