import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root.jsx";
import Welcome from "./pages/Welcome.jsx";
import About from "./pages/About.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Welcome />} />

      <Route path="about" element={<About />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
