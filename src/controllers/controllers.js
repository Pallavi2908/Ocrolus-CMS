import Article from "../models/articleModel.js";

//helper function ->
const helper = (article, userId, res) => {
  if (!article) {
    return res.status(404).json({ message: "404. Not found." });
  }
  if (article.author.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Not permissible" });
  }
  return true;
};

const createArticle = async (req, res) => {
  try {
    const { title, article_text } = req.body;

    if (!title || !article_text)
      return res.status(400).json({ message: "Either of the field is empty!" });

    const article = await Article.create({
      title,
      article_text,
      author: req.user._id,
    });

    res.status(201).json({ success: true, data: article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const fetchArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.views = (article.views || 0) + 1;
    await article.save();

    const user = req.user;
    const articleId = article._id.toString();

    user.recentlyViewed = user.recentlyViewed.filter(
      (id) => id.toString() !== articleId
    );
    user.recentlyViewed.unshift(article._id);
    if (user.recentlyViewed.length > 10) {
      user.recentlyViewed.pop();
    }
    await user.save();

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { title, article_text } = req.body;
    const article = await Article.findById(req.params.id);

    if (!helper(article, req.user._id, res)) return;

    article.title = title || article.title;
    article.article_text = article_text || article.article_text;
    await article.save();
    res.status(200).json({ message: "Article updated" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!helper(article, req.user._id, res)) return;

    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getViewedArticles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "recentlyViewed",
      select: "title author",
      populate: { path: "author", select: "username" },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.recentlyViewed);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const articles = await Article.find()
      .populate("author", "username")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Article.countDocuments();

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      articles,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  createArticle,
  fetchArticle,
  updateArticle,
  deleteArticle,
  getViewedArticles,
  getAllArticles,
};
