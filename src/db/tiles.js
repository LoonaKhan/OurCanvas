/*
* OurCanvas REST API
*
* Contains all CRUD function calls so we can connect to our MongoDB server.
*
* Developers: lvlonEmperor, Wasee Alam
*
* TODO:
*   CRUD operations
*   plan how else to make it a useful API
*       how would wasee use this?
*       try writing your own script to test this out
*
* Considerations:
*   have uri be a constant
*   all methods:
*       load client
*       try connecting
*       does the operation (refresh, update tile)
*       close connection
*/

const {MongoClient} = require('mongodb') // mongogb
require('dotenv').config() // loads the .env

// the uri is unlikely to change or change its status, so it can remain outside
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.g5byo.mongodb.net/?retryWrites=true&w=majority`

async function template(){
    /*
    * Template for how each operation will work.
    *
    * We connect and close the connection with each call is so that we dont ever leave the connection running.
    * Leaving it open may use more resources on both server and the client's ends and may pose a security threat.
    *
    * Attempts to connect to the db and perform an operation. if it fails, log the error.
    * And in all cases, close the connection afterward.
    */

    // keep the client here. this way we can have multiple calls using client. without worrying if it is open or closed
    const client = new MongoClient(uri)
    
    // runs the operation function here -------

    // tries to connect and run the operation
    try {
        await client.connect() // connects
        // does an operation (CRUD)

    } catch (e) { // because it is async, it may fail in that case, we log the error
        console.error(e)

    } finally { // in any and all cases, close the connection afterward
        await client.close()

    }
}

async function createTile(client, tile) {
    /*
    * Adds a tile to the database.
    *
    * Each tile has the structure:
    * {
    *   position: [x,y],    // xy coordinates of where the tile is placed
    *   colour: [R,G,B],    // the RGB values to determine the colour
    *   last_modifier: str  // the user who last modified the colour
    * }
    *
    */
}

async function createTiles(client, tiles) {}

async function updateTile(client, position, updated_fields) {
    /*
    * Updates a tile.
    *
    * searches for a tile by its position. then it updates the tile's colour and the last user who modified it.
    *
    * updated_fields:
    * {
    *   colour: [R,G,B],
    *   last_modifier: ""
    * }
    */
}

async function upsertDB(client) {
    /*
    * Used to create the database.
    *
    * the database will be precreated. we only modify it during runtime
    */
}

async function resetTile(client) {
    /*
    * Resets a tile to the default setting.
    *
    * essentially just updates the colour to white and clears the last_modifier
    */
}

async function deleteTile(client, position) {
    /*
    * Deletes a tile.
    *
    * Meant for development, not production.
    */
}

async function deleteAll(client) {
    /*
    * Deletes all tiles.
    *
    * Essentially clears the db. Only meant to be used in development. not during production
    */
}

async function getTile(client, position) {
    /*
    * Gets a single tile from the db.
    * */
}

async function getAllTiles(client) {
    /*
    * Gets all tiles from the db.
    *
    * Used very often. meant to load the webpage(and all the tiles in the db) as well as
    * reload the page contents(the tiles) every second or so.
    * */
}

//template().catch(console.error)
