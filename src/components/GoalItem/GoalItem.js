import { Box, Typography, Modal, colors } from "@mui/material";
import { useState } from "react";
import EditGoal from "../EditGoal/EditGoal";

const GoalItem = ({ id, goal, achievement, check, description, color, goalInfo, colors }) => {
  const [editGoalModal, setEditGoalModal] = useState(false);
  const [goalID, setGoalID] = useState(0)

  let fontColor;

  if (achievement === "Completed") {
    fontColor = "#36A2EB";
  } else if (achievement === "Waiting" || achievement === "Wating") {
    fontColor = "#FF6384";
  } else if (achievement === "In Progress" || achievement === "In progress") {
    fontColor = "#FFCE56";
  }

  const handleSelectGoal = (e) => {
    setEditGoalModal(true);
    setGoalID(e);
  };
  const handleClose = () => {
    setEditGoalModal(false)
  }

  return (
    <>
      <Modal
        open={editGoalModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <EditGoal goalID={goalID} goalInfo={goalInfo}/>
        </>
      </Modal>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: color,
          borderBottom: "1px solid grey",     
          "&:hover": {
            backgroundColor: colors.blueAccent[200], 
            cursor: "pointer",
          },     
        }}
        onClick={() => handleSelectGoal(id)}
      >
        <Typography margin="1rem" variant="body1" fontWeight="500">
          {goal}
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
    </>
  );
};

export default GoalItem;
