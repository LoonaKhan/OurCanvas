/*
* The model of the tile.
*
* This is simply the tile object(referred to as the "model") and all it's attributes.
* At the end of the file, we export it to be used by the rest of the program
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// the schema
/*
* Example of a tile object:
* {
*   position: [1,2],
*   colour: [255,255,255],
*   last_modifier: "Erika"
* }
*/
let tileSchema = new Schema({
    position: { // each tile has a position [x,y] where x and y are integers. this attribute is required
        type:[Number], // sets type as an array of numbers
        required:true
    },
    colour: { // the colour of each tile [R,G,B] where R,G and B are integers. this attribute is required
        type: [Number], // sets type as an array of numbers
        required: true
    },
    last_modifier: { // the last user to modify the tile. this attribute is not required and defaults to an empty string
        type: String,
        required: false
    }
});


// Export the model
module.exports = mongoose.model('tile', tileSchema);