import React, { useState, useEffect } from "react";
import "./App.css";
// @ts-ignore
import ProjectsPage from "./projects/ProjectsPage";
// @ts-ignore
import ProjectPage from "./projects/ProjectPage";
// @ts-ignore
import NewProject from "./newProject/NewProject";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";

// @ts-ignore
import AuthService from "./services/auth.service";
// @ts-ignore
import EventBus from "./common/EventBus.js";

// @ts-ignore
import Login from "./components/Login.component.jsx";
// @ts-ignore
import Register from "./components/Register.component.jsx";
// @ts-ignore
import Profile from "./components/Profile.component.jsx";
// @ts-ignore
import BoardUser from "./components/BoardUser.component.jsx";
// @ts-ignore
import BoardModerator from "./components/BoardModerator.component.jsx";
// @ts-ignore
import BoardAdmin from "./components/BoardAdmin.component.jsx";

// @ts-ignore
import Home from "./components/Home.component.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState<any>(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    const handleLogoutEvent = () => {
      logOut();
    };

    EventBus.on("logout", handleLogoutEvent);
    return () => {
      EventBus.remove("logout", handleLogoutEvent);
    };
  }, []);

  return (
    <BrowserRouter>
      <header className="sticky">
        <span className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </span>

        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects" className="button rounded">
          Projects
        </NavLink>
        <NavLink to="/newProject" className="button rounded">
          New Project
        </NavLink>

        {showModeratorBoard && (
          <NavLink to="/mod" className="button rounded">
            Moderator Board
          </NavLink>
        )}
        {showAdminBoard && (
          <NavLink to="/admin" className="button rounded">
            Admin Board
          </NavLink>
        )}
        {currentUser && (
          <NavLink to="/user" className="button rounded">
            User
          </NavLink>
        )}

        <div style={{ marginLeft: "auto" }}>
          {currentUser ? (
            <>
              <NavLink to="/profile" className="button rounded">
                {currentUser.username}
              </NavLink>
              <NavLink to="/login" className="button rounded" onClick={logOut}>
                LogOut
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="button rounded">
                Login
              </NavLink>
              <NavLink to="/register" className="button rounded">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </header>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/newProject" element={<NewProject />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
