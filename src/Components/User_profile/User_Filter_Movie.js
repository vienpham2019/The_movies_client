import { useSelector, useDispatch } from "react-redux";
import { getGenres } from "../../user_helper_method";
import {
  A_filter_movies,
  A_movie_page,
  A_set_fillter_genre_and_year,
  A_set_sort_movies_by,
} from "../../reducer/Actions/movies_action";

export default function User_Filter_Movie(props) {
  const dispatch = useDispatch();
  let { title } = props;
  let { widhlists, favorites } = useSelector((state) => state.userReducer);
  const sortBy = ["Years", "IBM Rating", "Popularity"];
  const { filter_movies, fillter_movie_by_genre, sort_movie_by } = useSelector(
    (state) => state.moviesReducer
  );
  const movies =
    title === "Widhlist"
      ? Array.from(widhlists.values())
      : Array.from(favorites.values());
  const genres = getGenres(filter_movies);
  genres["All"] = movies.length;

  const filterByGenre = (genre) => {
    let f_movies;
    if (genre === "All") {
      f_movies = movies;
    } else {
      f_movies = filter_movies.filter((movie) =>
        movie.genre.match(new RegExp(genre, "i"))
      );
    }
    dispatch(A_set_fillter_genre_and_year(genre, " "));
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
      <header className="top-movies-list__header m-0">
        <h2 className="section-movies-list__title">Genres</h2>
      </header>
      <hr className="my-1" />
      <div className="mt-2" style={{ columnCount: 2 }}>
        {Object.entries(genres).map(([_genre, count]) => (
          <div
            className="checkbox-wrapper text-dark"
            key={"user profile page user filer movie genres " + _genre + count}
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
      <br />
      <header className="top-movies-list__header m-0">
        <h2 className="section-movies-list__title">Sort Movies</h2>
      </header>
      <hr className="my-1" />
      <div className="mt-2">
        {sortBy.map((_sort, index) => (
          <div
            className="checkbox-wrapper"
            key={"user profile page user filter movie sort " + _sort + index}
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
  );
}
