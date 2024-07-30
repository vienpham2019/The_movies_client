const A_set_movie_info = (data) => ({
  type: "SET_MOVIE_INFO",
  values: { ...data },
});

const A_add_movie_reviews = (movie, movie_reviews) => ({
  type: "ADD_MOVIE_REVIEWS",
  values: { movie, movie_reviews },
});

const A_set_display_videos = (displayVideos) => ({
  type: "SET_DISPLAY_VIDEOS",
  values: { displayVideos },
});

export { A_set_movie_info, A_add_movie_reviews, A_set_display_videos };
