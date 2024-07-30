const A_set_movies = (movies) => ({
  type: "SET_MOVIES",
  values: { movies },
});

const A_filter_movies = (filter_movies) => ({
  type: "FILTER_MOVIES",
  values: { filter_movies },
});

const A_movie_page = (movie_page) => ({
  type: "MOVIE_PAGE",
  values: { movie_page },
});

const A_display_movies_amount = (display_movies_amount) => ({
  type: "DISPLAY_MOVIES_AMOUNT",
  values: { display_movies_amount },
});

const A_set_fillter_genre_and_year = (
  fillter_movie_by_genre,
  fillter_movie_by_year
) => ({
  type: "SET_FILLTER_GENRE_AND_YEAR",
  values: { fillter_movie_by_genre, fillter_movie_by_year },
});

const A_set_sort_movies_by = (sort_movie_by) => ({
  type: "SORT_MOVIES_BY",
  values: { sort_movie_by },
});

export {
  A_set_movies,
  A_filter_movies,
  A_movie_page,
  A_display_movies_amount,
  A_set_fillter_genre_and_year,
  A_set_sort_movies_by,
};
