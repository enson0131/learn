import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import User from "./components/User";
import Profile from "./components/Profile";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/user" Component={User} />
      <Route path="/profile" Component={Profile} />
    </Routes>
  </Router>
);
