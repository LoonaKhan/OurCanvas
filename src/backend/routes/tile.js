/*
* The routes.
*
* Basically determines what is called based on the url given
*/
const express = require('express');
const router = express.Router();

// Require the controllers
const tileController = require('../controllers/tile');
//const {updateTile} = require("../controllers/tile");



// creates a tile
router.post(`/create`, tileController.createTile)

// gets a tile
router.get('/:positionX/:positionY', tileController.getTile)

// updates a tile
router.put('/update', tileController.updateTile)

// resets a tile
router.put('/reset', tileController.resetTile)

// upserts a tile
//router.put('/:positionX/:positionY/', tileController.upsertTile)

// deletes a tile
router.delete('/delete', tileController.deleteTile)




module.exports = router;