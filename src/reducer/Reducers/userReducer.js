const initState = {
  user: null,
  widhlists: [],
  favorites: [],
  token: null,
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.values };
    case "UPDATE_USER_INFO":
      return { ...state, ...action.values };
    case "UPDATE_WIDHLISTS":
      return { ...state, ...action.values };
    case "UPDATE_FAVORITES":
      return { ...state, ...action.values };
    default:
      return state;
  }
}
