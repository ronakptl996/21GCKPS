import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVillageData } from "../../../features/auth/authSlice";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(255, 172, 58, 1)",
    color: "#000000bf",
    fontWeight: 600,
    fontSize: 15,
  },
}));

const AdminAllVillage = () => {
  const dispatch = useDispatch();

  const { villageWiseData } = useSelector((store) => store.auth);

  useEffect(() => {
    dispatch(fetchVillageData());
  }, []);
  return (
    <>
      {villageWiseData && (
        <Box sx={{ mb: "35px" }}>
          <Box sx={{ margin: "5px 0" }}>
            <Typography variant="h6" fontWeight={700} color={"#000000bf"}>
              All Village
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Village Name</StyledTableCell>
                  <StyledTableCell align="center">Total Family</StyledTableCell>
                  <StyledTableCell align="center">Total Son</StyledTableCell>
                  <StyledTableCell align="center">
                    Total Daughter
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {villageWiseData?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.villageName.slice(0, 1).toUpperCase()}
                      {item.villageName.slice(1)}
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                      {item.totalFamily}
                    </TableCell>
                    <TableCell align="center">{item.totalSon}</TableCell>
                    <TableCell align="center">{item.totalDaughter}</TableCell>
                    <TableCell align="center">
                      <Link to={`/village/${item.villageName}`}>Link</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
};

export default AdminAllVillage;
