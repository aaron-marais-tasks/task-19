/*
	This file handles my album query API
*/

// Import query string and fetch
const queryString = require("querystring")
const fetch = require("node-fetch")

// Import uncached require helper
const { requireUncached } = require("./helpers")

// Step 1: Checkup; make sure ID is available
const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Album ID missing")

	return true
}

// Step 2: Query Apple's lookup API
const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		entity: "song"
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

// Step 4: Build a result from information obtained above
const buildResult = (req, res) => {
	// Album holder
	let album

	// Filter songs and get album
	const songs = req.returned.results.filter(item => {
		// If type is a collection, it's the album
		if(item.wrapperType === "collection") {
			// Generate album artwork
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

			// Set album information
			album = {
				title: item.collectionName,
				explicit: item.collectionExplicitness === "notExplicit" ? false : true,
				copyright: item.copyright,
				released: item.releaseDate,
				discs: item.discCount,
				artwork: artworks,
				artist: {
					name: item.artistName,
					id: item.artistId
				}
			}

			// Filter this out
			return false
		}

		// Filter songs into array
		return true
	})

	// Populate album song list with filtered songs
	album.songList = songs.map(song => ({
		title: song.trackName,
		favorite: res.favorites.includes(song.trackId),
		genre: song.primaryGenre,
		explicit: song.trackExplicitness === "notExplicit" ? false : true,
		playTime: song.trackTimeMillis,
		released: song.releaseDate,
		disc: song.discNumber,
		number: song.trackNumber,
		preview: song.previewUrl
	}))

	// Total amount of discs in the album
	// Gotten from last item
	album.discs = songs[songs.length - 1].discNumber

	// Respond with status of 1, and album information
	res.json({
		status: 1,
		album
	})
}

// Express stuff

// Route path
exports.path = "/album"
// Route method
exports.method = "POST"
// Route steps
exports.query = [
	checkup,
	queryAppleApi,
	getFavorites,
	buildResult
]
