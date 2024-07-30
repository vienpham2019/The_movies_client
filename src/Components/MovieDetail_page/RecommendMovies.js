import { useSelector, useDispatch } from "react-redux";
import { randomNumber, getMovieAndReviews } from "../../helper_method";
import { A_set_movie_info } from "../../reducer/Actions/movie_info_action";
export default function RecommendMovies({ movie }) {
  const { movies } = useSelector((state) => state.moviesReducer);
  const genres = movie.genre.split(",");
  const genre = genres[randomNumber(0, genres.length)];
  const ran_num = randomNumber(8, movies.length - 8) + 8;
  const recommend_movies = movies
    .filter(
      (_movie) =>
        _movie.genre.match(new RegExp(genre, "i")) &&
        _movie.title !== movie.title
    )
    .slice(ran_num - 8, ran_num);
  const dispatch = useDispatch();

  return (
    <section className="movie__related my-5 bg-light py-5">
      <div className="movie__related--inner">
        <div
          className="masvideos masvideos-movies mx-auto"
          style={{ width: "80%" }}
        >
          <h4 className="mb-4 border-bottom pb-2">
            {" "}
            <span className="py-3 bg-light">You Also May Like</span>
          </h4>

          <div className="movies columns-8">
            <div className="movies__inner">
              {recommend_movies.map((movie) => (
                <div
                  className="movie"
                  role="button"
                  key={
                    "movie detail page recommend movies movie " + movie.title
                  }
                  onClick={async () => {
                    let _data = await getMovieAndReviews(movie);
                    window.scrollTo(0, 0);
                    dispatch(A_set_movie_info(_data));
                  }}
                >
                  <div className="movie__poster">
                    <div className="masvideos-LoopMovie-link masvideos-loop-movie__link movie__link">
                      <img
                        style={{ width: "300px", height: "450px" }}
                        src={movie.poster_path}
                        className="movie__poster--image"
                      />
                    </div>
                  </div>
                  <div className="movie__body">
                    <div className="movie__info">
                      <div className="movie__info--head">
                        <div className="movie__meta">
                          <span className="movie__meta--release-year">
                            {movie.release_date.split("-")[0]}
                          </span>

                          <span className="movie__meta--genre">
                            {movie.genre}
                          </span>
                        </div>

                        <h3 className="masvideos-loop-movie__title  movie__title">
                          {movie.title}
                        </h3>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
