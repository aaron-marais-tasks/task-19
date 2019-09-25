/*
	This file handles book querying
*/

// Import query string and fetch modules
const queryString = require("querystring")
const fetch = require("node-fetch")

// Import getEntities helper
const { getEntities, requireUncached } = require("./helpers")

// Step 1: Check if book ID is passed
const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Book ID missing")

	return true
}

// Step 2: Query Apple Lookup API
const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		entity: "ebook"
	})

	const request = await fetch(`https://itunes.apple.com/lookup?${query}`)
	req.returned = await request.json()

	return true
}

// Step 3: Get favorites from file
const getFavorites = (req, res) => {
	res.favorites = requireUncached("../favorites.json")
	return true
}

// Step 4: Build book result
const buildResult = (req, res) => {
	// First result is book we want
	const book = req.returned.results[0]

	// Generate book artwork
	const lastIndex = book.artworkUrl100.lastIndexOf("/")
	// Get base artwork URL
	const artworkUrl = book.artworkUrl100.substring(0, lastIndex)
	// Object with different sized image URLs
	const artworks = {
		large: `${artworkUrl}/640x0w.jpg`,
		medium: `${artworkUrl}/320x0w.jpg`,
		small: `${artworkUrl}/140x0w.jpg`,
		extraSmall: book.artworkUrl100
	}

	// Respond with status of 1 and book information
	res.json({
		status: 1,
		book: {
			title: book.trackName,
			description: book.description,
			favorite: res.favorites.includes(book.trackId),

			// Map genre IDs to their name
			genres: book.genres.map((name, index) => ({
				id: book.genreIds[index], name
			})),
			released: book.releaseDate,

			// Average and amount of rating
			rating: {
				average: book.averageUserRating,
				count: book.userRatingCount
			},
			artwork: artworks,

			// Author information
			author: {
				name: book.artistName,
				id: book.artistId
			}
		}
	})
}

// Express stuff

// Route path
exports.path = "/book"
// Route method
exports.method = "POST"
// Route steps
exports.query = [
	checkup,
	queryAppleApi,
	getFavorites,
	buildResult
]
