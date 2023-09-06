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
  IconButton,
  useTheme,
  Modal
} from "@mui/material";
import { tokens } from "../../theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteGoal from "../DeleteGoal/DeleteGoal";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "82%",
  transform: "translate(-50%, -50%)",
  width: "20vw",
  height: "50vh",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const EditGoal = ({ goalID, goalInfo }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [goalData, setGoalData] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    axios.get(`${SERVER_URL}/goals/${goalID}`).then((res) => {
      setGoalData(res.data);
      setResponseSuccess(true);
    });
  }, [goalID]);

  const handleGoalSubmit = (values) => {
    axios
      .put(`${SERVER_URL}/goals/${goalID}`, {
        goal_id: values.goal_id,
        check: values.check,
        achievement: values.achievement,
        goal: values.goal,
        description: values.description,
        user_id: values.user_id,
      })
      .then(() => {
        navigate("/redirectGoal");
      })
      .catch(console.error);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      goal_id: 0,
      check: "",
      achievement: "",
      goal: "",
      description: "",
      user_id: 1,
    },
    validationSchema: Yup.object({
      goal: Yup.string()
        .max(30, "Must be 30 characters or less")
        .trim()
        .required("This field is required"),
    }),
    onSubmit: handleGoalSubmit,
  });

  function populateForm() {
    formik.setValues({
      ...formik.values,
      goal_id: goalData.goal_id,
      check: goalData.check,
      achievement: goalData.achievement,
      goal: goalData.goal,
      description: goalData.description,
      user_id: goalData.user_id,
    });
  }

  if (responseSuccess) {
    populateForm();
    setResponseSuccess(false);
  }

  const handleDeleteClose = () => {
    setShowDelete(false)
  }

  const handleDeleteModal = () => {
    setShowDelete(true);
  }

  return (
    <>
      <Modal
        open={showDelete}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <DeleteGoal setShowDelete={setShowDelete} goalID={goalID}/>
        </>
      </Modal>
      <Box
        sx={style}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography mb="1.5rem" variant="h3" textAlign="center">
          Goal
        </Typography>
        <Box display="flex" alignItems="center">
          <Box>
            <form onSubmit={formik.handleSubmit}>
              {/* check this part */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ mb: "1.5rem", minWidth: 120 }}
              >
                <InputLabel id="progress">Progress</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  {...formik.getFieldProps("achievement")}
                  helpertext={
                    formik.touched.achievement && formik.errors.achievement
                  }
                  label="Progress"
                  name="progress"
                  value={formik.values.achievement}
                  onChange={(event) => {
                    formik.setFieldValue("achievement", event.target.value);
                  }}
                >
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Waiting">Waiting</MenuItem>
                </Select>
              </FormControl>
              {/*  */}
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
                helperText={formik.touched.goal && formik.errors.goal}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description <optional>"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
                name="description"
                sx={{ mt: "1.5rem" }}
              />
              <Box
                display="flex"
                justifyContent="end"
                mt="1.5rem"
                gap="1rem"
                width="100%"
              >
                <IconButton
                  color="neutral"
                  variant="contained"
                  onClick={handleDeleteModal}
                  style={{ color: colors.redAccent[500] }}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
                <Button type="submit" color="secondary" variant="contained">
                  <EditOutlinedIcon />
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditGoal;
