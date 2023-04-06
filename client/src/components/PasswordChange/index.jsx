import React from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material";

export default function PasswordChange() {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{ fontWeight: 700, fontSize: "20px" }}
          >
            PASSWORD & SECURITY
          </Typography>
          <Button
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.yellowCombination.y1,
            }}
          >
            Change
          </Button>
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "14px" }}
                >
                  Password
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <TextField
                    type="password"
                    disabled
                    value="Github"
                    // size="small"
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </Box>
    </>
  );
}
