const A_set_movies = ({
  movies = [],
  fillter_movie_by_year = "",
  fillter_movie_by_genre = "All",
  sort_movie_by = "Years",
}) => ({
  type: "SET_MOVIES",
  values: {
    movies,
    fillter_movie_by_year,
    fillter_movie_by_genre,
    sort_movie_by,
  },
});

const A_set_fillter_movie_by_genre = (fillter_movie_by_genre) => ({
  type: "SET_FILTER_BY_GENRE",
  values: { fillter_movie_by_genre },
});

const A_set_sort_movie_by = (sort_movie_by) => ({
  type: "SET_SORT_MOVIE_BY",
  values: { sort_movie_by },
});

const A_set_counts = (counts) => ({
  type: "SET_COUNTS",
  values: { counts },
});

const A_set_display_videos = (displayVideos) => ({
  type: "SET_DISPLAY_VIDEOS",
  values: { displayVideos },
});

export {
  A_set_movies,
  A_set_display_videos,
  A_set_fillter_movie_by_genre,
  A_set_sort_movie_by,
  A_set_counts,
};
