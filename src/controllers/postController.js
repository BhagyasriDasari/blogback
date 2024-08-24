const Post = require('../models/Post');

// Get all posts
exports.getAllPosts = (req, res) => {
    Post.getAll((err, posts) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(posts);
    });
};

// Get a specific post by ID
exports.getPostById = (req, res) => {
    const { id } = req.params;
    Post.getById(id, (err, post) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    });
};

// Create a new post
exports.createPost = (req, res) => {
    const { title, content, summary } = req.body;
    if (!title || !content || !summary) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    Post.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id });
    });
};

// Update a post by ID
exports.updatePost = (req, res) => {
    const { id } = req.params;
    const { title, content, summary } = req.body;
    if (!title || !content || !summary) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    Post.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Post updated successfully' });
    });
};

// Delete a post by ID
exports.deletePost = (req, res) => {
    const { id } = req.params;
    Post.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Post deleted successfully' });
    });
};
