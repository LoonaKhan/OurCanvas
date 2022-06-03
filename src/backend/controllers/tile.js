/*
* The controller.
*
* Contains all the functions that interact with the database. This is the heart of the backend.
*/
const Tile = require('../models/tile'); // loads the tile model

// creates a tile
exports.createTile = async (req, res) => {
    /*
    * Creates a tile based on the request given.
    *
    * This call shall only be used in development, not in production. all tiles will be present in the database in prod.
    *
    * Starts by creating the tile object from the request given.
    * Then attempts to save it and send a response.
    */

    // creates the tile object.
    let tile = new Tile({
        position: [Number(req.body.position[0]), Number(req.body.position[1])],
        colour: [Number(req.body.colour[0]), Number(req.body.colour[1]), Number(req.body.colour[2])],
        last_modifier: "" // is an empty string because it's been initialized by the server
    })

    // attempts to save the tile and respond to the client
    try {
        const newTile = await tile.save()
        res.status(201).json(newTile) // responds with the new tile data
    } catch (err) { // if there is an error, respond with the error
        res.status(400).json({message: err.message})
    }

}

// gets a tile by its position
exports.getTile = async (req, res) => {
    /*
    * GETs a tile based on the position given
    *
    * This will be used in production, to get the status of a single tile.
    *
    * attempts to search the database for a tile matching the position and returns it
    */

    try {
        const tile = await Tile.findOne({ // searches for a matching tile
            position: [Number(req.body.position[0]), Number(req.body.position[1])]
        })
        console.log(tile)
        if (tile == null){ // if one is not found, return a 404
            res.status(404).json({message: "Tile not found."})
            return
        }
        res.json(tile) // if it is found, send it
    } catch (err) { // if there is an error, respond with the error
        res.status(500).json({message: err.message})
    }

}

// gets all tiles
exports.getAllTiles = async (req, res) => {
    /*
    * GETs all tiles in the database.
    *
    * This can be used in production. to get all tiles
    *
    * searches through the database for all tiles.
    */
    try{
        const tiles = await Tile.find() // searches
        res.json(tiles) // response
    } catch (err) { // if there is an error, respond with the error
        res.status(500).json({message: err.message})
    }
}

// updates a tile
exports.updateTile = async (req, res) => {
    /*
    * Updates a tile based on the data given.
    *
    * This will be used a lot during production. used whenever the client changes the colour of a tile.
    *
    * Takes in the data, organizes the new colour and last_modifier into a dict.
    * this is because the findOneAndUpdate() method requires all update fields to be in a dict.
    * Afterward, it finds a tile based on the given position, and attempts to update it with the updated fields.
    * if no matching tile is found, return a 404 message.
    * otherwise, respond with the tile and updated info.
    *
    * note:
    *   responds not with the updated tile, but with the tile position and updated fields.
    *   This is because responding  with the updated tile directly does not seem to show the updated fields.
    *   not helpful for testing and development.
    *   this response only occurs if the tile exists and there is no error.
    *   in theory and in testing this works, but i want to put it under more scrutiny.
    *
    *   todo:
    *       read the docs on mongoose.
    *       alternative update methods?
    */

    const updatedFields = { // creates the dict with all the updated fields.
        colour: [Number(req.body.colour[0]), Number(req.body.colour[1]), Number(req.body.colour[2])],
        last_modifier: req.body.last_modifier
    }

    try {
        const updated = await Tile.findOneAndUpdate( // attempts to find and update the right tile
            {position: [Number(req.body.position[0]),Number(req.body.position[1])]},
            {$set: updatedFields})

        if (updated == null){ // if the tile does not exist, repsond with a 404
            res.status(404).json({message: "Tile not found."})
            return
        }

        res.json({ // otherwise respond with the data
            position: [Number(req.body.position[0]),Number(req.body.position[1])],
            colour: [Number(req.body.colour[0]), Number(req.body.colour[1]), Number(req.body.colour[2])],
            last_modifier: req.body.last_modifier
        })

    } catch (err) { // if there is an error, respond with the error
        res.status(500).json({message: err.message})
    }

}

// resets a tile
exports.resetTile = async (req, res) => {
    /*
    * Resets a given tile.
    *
    * Probably wont be used during production, but may be used during development.
    *
    * Organizes a dict, updatedFields, to contain the default values, white colour with no last_modifier
    * this is because the findOneAndUpdate() method requires all update fields to be in a dict.
    * Afterward, it finds a tile based on the given position, and attempts to reset it with the updated fields.
    * if no matching tile is found, return a 404 message.
    * otherwise, respond with the tile and updated info.
    *
    * note:
    *   responds not with the updated tile, but with the tile position and updated fields.
    *   This is because responding  with the updated tile directly does not seem to show the updated fields.
    *   not helpful for testing and development.
    *   this response only occurs if the tile exists and there is no error.
    *   in theory and in testing this works, but i want to put it under more scrutiny.
    *   todo:
    *       read the docs on mongoose.
    *       alternative update methods?
    *
    *   This method could be simpler by setting default values for colour and last_modifier in models.
    *   then possibly have the method revert the values to default.
    *   there is no issue here, just a potential simplification.
    *   todo:
    *       read mongoose docs.
    *       how to revert to default values if possible?
    *       if so, set default colour and last_modifier values.
    */

    const updatedFields = { // creates the dict with all the reset fields.
        colour: [255,255,255],
        last_modifier: ""
    }

    try {
        const updated = await Tile.findOneAndUpdate( // attempts to find and reset the right tile
            {position: [Number(req.body.position[0]),Number(req.body.position[1])]},
            {$set: updatedFields})

        if (updated == null){ // if the tile does not exist, repsond with a 404
            res.status(404).json({message: "Tile not found."})
            return
        }
        res.json({ // otherwise respond with the data
            position: [Number(req.body.position[0]),Number(req.body.position[1])],
            colour: [255,255,255],
            last_modifier: ""
        })
    } catch (err) { // if there is an error, respond with the error
        res.status(500).json({message: err.message})
    }

}

// deletes a tile
exports.deleteTile = async (req, res) => {
    /*
    * DELETEs a tile.
    *
    * will not be used in production. all tiles needed will be in the db by production.
    *
    * attempts to find and delete the tile.
    */

    try {
        const deleted = await Tile.findOneAndDelete({ // searches and deletes the tile
            position: [Number(req.body.position[0]), Number(req.body.position[1])]
        })
        if (deleted == null){ // if it does not exist, it will return a 404
            res.status(404).json({message: "Tile not found."})
            return
        }
        res.json({message: `deleted tile at position: [${req.body.position}]`}) // otherwise, send the deleted tile
    } catch (err) {
        res.status(500).json({message: err.message}) // if there is an error, respond with the error
    }

}