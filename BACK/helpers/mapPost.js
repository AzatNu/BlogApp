
const mapComment = require("./mapComment");


module.exports = (post) => {
    return {
        id: post.id,
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        author: post.author,
        comments: post.comments.map(comment => typeof comment === "object" && comment !== null ? mapComment(comment) : comment),
        published_at: post.createdAt,
        updated_at: post.updatedAt
    }
}
