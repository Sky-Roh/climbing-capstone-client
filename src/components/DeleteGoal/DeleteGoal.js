import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const style = {
  position: "absolute",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "18vw",
  height: "25vh",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const DeleteGoal = ({ setShowDelete, goalID }) => {
  const naviagte = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const handleDeleteGoal = () => {
    axios.delete(`${SERVER_URL}/goals/${goalID}`).then(() => {
      setRedirect(true);
    });
  };

  if (redirect) {
    naviagte("/redirectGoal");
  }

  return (
    <Box
      sx={style}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography mb="1.5rem" variant="h3" textAlign="center">
        Are you sure you want to delete this Goal?
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        mt="1.5rem"
        gap="1rem"
        width="100%"
      >
        <Button
          color="neutral"
          variant="contained"
          onClick={() => setShowDelete(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDeleteGoal}
          variant="contained"
          style={{ backgroundColor: "red",  }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteGoal;
