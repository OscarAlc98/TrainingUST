import React from "react";
import { NavLink } from "react-router";

export default function Home() {
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Welcome</h3>
      </header>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p>Please, login or sign up to continue:</p>
        <NavLink to="/login" className="button rounded" style={{ marginRight: "1rem" }}>
          Login
        </NavLink>
        <NavLink to="/register" className="button rounded">
          Sign Up
        </NavLink>
      </div>
    </div>
  );
}
