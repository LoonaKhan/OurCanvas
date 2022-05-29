/*
* The routes.
*
* This details all the dfferent url's and what type of requests and controllers they use.
*
* at the end of the file, we export all routes.
*/
const express = require('express');
const router = express.Router();

// Require the controllers. this is all the functionality of the backend
const tileController = require('../controllers/tile');



// creates a tile
router.post(`/create`, tileController.createTile)

// gets a tile
router.get('/tile', tileController.getTile)

//gets all tiles
router.get('/', tileController.getAllTiles)

// updates a tile
router.put('/update', tileController.updateTile)

// resets a tile
router.put('/reset', tileController.resetTile)

// deletes a tile
router.delete('/delete', tileController.deleteTile)



module.exports = router; // exports the routes