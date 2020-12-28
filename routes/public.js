const express = require('express');
const router = express.Router();
const postController = require('../entities/post/post.controller');

router.get('/getPostList', postController.getAllPosts);
router.get('/getPostById/', postController.getPostById);

module.exports = router;
