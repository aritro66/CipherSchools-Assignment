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

export default function Interests() {
  const theme = useTheme();

  return (
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
          INTERESTS
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
      <Box sx={{ marginBottom: "30px" }}>
        <Box
          sx={{
            padding: "10px",
            borderRadius: "5px",
            color: theme.palette.yellowCombination.y1,
            backgroundColor: theme.palette.yellowCombination.y4,
            display: "inline-block",
          }}
        >
          Others
        </Box>
      </Box>
    </Box>
  );
}
