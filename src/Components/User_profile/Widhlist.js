import DisplayMovies from ".././Movies_page/DisplayMovies";
import Pagination from ".././Pagination";
import { useState, useEffect } from "react";
import axios from "../../helper/init.axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Widhlist() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [totalWidhlists, setTotalWidhlists] = useState(0);
  const [page, setPage] = useState(1);
  const [widhlists, setWidhlists] = useState([]);
  const [search, setSearch] = useState("");
  const limit = 10;
  const pages = Math.ceil(totalWidhlists / limit);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        navigate("/");
        document.getElementById("login_nav_button").click();
        return;
      }
      if (search !== "" && widhlists.length === 0) {
        return;
      }
      try {
        const response = await axios.get(`/widhlist/all/${user._id}`, {
          params: {
            page,
            limit,
            search,
          },
        });
        const { widhlists: dataWidhlists, totalWidhlists } =
          response.data.metadata;
        setTotalWidhlists(totalWidhlists);
        setWidhlists(dataWidhlists.map((f) => f.movieDetails));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page, search, user, navigate]);

  return (
    <div className="bg-dark p-4 h-100 border">
      <h4 className="mb-4 border-bottom pb-2">
        {" "}
        <span className="py-3 bg-dark text-white">Widhlist</span>
      </h4>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {widhlists.length ? (
        <DisplayMovies vodi_value={"grid"} movies={widhlists} />
      ) : (
        <div className="p-5 text-center">
          <i className="fas fa-clipboard-list text-white fa-4x py-3"></i> <br />
          <span className="text-white" style={{ fontSize: "2em" }}>
            Your widhlist is empty!
          </span>
        </div>
      )}
      {pages > 1 && (
        <Pagination
          pages={pages}
          currentPage={page}
          setPage={(page) => setPage(page)}
        />
      )}
    </div>
  );
}

export default Widhlist;
