const Comment = require("../models/Comment");
const Post = require("../models/Post");

const addComment = async (postId, comment) => {
    const newComment = await Comment.create(comment);
    await Post.updateOne({ _id: postId }, { $push: { comments: newComment._id } });
    await newComment.populate("author");
    return newComment;
}
const deleteComment = async (postId, commentId) => {
    await Comment.deleteOne({ _id: commentId });
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
}

module.exports = { addComment, deleteComment };
