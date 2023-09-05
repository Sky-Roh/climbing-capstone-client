import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";
import {
  Box,
  Typography,
  useTheme,
  CircularProgress,
  IconButton,
  Modal
} from "@mui/material";
import { tokens } from "../../theme";
import GoalItem from "../../components/GoalItem/GoalItem";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import AddGoal from "../../components/AddGoal/AddGoal";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const GoalSetting = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalInfo, setGoalInfo] = useState([]);
  const [showAdd, setShowAdd] = useState(false)
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    axios.get(`${SERVER_URL}/goals`).then((res) => {
      const goals = res.data;
      setGoalInfo(goals);
      console.log(goals);
      const completedGoals = goals.filter(
        (goal) => goal.achievement === "Completed"
      ).length;
      const inProgressGoals = goals.filter(
        (goal) => goal.achievement === "In Progress"
      ).length;
      const waitingGoals = goals.filter(
        (goal) => goal.achievement === "Waiting"
      ).length;

      //sort by progress and label them
      const chartData = {
        labels: ["Completed", "In Progress", "Waiting"],
        // datasets with backgroundColor
        datasets: [
          {
            data: [completedGoals, inProgressGoals, waitingGoals],
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
          },
        ],
      };

      setData(chartData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (chartRef.current && data.labels.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: data,
      });
    }
  }, [data]);

  const handleAddGoal = () => {
    setShowAdd(true)
  };

  const handleAddClose = () => {
    setShowAdd(false)
  }

  return (
    <>
      <Modal
        open={showAdd}
        onClose={handleAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <AddGoal />
          
        </>
      </Modal>
      <Box
        display="flex"
        margin="0 1.5rem"
        maxHeight="80%"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "60%",
            flexDirection: "column",
            alignItems: "center",
            margin: "0",
            maxHeight: "75vh",
          }}
        >
          <Typography
            variant="h2"
            fontWeight="600"
            margin="1rem 0"
            color={colors.primary[100]}
          >
            Climbing Goals by Progress
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <canvas
              id="canvas"
              ref={chartRef}
              style={{ maxWidth: "43rem", maxHeight: "43rem" }}
            />
          )}
        </Box>
        <Box
          margin="4rem 1.5rem 0 1.5rem"
          backgroundColor={colors.blueAccent[100]}
          width="28%"
          height="80vh"
          borderRadius="0.5rem"
          overflow="auto"
        >
          <Box
            color={colors.primary[400]}
            sx={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}
          >
            <Typography
              margin="1rem 0"
              textAlign="center"
              variant="h5"
              fontWeight="600"
            >
              Goals
            </Typography>
            <IconButton
              sx={{ color: colors.primary[400] }}
              onClick={handleAddGoal}
            >
              <AddTaskOutlinedIcon />
            </IconButton>
          </Box>

          {goalInfo.map((goal) => {
            return (
              <GoalItem
                color={colors.primary[400]}
                key={goal.goal_id}
                id={goal.goal_id}
                goal={goal.goal}
                achievement={goal.achievement}
                check={goal.check}
                description={goal.description}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default GoalSetting;
