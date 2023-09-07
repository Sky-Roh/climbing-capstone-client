import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import "./Dashboard.scss";
import mountNemo from "../../assets/images/mount-nemo.jpg";
import { Link } from "react-router-dom";
import MonthlyChart from "../../components/MonthlyChart/MonthlyChart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box maxHeight="80vh">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color={colors.grey[100]}
        margin="1.5rem"
      >
        <Typography mt="1rem" variant="h2" fontWeight="600">
          Welcome to{" "}
          <span style={{ color: `${colors.greenAccent[600]}`, marginBottom: "2rem" }}>
            ClimbStation 🧗‍♀️
          </span>
        </Typography>
      </Box>

      <Box margin="auto" width="50vw" color={colors.grey[100]}>
        <MonthlyChart />
      </Box>
      <Box>
        <Box
          color={colors.grey[100]}
          margin="1.5rem auto"
          width="50vw"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" marginBottom="1.5rem">
            ClimbStation is an all-in-one solution designed for climbers,
            providing them with the tools they need to enhance their climbing
            experience.
          </Typography>
          <Typography variant="h3"  display={{ xs: "none", sm: "none", lg: "block" }}>
            From tracking workouts and creating packing lists to offering
            real-time weather updates for outdoor climbing, this app is a
            must-have companion for both indoor and outdoor climbers.
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
        >
          <Link
            to="climbingtracker"
            style={{
              textDecoration: "none",
              color: `${colors.blueAccent[600]}`,
              textAlign: "center",
            }}
          >
            <Button
              variant="h1"
              sx={{ bgcolor: `${colors.primary[100]}`, fontWeight: "700" }}
            >
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
