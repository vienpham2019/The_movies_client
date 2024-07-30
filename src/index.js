import React from "react";
import ReactDOM from "react-dom/client"; // Updated import
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducer/Reducers/rootReducer";

const store = createStore(rootReducer);

// Create a root container and render the application
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
