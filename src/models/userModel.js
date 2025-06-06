import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  recentlyViewed: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Article",
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
