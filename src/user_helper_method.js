import { get_current_time } from "./helper_method";
import { toast } from "react-toastify";

// helper
const fetch_obj = (method, body_value) => ({
  method,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body_value),
});

const toast_obj = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// fetch
const login = async (email, password) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/login`,
    fetch_obj("POST", { email, password })
  );
  const data = await res.json();
  return data;
};

const register = async (value) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/register`,
    fetch_obj("POST", { ...value })
  );
  const data = await res.json();
  return data;
};

const update_user_info = async (value) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/update_user_info`,
    fetch_obj("POST", { ...value })
  );
  const data = res.json();
  return data;
};

const add_widhlist = async (movie_id, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/add_widhlist`,
    fetch_obj("POST", { movie_id, token })
  );
  const data = res.json();
  return data;
};

const remove_widhlist = async (movie_id, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/remove_widhlist`,
    fetch_obj("POST", { movie_id, token })
  );
  const data = res.json();
  return data;
};

const add_favorite = async (movie_id, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/add_favorite`,
    fetch_obj("POST", { movie_id, token })
  );
  const data = res.json();
  return data;
};

const remove_favorite = async (movie_id, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/remove_favorite`,
    fetch_obj("POST", { movie_id, token })
  );
  const data = res.json();
  return data;
};

const handle_update_password = async (password, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/update_user_password`,
    fetch_obj("POST", { password, token })
  );
  const data = res.json();
  return data;
};
// end fetch

// actions
const set_widhlists_and_favorites = (_widhlists, _favorites) => {
  let widhlists = new Map();
  let favorites = new Map();
  for (let w_movie of _widhlists) {
    widhlists.set(w_movie.movie_id, w_movie.movie);
  }
  for (let f_movie of _favorites) {
    favorites.set(f_movie.movie_id, f_movie.movie);
  }
  return { widhlists, favorites };
};

const handle_update_widhlist = async (widhlists, movie, token) => {
  let data;
  if (widhlists.has(movie.id)) {
    data = await remove_widhlist(movie.id, token);
    if (data) widhlists.delete(movie.id);
  } else {
    if (await add_widhlist(movie.id, token)) widhlists.set(movie.id, movie);
  }
  return widhlists;
};

const handle_update_favorite = async (favorites, movie, token) => {
  let data;
  if (favorites.has(movie.id)) {
    data = await remove_favorite(movie.id, token);
    if (data) favorites.delete(movie.id);
  } else {
    if (await add_favorite(movie.id, token)) favorites.set(movie.id, movie);
  }
  return favorites;
};

const handle_notification = (lists, list_type, movie) => {
  let image = movie.poster_path;
  let target = movie.title;
  let type, message, time;

  time = get_current_time();
  if (lists.has(movie.id)) {
    type = "danger";
    message = "has been successully remove from your " + list_type + ".";
    toast.error(target + " " + message, toast_obj);
  } else {
    type = "success";
    message = "has been successully add to your " + list_type + ".";
    toast.success(target + " " + message, toast_obj);
  }
  return { image, target, type, message, time };
};

const getGenres = (lists) => {
  let genres = { All: lists.length };
  for (let movie of lists) {
    for (let genre of movie.genre.split(", ")) {
      if (genre === "N/A") continue;
      if (!genres[genre]) genres[genre] = 0;
      genres[genre] += 1;
    }
  }
  return genres;
};

export {
  getGenres,
  login,
  register,
  set_widhlists_and_favorites,
  update_user_info,
  handle_update_widhlist,
  handle_update_favorite,
  handle_update_password,
  handle_notification,
};
