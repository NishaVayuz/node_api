import express from "express";
import Blog from "../models/Blog.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/* CREATE BLOG */
router.post("/", protect, async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.create({
        title: title,
        content: content,
        author: req.user.id
    });
    res.status(201).json(blog);
});


router.get('/', protect, async (req, res) => {
    const get_all_blogs = await Blog.find().populate("author", "name");
    res.status(200).json(get_all_blogs);
});


router.delete('/:id', protect, async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findById(id);
        if (!blog)
            return res.status(404).json({ message: "Blog not found" });

        if (blog.author.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized" });

        await blog.deleteOne();
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.put("/:id", protect, async (req, res) => {

    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog)
        return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.id)
        return res.status(403).json({ message: "Not authorized" });

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully" });


});



export default router;
