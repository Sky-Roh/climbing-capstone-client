import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "30%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const DeleteModal = ({ selectedID, eventTitle, handleCloseDeleteModal, handleDelete }) => {


  return (
    <Box
      sx={style}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography mb="1.5rem" variant="h3" textAlign="center">
        Are you sure you want to delete this event?
      </Typography>
      <Typography mb="1.5rem" variant="h3" textAlign="center">
        {eventTitle}
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
          onClick={handleCloseDeleteModal}
        >
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" variant="contained">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteModal;
