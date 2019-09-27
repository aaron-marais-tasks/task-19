/*
	This file handles searching Apple's API
*/

// Import query string and fetch modules
const queryString = require("querystring")
const fetch = require("node-fetch")

// Import getEntities and requireUncached helpers
const { getEntities, requireUncached } = require("./helpers")

// Step 1: Check if query is available and entities are valid
const checkup = (req, res) => {
	if(!req.body.query)
		throw new Error("Query missing")

	let entities = getEntities(req.body.entities)
	if(entities === false)
		throw new Error("Invalid entities type (array of strings required)")

	// If valid entities, push into response
	res.entities = entities

	return true
}

// Step 2: Query Apple's search API
const queryAppleApi = async (req, res) => {
	// Build query with term, lang, entity, and limit keys
	const query = queryString.stringify({
		term: req.body.query,
		entity: res.entities.join(","),
		lang: "en_us",
		limit: 200
	})

	// Wait for request from server and push into response
	const request = await fetch(`https://itunes.apple.com/search?${query}`)
	res.result = await request.json()

	return true
}

// Step 3: Get favorites from file
const getFavorites = (req, res) => {
	res.favorites = requireUncached("../favorites.json")
	return true
}

// Step 4: Build response
const buildResult = (req, res) => {
	// Unpack results from api result
	const { results } = res.result

	// Map items from filtered results
	const items = results
	.filter(item => item.kind)
	.map(item => {
		// Generate item artwork
		const lastIndex = item.artworkUrl100.lastIndexOf("/")
		// Get base artwork URL
		const artworkUrl = item.artworkUrl100.substring(0, lastIndex)
		// Object with different sized image URLs
		const artworks = {
			large: `${artworkUrl}/640x0w.jpg`,
			medium: `${artworkUrl}/320x0w.jpg`,
			small: `${artworkUrl}/140x0w.jpg`,
			extraSmall: item.artworkUrl100
		}

		// Switch on kind of item (either song or ebook)
		switch(item.kind) {
			case "song":
				return {
					id: item.trackId,
					favorite: res.favorites.includes(item.trackId),
					kind: item.kind,
					title: item.trackName,
					genre: item.primaryGenre,
					artwork: artworks,
					explicit: item.trackExplicitness === "notExplicit" ? false : true,
					playTime: item.trackTimeMillis,
					released: item.releaseDate,
					disc: item.discNumber,
					number: item.trackNumber,
					preview: item.previewUrl,

					// Song album information
					album: {
						id: item.collectionId,
						name: item.collectionName,
						explicit: item.collectionExplicitness === "explit",
						discs: item.discCount,
						tracks: item.trackCount
					},

					// Song artist information
					artist: {
						id: item.artistId,
						name: item.artistName,
					}
				}

			case "ebook":
				return {
					id: item.trackId,
					favorite: res.favorites.includes(item.trackId),
					kind: item.kind,
					title: item.trackName,
					description: item.description,
					genres: item.genres,
					released: item.releaseDate,

					// Ebook ratings
					rating: {
						average: item.averageUserRating,
						count: item.userRatingCount
					},
					artwork: artworks,

					// Ebook author information
					author: {
						name: item.artistName,
						id: item.artistId
					}
				}

			case "podcast":
				return {
					id: item.collectionId,
					favorite: res.favorites.includes(item.collectionId),
					kind: item.kind,
					title: item.collectionName,
					explicit: item.collectionExplicitness === "explit",
					genres: item.genres,
					recordedCount: item.trackCount,
					artwork: artworks,
					artist: {
						name: item.artistName
					}
				}
		}
	})

	// Build a list of results from items
	const listOfResults = {}
	for(const item of items) {
		if(!item) continue

		// If kind exists in list, populate that, else new array
		const list = listOfResults[item.kind] || []
		
		// Save item kind, then delete from item
		const kind = item.kind
		delete item.kind

		// Push item into list
		list.push(item)

		// Overwrite items in array
		listOfResults[kind] = list
	}

	// Respond with status of 1 and item list
	res.json({
		status: 1,
		items: listOfResults
	})
}

// Express stuff

// Route path
exports.path = "/search"
// Route method
exports.method = "POST"
// Route steps
exports.query = [
	checkup,
	queryAppleApi,
	getFavorites,
	buildResult
]
