import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LendButton from "./ui/LendButton";

export interface lendingTableProps {
  daoName: string;
  borrowAmount: number;
  borrowToken: string;
  borrowMaturity: number;
  borrowInterestRate: number;
}

export const LendingTable = ({
  daoName,
  borrowAmount,
  borrowToken,
  borrowMaturity,
  borrowInterestRate,
}: lendingTableProps) => {
  return (
    <div className="w-8/12">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell>DAO</TableCell>
              <TableCell align="right">Borrow Amount</TableCell>
              <TableCell align="right">Borrow Token</TableCell>
              <TableCell align="center">Maturity</TableCell>
              <TableCell align="center">Interest Rate</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={daoName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {daoName ? daoName : "undefined"}
              </TableCell>
              <TableCell align="center">
                {borrowAmount ? borrowAmount.toLocaleString() : "undefined"}
              </TableCell>
              <TableCell align="center">
                {borrowToken ? borrowToken : "undefined"}
              </TableCell>
              <TableCell align="center">
                {borrowMaturity ? borrowMaturity : "undefined"} Year
              </TableCell>
              <TableCell align="center">
                {borrowInterestRate ? borrowInterestRate : "undefined"}%
              </TableCell>
              <TableCell align="center">
                <LendButton lend={() => console.log("Lending Details")} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LendingTable;
