module.exports = (comment) => {
    return {
        content: comment.content,
        author:   comment.author,    
        id: comment._id,
        published_at: comment.createdAt,    
    }
}