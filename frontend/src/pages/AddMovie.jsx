import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovie } from "../features/movies/movieSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddMoviePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    posterUrl: "",
  });

  // Redux state for loading and error
  const { isLoading } = useSelector((state) => state.movies);

  // Handle input changes
  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();

  
    dispatch(addMovie(movieData))
      .unwrap()
      .then(() => {
        toast.success("Movie added successfully!");
        navigate("/");
      })
      .catch((error) => toast.error(error || "Failed to add movie"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add New Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            "title",
            "description",
            "rating",
            "releaseDate",
            "duration",
            "posterUrl",
          ].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 font-medium"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={movieData[field]}
                onChange={handleChange}
                placeholder={`Enter movie ${field}`}
                className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;
