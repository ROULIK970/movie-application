import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../features/movies/movieSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchMovies({ query, page: 1, limit: 10 }));
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-md p-2 bg-white rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 text-gray-700 px-4 py-2 border-none focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
