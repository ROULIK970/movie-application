import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true, 
    },
    posterUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

movieSchema.plugin(mongooseAggregatePaginate)


export const Movie = mongoose.model("Movie", movieSchema);
