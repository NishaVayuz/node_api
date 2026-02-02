import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const blog = mongoose.model('blogs', BlogSchema);

export default blog;