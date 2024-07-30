import { createUseStyles } from "react-jss";
import { getDate, getFirstNGenre } from "../../helper_method";
import { useSelector, useDispatch } from "react-redux";

import {
  A_update_widhlist,
  A_update_favorite,
} from "../../reducer/Actions/user_action";

import { A_set_display_videos } from "../../reducer/Actions/movie_info_action";

import {
  handle_update_widhlist,
  handle_update_favorite,
  handle_notification,
} from "../../user_helper_method";

import { A_set_notification } from "../../reducer/Actions/notification_action";

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
export default function MovieHeader() {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notificationReducer);
  const { movie, movie_reviews } = useSelector(
    (state) => state.movieInfoReducer
  );

  const { widhlists, favorites, user, token } = useSelector(
    (state) => state.userReducer
  );

  const is_widhlists = user && widhlists.has(movie.id);
  const is_favorites = user && favorites.has(movie.id);

  const [month, day, year] = getDate(movie.release_date);
  const revies_avg_score = movie_reviews.length
    ? movie.reviews_total_score / movie_reviews.length
    : 0;

  const handle_widhlist = async () => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }
    dispatch(
      A_set_notification([
        ...notifications,
        handle_notification(widhlists, "Widhlist", movie),
      ])
    );
    dispatch(
      A_update_widhlist(await handle_update_widhlist(widhlists, movie, token))
    );
  };

  const handle_favorite = async () => {
    if (!user) {
      document.getElementById("login_nav_button").click();
      return;
    }

    dispatch(
      A_set_notification([
        ...notifications,
        handle_notification(favorites, "Favorites", movie),
      ])
    );

    dispatch(
      A_update_favorite(await handle_update_favorite(favorites, movie, token))
    );
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
                      {movie_reviews && movie_reviews.length})
                    </strong>
                    {Math.floor(revies_avg_score)}
                    /10
                  </span>
                </div>
                <div className="gt-stars">
                  {Array.from(Array(10)).map((_, i) => (
                    <i
                      className={`${
                        i + 1 <= revies_avg_score ? "fas" : "far"
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
