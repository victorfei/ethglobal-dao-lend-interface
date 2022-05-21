import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";
import { NavBar } from "../components/navbar/NavBar";

const theme = createTheme({
  palette: {
    primary: {
      // Mint green
      main: "#98ff98",
    },
    secondary: {
      // Orange
      main: "#FBCEB1",
    },
    common: {
      // Purple
      font: "#552586",
    },
  },
});

export default function Home() {
  return (
    <div>
      <Container>
        <NavBar></NavBar>
      </Container>
      <ThemeProvider theme={theme}>
        <Container>
          <CardContent>
            <Typography variant="h2" color="common.font">
              UnderCollateralized
            </Typography>
            <Typography variant="h3">Lending For</Typography>
            <Typography variant="h3">DAO's</Typography>
          </CardContent>
        </Container>

        <Container>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              Router.push("/lend");
            }}
          >
            Invest in a DAO
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              Router.push("/borrow");
            }}
          >
            I'm a DAO
          </Button>
        </Container>
      </ThemeProvider>
    </div>
  );
}
