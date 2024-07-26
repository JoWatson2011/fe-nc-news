import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./output.css";
import { UserProvider } from "./contexts/UserContext.jsx";
import { TopicsProvider } from "./contexts/TopicsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <TopicsProvider>
      <App />
    </TopicsProvider>
  </UserProvider>
);
