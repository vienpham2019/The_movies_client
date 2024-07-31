let initState = {
  movies: [],
  fillter_movie_by_year: "",
  fillter_movie_by_genre: "",
  sort_movie_by: "release_date",
  counts: [],
  displayVideos: [],
};

export default function moviesReducer(state = initState, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        ...action.values,
      };
    case "SET_COUNTS":
      return {
        ...state,
        ...action.values,
      };
    case "SET_FILTER_BY_GENRE":
      return {
        ...state,
        ...action.values,
      };
    case "SET_SORT_MOVIE_BY":
      return {
        ...state,
        ...action.values,
      };
    case "SET_DISPLAY_VIDEOS":
      return {
        ...state,
        ...action.values,
      };
    default:
      return state;
  }
}
