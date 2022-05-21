import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";
import { NavBar } from "../components/navbar/NavBar";
import SectionOne from "@src/components/SectionOne";

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
      <Container className="">
        <div>
          <NavBar />
          <SectionOne />
        </div>
      </Container>
    </div>
  );
}
