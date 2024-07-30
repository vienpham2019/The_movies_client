import { useEffect, useState } from "react";
import axios from "../../helper/init.axios";
import { useNavigate } from "react-router-dom";

export default function RecommendMovies({ movie: paramsMovie }) {
  const [recommend_movies, setRecommendMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/movie/recommendations/${paramsMovie._id}`,
          {
            params: {
              limit: 8,
            },
          }
        );
        setRecommendMovies(res.data.metadata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paramsMovie._id]);

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
                  onClick={() => {
                    navigate(`/movie_info/${movie._id}`);
                    window.scrollTo(0, 0);
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
