/*
* The controller.
*
* Contains all the functions that interact with the database.
*/
const Tile = require('../models/tile');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createTile = function (req, res) { // creates a tile.
    let tile = new Tile({
        position: [parseInt(req.body.positionX), parseInt(req.body.positionY)],
        colour: [parseInt(req.body.colourR), parseInt(req.body.colourG), parseInt(req.body.colourB)],
        last_modifier: ""
    })

    tile.save(function (err) { // tries to save. if there is an error return the error
        if (err) {
            return next(err)
        }
        res.send('Tile created successfully')
        console.log(tile)
    })
}

// creates all tiles.
// maybe make a seperate function to do this?
exports.createAllTiles = function (req, res) {}

// updates a tile
exports.updateTile = function (req, res) {

    // sets the colour
    updatedFields = {
        colour: [parseInt(req.body.colourR), parseInt(req.body.colourG), parseInt(req.body.colourB)],
        last_modifier: req.body.last_modifier
    }

    Tile.findOneAndUpdate({position: [Number(req.params.positionX),Number(req.params.positionY)]},
        {$set: updatedFields},
        function (err, tile) {
                if (err) return next(err)
                res.send(tile)
                console.log(updatedFields)
        })
}

// resets a tile
exports.resetTile = function (req, res) {}

// upserts a tile - update or create if non-existent
exports.upsertTile = function (req, res) {}

// gets a tile by its position
exports.getTile = function (req, res) {
    Tile.findOne({position: [parseInt(req.params.positionX), parseInt(req.params.positionY)]}, function (err, tile){
        if (err) return next(err)
        res.send(tile)
    })
}

// get all tiles in the database
// maybe not have this and have wasee set up a function to do it himself?
exports.getAll = function (req, res) {}

// deletes a tile
exports.deleteTile = function (req, res) {
    Tile.findOneAndDelete([Number(req.params.positionX), Number(req.params.positionY)],
        function (err) {
        if (err) return next(err)
            res.send("deleted")
        })
}

// deletes all tiles in the database
// maybe not have this and have wasee set up a function to do it himself?
exports.deleteAll = function (req, res){}

