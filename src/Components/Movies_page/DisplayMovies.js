import {
  getDate,
  getFirstNGenre,
  getMovieAndReviews,
} from "../../helper_method";
import {
  handle_update_widhlist,
  handle_update_favorite,
  handle_notification,
} from "../../user_helper_method";
import { useDispatch, useSelector } from "react-redux";
import { A_set_movie_info } from "../../reducer/Actions/movie_info_action";
import {
  A_update_widhlist,
  A_update_favorite,
} from "../../reducer/Actions/user_action";

import { A_set_notification } from "../../reducer/Actions/notification_action";
import { useNavigate } from "react-router-dom";

export default function DisplayMovies(props) {
  const navigate = useNavigate();
  let { vodi_value } = props;
  const { notifications } = useSelector((state) => state.notificationReducer);
  const { filter_movies, movie_page, display_movies_amount } = useSelector(
    (state) => state.moviesReducer
  );
  const { widhlists, favorites, user, token } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  const display_movies = filter_movies.slice(
    movie_page * display_movies_amount,
    (movie_page + 1) * display_movies_amount
  );

  const handle_widhlist = async (movie) => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }
    dispatch(
      A_set_notification([
        ...notifications,
        handle_notification(widhlists, "Wishlists", movie),
      ])
    );
    dispatch(
      A_update_widhlist(await handle_update_widhlist(widhlists, movie, token))
    );
  };

  const handle_favorite = async (movie) => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }
    dispatch(
      A_set_notification([
        ...notifications,
        handle_notification(favorites, "Favorites", movie),
      ])
    );
    dispatch(
      A_update_favorite(await handle_update_favorite(favorites, movie, token))
    );
  };

  return (
    <div className="vodi-archive-wrapper px-3" data-view={vodi_value}>
      <div
        className={`movies ${
          vodi_value === "grid-extended" ? "columns-4" : "columns-5"
        }`}
      >
        <div className="movies__inner">
          {display_movies.map((movie, index) => (
            <div
              className="movie p-2"
              key={"movies page display movies movie " + movie.title + index}
            >
              <div
                className="movie__poster h-100"
                role="button"
                onClick={async () => {
                  let _data = await getMovieAndReviews(movie);
                  window.scrollTo(0, 0);
                  dispatch(A_set_movie_info(_data));
                  navigate("/movie_info");
                }}
              >
                <img
                  src={movie.poster_path}
                  alt={movie.title}
                  className="movie__poster--image h-100"
                  style={{ width: "300px" }}
                />
              </div>
              <div className="movie__body px-2">
                <div className="movie__info">
                  <div className="movie__info--head mb-2">
                    <div className="movie__meta">
                      <span className="movie__meta--release-year">
                        {getDate(movie.release_date)[2]}
                      </span>
                      <span className="movie__meta--genre text-info">
                        {getFirstNGenre(movie.genre, 3)}
                      </span>
                    </div>
                    <span className="masvideos-LoopMovie-link masvideos-loop-movie__link movie__link">
                      <div className="row">
                        <div className="col-12 text-truncate text-white">
                          <strong style={{ fontSize: "1em" }}>
                            {movie.title}
                          </strong>
                        </div>
                      </div>
                    </span>
                  </div>
                  <div
                    className="mb-2"
                    style={{
                      display:
                        vodi_value === "list-large" || vodi_value === "list"
                          ? "block"
                          : "none",
                    }}
                  >
                    <div className="text-justify">
                      <p className="text__ px-2">{movie.overview}</p>
                    </div>
                  </div>
                  <div className="movie__actions mt-5">
                    <span
                      className="btn_ btn-block_ btn-outline-dark_ text-white border mr-2"
                      role="button"
                      style={{ width: "150px" }}
                      onClick={async () => {
                        window.scrollTo(0, 0);
                        let _data = await getMovieAndReviews(movie);
                        dispatch(A_set_movie_info(_data));
                        props.history.push("/movie_info");
                      }}
                    >
                      <i className="fas fa-info"></i> More Info
                    </span>
                    <div className="mx-1">
                      <span
                        className={`btn_ btn-block_ btn-outline-dark_ ${
                          user && widhlists.has(movie.id)
                            ? "text-success border-success"
                            : "text-white border"
                        }`}
                        role="button"
                        onClick={() => handle_widhlist(movie)}
                      >
                        <i className="fas fa-plus"></i> Widhlist
                      </span>
                    </div>
                    <div className="mx-1">
                      <span
                        className={`btn_ btn-block_ btn-outline-dark_ ${
                          user && favorites.has(movie.id)
                            ? "text-success border-success"
                            : "text-white border"
                        }`}
                        role="button"
                        onClick={() => handle_favorite(movie)}
                      >
                        <i className="fas fa-heart"></i> Favorite
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-info">
                  {" "}
                  {movie.vote_average} <i className="fas fa-star"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
