import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./components/Topbar/Topbar";
import SidebarList from "./components/SidebarList/SidebarList";
import Dashboard from "./pages/Dashboard/Dashboard";
import ClimbingTracker from "./pages/ClimbingTracker/ClimbingTracker";
import GoalSetting from "./pages/GoalSetting/GoalSetting";
import PackingList from "./pages/PackingList/PackingList";
import Outdoor from "./pages/Outdoor/Outdoor";
import Redirect from "./pages/Redirect/Redirect";
import RedirectSession from "./pages/RedirectSession/RedirectSession"
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarList />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route
                path="/climbingtracker"
                element={<ClimbingTracker />}
              ></Route>
              <Route path="/goalsetting" element={<GoalSetting />}></Route>
              <Route path="/packinglist" element={<PackingList />}></Route>
              <Route path="/outdoor" element={<Outdoor />}></Route>
              <Route path="/redirect" element={<Redirect />}></Route>
              <Route path="/redirectSession" element={<RedirectSession />}></Route>

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
