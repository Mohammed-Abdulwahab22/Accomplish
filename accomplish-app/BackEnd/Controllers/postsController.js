const Post = require('../Models/Posts');


const createPost = async (req, res) => {
    const { userId, content } = req.body;
    try {
        const post = await Post.create({ userId, content });
        res.status(201).json({
            success: true,
            data: post
        }); 
    } catch (error) {
        res.status(500).json({
            success: false, 

            message: error.message
        });
    }
}

module.exports = { createPost }
