import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

// Pages
import HomePage from "./Components/Home_page/HomePage";
import MoviesPage from "./Components/Movies_page/MoviesPage";
import MovieInfoPage from "./Components/MovieDetail_page/MovieInfoPage";
import UserProfile from "./Components/User_profile/UserProfile";
import PageNotFound from "./Components/PageNotFound";

// Other
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

// Modal
import LoginModal from "./Components/Modal/LoginModal";
import MovieTrailerModal from "./Components/Modal/MovieTrailerModal";
import NotificationModal from "./Components/Modal/NotificationModal";

export default function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie_info/:id" element={<MovieInfoPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/user_profile" element={<UserProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <MovieTrailerModal />
      <Footer />
      <LoginModal />
      <NotificationModal />
      <ToastContainer />
    </div>
  );
}
