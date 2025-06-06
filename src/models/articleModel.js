import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const articleSchema = new Schema({
  author: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  article_text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const Article = model("Article", articleSchema);
export default Article;
