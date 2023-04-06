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
// import CalHeatmap from "cal-heatmap";
import CalendarHeatmap from "react-calendar-heatmap";
import "./react-calendar-heatmap.css";
import ReactTooltip from "react-tooltip";

export default function HeatMap() {
  const theme = useTheme();
  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push({ date: currentDate, count: Math.random() * 26 });
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }
  const dates = getDates(new Date("2022-04-01"), new Date("2023-04-01"));
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
            CIPHER MAP
          </Typography>
        </Box>
        <Box>
          <CalendarHeatmap
            startDate={new Date("2022-04-01")}
            endDate={new Date("2023-04-01")}
            showWeekdayLabels={true}
            values={[
              ...dates,
              // ...and so on
            ]}
            classForValue={(value) => {
              //   console.log(value.count);
              if (value.count < 5) {
                return `color-cipher-${0}`;
              } else if (value.count < 10) {
                return `color-cipher-${1}`;
              } else if (value.count < 15) {
                return `color-cipher-${2}`;
              } else if (value.count < 20) {
                return `color-cipher-${3}`;
              } else {
                return `color-cipher-${4}`;
              }
            }}
            tooltipDataAttrs={(value) => {
              console.log;
              return {
                "data-tip": ` ${Math.floor(
                  value.count
                )} Cipher point on ${value.date.toISOString().slice(0, 10)}`,
              };
            }}
          />
          <ReactTooltip />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "4px",
            marginBottom: "30px",
          }}
        >
          <Typography>Less</Typography>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: theme.palette.yellowCombination.y5,
            }}
          ></Box>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: theme.palette.yellowCombination.y4,
            }}
          ></Box>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: theme.palette.yellowCombination.y3,
            }}
          ></Box>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: theme.palette.yellowCombination.y2,
            }}
          ></Box>
          <Box
            sx={{
              height: "10px",
              width: "10px",
              backgroundColor: theme.palette.yellowCombination.y1,
            }}
          ></Box>
          <Typography>More</Typography>
        </Box>
        <Divider />
      </Box>
    </>
  );
}
