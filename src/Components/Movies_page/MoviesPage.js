import { useEffect, useState } from "react";
import DisplayMovies from "./DisplayMovies";
import MoviesFilter from "./MoviesFilter";
import TopMovies from "./TopMovies";
import Pagination from ".././Pagination";
import "./Movies.css";

import axios from "../../helper/init.axios";
import { useDispatch, useSelector } from "react-redux";
import { A_set_counts } from "../../reducer/Actions/movie_actions";

export default function MoviesPage(props) {
  const dispatch = useDispatch();
  const [vodi_value, setVodiValue] = useState("grid");
  const [displaySideBar, setSideBar] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const { fillter_movie_by_year, fillter_movie_by_genre, sort_movie_by } =
    useSelector((state) => state.moviesReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/movie/all`, {
          params: {
            page,
            limit,
            searchByGenre: fillter_movie_by_genre,
            sortBy: sort_movie_by,
            sortDir: -1,
            search,
          },
        });
        setMovies(response.data.metadata.movies);
        setTotalMovies(response.data.metadata.totalMovies);
        dispatch(A_set_counts(response.data.metadata.counts));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, search, fillter_movie_by_genre, sort_movie_by]);

  let vodi = [
    { type: "grid", value: "fas fa-th" },
    { type: "grid-extended", value: "fas fa-th-large" },
    { type: "list-large", value: "fas fa-list-ul" },
    { type: "list", value: "fas fa-bars" },
  ];

  const pages = Math.ceil(totalMovies / limit);

  return (
    <div
      className="home-section section-movies-list w-100 m-0"
      style={{ paddingTop: "90px" }}
    >
      <div className="mx-auto widget-area" style={{ width: "93%" }}>
        <div className="section-movies-list__inner">
          {/*  */}
          <div className={`sidebar ${displaySideBar && "active"}`}>
            <div
              className="dismiss"
              role="button"
              onClick={() => setSideBar(!displaySideBar)}
            >
              <i className="fas fa-times"></i>
            </div>
            <div
              className="top-movies-list mb-4"
              style={{ minWidth: "350px", maxWidth: "400px" }}
            >
              <MoviesFilter />
            </div>

            <TopMovies history={props.history} />
          </div>

          <div className="featured-with-list-view-movies-list pl-4 w-100">
            <header className="featured-with-list-view-movies-list__header">
              <div className="row w-100 m-0">
                <h2 className="section-movies-list__title">Movies</h2>
                <input
                  type="text"
                  className="mx-auto w-50 form-control border-0"
                  style={{ maxHeight: "30px" }}
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value.trim())}
                />
              </div>
            </header>
            {/*  */}
            <ul className="d-flex justify-content-end">
              {vodi.map((value, index) => (
                <li
                  className={`p-1 vodi-button ${
                    vodi_value === value.type ? "nav-item bg-info" : "nav-item"
                  }`}
                  role="button"
                  key={"movies page movies page vodi " + value.type + index}
                  onClick={() => setVodiValue(value.type)}
                >
                  <span className="mx-2">
                    <i className={value.value + " text-white"}></i>
                  </span>
                </li>
              ))}
              <li
                className="ml-4 px-3 sidebar--toggler border text-center"
                role="button"
                onClick={() => setSideBar(!displaySideBar)}
              >
                <span className="text-white">
                  <i className="fas fa-sliders-h mr-1"></i>
                  <span>Filters</span>
                </span>
              </li>
            </ul>

            <div className="w-100">
              <div
                className="custom-scrollbar "
                style={{
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <DisplayMovies movies={movies} vodi_value={vodi_value} />
              </div>
              <hr />
              {pages > 1 && (
                <Pagination
                  pages={pages}
                  currentPage={page}
                  setPage={(page) => setPage(page)}
                />
              )}
              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
