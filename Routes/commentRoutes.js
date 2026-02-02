import express from "express";
import Comment from "../models/Comment.js";
import Blog from "../models/Blog.js";

const router = express.Router();

router.post("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const { comment } = req.body;

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({ message: "this blog does not exist" });
        }

        await Comment.create({ comment: comment, blog_id: id });
        return res.status(201).json({ message: "commented successfully" })

    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const blogId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const comments = await Comment.find({ blog_id: blogId }).skip(skip).limit(limit);
        const total_comments = await Comment.countDocuments({ blog_id: blogId });

        return res.status(200).json({ current_page: page, comments: comments, total_comments: total_comments })
    }
    catch (error) {
        return res.status(500).json(error.message);
    }

});


export default router;