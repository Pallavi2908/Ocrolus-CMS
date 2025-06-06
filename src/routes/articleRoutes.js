import express from "express";
import authMiddleware from "../middleware/authWare.js";
import {
  createArticle,
  fetchArticle,
  updateArticle,
  deleteArticle,
  getViewedArticles,
  getAllArticles,
} from "../controllers/controllers.js";

const router = express.Router();
// this is to test if all works well
router.get("/test", (req, res) => {
  res.send("Articles route is working");
});

router.get("/recent/viewed", authMiddleware, getViewedArticles); // Get recently viewed articles
//rule of thumb: keep general routes after specific routes to avoid mismatch
router.post("/", authMiddleware, createArticle); // Create
router.get("/:id", authMiddleware, fetchArticle); // View
router.put("/:id", authMiddleware, updateArticle); // Update
router.delete("/:id", authMiddleware, deleteArticle); // Delete

router.get("/", getAllArticles); // List all articles (can be public)

export default router;
