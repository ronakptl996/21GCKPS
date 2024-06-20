import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useState } from "react";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ReportIcon from "@mui/icons-material/Report";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

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

const AdminHelpTable = ({ data, header, handleStatus }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Edit Modal useState
  const [open, setOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    id: "",
    status: "",
    reason: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, rowsPerPage - (data.length - page * rowsPerPage))
      : 0;

  // Open Modal for Reject
  const handleClick = (id, status) => {
    if (!id || !status) return;

    setOpen(true);
    setModalForm((prevState) => ({
      ...prevState,
      id,
      status,
    }));
  };

  return (
    <Box sx={{ margin: "5px" }}>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Please provide reason</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Reason *"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setModalForm((prevState) => ({
                ...prevState,
                reason: e.target.value,
              }));
            }}
            value={modalForm.reason}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setModalForm({
                id: "",
                reason: "",
                status: "",
              });
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleStatus(modalForm);
              setOpen(false);
              setModalForm({
                id: "",
                reason: "",
                status: "",
              });
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h6" fontWeight={700} color={"#000000bf"}>
        {header}
      </Typography>

      {data && data.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "5px" }}>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                {header == "Pending Request" && (
                  <StyledTableCell align="right">Action</StyledTableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                (rowsPerPage > 0
                  ? data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data
                ).map((item) => (
                  <TableRow key={item._id}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="right">{item.email}</TableCell>
                    <TableCell align="center">{item.mobile}</TableCell>
                    <TableCell align="center">{item.status}</TableCell>
                    {header == "Pending Request" && (
                      <TableCell align="right" sx={{ width: "200px" }}>
                        <Button
                          size="small"
                          onClick={() =>
                            handleStatus({ id: item._id, status: "Approved" })
                          }
                          variant="text"
                        >
                          <span>Approve</span>
                        </Button>{" "}
                        |{" "}
                        <Button
                          size="small"
                          onClick={() => handleClick(item._id, "Rejected")}
                          variant="text"
                        >
                          <span>Reject</span>
                        </Button>
                      </TableCell>
                    )}
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
      ) : (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: "5px",
          }}
        >
          <ReportIcon sx={{ marginBottom: "5px" }} />
          <Typography variant="h6" component="div">
            No data found
          </Typography>
        </CardContent>
      )}
    </Box>
  );
};

export default AdminHelpTable;
