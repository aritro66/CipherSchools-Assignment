import React from "react";
import Box from "@mui/material/Box";
import logo from "../../assets/images/ProfileCover.png";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { MdModeEditOutline } from "react-icons/md";
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
      <Box sx={{ height: "90px", backgroundImage: `url(${logo})` }}>
        <Box
          sx={{
            background: "linear-gradient(to right,#fff,transparent,#fff)",
            height: "inherit",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                height: "50px",
                width: "50px",
                position: "relative",
              }}
            >
              <Avatar
                alt=""
                src="/static/images/avatar/2.jpg"
                sx={{
                  height: "50px",
                  width: "50px",
                  // position: "relative",
                  // overflow: "none",
                }}
              />
              <Box
                sx={{
                  display: "inline-block",
                  position: "absolute",
                  bottom: -6,
                  left: "17px",
                  //   zIndex: 1,
                  borderRadius: "50%",
                  height: "16px",
                  width: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: theme.palette.primary.contrastText,
                }}
              >
                <MdModeEditOutline color="#fff" size={12} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "0.5px",
                marginLeft: "15px",
                lineHeight: 1.25,
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "17px", lineHeight: 1.25 }}
              >
                Hello,
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "17px", fontWeight: "700", lineHeight: 1.25 }}
              >
                Aritro Ghosh
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "17px", lineHeight: 1.25 }}
              >
                ghosharitro66@gmail.com
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography textAlign="center">0 Followers</Typography>{" "}
          </Box>
        </Box>
      </Box>
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
