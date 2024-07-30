import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import MovieHeader from "./MovieHeader";
import MovieDescription from "./MovieDescription";
import MovieReviews from "./MovieReviews";
import RecommendMovies from "./RecommendMovies";
import { A_movie_page } from "../../reducer/Actions/movies_action";
import "./MovieInfoPage.css";
import { useNavigate } from "react-router-dom";

export default function MovieInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie } = useSelector((state) => state.movieInfoReducer);
  if (!movie) navigate("/");
  useEffect(() => dispatch(A_movie_page(0)));
  return (
    <div>
      {movie && (
        <div style={{ zIndex: "2" }}>
          <MovieHeader />
          <MovieDescription />
          <RecommendMovies />
          <MovieReviews />
        </div>
      )}
    </div>
  );
}
