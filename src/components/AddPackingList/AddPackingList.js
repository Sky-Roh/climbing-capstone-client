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
  width: "40%",
  height: "60%",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const AddPackingList = ({ typeData }) => {
  const [redirect, setRedirect] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    axios.get(SERVER_URL + "/climbingtype").then((res) => {});
  }, []);

  const formik = useFormik({
    initialValues: {
      packing_item: "",
      important_level: "",
      check: false,
      climbingtype_name: "Indoor Bouldering",
      user_id: 1,
    },
    validationSchema: Yup.object({
      packingItem: Yup.string()
        .max(30, "Must be 30 characters or less")
        .trim()
        .required("This field is required"),
        climbingtype_name: Yup.string().trim().required("This field is required"),
    }),
    onSubmit: handleSessionSubmit,
  });

  function handleSessionSubmit(values) {
    axios
      .post(SERVER_URL + "/packinglist", {
        packing_item: values.packingItem,
        important_level: values.importantLevel,
        check: values.check,
        climbingtype_name: values.climbingtype_name,
        user_id: 1,
      })
      .then(() => {
        setRedirect(true);
      })
      .catch(console.error);
  }

  if (redirect) {
    naviagte("/redirectSession");
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
          Record your Climbing Session
        </Typography>
        <Box display="flex" alignItems="center">
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ mb: "1.5rem", minWidth: 120 }}
              >
                <InputLabel id="climbingtypeID">Type of Climbing</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  {...formik.getFieldProps("climbingtype_name")}
                  helpertext={
                    formik.touched.climbingtype_name &&
                    formik.errors.climbingtype_name
                  }
                  label="climbingtype"
                  name="climbingtype"
                  value={formik.values.climbingtype_name}
                  onChange={(event) => {
                    formik.setFieldValue("climbingtype_name", event.target.value);
                  }}
                >
                  {typeData.map((option) => {
                    return (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Packing Item"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.packingItem}
                name="packingItem"
                error={formik.touched.packingItem && formik.errors.packingItem}
                helperText={
                  formik.touched.packingItem && formik.errors.packingItem
                }
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Important Level 1, 2, 3"
                InputProps={{ inputProps: { min: 1, max: 3 } }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.importantLevel}
                name="importantLevel"
                error={
                  formik.touched.importantLevel && formik.errors.importantLevel
                }
                helperText={
                  formik.touched.importantLevel && formik.errors.importantLevel
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

export default AddPackingList;
