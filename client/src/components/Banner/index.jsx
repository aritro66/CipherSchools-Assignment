import React, { useContext } from "react";
import logo from "../../assets/images/ProfileCover.png";
import { Typography, Box, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { MdModeEditOutline } from "react-icons/md";
import { UserContext } from "../../contexts/usercontext";

export default function Banner() {
  const theme = useTheme();
  const user = useContext(UserContext);
  return (
    <>
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
                  // display: "flex",
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
                {user.fname + " " + user.lname}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "17px", lineHeight: 1.25 }}
              >
                {user.email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography textAlign="center">
              {user.followercount} Followers
            </Typography>{" "}
          </Box>
        </Box>
      </Box>
    </>
  );
}
