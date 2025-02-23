import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard.jsx";
import { fetchMovies } from "../features/movies/movieSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Movie List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
