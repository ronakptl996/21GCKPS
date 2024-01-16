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

const CommitteeTable = () => {
  const { committeeDetails } = useSelector((store) => store.admin);

  const columns = [
    { id: "id", name: "Sr.No." },
    { id: "avatar", name: "Image" },
    { id: "name", name: "Name" },
    { id: "address", name: "Address" },
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

  return (
    <div className="table-wrapper">
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
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {columns &&
                          columns.map((column, i) => {
                            let value = row[column.id];

                            return column.name == "Sr.No." ? (
                              <TableCell key={value}>{i + 1}</TableCell>
                            ) : column.name == "Image" ? (
                              <TableCell key={value}>
                                <img
                                  src={value}
                                  alt={value}
                                  className="committeeAvatar"
                                />
                              </TableCell>
                            ) : (
                              <TableCell key={value}>{value}</TableCell>
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
