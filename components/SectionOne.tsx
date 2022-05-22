import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";

export interface SectionOneProps {}


export const SectionOne = () => {
  const goToLendTable = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault(); 
      window.location.replace("/home/#lend-table")
  };

  return (
    <div
      style={{ width: `100%` }}
      className="border-2 shadow-xl bg-gray-50 rounded-lg bg-gradient-to-r from-green-400 to-blue-500"
    >
      <Container className="py-8">
        <CardContent>
          <Typography variant="h2" color="common.font" className="text-white">
            Undercollateralized
          </Typography>
          <Typography variant="h3">Lending For</Typography>
          <Typography variant="h3">DAO&apos;s</Typography>
        </CardContent>
      </Container>

      <Container className="flex  py-8 m-5">
        <Button
          variant="contained"
          className="rounded-full bg-white text-black hover:bg-black hover:cursor-pointer hover:text-white"
          onClick={goToLendTable}
        >
          Invest in a DAO
        </Button>
      </Container>
      <div
        className="underline text-white text-right py-4 px-8 text-md hover:cursor-pointer"
        onClick={() => {
          Router.push("/borrow");
        }}
      >
        I&apos;m a DAO...
      </div>
    </div>
  );
};

export default SectionOne;
