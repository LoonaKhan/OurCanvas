/*
* The model of the tile.
*
* This is simply how the tile works and what components its made of.
* Then just exports it
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema
let tileSchema = new Schema({
    position: {type:Array, required:true}, // each tile has a position [x,y]. integers
    colour: {type: Array, required: true}, // the colour of each tile [R,G,B]. integers
    last_modifier: {type: String, required: false} // the last user to modify the tile. string containing their username
});


// Export the model
module.exports = mongoose.model('tile', tileSchema);