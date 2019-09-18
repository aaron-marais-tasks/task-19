const queryString = require("querystring")
const fetch = require("node-fetch")

const { getEntities } = require("./helpers")

const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Album ID missing")

	req.entities = getEntities(req.body.entities)
	if(req.entities === false)
		throw new Error("Invalid entities type (array of strings required)")

	return true
}

const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		entity: req.entities
	})
	const request = await fetch(`https://itunes.apple.com/lookup?${query}`)
	req.returned = await request.json()

	return true
}

const buildResult = (req, res) => {
	let album = {}
	const songs = []

	req.returned.results.forEach(result => {
		if(result.wrapperType === "collection")
			return album = {...result}

		songs.push(result)
	})

	album.songList = songs
	res.json({
		status: 1,
		album
	})
}

exports.path = "/album"
exports.method = "POST"
exports.query = [
	checkup,
	queryAppleApi,
	buildResult
]
