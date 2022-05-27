/*
* The routes.
*
* Basically determines what is called based on the url given
*/
const express = require('express');
const router = express.Router();

// Require the controllers
const tileController = require('../controllers/tile');
const {updateTile} = require("../controllers/tile");


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', tileController.test);

// creates a tile
router.post(`/create`, tileController.createTile)

// gets a tile
router.get('/:positionX/:positionY', tileController.getTile)

// updates a tile
router.put('/:positionX/:positionY', tileController.updateTile)

// deletes a tile
router.delete('/:positionX/:positionY', tileController.deleteTile)




module.exports = router;