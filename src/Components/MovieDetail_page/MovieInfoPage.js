import { useEffect, useState } from "react";

import MovieHeader from "./MovieHeader";
import MovieDescription from "./MovieDescription";
import MovieReviews from "./MovieReviews";
import RecommendMovies from "./RecommendMovies";
import "./MovieInfoPage.css";
import axios from "../../helper/init.axios";
import { useParams } from "react-router-dom";

export default function MovieInfoPage() {
  const { id } = useParams(); // Extract the id from the URL
  const [movie, setMovie] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/movie/details/${id}`);
        setMovie(res.data.metadata);
        console.log(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {movie && (
        <div style={{ zIndex: "2" }}>
          <MovieHeader movie={movie} />
          <MovieDescription movie={movie} />
          <RecommendMovies movie={movie} />
          <MovieReviews movie={movie} />
        </div>
      )}
    </div>
  );
}
