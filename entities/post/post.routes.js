const express = require('express');
const multer = require('multer');

const postController = require('./post.controller');

const router = express.Router();
const upload = multer();

router.post('/createPost', upload.any(), postController.addPost);
router.get('/getProfilePosts', postController.getProfilePostList);
router.put('/update', postController.updatePost);
router.delete('/delete', postController.deletePost);

module.exports = router;
