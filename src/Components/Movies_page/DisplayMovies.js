import { getDate, getFirstNGenre } from "../../helper_method";

import { useNavigate } from "react-router-dom";

export default function DisplayMovies({ vodi_value, movies }) {
  const navigate = useNavigate();

  if (movies.length === 0)
    return (
      <div className="d-flex justify-content-center">
        <span className="fs-4 fw-bold text-light">No movie found</span>
      </div>
    );

  return (
    <div className="vodi-archive-wrapper px-3 " data-view={vodi_value}>
      <div
        className={`movies ${
          vodi_value === "grid-extended" ? "columns-4" : "columns-5"
        }`}
      >
        <div className="movies__inner">
          {movies.map((movie, index) => (
            <div
              className="movie p-2"
              key={"movies page display movies movie " + movie.title + index}
            >
              <div
                className="movie__poster h-100"
                role="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/movie_info/${movie._id}`);
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
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate(`/movie_info/${movie._id}`);
                      }}
                    >
                      <i className="fas fa-info"></i> More Info
                    </span>
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
