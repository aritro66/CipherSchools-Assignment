import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { ChangePassword } from "../../api";
import { UserContext } from "../../contexts/usercontext";
import Modal from "@mui/material/Modal";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import useForceUpdate from "../../hooks/useForceUpdate";

export default function PasswordChange() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const forceUpdate = useForceUpdate();
  const [pass, setPass] = useState({
    oldpassword: "",
    newpassword1: "",
    newpassword2: "",
  });
  const [show, setShow] = useState({
    show1: false,
    show2: false,
    show3: false,
  });
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

  const handleChange = (e) => {
    setPass((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (
      pass.oldpassword.trim().length === 0 ||
      pass.newpassword1.trim().length === 0 ||
      pass.newpassword2.trim().length === 0
    ) {
      alert("Please fill all the fields");
      return;
    }
    await ChangePassword({ email: user.email, ...pass })
      .then((res) => {
        if (res.status === 400 || res.status === 401) {
          throw new Error("Failed!");
        }
        return res.data;
      })
      .then((resData) => {
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
          <Box>
            <Typography variant="h6" component="h6" sx={{ fontSize: "12px" }}>
              Current Password
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.secondary.main,
                padding: "8px 0px",
              }}
            >
              <TextField
                type={!show.show1 ? "password" : "text"}
                placeholder="Current Password"
                name="oldpassword"
                onChange={handleChange}
                sx={{ "& fieldset": { border: "none" } }}
                InputProps={{ sx: { height: 30 } }}
                fullWidth
              />
              {show.show1 ? (
                <BsEyeSlash
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show1 = !prev.show1;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              ) : (
                <BsEye
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show1 = !prev.show1;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" component="h6" sx={{ fontSize: "12px" }}>
              New Password
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.secondary.main,
                padding: "8px 0px",
              }}
            >
              <TextField
                type={!show.show2 ? "password" : "text"}
                placeholder="New Password"
                name="newpassword1"
                onChange={handleChange}
                sx={{ "& fieldset": { border: "none" } }}
                InputProps={{ sx: { height: 30 } }}
                fullWidth
              />
              {show.show2 ? (
                <BsEyeSlash
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show2 = !prev.show2;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              ) : (
                <BsEye
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show2 = !prev.show2;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              )}
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" component="h6" sx={{ fontSize: "12px" }}>
              Confirm Password
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.secondary.main,
                padding: "8px 0px",
              }}
            >
              <TextField
                type={!show.show3 ? "password" : "text"}
                placeholder="Confirm Password"
                name="newpassword2"
                onChange={handleChange}
                sx={{ "& fieldset": { border: "none" } }}
                InputProps={{ sx: { height: 30 } }}
                fullWidth
              />
              {show.show3 ? (
                <BsEyeSlash
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show3 = !prev.show3;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              ) : (
                <BsEye
                  size={25}
                  onClick={() => {
                    setShow((prev) => {
                      prev.show3 = !prev.show3;
                      return prev;
                    });
                    forceUpdate();
                  }}
                />
              )}
            </Box>
          </Box>

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
            PASSWORD & SECURITY
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
