import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/movies";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/movies/get-movies",
        { withCredentials: true }
      );
      console.log(response.data.data);
      return response.data.data.docs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch movies"
      );
    }
  }
);

// Sort movies
export const sortMovies = createAsyncThunk(
  "movies/sortMovies",
  async ({ sortBy, order}, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sort-movies`, {
        params: { sortBy, order },
        withCredentials: true,
      });
      console.log(response)
      return response.data.data.docs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to sort movies"
      );
    }
  }
);

// Search movies
export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async ({ query, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/search-movies`, {
        params: { query, page, limit },
        withCredentials: true,
      });
      console.log(response.data.data.docs);
      return response.data.data.docs;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to search movies"
      );
    }
  }
);

// Add a movie
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/add-movie`, movieData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add movie"
      );
    }
  }
);

// Edit a movie
export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async ({ id, ...movieData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/edit-movie/${id}`,
        movieData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit movie"
      );
    }
  }
);

// Delete a movie
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete-movie/${id}`,
        { withCredentials: true }
      );
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete movie"
      );
    }
  }
);

// Movie Slice
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sort Movies
      .addCase(sortMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sortMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(sortMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Search Movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Movie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Movie
      .addCase(editMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Movie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter(
          (movie) => movie._id !== action.payload
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
