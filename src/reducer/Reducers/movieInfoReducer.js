let initState = { totalReviews: 0, totalScore: 0 };

export default function movieInfoReducer(state = initState, action) {
  switch (action.type) {
    case "SET_MOVIE_REVIEW_DETAILS":
      return { ...state, ...action.values };

    default:
      return state;
  }
}
