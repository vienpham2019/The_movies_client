import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../../helper/init.axios";

export default function TopMovies() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 5,
            sortBy: "vote_average",
          },
        });
        setMovies(response.data.metadata.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="top-movies-list"
      style={{ minWidth: "350px", maxWidth: "400px" }}
    >
      <header className="top-movies-list__header">
        <h2 className="section-movies-list__title">Top 5 List</h2>
      </header>
      <div className="top-movies-list__info">
        <div className="masvideos masvideos-movies">
          <div className="movies columns-1">
            <div className="movies__inner">
              {movies.slice(0, 5).map((movie, index) => (
                <div
                  className="movie"
                  role="button"
                  key={"movies page top movies movie " + movie.title + index}
                  onClick={async () => {
                    window.scrollTo(0, 0);
                    navigate(`/movie_info/${movie._id}`);
                  }}
                >
                  <div className="movie-list">
                    <div className="movie-list__body">
                      <span className="movie-list__year">
                        {movie.release_date.split("-")[0]}
                      </span>
                      <h3 className="movie-list__name">{movie.title}</h3>
                      <span className="movie-list__genre">{movie.genre}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
