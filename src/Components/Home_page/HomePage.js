import PopularMovies from "./PopularMovies";
import TopRankingMovies from "./TopRankingMovies";
import MidSection from "./MidSection";
import Top9OfWeek from "./Top9OfWeek";
import HomeHeader from "./HomeHeader";
import axios from "../../helper/init.axios";
import { useEffect, useState } from "react";
import "./HomePage.css";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await axios.get(`/movie/all`, {
          params: {
            page: 1,
            limit: 7,
            searchByGenre: "Sci-fi",
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <div className="page__content w-100 m-0 overflow-hidden">
      <section className="section bg-custom-1 position-relative">
        <HomeHeader />
      </section>
      <br />
      <section
        className="home-section home-movie-section-aside-header py-5"
        style={{ paddingBottom: "13px", paddingTop: "9px" }}
      >
        <PopularMovies />
      </section>
      <MidSection />
      <section
        className="home-section section-movies-carousel-flex-header bg-light"
        style={{ paddingBottom: "10px", paddingTop: "60px" }}
      >
        <TopRankingMovies />
      </section>
      <section className="home-section section-movies-list pt-5">
        <Top9OfWeek />
      </section>
    </div>
  );
}
