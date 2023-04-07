import React, { useState, useContext } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material";
import { interestList } from "./InterestList";
import { UserContext } from "../../contexts/usercontext";
import Modal from "@mui/material/Modal";
import { UpdateUser } from "../../api";
import useForceUpdate from "../../hooks/useForceUpdate";
export default function Interests() {
  const theme = useTheme();
  const forceUpdate = useForceUpdate();
  const user = useContext(UserContext);
  const [interests, setInterests] = useState(user.interests);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const modalstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = async () => {
    await UpdateUser({ interests: [...interests] }, user.email)
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Failed!");
        }
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        user.update(resData);
        setOpen(() => false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(() => false);
      });
  };

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modalstyle}>
          <Grid container spacing={2}>
            {interests.map((ele, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <Button
                    fullWidth
                    sx={{
                      fontSize: 12,
                      color: ele
                        ? theme.palette.primary.main
                        : theme.palette.primary.contrastText,
                      backgroundColor: ele
                        ? theme.palette.yellowCombination.y1
                        : theme.palette.secondary.main,
                      "&:hover": {
                        backgroundColor: ele
                          ? theme.palette.yellowCombination.y2
                          : theme.palette.primary.light,
                      },
                    }}
                    onClick={() => {
                      console.log(index);
                      setInterests((prev) => {
                        prev[index] = 1 - prev[index];
                        return prev;
                      });
                      forceUpdate();
                    }}
                  >
                    {interestList[index].name}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Box
            sx={{
              margin: "10px 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: "#000",
                },
              }}
              onClick={() => {
                console.log("jj");
                console.log([...user.interests]);
                setInterests(() => [...user.interests]);
                console.log(interests);
                forceUpdate();
                setOpen(() => false);
              }}
            >
              CANCEL
            </Button>
            <Button
              sx={{
                marginLeft: "10px",
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.yellowCombination.y1,
                "&:hover": {
                  backgroundColor: theme.palette.yellowCombination.y2,
                },
              }}
              onClick={handleSubmit}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </Modal>
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
              "&:hover": {
                backgroundColor: theme.palette.yellowCombination.y2,
              },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Edit
          </Button>
        </Box>
        <Box sx={{ marginBottom: "30px" }}>
          {interests.map((ele, index) => {
            return ele ? (
              <Box
                key={index}
                sx={{
                  margin: "5px 10px",
                  padding: "10px",
                  borderRadius: "5px",
                  color: theme.palette.yellowCombination.y1,
                  backgroundColor: theme.palette.yellowCombination.y4,
                  display: "inline-block",
                }}
              >
                {interestList[index].name}
              </Box>
            ) : (
              ""
            );
          })}
        </Box>
      </Box>
    </>
  );
}
