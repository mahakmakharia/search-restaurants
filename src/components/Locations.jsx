import React from "react";
import {
  withStyles,
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@material-ui/core";
import { useHistory } from "react-router";

const Locations = ({ locations }) => {
  const history = useHistory();

  const locationClickHandler = (id) => {
    history.push(`/location/${id}`);
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <Box width={"100%"}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Name
              </StyledTableCell>
              <StyledTableCell style={{ fontWeight: "bold" }}>
                Country
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location) => (
              <StyledTableRow
                key={location.id}
                style={{ cursor: "pointer" }}
                onClick={() => locationClickHandler(location.id)}
              >
                <StyledTableCell component="th" scope="row">
                  {location.name}
                </StyledTableCell>
                <StyledTableCell>
                  <img
                    src={location.country_flag_url}
                    className="flag"
                    width={"15vw"}
                    alt="flag"
                    style={{ marginRight: "5px" }}
                  />
                  {location.country_name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Locations;
