import React from "react";
import { useState } from "react";
import { validateLength, validateEmail } from "../../validation";
import ReviewDetail from "./ReviewDetail";
import Pagination from ".././Pagination";
import { useSelector, useDispatch } from "react-redux";
import { A_add_movie_reviews } from "../../reducer/Actions/movie_info_action";

import { addMovieReview, rotate_array } from "../../helper_method";

export default function MovieReviews({ movie }) {
  const { movieReviews, movie_token } = movie;

  const { movie_page } = useSelector((state) => state.moviesReducer);

  const dispatch = useDispatch();
  const displayReviewAmount = 5;

  const [reivewScore, setReviewScore] = useState(10);
  const [movieNewReviewErrors, setMovieNewReviewErrors] = useState({});

  const displayReviews = rotate_array(movieReviews).slice(
    movie_page * displayReviewAmount,
    (movie_page + 1) * displayReviewAmount
  );

  const pages = Math.ceil(movieReviews.length / displayReviewAmount);

  const resetReviewForm = () => {
    document.getElementById("new-review-form").reset();
    document.getElementById("write_new_review_button").click();
    setReviewScore(10);
    setMovieNewReviewErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let [name, email, content] = e.target;
    let name_error = validateLength(name.value, "Name", 3);
    let email_error = validateEmail(email.value);
    let content_error = validateLength(content.value, "Content", 20);
    if (name_error || email_error || content_error) {
      setMovieNewReviewErrors({
        name_error,
        email_error,
        content_error,
      });
    } else {
      let date = new Date();
      let [day, mounth, year] = [
        date.getDate(),
        date.toLocaleString("default", { month: "long" }),
        date.getFullYear(),
      ];
      let review = {
        author: name.value,
        content: content.value,
        score: reivewScore,
        date: `${mounth} ${day}, ${year}`,
      };
      let data = await addMovieReview(movie_token, review);
      dispatch(A_add_movie_reviews(data.movie, data.movie_reviews));
      resetReviewForm();
    }
  };

  return (
    <section className="py-5 mb-5 text-dark">
      <div className="container w-70">
        <div className="row">
          <div className="col-12">
            <div className="row align-items-center justify-content-center">
              <strong className="m-2" style={{ fontSize: "1.3em" }}>
                REVIEWS
              </strong>
              <div className=" m-2 col-12 col-md text-md-center">
                <div className="gt-stars">
                  {Array.from(Array(10)).map((_, i) => (
                    <i
                      className={`${
                        i + 1 <= movie.reviews_total_score / movieReviews.length
                          ? "fas"
                          : "far"
                      } fa-star`}
                      key={"movie detail page movie reviews star " + i}
                    ></i>
                  ))}
                  <span className="ml-2">
                    <strong>Reviews({movieReviews.length})</strong>
                  </span>
                </div>
              </div>
              <div className="col-12 col-md-auto m-2">
                <div
                  className="rounded-0 review-button p-3"
                  data-toggle="collapse"
                  href="#reviewForm"
                  aria-expanded="true"
                  role="buttom"
                  onClick={() => resetReviewForm()}
                  id="write_new_review_button"
                >
                  Write Review
                </div>
              </div>
            </div>

            {/* new revew */}
            <div className="collapse" id="reviewForm">
              <hr className="my-8" />

              {/* new review form */}
              <form
                onSubmit={async (e) => handleSubmit(e)}
                className="px-2"
                id="new-review-form"
              >
                <div className="row justify-content-between">
                  <div className="col-12 mb-6 text-center">
                    <p className="m-0 font-size-xs">Score:</p>
                    <div className="col-12 col-md text-md-center mb-4">
                      <div className="gt-stars">
                        {Array.from(Array(10)).map((_, i) => (
                          <i
                            className={`${
                              i + 1 <= reivewScore ? "fas" : "far"
                            } fa-star`}
                            style={{ fontSize: "1.4em" }}
                            role="button"
                            key={
                              "movie detail page movie reviews form star " + i
                            }
                            onClick={() => setReviewScore(i + 1)}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-5 p-0 mb-3">
                    <div className="new-review-effect">
                      <input
                        className={`form-control form-control-sm rounded-0 new-review-input ${
                          movieNewReviewErrors.name_error && "is-invalid"
                        }`}
                        placeholder="Your Name *"
                      />
                      <span className="gt-focus-border"> </span>
                    </div>
                    {movieNewReviewErrors.name_error && (
                      <small className="error_message">
                        {movieNewReviewErrors.name_error}
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-6 p-0 mb-3">
                    <div className="new-review-effect">
                      <input
                        className={`form-control form-control-sm rounded-0 new-review-input ${
                          movieNewReviewErrors.email_error && "is-invalid"
                        }`}
                        placeholder="Your Email *"
                      />
                      <span className="gt-focus-border"> </span>
                      {movieNewReviewErrors.email_error && (
                        <small className="error_message">
                          {movieNewReviewErrors.email_error}
                        </small>
                      )}
                    </div>
                  </div>

                  <div className="col-12 p-0 mb-3">
                    <div className="new-review-effect">
                      <textarea
                        className={`form-control form-control-sm rounded-0 new-review-input ${
                          movieNewReviewErrors.content_error && "is-invalid"
                        }`}
                        rows="5"
                        placeholder="Review Content *"
                      ></textarea>
                      <span className="gt-focus-border"> </span>
                      {movieNewReviewErrors.content_error && (
                        <small className="error_message">
                          {movieNewReviewErrors.content_error}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 text-center p-0">
                    <button className="review-button w-100 py-3" type="submit">
                      Post Review
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* review */}
            <div className="mt-5">
              {displayReviews.map((review, i) => (
                <ReviewDetail
                  review={review}
                  key={"movie detail page movie reviews review " + i}
                />
              ))}
            </div>

            {/* pagination */}
            {pages > 1 && (
              <div className="mt-5 border-top pt-2">
                <Pagination pages={pages} is_review={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
