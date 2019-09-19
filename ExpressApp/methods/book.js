const queryString = require("querystring")
const fetch = require("node-fetch")

const { getEntities } = require("./helpers")

const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Album ID missing")

	return true
}

const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		entity: "ebook"
	})

	const request = await fetch(`https://itunes.apple.com/lookup?${query}`)
	req.returned = await request.json()

	return true
}

const buildResult = (req, res) => {
	const book = req.returned.results[0]

	const lastIndex = book.artworkUrl100.lastIndexOf("/")
	const artworkUrl = book.artworkUrl100.substring(0, lastIndex)
	const artworks = {
		large: `${artworkUrl}/640x0w.jpg`,
		medium: `${artworkUrl}/320x0w.jpg`,
		small: `${artworkUrl}/140x0w.jpg`,
		extraSmall: book.artworkUrl100
	}

	res.json({
		status: 1,
		book: {
			title: book.trackName,
			description: book.description,
			genres: book.genres,
			released: book.releaseDate,
			rating: {
				average: book.averageUserRating,
				count: book.userRatingCount
			},
			artwork: artworks,
			author: {
				name: book.artistName,
				id: book.artistId
			}
		}
	})
}

exports.path = "/book"
exports.method = "POST"
exports.query = [
	checkup,
	queryAppleApi,
	buildResult
]
