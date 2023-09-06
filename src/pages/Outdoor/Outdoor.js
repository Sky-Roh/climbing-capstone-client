import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  useTheme,
  FormControl,
} from "@mui/material";
import { tokens } from "../../theme";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import humiditypercentIcon from "../../assets/icons/humidity-icon.png";

//icons for weather
import clearIcon from "../../assets/icons/clear.png";
import cloudIcon from "../../assets/icons/clouds.png";
import drizzleIcon from "../../assets/icons/drizzle.png";
import hazeIcon from "../../assets/icons/haze.png";
import humidityIcon from "../../assets/icons/humidity.png";
import mistIcon from "../../assets/icons/mist.png";
import fogIcon from "../../assets/icons/mist.png";
import rainIcon from "../../assets/icons/rain.png";
import snowIcon from "../../assets/icons/snow.png";
import thunderstormIcon from "../../assets/icons/thunderstorm.png";
import windIcon from "../../assets/icons/wind.png";
import unknownIcon from "../../assets/icons/unknown.png";

const API = process.env.REACT_APP_WEATHER_API;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
function getWeatherIcon(weather) {
  switch (weather) {
    case "Clear":
      return (
        <img
          src={clearIcon}
          alt="Clear"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Clouds":
      return (
        <img
          src={cloudIcon}
          alt="Clouds"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Rain":
      return (
        <img
          src={rainIcon}
          alt="Rain"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Mist":
      return (
        <img
          src={mistIcon}
          alt="Mist"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Thunderstorm":
      return (
        <img
          src={thunderstormIcon}
          alt="Thunderstorm"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Drizzle":
      return (
        <img
          src={drizzleIcon}
          alt="Drizzle"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Fog":
      return (
        <img
          src={fogIcon}
          alt="Fog"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Snow":
      return (
        <img
          src={snowIcon}
          alt="Snow"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    case "Haze":
      return (
        <img
          src={hazeIcon}
          alt="Haze"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
    default:
      return (
        <img
          src={unknownIcon}
          alt="Unknown"
          style={{ width: "6rem", height: "6rem" }}
        />
      );
  }
}

const Outdoor = () => {
  const [city, setCity] = useState("Milton");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    axios.get(`${API}q=${city},ON,CA&appid=${API_KEY}`).then((res) => {
      setWeatherData(res.data);
      setLoading(false);
    });
  }, [city]);

  return (
    <>
      <Box textAlign="center" color={colors.grey[100]}>
        <Typography variant="h2" fontWeight="600" m="1rem 0">
          <WbSunnyOutlinedIcon style={{ fontSize: "1.4rem" }} /> Weather
        </Typography>
        <Typography variant="h4" fontWeight="500" mb="1rem">
          For Outdoor Climbing in ONTARIO
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        width="50%"
        height="70vh"
        sx={{
          alignItems: "center",
          margin: "0 auto",
          padding: "1rem 0",
          backgroundColor: `${colors.greenAccent[600]}`,
          color: `${colors.grey[100]}`,
          borderRadius: "3rem",
        }}
      >
        <FormControl variant="standard" sx={{ minWidth: "50%" }}>
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            style={{ fontSize: "1.6rem", textAlign: "center" }}
          >
            <MenuItem value="Milton">Rattlesnake Point</MenuItem>
            <MenuItem value="The Blue Mountains">Metcalfe Rock</MenuItem>
            <MenuItem value="Lion's Head">Lion&#39;s Head</MenuItem>
            <MenuItem value="Niagara Falls">Niagara Glen</MenuItem>
            <MenuItem value="Mount Nemo">Mount Nemo</MenuItem>
          </Select>
        </FormControl>
        {loading ? (
          <CircularProgress />
        ) : weatherData ? (
          <>
            <Typography mt="2rem" variant="h2" fontWeight="600">
              {weatherData.name}
            </Typography>
            <Box mt="2rem">{getWeatherIcon(weatherData.weather[0].main)}</Box>
            <Typography variant="h2" mt="2rem" fontWeight="600">
              {Math.round(weatherData.main.temp - 273.15)}°C
            </Typography>
            <Box
              display="flex"
              sx={{
                mt: "2.5rem",
                justifyContent: "space-between",
                width: "100%",
                padding: "0 10rem",
              }}
            >
              <Box
                display="flex"
                sx={{
                  flexDirection: "column",
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <img
                  src={humiditypercentIcon}
                  alt="humidity"
                  style={{ width: "2rem", height: "2rem" }}
                />
                <Typography variant="h3" mt="2rem">
                  {weatherData.main.humidity}%
                </Typography>
              </Box>
              <Box
                display="flex"
                sx={{
                  flexDirection: "column",
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <img
                  src={windIcon}
                  alt="wind speed"
                  style={{ width: "2rem", height: "2rem" }}
                />
                <Typography variant="h3" mt="2rem">
                  {weatherData.wind.speed} km/h
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="h3" mt="2rem" textAlign="center">
                Feels like:{" "}
                <span>
                  {Math.round(weatherData.main.feels_like - 273.15)}°C
                </span>
              </Typography>
              <Box display="flex" sx={{ gap: "2rem"}}>
                <Typography variant="h3" mt="2rem">
                  Min{" "}
                  <span>
                    {Math.round(weatherData.main.temp_min - 273.15)}°C
                  </span>
                </Typography>
                <Typography variant="h3" mt="2rem">
                  Max{" "}
                  <span>
                    {Math.round(weatherData.main.temp_max - 273.15)}°C
                  </span>
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="body1">No data available</Typography>
        )}
      </Box>
    </>
  );
};

export default Outdoor;
