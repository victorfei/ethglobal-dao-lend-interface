import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LendForm } from "./forms/LendForm";
import { PaymentToken } from "./forms/common";
import { Button } from "@mui/material";
import LendingModal from "./LendingModal";

export interface LendTableOutput {
  id: number;
  addr: string;
  name: string;
  maturityDate: string;
  dao: string;
}
export interface lendingTableProps {
  daoName: string;
  borrowAmount: number;
  borrowToken: string;
  borrowMaturity: number;
  borrowInterestRate: number;
}

export function convertMaturityToUTC(maturity: string) {
  return new Date(Number(maturity)).toLocaleString();
}

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/ltyu/ethglobal-dao-lend-subgraph-repo",
  cache: new InMemoryCache(),
});

export const LendingTable = () => {
  const [allBonds, setAllBonds] = useState<LendTableOutput[]>([]);
  const [selectedBondId, setSelectedBondId] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [cellValues, setCellValues] = useState({
    addr: "DEFAULT",
    name: "DEFAULT",
    maturityDate: "DEFAULT",
    dao: "DEFAULT",
  });

  const columnDefs: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0 },
    { field: "name", headerName: "Bond Name", flex: 1 },
    { field: "dao", headerName: "DAO Name", flex: 0 },
    { field: "maturityDate", headerName: "Maturity Date", flex: 0 },
    { field: "addr", headerName: "Address", flex: 1 },
    {
      field: "Lending Details",
      flex: 0.5,
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            className="bg-gradient-to-r from-green-400 to-blue-500"
            onClick={(e) => {
              lendingDetailModal(cellValues.row);
            }}
          >
            Lending Details
          </Button>
        );
      },
    },
  ];
  //button turns modal true, passes cell values

  const lendingDetailModal = (cellValues: any) => {
    setModalOpen(true);
    setCellValues(cellValues);
  };
  useEffect(() => {
    const fetchData = async () => {
      client
        .query({
          query: gql`
            {
              bonds(first: 5) {
                id
                name
                maturity
                dao {
                  name
                }
              }
              daos(first: 5) {
                id
                name
              }
            }
          `,
        })
        .then((result: any) => {
          var outputs: LendTableOutput[] = [];
          console.log(result);
          result["data"]["bonds"].forEach((bond: any, idx: number) => {
            outputs.push({
              id: idx,
              addr: bond["id"],
              name: bond["name"],
              maturityDate: convertMaturityToUTC(bond["maturity"]),
              dao: bond["dao"]["name"],
            });
          });
          setAllBonds(outputs);
        });
    };
    fetchData();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={allBonds}
        columns={columnDefs}
        hideFooter={true}
        autoHeight={true}
        onRowClick={(params, events, details) => {
          setSelectedBondId(Number(params["id"]));
        }}
      />
      {cellValues && (
        <LendingModal
          open={modalOpen}
          handleClose={handleClose}
          addr={cellValues.addr}
          name={cellValues.name}
          maturityDate={cellValues.maturityDate}
          dao={cellValues.dao}
        />
      )}
    </div>
  );
};

export default LendingTable;
