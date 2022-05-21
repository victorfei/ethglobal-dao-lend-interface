import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";
import { ArrowCircleDown } from "@mui/icons-material";
import LendingTable from "./LendingTable";

export interface SectionThreeProps {}

export const SectionThree = () => {
  return (
    <div className=" flex-nowrap text-center justify-center  shadow-xl bg-gray-50 rounded-xl">
      <div className="py-8">Our Top Performing DAO's</div>
      <LendingTable />
    </div>
  );
};

export default SectionThree;
