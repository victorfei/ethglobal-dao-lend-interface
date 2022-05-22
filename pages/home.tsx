import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";
import { NavBar } from "../components/navbar/NavBar";
import SectionOne from "@src/components/SectionOne";
import SectionTwo from "@src/components/SectionTwo";
import SectionThree from "@src/components/SectionThree";
import Footer from "@src/components/footer/Footer";

export default function Home() {
  return (
    <div>
      <Container className="">
        <div>
          <NavBar />
          <SectionOne />
          <SectionTwo />
          <SectionThree />
        </div>
      </Container>
    </div>
  );
}
