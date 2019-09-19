const queryString = require("querystring")
const fetch = require("node-fetch")

const { getEntities } = require("./helpers")

const checkup = (req, res) => {
	if(!req.body.query)
		return res.json({
			status: 0,
			reason: "Query missing"
		})

	let entities = getEntities(req.body.entities)
	if(entities === false)
		return res.json({
				status: 0,
				reason: "Invalid entities type (array of strings required)"
			})
	res.entities = entities

	return true
}

const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		term: req.body.query,
		entity: res.entities.join(","),
		lang: "en_us",
		limit: 200
	})

	const request = await fetch(`https://itunes.apple.com/search?${query}`)
	res.result = await request.json()

	return true
}

const buildResult = (req, res) => {
	const {results} = res.result
	const items = results.map(item => {
		const lastIndex = item.artworkUrl100.lastIndexOf("/")
		const artworkUrl = item.artworkUrl100.substring(0, lastIndex)
		const artworks = {
			large: `${artworkUrl}/640x0w.jpg`,
			medium: `${artworkUrl}/320x0w.jpg`,
			small: `${artworkUrl}/140x0w.jpg`,
			extraSmall: item.artworkUrl100
		}

		switch(item.kind) {
			case "song":
				return {
					id: item.trackId,
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

					album: {
						id: item.collectionId,
						name: item.collectionName,
						explicit: item.collectionExplicitness === "notExplicit" ? false : true,
						discs: item.discCount,
						tracks: item.trackCount
					},

					artist: {
						id: item.artistId,
						name: item.artistName,
					}
				}

			case "ebook":
				return {
					id: item.trackId,
					kind: item.kind,
					title: item.trackName,
					description: item.description,
					genres: item.genres,
					released: item.releaseDate,
					rating: {
						average: item.averageUserRating,
						count: item.userRatingCount
					},
					artwork: artworks,
					author: {
						name: item.artistName,
						id: item.artistId
					}
				}

			default: 
				if(!item.kind) return item
				throw new Error(`Unable to handle item of type ${item.kind}`)
		}
	})

	const listOfResults = {}
	for(const item of items) {
		const list = listOfResults[item.kind] || []
		
		const kind = item.kind
		delete item.kind
		list.push(item)

		listOfResults[kind] = list
	}

	res.json({
		status: 1,
		items: listOfResults
	})
}

exports.path = "/search"
exports.method = "POST"
exports.query = [
	checkup,
	queryAppleApi,
	buildResult
]
