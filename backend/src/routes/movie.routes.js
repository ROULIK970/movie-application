import { Router } from "express";
import {
  getAllMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  editMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";
import { verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = Router();


//secured routes
router.route("/get-movies").get(verifyJWT, getAllMovies);
router.route("/sort-movies").get(verifyJWT, getSortedMovies);
router.route("/search-movies").get(verifyJWT, searchMovies);

//admin routes
router.route("/add-movie").post(verifyJWT, verifyAdmin, addMovie);
router.route("/edit-movie/:id").put(verifyJWT, verifyAdmin, editMovie);
router.route("/delete-movie/:id").delete(verifyJWT, verifyAdmin, deleteMovie);

export default router;
