import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import {Movie} from "../models/movie.model.js";

// Retrieve all movies with pagination
const getAllMovies = asyncHandler(async (req, res) => {


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
const getSortedMovies = asyncHandler(async (req, res) => {
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
const searchMovies = asyncHandler(async (req, res) => {
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
            { title: { $regex: query, $options: "i" } },
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
const addMovie = asyncHandler(async (req, res) => {
  const { title, description, rating, releaseDate, duration } = req.body;

  if (
    [title, description, rating, releaseDate, duration].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedMovie = await Movie.findOne({
    $or: [{ title }, { description }],
  });
  if (existedMovie) {
    throw new ApiError(409, "The movie that you are trying to upload already exists!");
  }

  const movie = await Movie.create({
    title,
    description,
    rating,
    releaseDate,
    duration
  });

  if (!movie) {
    throw new ApiError(500, "Something went wrong while adding movie!");
  }
 
  return res
    .status(201)
    .json(new ApiResponse(201, movie, "Movie added successfully!"));
});

// Edit movie details (admin only)
const editMovie = asyncHandler(async (req, res) => {
  console.log("hi")
  const { id } = req.params;
  const { title, description, rating, releaseDate, duration } = req.body;


    console.log("Received ID:", id); // Log the ID received
    console.log("Update Data:", req.body); 

  const movie = await Movie.findByIdAndUpdate(
    id,
    { title, description, rating, releaseDate, duration },
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
const deleteMovie = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findByIdAndDelete(id);
  console.log(id)

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
