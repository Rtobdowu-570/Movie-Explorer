import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router";
import Homepage from "./assets/pages/Homepage";
import Moviepage from "./assets/pages/Moviepage";
import Movie from "./assets/pages/Movie";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Homepage />} />
      <Route path="/movie" element={<Moviepage />} />
      <Route path="/movie/:id" element={<Movie />} />
    </>,
  ),
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
