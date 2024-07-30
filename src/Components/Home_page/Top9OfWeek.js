import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { A_set_movie_info } from "../../reducer/Actions/movie_info_action";
import {
  A_filter_movies,
  A_set_sort_movies_by,
  A_set_fillter_genre_and_year,
  A_movie_page,
} from "../../reducer/Actions/movies_action";

import { getMovieAndReviews } from "../../helper_method";
import { useNavigate } from "react-router-dom";
import axios from "../../helper/init.axios";

export default function Top9OfWeek() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = ["Action", "Horror", "Animation", "Drama"];
  const [display_movies, setDisplayMovies] = useState([]);
  const [newest_movie_info, setNewestMovieInfo] = useState();

  const [filter_genre, setFilterGenre] = useState("Action");
  const [top10Movies, setTop10Movies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 10,
            searchByGenre: filter_genre,
          },
        });
        setDisplayMovies(res.data.metadata.movies);
        setNewestMovieInfo(res.data.metadata.movies[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter_genre]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 10,
            sortBy: "popularity",
            searchByGenre: filter_genre,
          },
        });
        setTop10Movies(res.data.metadata.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterMovies = (genre) => {
    setFilterGenre(genre);
  };
  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <div className="section-movies-list__inner">
        <div className="top-movies-list">
          <header className="top-movies-list__header">
            <h2 className="section-movies-list__title">Top 10 this Week</h2>
            <span className="text-info">Movie</span>
          </header>
          <div className="top-movies-list__info">
            <div className="masvideos masvideos-movies">
              <div className="movies columns-1">
                <div className="movies__inner">
                  {top10Movies.map((movie) => (
                    <div
                      className="movie"
                      role="button"
                      key={"home page home top 9 of week " + movie.title}
                      onClick={() => setNewestMovieInfo(movie)}
                    >
                      <div className="movie-list">
                        <div className="movie-list__body">
                          <span className="movie-list__year">
                            {movie.release_date.split("T")[0]}
                          </span>
                          <h2 className="movie-list__name">{movie.title}</h2>
                          <span className="movie-list__genre">
                            {movie.genre}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="featured-with-list-view-movies-list">
          <header className="featured-with-list-view-movies-list__header">
            <h2 className="section-movies-list__title">Newest Movies</h2>
            <ul className="nav nav-tabs border-0">
              {genres.map((genre) => (
                <li
                  className={`nav-item mx-3 ${
                    filter_genre === genre ? "text-info" : "text-muted"
                  }`}
                  role="button"
                  key={"home page top 9 of week genre " + genre}
                  onClick={() => handleFilterMovies(genre)}
                >
                  {genre}
                </li>
              ))}
            </ul>
          </header>
          <div className="featured-with-list-view-movies-list__info">
            <div className="featured-movie">
              <div className="masvideos masvideos-movies">
                <div className="movies columns-1">
                  <div className="movies__inner">
                    {newest_movie_info && (
                      <div className="movie">
                        <div
                          className="movie__poster"
                          style={{ minWidth: "190px" }}
                        >
                          <img
                            src={newest_movie_info.poster_path}
                            className="movie__poster--image"
                          />
                        </div>
                        <div className="movie__body pl-3">
                          <div className="movie__info">
                            <div className="movie__info--head">
                              <div className="movie__meta">
                                <span className="movie__meta--release-year">
                                  {newest_movie_info.release_date.split("T")[0]}
                                </span>
                              </div>

                              <h3 className="masvideos-loop-movie__title movie__title mb-0">
                                {newest_movie_info.title}
                              </h3>
                              <div className="text-info mt-2 mb-3">
                                <small>
                                  {newest_movie_info.runtime} |{" "}
                                  {newest_movie_info.genre}
                                </small>
                              </div>
                            </div>
                            <div className="movie__short-description">
                              <div>{newest_movie_info.overview}</div>
                            </div>
                            <div className="movie__actions">
                              <span
                                className="movie-actions--link_watch"
                                role="button"
                                onClick={async () => {
                                  let _data = await getMovieAndReviews(
                                    newest_movie_info
                                  );
                                  window.scrollTo(0, 0);
                                  dispatch(A_set_movie_info(_data));
                                  navigate("/movie_info");
                                }}
                              >
                                More Info
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="list-view-movies-list">
              <div className="masvideos masvideos-movies">
                <div className="movies columns-1">
                  <div className="movies__inner">
                    {display_movies.map((movie) => (
                      <div
                        className="movie"
                        onClick={() => setNewestMovieInfo(movie)}
                        key={
                          "home page top 9 of week display movies " +
                          movie.title
                        }
                      >
                        <div className="movie-list hvr-shrink">
                          <div
                            className="movie-list__poster"
                            style={{ minWidth: "90px" }}
                          >
                            <img
                              src={movie.poster_path}
                              className="movie__poster--image"
                            />
                          </div>
                          <div className="movie-list__body">
                            <span className="movie-list__year">
                              {movie.release_date.split("-")[0]}
                            </span>
                            <h3 className="movie-list__name">{movie.title}</h3>
                            <span className="movie-list__genre">
                              {movie.genre}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row-reverse bd-highlight border-top w-100 mt-5">
        <p
          className="home-section__action-link p-2 text-white"
          role="button"
          onClick={() => {
            window.scrollTo(0, 0);
            dispatch(A_filter_movies(display_movies));
            dispatch(A_set_fillter_genre_and_year(filter_genre, " "));
            dispatch(A_set_sort_movies_by("Years"));
            dispatch(A_movie_page(0));
            navigate("/movies");
          }}
        >
          View All
        </p>
      </div>
    </div>
  );
}
