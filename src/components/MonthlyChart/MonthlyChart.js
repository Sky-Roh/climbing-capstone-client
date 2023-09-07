import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, Title, Tooltip } from 'chart.js';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const MonthlyChart = () => {
  const [climbingSessions, setClimbingSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/climbingsession`) 
      .then((res) => {
        setClimbingSessions(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // grouping the date by month to show by month
  const groupByMonth = (data) => {
    //need to sort because of database sort date by desc
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.session_date);
      const dateB = new Date(b.session_date);
      return dateA - dateB;
    });

    const groupedData = {}; //empty object
    sortedData.forEach((session) => {
        //Date format
      const sessionDate = new Date(session.session_date);
      const year = sessionDate.getFullYear();
      const month = sessionDate.getMonth();
      const monthKey = `${year}-${month}`;
      // year and month needed only
      if (!groupedData[monthKey]) {
        groupedData[monthKey] = {
          monthLabel: getMonthLabel(sessionDate),
          days: {},
        };
      }
      const dayOfMonth = sessionDate.getDate();
      groupedData[monthKey].days[dayOfMonth] = true;
    });
    return groupedData;
  };

  const getMonthLabel = (date) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    return monthNames[date.getMonth()];
  };

  const groupedData = groupByMonth(climbingSessions);
  const labels = Object.values(groupedData).map((monthData) => monthData.monthLabel);
  const dayCounts = Object.values(groupedData).map((monthData) =>
    Object.keys(monthData.days).length
  );

  ChartJS.register(Title, Tooltip, CategoryScale);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Days Climbed',
        data: dayCounts,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box >
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              title: {
                display: false,
                text: 'Month',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Days Climbed',
              },
              beginAtZero: true,
              max: 31, // Month has 31 days
            },
          },
        }}
      />
    </Box>
  );
};

export default MonthlyChart;
