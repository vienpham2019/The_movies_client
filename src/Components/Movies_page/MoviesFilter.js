import { useDispatch, useSelector } from "react-redux";
import { getMovieFilter } from "../../helper_method";
import {
  A_filter_movies,
  A_movie_page,
  A_set_fillter_genre_and_year,
  A_set_sort_movies_by,
} from "../../reducer/Actions/movies_action";

export default function MoviesFilter() {
  const {
    movies,
    filter_movies,
    fillter_movie_by_year,
    fillter_movie_by_genre,
    sort_movie_by,
  } = useSelector((state) => state.moviesReducer);

  const sortBy = ["Years", "IBM Rating", "Popularity"];
  const dispatch = useDispatch();

  let { genres, years, ratings } = getMovieFilter(filter_movies);
  genres["All"] = movies.length;

  const filterByGenre = (genre) => {
    let f_movies;
    if (genre === "All") {
      f_movies = movies;
      dispatch(A_set_fillter_genre_and_year(genre, " "));
    } else {
      f_movies = filter_movies.filter((movie) =>
        movie.genre.match(new RegExp(genre, "i"))
      );
      dispatch(A_set_fillter_genre_and_year(genre, fillter_movie_by_year));
    }
    dispatch(A_filter_movies(f_movies));
    dispatch(A_movie_page(0));
  };

  const filterByYear = (year) => {
    let [y_start, y_end] = year.split("-");
    let genre = fillter_movie_by_genre;
    let f_movies = filter_movies.filter((movie) => {
      let y = Math.floor(movie.release_date.split("-")[0]);
      return Math.floor(y_start) <= y && Math.floor(y_end) >= y;
    });
    if (genre === "All") genre = f_movies[0].genre.split(", ")[0];
    dispatch(A_filter_movies(f_movies));
    dispatch(A_set_fillter_genre_and_year(genre, year));
    dispatch(A_movie_page(0));
  };

  const filterByRating = (rating) => {
    let genre = fillter_movie_by_genre;
    let f_movies = filter_movies.filter(
      (movie) => Math.floor(movie.vote_average) === Math.floor(rating)
    );
    if (genre === "All") genre = f_movies[0].genre.split(", ")[0];
    dispatch(A_set_fillter_genre_and_year(genre, fillter_movie_by_year));
    dispatch(A_filter_movies(f_movies));
    dispatch(A_movie_page(0));
  };

  const sortMoviesBy = (sort) => {
    let f_movies =
      sort === "Years"
        ? filter_movies.sort(
            (a, b) =>
              Math.floor(b.release_date.split("-")[0]) -
              Math.floor(a.release_date.split("-")[0])
          )
        : sort === "IBM Rating"
        ? filter_movies.sort((a, b) => b.vote_average - a.vote_average)
        : filter_movies.sort((a, b) => b.popularity - a.popularity);
    dispatch(A_filter_movies(f_movies));
    dispatch(A_set_sort_movies_by(sort));
    dispatch(A_movie_page(0));
  };

  return (
    <div>
      <div className="px-3 pb-2">
        <header className="top-movies-list__header m-0">
          <h2 className="section-movies-list__title">Genres</h2>
        </header>

        <div className="mt-2" style={{ columnCount: 2 }}>
          {Object.entries(genres).map(([_genre, count]) => (
            <div
              className="checkbox-wrapper"
              key={"movies page movies filter genre " + _genre + count}
            >
              <input
                id={`checkbox-${_genre}`}
                type="checkbox"
                checked={_genre === fillter_movie_by_genre && count !== 0}
                disabled={count === 0}
                onClick={() => filterByGenre(_genre)}
              />
              <label
                for={`checkbox-${_genre}`}
                className="text-white checkbox-label m-0"
              ></label>
              <label
                className={`checkbox-category ${
                  count === 0 ? "text-muted line--through" : "text-white"
                }`}
              >
                {_genre} ({count})
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 pb-2">
        <header className="top-movies-list__header m-0">
          <h2 className="section-movies-list__title">Sort Movies</h2>
        </header>
        <div className="mt-2">
          {sortBy.map((_sort, index) => (
            <div
              className="checkbox-wrapper"
              key={"movies page movies filter sortBy " + _sort + index}
            >
              <input
                id={`checkbox-${_sort}`}
                type="checkbox"
                checked={_sort === sort_movie_by}
                onClick={() => sortMoviesBy(_sort)}
              />
              <label
                for={`checkbox-${_sort}`}
                className="text-white checkbox-label m-0"
              ></label>
              <label className="checkbox-category text-white">{_sort}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 pb-2">
        <header className="top-movies-list__header m-0">
          <h2 className="section-movies-list__title">Movies by years</h2>
        </header>

        <div className="mt-2 d-flex flex-wrap">
          {Object.entries(years).map(([_year, count]) => (
            <div
              className={`px-2 py-3 bd-highlight col m-2 text-center text-info btn btn-dark ${
                _year === fillter_movie_by_year && "border-success"
              } ${count === 0 && "text-muted"}`}
              role="button"
              aria-disabled="true"
              style={{ borderRadius: "0" }}
              onClick={() => count !== 0 && filterByYear(_year)}
              key={"movies page movie filter years " + _year + count}
            >
              {_year} <small className="d-inline text-white">({count})</small>
            </div>
          ))}
        </div>
      </div>

      <div className="px-3 pb-2">
        <header className="top-movies-list__header m-0">
          <h2 className="section-movies-list__title">Filter by Rating</h2>
        </header>

        <div className="my-2 d-flex flex-wrap">
          {Object.entries(ratings).map(([_rating, count]) => (
            <div
              className="p-1 text-info w-100 row m-0 justify-content-between left-underline border-white"
              role="button"
              onClick={() => filterByRating(_rating)}
              key={"movies page movie filter ratings " + _rating + count}
            >
              <div>
                {Array.from(Array(10), (_, i) => {
                  return (
                    <i className={`${i < _rating ? "fas" : "far"} fa-star`}></i>
                  );
                })}
              </div>
              <p className="text-white text-right">( {count} )</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
