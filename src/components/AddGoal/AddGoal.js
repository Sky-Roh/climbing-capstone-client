import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20vw",
  height: "40vh",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const AddGoal = ({  }) => {
  const [redirect, setRedirect] = useState(false);
  const naviagte = useNavigate();

  const formik = useFormik({
    initialValues: {
      goal: "",
      achievement: "Waiting",
      check: false,
      description: "",
      user_id: 1,
    },
    validationSchema: Yup.object({
      goal: Yup.string()
        .max(30, "Must be 30 characters or less")
        .trim()
        .required("This field is required"),
    }),
    onSubmit: handelGoalSubmit,
  });

  function handelGoalSubmit(values) {
    axios
      .post(SERVER_URL + "/goals", {
        goal: values.goal,
        achievement: values.achievement,
        check: false,
        description: values.description,
        user_id: 1,
      })
      .then(() => {
        setRedirect(true);
      })
      .catch(console.error);
  }

  if (redirect) {
    naviagte("/redirectGoal");
  }

  return (
    <>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography mb="1.5rem" variant="h3" textAlign="center">
          Add New Goal
        </Typography>
        <Box display="flex" alignItems="center">
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Goal"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.goal}
                name="goal"
                error={formik.touched.goal && formik.errors.goal}
                helperText={
                  formik.touched.goal && formik.errors.goal
                }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                error={
                  formik.touched.description && formik.errors.description
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                sx={{ mt: "1.5rem" }}
              />
              

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  + Add New Item
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddGoal;
