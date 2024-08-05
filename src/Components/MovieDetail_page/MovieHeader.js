import { createUseStyles } from "react-jss";
import { getFirstNGenre } from "../../helper_method";
import { useSelector, useDispatch } from "react-redux";

import { A_set_display_videos } from "../../reducer/Actions/movie_actions";

import { useEffect, useState } from "react";
import axios from "../../helper/init.axios";

const styles = createUseStyles({
  backgroundImage: (props) => ({
    "&::after": {
      content: `""`,
      backgroundImage: `url(${props})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      opacity: "0.3",
      filter: "blur(20px)",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      zIndex: "-1",
      position: "absolute",
    },
  }),
});
export default function MovieHeader({ movie }) {
  const dispatch = useDispatch();
  const { totalReviews, totalScore } = useSelector(
    (state) => state.movieInfoReducer
  );
  const [is_favorites, setIsFavorite] = useState(false);
  const [is_widhlists, setIsWidhlist] = useState(false);
  const { user } = useSelector((state) => state.userReducer);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) setIsFavorite(false);
      else {
        try {
          const res = await axios.get(`/favorite/isSelect`, {
            params: {
              userId: user._id,
              movieId: movie._id,
            },
          });
          setIsFavorite(res.data.metadata);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
    // Set interval to refetch every 14 minutes (840000 milliseconds)
    const interval = setInterval(fetchData, 840000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [user, movie]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) setIsWidhlist(false);
      else {
        try {
          const res = await axios.get(`/widhlist/isSelect`, {
            params: {
              userId: user._id,
              movieId: movie._id,
            },
          });
          setIsWidhlist(res.data.metadata);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [user, movie]);

  const [year, month, day] = movie.release_date.split("T")[0].split("-");

  const handle_widhlist = async () => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }
    try {
      if (!is_widhlists) {
        await axios.post(`/widhlist/new`, {
          userId: user._id,
          movieId: movie._id,
        });
      } else {
        await axios.delete(`/widhlist/delete`, {
          params: {
            userId: user._id,
            movieId: movie._id,
          },
        });
      }

      setIsWidhlist(!is_widhlists);
    } catch (error) {
      console.error(error);
    }
  };

  const handle_favorite = async () => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }

    try {
      if (!is_favorites) {
        await axios.post(`/favorite/new`, {
          userId: user._id,
          movieId: movie._id,
        });
      } else {
        await axios.delete(`/favorite/delete`, {
          params: {
            userId: user._id,
            movieId: movie._id,
          },
        });
      }
      setIsFavorite(!is_favorites);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gt-title-overview gt-style-1">
      <div
        className={`gt-cover ${styles(movie.backdrop_path).backgroundImage}`}
      >
        <div className="gt-flex-container">
          <div className="gt-poster">
            <img src={movie.poster_path} />
          </div>
          <div className="gt-details gt-part-1">
            <h6>{year}</h6>
            <span style={{ fontSize: "3em", lineHeight: "normal" }}>
              <strong>{movie.title}</strong>
            </span>
            <div className="gt-mini-summary">
              <p>{movie.plot}</p>
            </div>
            <div className="gt-items">
              <div className="gt-circular-items">
                <div className="gt-item gt-watch-trailer">
                  <div className="gt-button gt-style-3 gt-dark">
                    <div
                      role="button"
                      className="d-flex align-items-center"
                      data-toggle="modal"
                      data-target="#movieTrailerModal"
                      onClick={() =>
                        dispatch(A_set_display_videos(movie.videos))
                      }
                    >
                      <div className="gt-icon">
                        <i className="fas fa-play"></i>
                      </div>
                      <span>Watch the Trailer</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gt-dotted-items">
                <div className="gt-item gt-time">{movie.runtime}</div>
                <div className="gt-item gt-genres">
                  <ul>
                    <li>{getFirstNGenre(movie.genre, 3)}</li>
                  </ul>
                </div>
                <div className="gt-item gt-release-date">{`${month} ${day}, ${year}`}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gt-flex-container text-dark">
        <div className="gt-details gt-part-2">
          <div className="gt-inner-wrapper">
            <div className="gt-inner-items mx-auto">
              <div className="gt-user-ratings gt-style-1  p-0 pr-3">
                <div className="gt-results">
                  <span style={{ fontSize: "1.2em" }}>
                    <strong className="mr-2">
                      Reviews(
                      {totalReviews})
                    </strong>
                    {Math.floor(totalScore / totalReviews) || 0}
                    /10
                  </span>
                </div>
                <div className="gt-stars">
                  {Array.from(Array(10)).map((_, i) => (
                    <i
                      className={`${
                        i + 1 <= (Math.floor(totalScore / totalReviews) || 0)
                          ? "fas"
                          : "far"
                      } fa-star`}
                      key={
                        "movie detail page movie header review avg star " + i
                      }
                    ></i>
                  ))}
                </div>
              </div>
              <div className="gt-imdb-rating gt-style-1">
                <div className="gt-point">
                  <div className="gt-point">
                    {movie.vote_average.toFixed(1)}
                  </div>
                </div>
                <span>IMDb</span>
              </div>
              <div className="gt-network gt-style-1">
                <div className="gt-item-title">Network</div>
                <div className="gt-item-content">
                  <strong>A&amp;E</strong>
                </div>
              </div>
              <div className="gt-status gt-style-1">
                <div className="gt-item-title">Status</div>
                <div className="gt-item-content">
                  <strong>Post Production</strong>
                </div>
              </div>
            </div>
            <div className="gt-buttons">
              <div
                className={`gt-button gt-style-2 mx-2 btn rounded-0 bg-dark ${
                  is_widhlists ? "border-success" : "border-secondary"
                }`}
                onClick={async () => handle_widhlist()}
                role="button"
              >
                <div className="btn">
                  <i
                    className={`fas fa-plus ${
                      is_widhlists ? "text-success" : "text-white"
                    }`}
                  ></i>
                </div>
              </div>

              <div
                className={`gt-button gt-style-2 mx-2 btn rounded-0 ${
                  is_favorites ? "border-success" : "border-secondary"
                }`}
                onClick={async () => handle_favorite()}
                role="button"
              >
                <div className="btn">
                  <i
                    className={`far fa-heart ${is_favorites && "text-success"}`}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
