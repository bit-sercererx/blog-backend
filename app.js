require("dotenv").config();

const path = require("path");
const express = require("express");
const connectDB = require("./database");
const errorHandle = require("./middileware/error-handle");

const userRoutes = require("./routes/User.routes");
const blogRoutes = require("./routes/Blog.routes");
const Categorie = require("./routes/Categorie.routes");
const comment = require("./routes/Comment.routes");
const notFoundError = require("./middileware/notFoundError");

const app = express();
const cors = require("cors");
const port = 8000;
app.use(express.json());
app.use(cors());

const staticPath = path.join(path.dirname(""), "static/images");

connectDB();

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.use("/categorie", Categorie);
app.use("/comment", comment);
app.use("/images", express.static(staticPath));

app.use("*", notFoundError);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`the server running on port ${port}`);
});
