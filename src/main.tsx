import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import HabitProvider from "./Contexts/HabitContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HabitProvider>
      <App />
    </HabitProvider>
  </React.StrictMode>
);
