import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { BsLinkedin, BsGithub, BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { VscGlobe } from "react-icons/vsc";
import { UserContext } from "../../contexts/usercontext";
import { UpdateUser } from "../../api";

export default function WebLinkInfo() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const [links, setlinks] = useState({
    githublink: user.githublink,
    instagramlink: user.instagramlink,
    linkedinlink: user.linkedinlink,
    twitterlink: user.twitterlink,
    websitelink: user.websitelink,
    facebooklink: user.facebooklink,
  });
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (e) => {
    setlinks((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async () => {
    if (!isEdit) {
      setIsEdit(() => true);
      return;
    } else {
      await UpdateUser({ ...links }, user.email)
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
            ON THE WEB
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
                  Linkedin
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <BsLinkedin size={25} />
                  <TextField
                    type="text"
                    placeholder="Linkedin"
                    name="linkedinlink"
                    disabled={!isEdit}
                    onChange={handleChange}
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
                  Github
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <BsGithub size={25} />
                  <TextField
                    type="text"
                    placeholder="Github"
                    name="githublink"
                    onChange={handleChange}
                    disabled={!isEdit}
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
                  Facebook
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <BsFacebook size={25} />
                  <TextField
                    type="text"
                    placeholder="Facebook"
                    name="facebooklink"
                    disabled={!isEdit}
                    onChange={handleChange}
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
                  Twitter
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <AiFillTwitterCircle size={25} />
                  <TextField
                    type="text"
                    placeholder="Twitter"
                    disabled={!isEdit}
                    onChange={handleChange}
                    name="twitterlink"
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
                  Instagram
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <AiFillInstagram size={25} />
                  <TextField
                    type="text"
                    placeholder="Instagram"
                    disabled={!isEdit}
                    onChange={handleChange}
                    name="instagramlink"
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
                  Website
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    padding: "8px 20px",
                  }}
                >
                  <VscGlobe size={25} />
                  <TextField
                    type="text"
                    placeholder="Website"
                    disabled={!isEdit}
                    onChange={handleChange}
                    name="websitelink"
                    sx={{ "& fieldset": { border: "none" } }}
                    InputProps={{ sx: { height: 30 } }}
                    fullWidth
                  />
                  {isEdit && <MdModeEditOutline size={25} />}
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
