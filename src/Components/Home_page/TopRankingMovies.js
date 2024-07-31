import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "../../helper/init.axios";

export default function TopRankingMovies() {
  const genres = ["Action", "Horror", "Sci-Fi", "Crime", "Drama", "Animation"];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter_genre, setFilterGenre] = useState("Action");
  const [display_movies, setDisplayMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 10,
            sortBy: "vote_average",
            searchByGenre: filter_genre,
          },
        });
        setDisplayMovies(response.data.metadata.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filter_genre]);

  const handleFilter = (genre) => {
    setFilterGenre(genre);
  };

  return (
    <div className="mx-auto" style={{ width: "80%" }}>
      <div className="home-section__inner">
        <header>
          <strong className="section-title">
            <span className="ml-2">Top Ranking Movies</span>
          </strong>
          <ul className="nav w-100 shadow-sm d-flex justify-content-center py-2 mb-3">
            {genres.map((genre) => (
              <li
                className="nav-item px-3 py-1"
                key={"home page top raking movies ganres " + genre}
              >
                <strong
                  className={`left-underline ${
                    filter_genre === genre ? "text-info" : "text-muted"
                  }`}
                  role="button"
                  onClick={() => handleFilter(genre)}
                  style={{ fontSize: "1.1em" }}
                >
                  {genre}
                </strong>
              </li>
            ))}
          </ul>
        </header>
        <div className="section-movies-carousel__carousel">
          <div className="movies-carousel__inner">
            <div className="masvideos masvideos-movies">
              <div className="movies colums-7">
                <div className="movies__inner slick-initialized slick-slider">
                  <div className="slick-list draggable">
                    <div className="slick-track d-flex justify-content-center flex-wrap mb-5">
                      {display_movies.map((movie) => (
                        <div
                          className="slick-slide shadow-hover-dark m-2 bd-highlight"
                          style={{ width: "265px" }}
                          role="button"
                          key={
                            "home page top raking movies movie " + movie.title
                          }
                          onClick={() => {
                            window.scrollTo(0, 0);
                            navigate(`/movie_info/${movie._id}`);
                          }}
                        >
                          <div
                            className="movie"
                            style={{
                              width: "100%",
                              display: "inline-block",
                            }}
                          >
                            <div className="movie__poster">
                              <span className="masvideos-LoopMovie-link masvideos-loop-movie__link movie__link">
                                <img
                                  src={movie.poster_path}
                                  className="movie__poster--image"
                                />
                              </span>
                            </div>
                            <div className="movie__body px-2">
                              <div className="movie__info">
                                <div className="movie__info--head">
                                  <div className="movie__meta">
                                    <span className="movie__meta--release-year">
                                      {movie.release_date.split("-")[0]}
                                    </span>
                                    <span className="movie__meta--genre text-info">
                                      {movie.genre}
                                    </span>
                                  </div>
                                  <h3 className="masvideos-loop-movie__title movie__title">
                                    {movie.title}
                                  </h3>
                                </div>
                              </div>
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
        {/*  */}
      </div>
      <div className="d-flex flex-row-reverse bd-highlight border-top">
        <p
          className="home-section__action-link p-2 bd-highlight"
          role="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/movies");
          }}
        >
          View All
        </p>
      </div>
    </div>
  );
}
