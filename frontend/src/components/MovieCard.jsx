import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteMovie } from "../features/movies/movieSlice";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const { _id, title, description, rating, releaseDate, duration, posterUrl } =
    movie;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      dispatch(deleteMovie(_id))
        .unwrap()
        .then(() => toast.success("Movie deleted successfully!"))
        .catch((error) => toast.error(error || "Failed to delete movie!"));
    }
  };

  return (
    <div key={_id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={posterUrl || "https://via.placeholder.com/300x450?text=No+Image"}
        alt={title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-medium">
            Rating: <span className="text-blue-500">{rating}/10</span>
          </span>
          <span className="text-gray-500">
            {new Date(releaseDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Duration: {duration} min</span>
          
        </div>
        {user?.role === "admin" && (
          <div className="mt-4 flex space-x-2">
            <Link
              ///admin/edit-movie/:id
              to={`/admin/edit-movie/${_id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
