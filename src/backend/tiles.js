/*
* [REDUNDANT]
* ONLY KEPT AS REFERENCE
* 
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
    * Attempts to connect to the backend and perform an operation. if it fails, log the error.
    * And in all cases, close the connection afterward.
    */

    // keep the client here. this way we can have multiple calls using client. without worrying if it is open or closed
    const client = new MongoClient(uri)

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

async function createTile(tile) {
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
    * Example:
    *   // creates a single tile at position [-1,-1], with the colour, black.
    *   // we do not need to set a last_modifier, as nobody has modified it yet.
    *   >>>createTile({
    *       position: [-1,-1],
    *       colour: [0,0,0]
    *   })
    */

    // keep the client here. this way we can have multiple calls using client. without worrying if it is open or closed
    const client = new MongoClient(uri)

    // tries to connect and run the operation
    try {
        await client.connect() // connects

        const result = await client.db("db").collection("tiles").insertOne(tile) // adds the tile

        console.log(`Created a new tile with ID: ${result.insertedId}`)

    } catch (e) { // because it is async, it may fail in that case, we log the error
        console.error(e)

    } finally { // in any and all cases, close the connection afterward
        await client.close()

    }

}

async function createTiles(tiles) {}

async function updateTile(position, updated_fields) {
    /*
    * Updates a tile.
    *
    * searches for a tile by its position. then it updates the tile's colour and the last user who modified it.
    *
    * We search for the tile by its position, and then insert the updated fields such as colour or the last_modifier
    *
    * Examples:
    *   // updates the tile at [-1,-1] tp the colour black. this change was made by user, "lvlonEmperor"
    *   updateTile(
    *       [-1,-1],
    *       {
    *           colour: [0,0,0],
    *           last_modifier= "lvlonEmperor"
    *       }
    *   )
    *
    * updated_fields:
    * {
    *   colour: [R,G,B],
    *   last_modifier: ""
    * }
    */

    const client = new MongoClient(uri)

    // tries to connect and run the operation
    try {
        await client.connect() // connects

        // searches for the matching tile and changes the fields
        console.log(position)
        const result = await client.db("db").collection("tiles").updateOne(
            {position: position},
            {$set: updated_fields}
        )

        console.log("matching documents: " + result.matchedCount)
        console.log(result.modifiedCount + " docs were updated")

    } catch (e) { // because it is async, it may fail in that case, we log the error
        console.error(e)

    } finally { // in any and all cases, close the connection afterward
        await client.close()

    }
}

async function upsertDB() {
    /*
    * Used to create the database.
    *
    * the database will be precreated. we only modify it during runtime
    */
}

async function resetTile(position) {
    /*
    * Resets a tile to the default setting.
    *
    * essentially just updates the colour to white and clears the last_modifier.
    *
    * Does this by calling the updateTile() method
    *
    * Example:
    *   // updates the tile at 0,0 to the colour white.
    *   resetTile([0,0])
    */
    updateTile(position, {colour: [255,255,255]})
}

async function deleteTile(position) {
    /*
    * Deletes a tile.
    *
    * Meant for development, not production.
    *
    * Examples:
    *   // deletes the tile at position [-1,-1]
    *   deleteTile([-1, -1])
    */

    const client = new MongoClient(uri)

    // tries to connect and run the operation
    try {
        await client.connect() // connects

        const result = await client.db("db").collection("tiles").deleteOne({position: position})

        console.log(result.deletedCount + " docs were deleted")

    } catch (e) { // because it is async, it may fail in that case, we log the error
        console.error(e)

    } finally { // in any and all cases, close the connection afterward
        await client.close()

    }
}

async function deleteAll() {
    /*
    * Deletes all tiles.
    *
    * Essentially clears the backend. Only meant to be used in development. not during production
    */
}

async function getTile(position) {
    /*
    * Gets a single tile from the backend.
    * */

    const client = new MongoClient(uri)

    // tries to connect and run the operation
    try {
        await client.connect() // connects

        const result = await client.db("db").collection("tiles").findOne({position: position})

        if (result) {
            console.log("Found result")
            console.log(result)
        } else {
            console.log("No listings found")
        }

        return result

    } catch (e) { // because it is async, it may fail in that case, we log the error
        console.error(e)

    } finally { // in any and all cases, close the connection afterward
        await client.close()

    }
}

async function getAllTiles() {
    /*
    * Gets all tiles from the backend.
    *
    * Used very often. meant to load the webpage(and all the tiles in the backend) as well as
    * reload the page contents(the tiles) every second or so.
    *
    * TODO:
    *   see if there is a built in get all. same for delete.
    * */

}


//createTile({position: [-1,-1], colour: [255,255,255]})
updateTile([-1,-1] , {colour: [0,0,1], last_modifier: "lvlonEmperor"})//.catch(console.error)
//resetTile([-1,-1])
//deleteTile([-1,-1])
//console.log(getTile([-1,-1]))
