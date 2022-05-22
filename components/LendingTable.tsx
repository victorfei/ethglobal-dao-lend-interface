import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LendForm } from "./forms/LendForm";
import { PaymentToken } from "./forms/common";

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

const columnDefs: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "name", headerName: "Bond Name", flex: 1 },
  { field: "dao", headerName: "DAO Name", flex: 1 },
  { field: "maturityDate", headerName: "Maturity Date", flex: 1 },
  { field: "addr", headerName: "Address", flex: 1 },
];

export const LendingTable = () => {
  const [allBonds, setAllBonds] = useState<LendTableOutput[]>([]);
  const [selectedBondId, setSelectedBondId] = useState(-1);
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
          console.log(result)
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

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={allBonds}
        columns={columnDefs}
        hideFooter={true}
        autoHeight={true}
        onRowClick={(params, events, details) => {
          setSelectedBondId(Number(params["id"]));
          console.log(selectedBondId);
        }}
      />
      <div>
        {selectedBondId >= 0 && (
          <LendForm
            lendDetails={{
              daoName: allBonds[selectedBondId]["dao"],
              amount: 0,
              paymentToken: PaymentToken.USDC,
              maturityDate: allBonds[selectedBondId]["maturityDate"],
              interestRate: 0.1,
              remainingBorrowAmount: 10,
              address: allBonds[selectedBondId]["addr"]
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LendingTable;
