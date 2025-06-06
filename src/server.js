import express from "express";
import connDB from "./utils/db.js";
import articleRoutes from "./routes/articleRoutes.js";
const app = express();
app.use(express.json());
const PORT = 3000;
connDB();
app.use("/articles", articleRoutes);
app.listen(PORT, () => console.log(`listening to requests at port ${PORT}`));
