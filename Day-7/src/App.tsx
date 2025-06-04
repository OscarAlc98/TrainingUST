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
import Home from "./components/Home.component.jsx";
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
    const stored = AuthService.getCurrentUser();
    if (stored && stored.user) {
      setCurrentUser(stored.user);
      setShowModeratorBoard(stored.user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(stored.user.roles.includes("ROLE_ADMIN"));
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

        {/* Siempre mostramos “Home” */}
        <NavLink to="/" className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>

        {/* SOLO SI HAY USER: Projects y New Project */}
        {currentUser && (
          <>
            <NavLink to="/projects" className="button rounded">
              Projects
            </NavLink>
            <NavLink to="/newProject" className="button rounded">
              New Project
            </NavLink>
          </>
        )}

        {/* SOLO SI HAY USER Y ES MODERATOR */}
        {showModeratorBoard && (
          <NavLink to="/mod" className="button rounded">
            Moderator Board
          </NavLink>
        )}
        {/* SOLO SI HAY USER Y ES ADMIN */}
        {showAdminBoard && (
          <NavLink to="/admin" className="button rounded">
            Admin Board
          </NavLink>
        )}
        {/* SOLO SI HAY USER */}
        {currentUser && (
          <NavLink to="/user" className="button rounded">
            User
          </NavLink>
        )}

        {/* Botones de login/profile/logout a la derecha */}
        <div style={{ marginLeft: "auto" }}>
          {currentUser ? (
            <>
              <NavLink to="/profile" className="button rounded">
                {currentUser.username}
              </NavLink>
              <NavLink to="/login" className="button rounded" onClick={logOut}>
                Log Out
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
          {/* Ruta “Home” para login/registro */}
          <Route path="/" element={<Home />} />

          {/* Rutas de proyectos: protegerlas más abajo (opcional) */}
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/newProject" element={<NewProject />} />

          {/* Rutas de autenticación */}
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
