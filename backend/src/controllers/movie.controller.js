import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Movie from "../models/movie.model.js";

// Retrieve all movies with pagination
export const getAllMovies = asyncHandler(async (req, res) => {


   const { page = 1, limit = 10 } = req.query;

    const options = {
    page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const movies = await Movie.aggregatePaginate(Movie.aggregate([]), options);


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        movies, 
        "Movies retrieved successfully!"
      )
    );
});

// Get sorted movies by name, rating, release date, or duration
export const getSortedMovies = asyncHandler(async (req, res) => {
    const { sortBy = "name", order = "asc", page = 1, limit = 10 } = req.query;

    const sortOptions = {
      name: "name",
      rating: "rating",
      releaseDate: "releaseDate",
      duration: "duration",
    };

    const sortField = sortOptions[sortBy] || "name";
    const sortOrder = order === "desc" ? -1 : 1;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const movies = await Movie.aggregatePaginate(
      Movie.aggregate([{ $sort: { [sortField]: sortOrder } }]),
      options
    );

    return res
      .status(200)
      .json(new ApiResponse(200, movies, "Movies sorted successfully!"));
});




// Search movies by name or description
export const searchMovies = asyncHandler(async (req, res) => {
  const { query = "", page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  const movies = await Movie.aggregatePaginate(
    Movie.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
          ],
        },
      },
    ]),
    options
  );

  return res
    .status(200)
    .json(new ApiResponse(200, movies, "Movies searched successfully!"));
});

// Add a new movie (admin only)
export const addMovie = asyncHandler(async (req, res) => {
  const { name, description, rating, releaseDate, duration } = req.body;

  if (!name || !description || !rating || !releaseDate || !duration) {
    throw new ApiError(400, "All fields are required!");
  }

  const movie = await Movie.create({
    name,
    description,
    rating,
    releaseDate,
    duration,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, movie, "Movie added successfully!"));
});

// Edit movie details (admin only)
export const editMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, rating, releaseDate, duration } = req.body;

  const movie = await Movie.findByIdAndUpdate(
    id,
    { name, description, rating, releaseDate, duration },
    { new: true }
  );

  if (!movie) {
    throw new ApiError(404, "Movie not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, movie, "Movie updated successfully!"));
});

// Delete a movie (admin only)
export const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);

  if (!movie) {
    throw new ApiError(404, "Movie not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Movie deleted successfully!"));
});



export {
  getAllMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  editMovie,
  deleteMovie,
};
