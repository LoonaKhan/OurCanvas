/*
* The controller.
*
* Contains all the functions that interact with the database.
*
* TODO:
*   add in errors and send them back.
*/
const Tile = require('../models/tile');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createTile = function (req, res) { // creates a tile.
    console.log(req.data)
    let tile = new Tile({
        position: [parseInt(req.body.position[0]), parseInt(req.body.position[1])],
        colour: [parseInt(req.body.colour[0]), parseInt(req.body.colour[1]), parseInt(req.body.colour[2])],
        last_modifier: ""
    })

    tile.save(function (err) { // tries to save. if there is an error return the error
        if (err) {
            return next(err)
        }
        res.send({msg: "tile created successfully"})
        //res.send(tile)
    })
}

// creates all tiles.
// maybe make a seperate function to do this?
exports.createAllTiles = function (req, res) {}

// updates a tile
exports.updateTile = function (req, res) {
    console.log(req.params)

    // sets the colour
    updatedFields = {
        colour: [parseInt(req.body.colour[0]), parseInt(req.body.colour[1]), parseInt(req.body.colour[2])],
        last_modifier: req.body.last_modifier
    }

    Tile.findOneAndUpdate({position: [Number(req.body.position[0]),Number(req.body.position[1])]},
        {$set: updatedFields},
        function (err, tile) {
                if (err) return next(err)
                res.send(tile)
                console.log(updatedFields)
        })
}

// resets a tile
exports.resetTile = function (req, res) {

    // sets the colour
    updatedFields = {
        colour: [255, 255, 255],
        last_modifier: ""
    }

    Tile.findOneAndUpdate({position: [Number(req.body.position[0]),Number(req.body.position[1])]},
        {$set: updatedFields},
        function (err, tile) {
            if (err) return next(err)
            res.send(tile)
            console.log(updatedFields)
        })

}

// upserts a tile - update or create if non-existent
//exports.upsertTile = function (req, res) {}             //*

// gets a tile by its position
exports.getTile = function (req, res) {
    Tile.findOne({position: [parseInt(req.params.positionX), parseInt(req.params.positionY)]}, function (err, tile){
        if (err) return next(err)
        res.send(tile)
    })
}

// get all tiles in the database
// maybe not have this and have wasee set up a function to do it himself?
exports.getAllTiles = function (req, res) {}

// deletes a tile
exports.deleteTile = function (req, res) {
    Tile.findOneAndDelete({position: [Number(req.body.position[0]),Number(req.body.position[1])]},
        function (err) {
        if (err) return next(err)
            res.send({msg: "deleted"})
        })
}

// deletes all tiles in the database
// maybe not have this and have wasee set up a function to do it himself?
exports.deleteAllTiles = function (req, res){}