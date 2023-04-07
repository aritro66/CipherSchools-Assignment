import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { UserContext } from "../../contexts/usercontext";
import { UpdateUser } from "../../api";
export default function ProfessionalInfo() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const [profDetails, setProfDetails] = useState({
    highesteducation: user.highesteducation,
    currentstatus: user.currentstatus,
  });
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (e) => {
    setProfDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async () => {
    if (!isEdit) {
      setIsEdit(() => true);
      return;
    } else {
      await UpdateUser({ ...profDetails }, user.email)
        .then((res) => {
          if (res.status === 400) {
            throw new Error("Failed!");
          }
          return res.data;
        })
        .then((resData) => {
          console.log(resData);
          user.update(resData);
          setIsEdit(() => false);
        })
        .catch((err) => {
          console.log(err);
          setIsEdit(() => false);
        });
    }
  };
  console.log(profDetails);
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
            PROFESSIONAL INFORMATION
          </Typography>
          <Button
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.yellowCombination.y1,
              "&:hover": {
                backgroundColor: theme.palette.yellowCombination.y2,
              },
            }}
            onClick={handleClick}
          >
            {!isEdit ? "Edit" : "Save"}
          </Button>
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "14px" }}
                >
                  Highest education
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <Select
                    fullWidth
                    sx={{
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      height: 30,
                    }}
                    name="highesteducation"
                    disabled={!isEdit}
                    onChange={handleChange}
                    defaultValue={user.highesteducation}
                    displayEmpty
                  >
                    <MenuItem value={0}>Primary</MenuItem>
                    <MenuItem value={1}>Secondary</MenuItem>
                    <MenuItem value={2}>Higher Secondary</MenuItem>
                    <MenuItem value={3}>Graduation</MenuItem>
                    <MenuItem value={5}>Post Graduation</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{ fontSize: "14px" }}
                >
                  What do you do currently?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <Select
                    fullWidth
                    sx={{
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      height: 30,
                    }}
                    name="currentstatus"
                    disabled={!isEdit}
                    onChange={handleChange}
                    defaultValue={user.currentstatus}
                    displayEmpty
                  >
                    <MenuItem value={0}>Schooling</MenuItem>
                    <MenuItem value={1}>College Student</MenuItem>
                    <MenuItem value={2}>Teaching</MenuItem>
                    <MenuItem value={3}>Job</MenuItem>
                    <MenuItem value={5}>Freelancing</MenuItem>
                  </Select>
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
