import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

// Pages
import HomePage from "./Components/Home_page/HomePage";
import MoviesPage from "./Components/Movies_page/MoviesPage";
import MovieInfoPage from "./Components/MovieDetail_page/MovieInfoPage";
import UserProfile from "./Components/User_profile/UserProfile";
import PageNotFound from "./Components/PageNotFound";
import LoadingPage from "./Components/LoadingPage";

// Other
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

// Modal
import LoginModal from "./Components/Modal/LoginModal";
import MovieTrailerModal from "./Components/Modal/MovieTrailerModal";
import NotificationModal from "./Components/Modal/NotificationModal";

// Action
import { A_set_top_movies } from "./reducer/Actions/top_movies_action";
import { A_set_movies } from "./reducer/Actions/movies_action";

export default function App() {
  const [load, setLoad] = useState(true);
  useEffect(() => {
    // getMovies();
  }, []);

  const dispatch = useDispatch();

  const getMovies = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/movie`);
    const data = await res.json();
    let popular_movies = data
      .slice()
      .sort((a, b) => b.popularity - a.popularity);

    let top_ranking_movies = data
      .slice()
      .sort((a, b) => b.vote_average - a.vote_average);

    let newest_movies = data;

    dispatch(
      A_set_top_movies(newest_movies, top_ranking_movies, popular_movies)
    );
    dispatch(A_set_movies(data));
    setLoad(false);
  };

  // if (load) return <LoadingPage />;

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie_info" element={<MovieInfoPage />} />
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
