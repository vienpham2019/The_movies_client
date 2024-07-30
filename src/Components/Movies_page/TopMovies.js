import { useSelector, useDispatch } from "react-redux";
import { A_set_movie_info } from "../../reducer/Actions/movie_info_action";
import { getMovieAndReviews } from "../../helper_method";
export default function TopMovies(props) {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.moviesReducer);
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
                    let _data = await getMovieAndReviews(movie);
                    window.scrollTo(0, 0);
                    dispatch(A_set_movie_info(_data));
                    props.history.push("/movie_info");
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
