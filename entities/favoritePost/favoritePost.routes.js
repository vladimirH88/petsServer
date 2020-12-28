const express = require('express');
const favoritePostController = require('./favoritePost.controller');

const router = express.Router();

router.post('/addToFavorites', favoritePostController.addToFavorites);
router.delete('/removeFromFavorites', favoritePostController.removeFromFavorites);
router.get('/getFavoritePosts', favoritePostController.getFavoritePosts);

module.exports = router;
