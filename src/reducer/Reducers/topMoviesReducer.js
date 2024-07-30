const init_state = {
  newest_movies: [],
  top_ranking_movies: [],
  popular_movies: [],
};

export default function TopMoviesReducer(state = init_state, action) {
  switch (action.type) {
    case "SET_TOP_MOVIES":
      return {
        ...state,
        ...action.values,
      };

    default:
      return state;
  }
}
