/*
	This file handles returning the list of favorites mapped to Apple information
*/

// Import query string and fetch modules
const queryString = require("querystring")
const fetch = require("node-fetch")

// Get search route
const search = require("./search")

// Import getEntities and requireUncached from helper file
const { getEntities, requireUncached } = require("./helpers")

// Step 1: get favorites from file
const getFavorites = (req, res) => {
	const favorites = requireUncached("../favorites.json")
	res.favorites = favorites

	return true
}

// Step 2: get list of favorites from Apple API lookup
const queryAppleApi = async (req, res) => {
	const request = await fetch(`https://itunes.apple.com/lookup?id=${res.favorites.join(",")}`)
	res.result = await request.json()

	return true
}

// Express stuff

// Route path
exports.path = "/favorite"
// Route method
exports.method = "GET"
// Route steps
exports.query = [
	getFavorites,
	queryAppleApi,

	// buildResult from search (same input and output expected)
	search.query[3]
]
