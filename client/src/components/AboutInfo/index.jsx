import React, { useContext } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../contexts/usercontext";

export default function AboutInfo() {
  const theme = useTheme();
  const user = useContext(UserContext);
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontWeight: 700, fontSize: "20px" }}
          >
            ABOUT ME
          </Typography>
          <Button
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.yellowCombination.y1,
            }}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ marginBottom: "25px" }}>
          <TextField
            id="outlined-password-input"
            label=""
            type="text"
            multiline={true}
            value={user.aboutme}
            rows={4}
            placeholder="Add something about you."
            sx={{ width: "100%", backgroundColor: theme.palette.primary.main }}
            //   autoComplete="current-password"
          />
        </Box>
        <Divider />
      </Box>
    </>
  );
}
