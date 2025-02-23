import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import movieReducer from "../features/movies/movieSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
  },
});

export default store;
