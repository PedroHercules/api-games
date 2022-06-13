import mongoose from "../database/database.js";

const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.path('_id');
export const User = mongoose.model('users', userSchema);