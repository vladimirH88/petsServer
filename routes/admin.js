const express = require('express');

const router = express.Router();

const postController = require('../entities/post/post.controller');
const categoryController = require('../entities/categories/categories.controller');
const regionComtroller = require('../entities/regions/regions.controller');

router.get('/getNotAgreedPosts', postController.getNotAgreedPosts);
router.get('/getNotAgreedPostById', postController.getPostById);

router.get('/getCategories', categoryController.getCategories);
router.post('/addCategory', categoryController.addCategory);
router.delete('/deleteCategory', categoryController.deleteCategory);
router.put('/updateCategory', categoryController.updateCategory);

router.get('/getRegions', regionComtroller.getRegions);
router.post('/addRegion', regionComtroller.addRegion);
router.delete('/deleteRegion', regionComtroller.deleteRegion);
router.put('/updateRegion', regionComtroller.updateRegion);

router.put('/approvePost', postController.approvePost);

module.exports = router;
