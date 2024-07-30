const A_set_top_movies = (
  newest_movies,
  top_ranking_movies,
  popular_movies
) => ({
  type: "SET_TOP_MOVIES",
  values: { newest_movies, top_ranking_movies, popular_movies },
});

export { A_set_top_movies };
