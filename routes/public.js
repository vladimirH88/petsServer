const express = require('express');
const router = express.Router();
const postController = require('../entities/post/post.controller');
const categoryController = require('../entities/categories/categories.controller');
const regionsController = require('../entities/regions/regions.controller');

router.get('/getPostList', postController.getAllPosts);
router.get('/getPostById/', postController.getPostById);
router.get('/getCategories', categoryController.getCategories);
router.get('/getRegions', regionsController.getRegions);

module.exports = router;
