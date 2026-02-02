import mongoose, { model, Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    blog_id: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" }

});

const Comment = mongoose.model("comments", CommentSchema);

export default Comment;