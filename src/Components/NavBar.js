import { useDispatch, useSelector } from "react-redux";
import {
  A_display_movies_amount,
  A_movie_page,
  A_set_sort_movies_by,
  A_set_fillter_genre_and_year,
  A_filter_movies,
} from "../reducer/Actions/movies_action";
import { A_set_user } from "../reducer/Actions/user_action";
import { useNavigate } from "react-router-dom";
function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const { movies } = useSelector((state) => state.moviesReducer);
  const { notifications } = useSelector((state) => state.notificationReducer);
  return (
    <nav
      className="py-3 navbar navbar-expand-lg fixed-top auto-hiding-navbar navbar-light border-bottom w-100 overflow-hidden"
      style={{
        top: "0px",
        backgroundColor: "rgba(0 , 0 , 0 , 0.6)",
        zIndex: "2",
      }}
    >
      <div className="container">
        <span className="navbar-brand py-0">
          <span></span>
        </span>
        <button
          className="navbar-toggler border bg-white"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-content"
          aria-controls="navbar-content"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-content">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item mx-2">
              <span
                role="button"
                className="btn btn-link"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/");
                }}
              >
                Home
              </span>
            </li>
            <li className="nav-item mx-2">
              <span
                role="button"
                className="btn btn-link"
                onClick={() => {
                  window.scrollTo(0, 0);
                  dispatch(A_set_fillter_genre_and_year("All", " "));
                  dispatch(A_set_sort_movies_by("Years"));
                  dispatch(A_display_movies_amount(20));
                  dispatch(A_filter_movies(movies));
                  dispatch(A_movie_page(0));
                  navigate("/movies");
                }}
              >
                Movies
              </span>
            </li>
            <li className="nav-item mx-2">
              {user ? (
                <span
                  role="button"
                  className="btn btn-link"
                  onClick={() => {
                    dispatch(
                      A_set_user(
                        { user: null, token: null },
                        { widhlists: [], favorites: [] }
                      )
                    );
                  }}
                >
                  Logout
                </span>
              ) : (
                <span
                  role="button"
                  id="login_nav_button"
                  className="btn btn-link"
                  data-toggle="modal"
                  data-target="#login-modal"
                >
                  Login
                </span>
              )}
            </li>

            <li className="nav-item ml-2">
              <span
                className="btn btn-link"
                type="button"
                role="button"
                onClick={() => {
                  window.scrollTo(0, 0);
                  if (!user) {
                    document.getElementById("login_nav_button").click();
                    return;
                  }
                  dispatch(A_display_movies_amount(10));
                  dispatch(A_movie_page(0));
                  navigate("/user_profile");
                }}
              >
                <i className="far fa-user"></i>
              </span>
              {!!notifications.length && user && (
                <span
                  className="px-2 py-1 bg-danger text-white rounded-circle m-0"
                  role="button"
                  data-toggle="modal"
                  data-target="#notificationModal"
                >
                  {notifications.length}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
