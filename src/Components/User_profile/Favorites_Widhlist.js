import DisplayMovies from ".././Movies_page/DisplayMovies";
import Pagination from ".././Pagination";
import { useSelector } from "react-redux";

function Favorites_Widhlist(props) {
  let { title } = props;
  let { widhlists, favorites } = useSelector((state) => state.userReducer);
  const { filter_movies } = useSelector((state) => state.moviesReducer);
  let movies =
    title === "Widhlist"
      ? Array.from(widhlists.values())
      : Array.from(favorites.values());
  const displayAmount = 10;
  const pages = Math.ceil(filter_movies.length / displayAmount);

  return (
    <div className="bg-dark p-4 h-100 border">
      <h4 className="mb-4 border-bottom pb-2">
        {" "}
        <span className="py-3 bg-dark text-white">{title}</span>
      </h4>
      {movies.length ? (
        <DisplayMovies vodi_value={"grid"} history={props.history} />
      ) : (
        <div className="p-5 text-center">
          <i className="fas fa-clipboard-list text-white fa-4x py-3"></i> <br />
          <span className="text-white" style={{ fontSize: "2em" }}>
            Your {title} is empty!
          </span>
        </div>
      )}
      {pages > 1 && (
        <div>
          <hr />
          <Pagination pages={pages} />
        </div>
      )}
    </div>
  );
}

export default Favorites_Widhlist;
