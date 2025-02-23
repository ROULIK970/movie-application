import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editMovie } from "../features/movies/movieSlice";
import { toast } from "react-toastify";

const EditMovie = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.movies);

  // Component state to manage form inputs
  const [movieData, setMovieData] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    posterUrl: "",
  });


useEffect(() => {
  const movieToEdit = movies.find((movie) => movie._id === id);
  if (movieToEdit) {
    setMovieData(movieToEdit);
  }
}, [id, movies]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editMovie({...movieData, id}))
      .unwrap()
      .then(() => {
        toast.success("Movie updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error || "Failed to edit movie");
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rating:</label>
          <input
            type="number"
            name="rating"
            value={movieData.rating}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0"
            max="10"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={movieData.releaseDate?.slice(0, 10)}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Poster URL:</label>
          <input
            type="text"
            name="posterUrl"
            value={movieData.posterUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
