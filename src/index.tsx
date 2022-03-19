import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "pages/home";
import Guide from "pages/guide";
import FAQ from "pages/faq";
import Security from "pages/security";
import Lists from "pages/lists";
import Login from "pages/login";
import Forgot from "pages/login/forgot";
import X from "pages/x";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<Home />} />
        <Route path="/newsguidelines" element={<Guide />} />
        <Route path="/newsfaq" element={<FAQ />} />
        <Route path="/security" element={<Security />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/login" element={<Login />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="/x" element={<X />} />
        <Route
          path="/submit"
          element={
            <Login
              message="You have to be logged in to submit."
              goto="/submit"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
