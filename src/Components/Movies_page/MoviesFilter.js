import { useDispatch, useSelector } from "react-redux";
import { getMovieFilter } from "../../helper_method";
import { useEffect, useState } from "react";
import {
  A_set_fillter_movie_by_genre,
  A_set_sort_movie_by,
} from "../../reducer/Actions/movie_actions";

export default function MoviesFilter() {
  const filter_movies = [];
  const fillter_movie_by_year = null;
  const { counts, fillter_movie_by_genre, sort_movie_by } = useSelector(
    (state) => state.moviesReducer
  );
  const sortBy = {
    "Release Date": "release_date",
    "IMDB Score": "vote_average",
    Popularity: "popularity",
  };
  const [countGenres, setCountGenres] = useState({});
  const dispatch = useDispatch();

  let { years, ratings } = getMovieFilter(filter_movies);

  useEffect(() => {
    const initCounts = () => {
      const updateCountGenres = {
        Action: 0,
        Adventure: 0,
        "Sci-Fi": 0,
        Thriller: 0,
        Biography: 0,
        Crime: 0,
        Drama: 0,
        Music: 0,
        Romance: 0,
        Family: 0,
        Horror: 0,
        Comedy: 0,
        Sport: 0,
        Mystery: 0,
        Animation: 0,
        Short: 0,
        Documentary: 0,
        History: 0,
        War: 0,
        Fantasy: 0,
        Musical: 0,
        Western: 0,
        Adult: 0,
        "Film-Noir": 0,
      };

      counts.forEach((c) => {
        if (c.hasOwnProperty("genre")) {
          updateCountGenres[c.genre] = c.count;
        }
      });
      setCountGenres(updateCountGenres);
    };
    initCounts();
  }, [counts]);

  const filterByYear = (year) => {
    // let [y_start, y_end] = year.split("-");
    // let genre = fillter_movie_by_genre;
    // let f_movies = filter_movies.filter((movie) => {
    //   let y = Math.floor(movie.release_date.split("-")[0]);
    //   return Math.floor(y_start) <= y && Math.floor(y_end) >= y;
    // });
    // if (genre === "All") genre = f_movies[0].genre.split(", ")[0];
    // dispatch(A_filter_movies(f_movies));
    // dispatch(A_set_fillter_genre_and_year(genre, year));
    // dispatch(A_movie_page(0));
  };

  const filterByRating = (rating) => {
    // let genre = fillter_movie_by_genre;
    // let f_movies = filter_movies.filter(
    //   (movie) => Math.floor(movie.vote_average) === Math.floor(rating)
    // );
    // if (genre === "All") genre = f_movies[0].genre.split(", ")[0];
    // dispatch(A_set_fillter_genre_and_year(genre, fillter_movie_by_year));
    // dispatch(A_filter_movies(f_movies));
    // dispatch(A_movie_page(0));
  };

  return (
    <div>
      <div className="px-3 pb-2">
        <header className="top-movies-list__header m-0">
          <h2 className="section-movies-list__title">Genres</h2>
        </header>

        <div className="mt-2" style={{ columnCount: 2 }}>
          {Object.entries(countGenres).map(([_genre, count]) => (
            <div
              className="checkbox-wrapper"
              key={"movies page movies filter genre " + _genre + count}
            >
              <input
                id={`checkbox-${_genre}`}
                type="checkbox"
                checked={_genre === fillter_movie_by_genre && count !== 0}
                disabled={count === 0}
                onClick={() =>
                  dispatch(
                    A_set_fillter_movie_by_genre(
                      fillter_movie_by_genre === _genre ? "" : _genre
                    )
                  )
                }
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
          {Object.entries(sortBy).map(([key, _sort], index) => (
            <div
              className="checkbox-wrapper"
              key={"movies page movies filter sortBy " + _sort + index}
            >
              <input
                id={`checkbox-${_sort}`}
                type="checkbox"
                checked={_sort === sort_movie_by}
                onClick={() => dispatch(A_set_sort_movie_by(_sort))}
              />
              <label
                for={`checkbox-${_sort}`}
                className="text-white checkbox-label m-0"
              ></label>
              <label className="checkbox-category text-white">{key}</label>
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
    </div>
  );
}
