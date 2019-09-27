/*
	This file handles my podcast query API
*/

// Import query string and fetch
const queryString = require("querystring")
const fetch = require("node-fetch")

// XML2JSON for RSS feed parsing
const { xml2json } = require("xml-js")

// Import uncached require helper
const { requireUncached } = require("./helpers")

// Step 1: Checkup; make sure ID is available
const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Podcast ID missing")

	return true
}

// Step 2: Query Apple's lookup API
const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		media: "podcast"
	})
	const request = await fetch(`https://itunes.apple.com/lookup?${query}`)
	const returned = await request.json()
	res.result = returned.results[0]

	return true
}

// Step 3: Get podcast episodes
const getPodcastEpisodes = async (req, res) => {
	// Fetch using RSS feed
	const episodeQuery = await fetch(res.result.feedUrl)
	const response = await episodeQuery.text()

	// Convert RSS feed to JSON object and store in response
	const jsonObject = JSON.parse(xml2json(response, {compact: true}))
	
	const channel = {...jsonObject.rss.channel}
	delete channel.item
	res.channel = channel
	res.episodes = [...jsonObject.rss.channel.item]

	return true
}

// Step 4: Get favorites from file
const getFavorites = (req, res) => {
	res.favorites = requireUncached("../favorites.json")
	return true
}

// Step 5: Build a result from information obtained above
const buildResult = (req, res) => {
	// Generate item artwork
	const lastIndex = res.result.artworkUrl100.lastIndexOf("/")
	// Get base artwork URL
	const artworkUrl = res.result.artworkUrl100.substring(0, lastIndex)
	// Object with different sized image URLs
	const artworks = {
		large: `${artworkUrl}/640x0w.jpg`,
		medium: `${artworkUrl}/320x0w.jpg`,
		small: `${artworkUrl}/140x0w.jpg`,
		extraSmall: res.result.artworkUrl100
	}

	const channel = {
		title: res.channel.title._text,
		description: res.channel.description._cdata || res.channel.description._text,
		author: res.channel["itunes:author"]._text,
		artwork: artworks,
		explicit: res.channel["itunes:explicit"]._text === "yes",
		genres: Array.isArray(res.channel["itunes:category"]) ? 
			res.channel["itunes:category"].map(
				category => category._attributes.text
			) : 
			res.channel["itunes:category"]._attributes.text,
		episodes: res.episodes.map(episode => ({
			title: episode.title._text,
			description: episode.description._cdata || episode.description._text,
			length: episode["itunes:duration"]._text,
			published: episode.pubDate._text,
			explicit: episode["itunes:explicit"]._text === "yes"
		}))
	}

	res.json({
		status: 1,
		channel
	})
}

// Express stuff

// Route path
exports.path = "/podcast"
// Route method
exports.method = "POST"
// Route steps
exports.query = [
	checkup,
	queryAppleApi,
	getPodcastEpisodes,
	getFavorites,
	buildResult
]
