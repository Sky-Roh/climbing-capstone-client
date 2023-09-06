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
  IconButton,useTheme
} from "@mui/material";
import { tokens } from "../../theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "80%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const EditModal = ({ selectedID, showDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [typeData, setTypeData] = useState([]);
  const [sessionData, setSessionData] = useState({});
  const [responseSuccess, setResponseSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(SERVER_URL + "/climbingtype")
      .then((res) => {
        setTypeData(res.data);
        return axios.get(`${SERVER_URL}/climbingsession/${selectedID}`);
      })
      .then((res) => {
        setSessionData(res.data);
        setResponseSuccess(true);
      });
  }, [selectedID]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeID: 1,
      sessionDate: "",
      location: "",
      duration: "",
      grade: "",
      description: "",
    },
    validationSchema: Yup.object({
      typeID: Yup.number()
        .required("This field is required")
        .test("non-zero", "Please select a valid type", (value) => value !== 0),
      sessionDate: Yup.string().trim().required("This field is required"),
      location: Yup.string()
        .max(30, "Must be 30 characters or less")
        .trim()
        .required("This field is required"),
      duration: Yup.string().trim().required("This field is required"),
      grade: Yup.string().trim().required("This field is required"),
    }),
    onSubmit: handleSessionSubmit,
  });

  function populateForm() {
    formik.setValues({
      ...formik.values,
      typeID: sessionData.type_id,
      sessionDate: sessionData.session_date.slice(0, 10),
      location: sessionData.location,
      duration: sessionData.duration,
      grade: sessionData.grade,
      description: sessionData.description,
    });
  }

  if (responseSuccess) {
    populateForm();
    setResponseSuccess(false);
  }

  function handleSessionSubmit(values) {
    axios
      .put(`${SERVER_URL}/climbingsession/${selectedID}`, {
        type_id: values.typeID,
        session_date: values.sessionDate,
        location: values.location,
        duration: values.duration,
        grade: values.grade,
        description: values.description,
        user_id: 1, // will be changed to dynamic
      })
      .then(() => {
          navigate("/redirect");
      })
      .catch(console.error);
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
          Climbing Session 
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
                <InputLabel id="climbingtypeID">Type of Climbing</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  {...formik.getFieldProps("typeID")}
                  helpertext={formik.touched.typeID && formik.errors.typeID}
                  label="climbingtype"
                  name="climbingtype"
                  value={formik.values.typeID}
                  onChange={(event) => {
                    const selectedType = typeData.find(
                      (option) => option.type_id === event.target.value
                    );
                    formik.setFieldValue("typeID", selectedType.type_id);
                  }}
                >
                  {typeData.map((option) => {
                    return (
                      <MenuItem key={option.type_id} value={option.type_id}>
                        {option.type_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.sessionDate}
                name="sessionDate"
                error={formik.touched.sessionDate && formik.errors.sessionDate}
                helperText={
                  formik.touched.sessionDate && formik.errors.sessionDate
                }
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Location"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.location}
                name="location"
                error={formik.touched.location && formik.errors.location}
                helperText={formik.touched.location && formik.errors.location}
                sx={{ mt: "1.5rem" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Duration"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.duration}
                name="duration"
                error={formik.touched.duration && formik.errors.duration}
                helperText={formik.touched.duration && formik.errors.duration}
                sx={{ mt: "1.5rem" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Grade: V2 or 5.8"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.grade}
                name="grade"
                error={formik.touched.grade && formik.errors.grade}
                helperText={formik.touched.grade && formik.errors.grade}
                sx={{ mt: "1.5rem" }}
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
                <IconButton color="neutral" variant="contained" onClick={showDelete} style={{ color: colors.redAccent[500] }} > 
                  <DeleteOutlineOutlinedIcon  />
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

export default EditModal;
