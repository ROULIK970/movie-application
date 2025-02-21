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
router.route("/get-movies").post(verifyJWT, getAllMovies);
router.route("/sort-movies").post(verifyJWT, getSortedMovies);
router.route("/search-movies").post(verifyJWT, searchMovies);

//admin routes
router.route("/add-movie").post(verifyJWT, verifyAdmin, addMovie);
router.route("/edit-movie").post(verifyJWT, verifyAdmin, editMovie);
router.route("/delete-movie").post(verifyJWT, verifyAdmin, deleteMovie);

export default router;
