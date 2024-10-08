import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoDataImage from "../assets/images/no-data.jpg";

const CommitteeTable = () => {
  const { committeeDetails } = useSelector((store) => store.admin);

  const columns = [
    { id: "id", name: "Sr.No." },
    { id: "avatar", name: "Image" },
    { id: "name", name: "Name" },
    { id: "village", name: "Village" },
    { id: "mobile", name: "Mobile" },
    { id: "committeeName", name: "Committee" },
  ];

  const handlechangepage = (event, newpage) => {
    pagechange(newpage);
  };
  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    pagechange(0);
  };

  const [rows, rowchange] = useState([]);
  const [page, pagechange] = useState(0);
  const [rowperpage, rowperpagechange] = useState(5);

  useEffect(() => {
    rowchange(committeeDetails);
  }, [committeeDetails]);

  if (committeeDetails && committeeDetails?.length === 0) {
    return (
      <div className="no-data-found">
        <img src={NoDataImage} alt="No data found" />
        <h3>No data found!</h3>
      </div>
    );
  }

  return (
    <div className="table-wrapper" key="Committee Table">
      {/* <h1>MUI Table</h1> */}
      <Paper>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.name}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowperpage, page * rowperpage + rowperpage)
                  .map((row, index) => {
                    return (
                      <TableRow key={index}>
                        {columns &&
                          columns.map((column, i) => {
                            let value = row[column.id];

                            return column.name == "Sr.No." ? (
                              <TableCell key={column.id + index}>
                                {index + 1}
                              </TableCell>
                            ) : column.name == "Image" ? (
                              <TableCell key={column.id + index}>
                                <img
                                  src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                  }/${value}`}
                                  alt={value}
                                  className="committeeAvatar"
                                />
                              </TableCell>
                            ) : (
                              <TableCell key={column.id + index}>
                                {value}
                              </TableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowperpage}
          page={page}
          count={rows.length}
          component="div"
          onPageChange={handlechangepage}
          onRowsPerPageChange={handleRowsPerPage}
        ></TablePagination>
      </Paper>
    </div>
  );
};

export default CommitteeTable;
