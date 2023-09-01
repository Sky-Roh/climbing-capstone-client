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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50rem",
  height: "40rem",
  bgcolor: "background.paper",
  border: "1px solid grey",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: "2rem",
};

const SessionItem = ({selectedDate}) => {
  const navigate = useNavigate();
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    axios.get(SERVER_URL + "/climbingtype").then((res) => {
      setTypeData(res.data);
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      typeID: 0,
      sessionDate: selectedDate,
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

  function handleSessionSubmit(values) {
    axios
      .post(SERVER_URL + "/climbingsession", {
        type_id: values.typeID,
        session_date: values.sessionDate,
        location: values.location,
        duration: values.duration,
        grade: values.grade,
        description: values.description,
        user_id: 1, // will be changed to dynamic
      })
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
          Record your Climbing Session
        </Typography>
        <Box display="flex" alignItems="center">
          <Box>
            <form onSubmit={formik.handleSubmit}>
              {/* check this part */}
              <FormControl
                fullWidth
                variant="filled"
                sx={{ mb: "1.5rem", minWidth: 120 }}
                error={formik.touched.typeID}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2", mt: "1.5rem" }}
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
                sx={{ gridColumn: "span 2", mt: "1.5rem" }}
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
                sx={{ gridColumn: "span 2", mt: "1.5rem" }}
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
                sx={{ gridColumn: "span 2", mt: "1.5rem" }}
              />
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add New Session
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SessionItem;

// const GoalSetting = () => {
//   const isNonMobile = useMediaQuery("(min-width:600px)");

//   const handleFormSubmit = (values) => {
//     console.log(values);
//   };

//   return (
//     <Box m="20px">
//       <Formik
//         onSubmit={handleFormSubmit}
//         initialValues={initialValues}
//         validationSchema={checkoutSchema}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <Box
//               display="grid"
//               gap="30px"
//               gridTemplateColumns="repeat(4, minmax(0, 1fr))"
//               sx={{
//                 "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
//               }}
//             >
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="First Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.firstName}
//                 name="firstName"
//                 error={!!touched.firstName && !!errors.firstName}
//                 helperText={touched.firstName && errors.firstName}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Last Name"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.lastName}
//                 name="lastName"
//                 error={!!touched.lastName && !!errors.lastName}
//                 helperText={touched.lastName && errors.lastName}
//                 sx={{ gridColumn: "span 2" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Email"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.email}
//                 name="email"
//                 error={!!touched.email && !!errors.email}
//                 helperText={touched.email && errors.email}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Contact Number"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.contact}
//                 name="contact"
//                 error={!!touched.contact && !!errors.contact}
//                 helperText={touched.contact && errors.contact}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Address 1"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.address1}
//                 name="address1"
//                 error={!!touched.address1 && !!errors.address1}
//                 helperText={touched.address1 && errors.address1}
//                 sx={{ gridColumn: "span 4" }}
//               />
//               <TextField
//                 fullWidth
//                 variant="filled"
//                 type="text"
//                 label="Address 2"
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 value={values.address2}
//                 name="address2"
//                 error={!!touched.address2 && !!errors.address2}
//                 helperText={touched.address2 && errors.address2}
//                 sx={{ gridColumn: "span 4" }}
//               />
//             </Box>
//             <Box display="flex" justifyContent="end" mt="20px">
//               <Button type="submit" color="secondary" variant="contained">
//                 Create New User
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };

// export default GoalSetting;
