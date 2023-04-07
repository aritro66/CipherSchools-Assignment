import React, { useContext, useState } from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import TextField from "@mui/material/TextField";
import { UserContext } from "../../contexts/usercontext";
import { UpdateUser } from "../../api";

export default function AboutInfo() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const [aboutDetails, setAboutDetails] = useState(user.aboutme);
  const [isEdit, setIsEdit] = useState(false);

  const handleClick = async () => {
    if (!isEdit) {
      setIsEdit(() => true);
      return;
    } else {
      if (aboutDetails.trim().length === 0) {
        alert("About details cannot be empty");
        return;
      }
      await UpdateUser({ aboutme: aboutDetails }, user.email)
        .then((res) => {
          if (res.status === 400) {
            throw new Error("Failed!");
          }
          return res.data;
        })
        .then((resData) => {
          user.update(resData);
          setIsEdit(() => false);
        })
        .catch((err) => {
          console.log(err);
          setIsEdit(() => false);
        });
    }
  };
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
              "&:hover": {
                backgroundColor: theme.palette.yellowCombination.y2,
              },
            }}
            onClick={handleClick}
          >
            {!isEdit ? "Edit" : "Save"}
          </Button>
        </Box>
        <Box sx={{ marginBottom: "25px" }}>
          <TextField
            id="outlined-password-input"
            label=""
            type="text"
            multiline={true}
            defaultValue={user.aboutme}
            disabled={!isEdit}
            onChange={(e) => {
              setAboutDetails(e.target.value);
            }}
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
