import mongoose from "../database/database.js";

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  year: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true,
    default: 0
  }
});

gameSchema.path('_id');

export const Game = mongoose.model('games', gameSchema);