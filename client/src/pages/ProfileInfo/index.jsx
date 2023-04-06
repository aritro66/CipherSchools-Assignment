import React from "react";
import Box from "@mui/material/Box";
import Banner from "../../components/Banner";
import { useTheme } from "@mui/material/styles";
import AboutInfo from "../../components/AboutInfo";
import WebLinkInfo from "../../components/WebLinkInfo";
import ProfessionalInfo from "../../components/ProfessionalInfo";
import PasswordChange from "../../components/PasswordChange";
import Interests from "../../components/Interests";
import HeatMap from "../../components/Heatmap";

export default function ProfileInfo() {
  const theme = useTheme();
  return (
    <Box sx={{ marginTop: "60px" }}>
      <Banner />
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: "30px",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <AboutInfo />
        <HeatMap />
        <WebLinkInfo />
        <ProfessionalInfo />
        <PasswordChange />
        <Interests />
      </Box>
    </Box>
  );
}
