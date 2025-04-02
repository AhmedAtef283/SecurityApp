import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import UserInputPage from "./pages/UserInputPage";
import LogTablePage from "./pages/LogTablePage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/userinput" element={<UserInputPage />} />
      <Route path="/logs" element={<LogTablePage />} />
    </Routes>
  </BrowserRouter>
);
