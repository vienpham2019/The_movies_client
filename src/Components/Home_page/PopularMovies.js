import MovieContent from "./MovieContent";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import axios from "../../helper/init.axios";
import { useEffect, useState } from "react";

export default function PopularMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [popular_movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 15,
            sortBy: "popularity",
          },
        });
        console.log(response);
        setMovies(response.data.metadata.movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mx-auto" style={{ width: "85%" }}>
        <div className="home-movie-section-aside-header__inner">
          <div className="masvideos masvideos-movies">
            <div className="movies columns-7">
              <div className="movies__inner justify-content-center">
                <header className="home-section_header">
                  <h1 className="home-section__title">
                    Popular Movies <br />
                    to Watch Now
                  </h1>
                  <p className="home-section__subtitle m-0">
                    Most watched movies by days
                  </p>
                  <hr />
                  <div className="home-section__action">
                    <span
                      className="home-section__action-link left-underline"
                      role="button"
                      onClick={() => {
                        window.scrollTo(0, 0);
                        navigate("/movies");
                      }}
                    >
                      View all
                    </span>
                  </div>
                </header>

                {/* Movie contain  */}
                {popular_movies.map((movie) => {
                  return (
                    <MovieContent
                      movie={movie}
                      key={"home page popular movie " + movie.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
