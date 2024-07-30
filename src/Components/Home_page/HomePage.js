import PopularMovies from "./PopularMovies";
import TopRankingMovies from "./TopRankingMovies";
import MidSection from "./MidSection";
import Top9OfWeek from "./Top9OfWeek";
import HomeHeader from "./HomeHeader";
import "./HomePage.css";

export default function HomePage() {
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
