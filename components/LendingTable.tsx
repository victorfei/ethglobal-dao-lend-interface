import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export interface lendingTableProps {
  daoName: string;
  borrowAmount: number;
  borrowToken: string;
  borrowMaturity: number;
  borrowInterestRate: number;
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
  const [allBonds, setAllBonds] = useState({});
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
          var outputs: any[] = [];
          result["data"]["bonds"].forEach((bond: any, idx: number) => {
            var maturityDate = new Date(0); // The 0 there is the key, which sets the date to the epoch
            maturityDate.setUTCSeconds(bond["maturity"]);
            outputs.push({
              id: idx,
              addr: bond["id"],
              name: bond["name"],
              maturityDate: maturityDate,
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
      />
    </div>
  );
};

export default LendingTable;
