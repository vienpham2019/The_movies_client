import { useNavigate } from "react-router-dom";
export default function MovieContent({ movie }) {
  let { title, release_date, genre, poster_path } = movie;
  const navigate = useNavigate();
  return (
    <div className="movie shadow-hover-dark m-2 p-0">
      <div className="movie__poster">
        <div
          className="masvideos-LoopMovie-link masvideos-loop-movie__link movie__link"
          role="button"
          onClick={() => {
            window.scrollTo(0, 0);
            navigate(`/movie_info/${movie._id}`);
          }}
        >
          <img
            src={poster_path}
            style={{ width: "300px", height: "450px" }}
            className="movie__poster--image"
          />
        </div>
      </div>
      <div className="movie__body px-2">
        <div className="movie__info">
          <div className="movie__info--head">
            <div className="movie__meta">
              <span className="movie__meta--release-year">
                {release_date.split("-")[0]}
              </span>
              <span className="movie__meta--genre text-info">{genre}</span>
            </div>

            <h3 className="masvideos-loop-movie__title  movie__title">
              {title}
            </h3>
          </div>{" "}
        </div>

        {/*  */}
      </div>
    </div>
  );
}
