import { Box, Typography } from "@mui/material";
import React from "react";

const GoalItem = ({ id, goal, achievement, check, description, color }) => {
  let fontColor;

  if (achievement === "Completed") {
    fontColor = "#36A2EB";
  } else if (achievement === "Waiting" || achievement === "Wating") {
    fontColor = "#FF6384";
  } else if (achievement === "In Progress" || achievement === "In progress") {
    fontColor = "#FFCE56";
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        color: color,
      }}
    >
      <Typography margin="1rem" variant="body1" fontWeight="500">
        - {goal}
      </Typography>
      <Typography
        margin="1rem"
        variant="body1"
        fontWeight="500"
        sx={{
          color: fontColor,
        }}
      >
        {achievement}
      </Typography>
    </Box>
  );
};

export default GoalItem;
