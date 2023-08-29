import TerrainOutlinedIcon from '@mui/icons-material/TerrainOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LegendToggleOutlinedIcon from '@mui/icons-material/LegendToggleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import packingListIcon from '@mui/icons-material/InventoryOutlined';
//import 'react-pro-sidebar/dist/scss/styles.scss'
import SidebarItem from '../SidebarItem/SidebarItem';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ColorModeContext, tokens } from '../../theme';
import { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";



const SidebarList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState();
    const [selected, setSelected] = useState();

    return (
        <Box display="flex"
        sx={{
            
            '.ps-sidebar-container' : {
              backgroundColor: `${colors.primary[400]} !important`
            },
            ".ps-menu-button" : {
                padding: '5px 25px 5px 20px'
            },
            ".ps-menu-button:hover, .ps-menu-label:hover, .css-h6q3q3-MuiTypography-root:hover" : {
                color: '#868dfb !important'
            },
            ".ps-menu-button:active" : {
                color: '#6870fa !important'
            },
            ".ps-sidebar-root" : {
              border: 'none'
            }
        }}>
        <Sidebar collapsed={isCollapsed}  >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Menu
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Box display="flex" justifyContent="center" alignItems="center" borderRadius="50%" width="6rem"
                  height="6rem" backgroundColor={`${colors.grey[200]} !important`}>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Sky Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Climber
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SidebarItem
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <SidebarItem
              title="Tracking"
              to="/tracking"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Packing List"
              to="/packinglist"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SidebarItem
              title="Outdoor"
              to="/outdoor"
              icon={<TerrainOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />           
            <SidebarItem
              title="Goal Setting"
              to="/goalsetting"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Box marginBottom={!isCollapsed ? "5.8rem" : "17rem"}>
            </Box>
             <SidebarItem
              title="Log Out"
              to="/logout"
              icon={<LogoutOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            </Box>
        </Menu>
      </Sidebar>
    </Box>
    );
};

export default SidebarList;