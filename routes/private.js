const express = require('express');
const multer = require('multer');

const postController = require('../entities/post/post.controller');
const favoritePostController = require('../entities/favoritePost/favoritePost.controller');
const userController = require('../entities/user/user.controller');

const router = express.Router();
const upload = multer();

router.post('/createPost', upload.any(), postController.createPost);
router.get('/getProfilePosts', postController.getProfilePostList);
router.put('/updatePost', postController.updatePost);
router.delete('/delete', postController.deletePost);
router.post('/addToFavorites', favoritePostController.addToFavorites);
router.delete('/removeFromFavorites', favoritePostController.removeFromFavorites);
router.get('/getFavoritePosts', favoritePostController.getFavoritePosts);
router.get('/getFavoritePostIds', favoritePostController.getFavoritePostIds);

router.put('/updateUser', userController.updateUser);

module.exports = router;
