import Button from "@mui/material/Button";
import Router from "next/router";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import { Card, Typography, CardActions, Container } from "@mui/material";
import { ArrowCircleDown } from "@mui/icons-material";

export interface SectionTwoProps {}

export const SectionTwo = () => {
  return (
    <div className="py-8 flex-nowrap text-center justify-center">
      <hr className="h-0.5 bg-gray-300 shadow-xl rounded-xl  " />
      <div>
        {" "}
        <Container className="py-8 text-center justify-center">
          <CardContent>
            <Typography variant="h4">
              Undercollateralized + Permissionless Bond Listings
            </Typography>
          </CardContent>
        </Container>
      </div>
      <img src="./arrow-down.png" className="w-12 animate-bounce" />
    </div>
  );
};

export default SectionTwo;
