const A_set_movie_review_details = ({ totalReviews, totalScore }) => ({
  type: "SET_MOVIE_REVIEW_DETAILS",
  values: { totalReviews, totalScore },
});

export { A_set_movie_review_details };
