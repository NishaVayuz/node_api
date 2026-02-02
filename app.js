import connectDB from "./connection/db.js";
import express from "express";
import userRoutes from "./Routes/userRoutes.js"
import blogRoutes from "./Routes/blogRoutes.js"
import commentsRoutes from "./Routes/commentRoutes.js"


const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
    res.send("Welcome! Node API is running 🚀");
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentsRoutes);
app.listen(8000, () => console.log("Server running 🚀"));
