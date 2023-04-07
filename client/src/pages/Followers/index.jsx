import { Avatar, Box, Typography, useTheme, Grid } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/usercontext";
import { FollowerList } from "../../api";
import { HighestEducation } from "../../constants/Education";
export default function Followers() {
  const theme = useTheme();
  const user = useContext(UserContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    FollowerList(user.email)
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Failed");
        }
        return res.data;
      })
      .then((resData) => {
        setList([...resData]);
      });
  }, []);

  return (
    <>
      <Box sx={{ marginTop: "60px" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: "30px",
            minHeight: "100vh",
            height: "100%",
          }}
        >
          <Grid container spacing={3}>
            {list.length > 0
              ? list.map((ele) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                      <Box
                        sx={{
                          backgroundColor: theme.palette.primary.main,
                          padding: "20px 10px",
                        }}
                      >
                        <Avatar
                          src="/broken-image.jpg"
                          sx={{
                            height: "70px",
                            width: "70px",
                            margin: "auto",
                            // display: "inline-block",
                          }}
                        />
                        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
                          {ele.fname + " " + ele.lname}
                        </Typography>
                        <Typography>
                          {HighestEducation[ele.highesteducation] + " Student"}
                        </Typography>
                        <Typography>{ele.followercount} followers</Typography>
                      </Box>
                    </Grid>
                  );
                })
              : "No Folloers"}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
