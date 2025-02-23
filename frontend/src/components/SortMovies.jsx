import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortMovies } from "../features/movies/movieSlice";
import { ChevronUp, ChevronDown } from "lucide-react";

const SortComponent = () => {
  const dispatch = useDispatch();

  // State for sorting options
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  // Dispatch sorting action
  const handleSort = () => {
    dispatch(sortMovies({ sortBy, order }));
  };

  // Toggle sorting order
  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="flex items-center space-x-2">
     
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-gray-700 text-white px-2 py-1 rounded border-none focus:outline-none"
      >
        <option value="title">Title</option>
        <option value="rating">Rating</option>
        <option value="releaseDate">Release Date</option>
      </select>

      {/* Order Toggle */}
      <button
        onClick={toggleOrder}
        className="text-white flex items-center bg-gray-700 p-1 rounded hover:bg-gray-600 transition"
      >
        {order === "asc" ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Sort Button */}
      <button
        onClick={handleSort}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
      >
        Sort
      </button>
    </div>
  );
};

export default SortComponent;
