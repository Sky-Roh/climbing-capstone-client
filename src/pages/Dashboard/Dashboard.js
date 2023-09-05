import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import "./Dashboard.scss";
import mountNemo from "../../assets/images/mount-nemo.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box color={colors.grey[100]}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography mt="1rem" variant="h2" fontWeight="600">
          Welcome to{" "}
          <span style={{ color: `${colors.greenAccent[600]}` }}>
            ClimbStation 🧗‍♀️
          </span>
        </Typography>
      </Box>
      <Box display="flex" margin="2rem">
        <Box
          margin="0 2rem"
          padding="1.5rem"
          backgroundColor={colors.grey[200]}
          borderRadius="0.5rem"
          maxHeight="70vh"
        >
          <img
            src={mountNemo}
            alt="Mount Nemo pic"
            style={{ width: "40vw", height: "60vh" }}
          />
          <Typography
            mr="1rem"
            textAlign="right"
            color={colors.blueAccent[600]}
          >
            Mount Nemo photo by Sky
          </Typography>
        </Box>
        <Box m="0 0 0 2rem" maxHeight="70vh" overflow="auto">
          <Typography variant="h3" mb="1.5rem">
            ClimbStation is your ultimate climbing companion, designed for both
            indoor and outdoor enthusiasts. Whether you're scaling artificial
            walls or conquering natural peaks, we've got everything you need to
            enhance your climbing journey.
          </Typography>
          <Typography variant="h3" mb="1.5rem">
            At ClimbStation, we're dedicated to elevating your climbing
            experience. Our platform offers a range of features to empower
            climbers of all levels. From tracking your climbing sessions to
            providing essential packing lists and up-to-date weather forecasts
            for outdoor, we're here to support your climbing adventures.
          </Typography>
          <Typography variant="h3" mb="1.5rem">
            Join our vibrant community of climbers and adventurers. Whether
            you're a seasoned pro or just starting your climbing journey,
            ClimbStation is your partner in reaching new heights. Unleash your
            potential, explore new challenges, and achieve your climbing goals
            with ClimbStation. Your next climb begins here.
          </Typography>

          <Link to="climbingtracker"
            style={{
              textDecoration: "none",
              color: `${colors.blueAccent[600]}`,
            }}
          >
            <Button variant="h1"  textAlign="right" sx={{ bgcolor: "white", fontWeight:"700"}}>
              Get Started
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
