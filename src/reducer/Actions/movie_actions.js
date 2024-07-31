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

const A_set_fillter_movie_by_year = (fillter_movie_by_year) => ({
  type: "SET_FILTER_BY_YEAR",
  values: { fillter_movie_by_year },
});

const A_set_sort_movie_by = (sort_movie_by) => ({
  type: "SET_SORT_MOVIE_BY",
  values: { sort_movie_by },
});

const A_set_genre_counts = (genreCounts) => ({
  type: "SET_GENRE_COUNTS",
  values: { genreCounts },
});

const A_set_year_counts = (yearCounts) => ({
  type: "SET_YEAR_COUNTS",
  values: { yearCounts },
});

const A_set_display_videos = (displayVideos) => ({
  type: "SET_DISPLAY_VIDEOS",
  values: { displayVideos },
});

export {
  A_set_movies,
  A_set_display_videos,
  A_set_fillter_movie_by_genre,
  A_set_fillter_movie_by_year,
  A_set_sort_movie_by,
  A_set_genre_counts,
  A_set_year_counts,
};
