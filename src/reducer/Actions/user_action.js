const A_set_user = (user) => {
  return {
    type: "SET_USER",
    values: { user },
  };
};

const A_update_user_info = (user) => ({
  type: "UPDATE_USER_INFO",
  values: {
    user,
  },
});

const A_update_widhlist = (widhlists) => ({
  type: "UPDATE_WIDHLISTS",
  values: {
    widhlists,
  },
});

const A_update_favorite = (favorites) => ({
  type: "UPDATE_FAVORITES",
  values: {
    favorites,
  },
});

export { A_set_user, A_update_user_info, A_update_widhlist, A_update_favorite };
