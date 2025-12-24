import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./pages/Root.jsx";
import Welcome from "./pages/Welcome.jsx";
import About from "./pages/About.jsx";
import ErrorPage from "./pages/Error.jsx";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Welcome />} />
      <Route path="about" element={<About />} />

      <Route
      path="test-error"
      loader={() => {
      throw new Response("Тестова помилка", { status: 500 });
      }}
      element={<div>Test</div>}
      errorElement={<ErrorPage />}
      />

      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
