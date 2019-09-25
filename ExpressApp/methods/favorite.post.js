/*
	This file handles deleting from favorite list
*/

// Import query string, fetch, fs and util modules
const queryString = require("querystring")
const fetch = require("node-fetch")
const fs = require("fs")
const util = require("util")

// Convert writeFile into a promise
const writeFile = util.promisify(fs.writeFile)

// Import getEntities and requireUncached from helper file
const { getEntities, requireUncached } = require("./helpers")

// Add a favorite
const addToFavorites = async (req, res) => {
	// Require uncached content of favories
	const favorites = requireUncached("../favorites.json")

	// Push new favorite
	favorites.push(req.body.id)

	// Try to write
	try {
		// Wait for write, and respond with status 1 if success
		await writeFile(__dirname + "/../favorites.json", JSON.stringify(favorites))
		res.json({
			status: 1
		})
	} catch(err) {
		// Throw error if caught
		throw new Error(err.message)
	}
}

// Express stuff

// Route path
exports.path = "/favorite"
// Route method
exports.method = "POST"
// Route step
exports.query = addToFavorites
