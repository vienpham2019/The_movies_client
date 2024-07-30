let initState = {
  notifications: [],
};

export default function moviesReducer(state = initState, action) {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, ...action.values };
    default:
      return state;
  }
}
