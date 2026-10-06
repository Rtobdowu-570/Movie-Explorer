import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router";

import Footer from "./assets/components/Footer";
import FeedbackPage from "./assets/components/FeedbackPage";
import Navbar from "./assets/components/Navbar";
import Homepage from "./assets/pages/Homepage";
import Movie from "./assets/pages/Movie";
import Moviepage from "./assets/pages/Moviepage";
import SearchResults from "./assets/pages/SearchResults";

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route element={<Homepage />} index />
      <Route element={<Moviepage />} path="movie" />
      <Route element={<Movie mediaType="movie" />} path="movie/:id" />
      <Route element={<Movie mediaType="tv" />} path="tv/:id" />
      <Route element={<SearchResults />} path="search" />
      <Route element={<FeedbackPage />} path="*" />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
