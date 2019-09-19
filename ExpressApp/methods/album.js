const queryString = require("querystring")
const fetch = require("node-fetch")

const checkup = (req, res) => {
	if(!req.body.id)
		throw new Error("Album ID missing")

	return true
}

const queryAppleApi = async (req, res) => {
	const query = queryString.stringify({
		id: req.body.id,
		entity: "song"
	})
	const request = await fetch(`https://itunes.apple.com/lookup?${query}`)
	req.returned = await request.json()

	return true
}

const buildResult = (req, res) => {
	let album
	const songs = req.returned.results.filter(item => {
		if(item.wrapperType === "collection") {
			const lastIndex = item.artworkUrl100.lastIndexOf("/")
			const artworkUrl = item.artworkUrl100.substring(0, lastIndex)
			const artworks = {
				large: `${artworkUrl}/640x0w.jpg`,
				medium: `${artworkUrl}/320x0w.jpg`,
				small: `${artworkUrl}/140x0w.jpg`,
				extraSmall: item.artworkUrl100
			}

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

			return false
		}

		return true
	})

	album.songList = songs.map(song => ({
		title: song.trackName,
		genre: song.primaryGenre,
		explicit: song.trackExplicitness === "notExplicit" ? false : true,
		playTime: song.trackTimeMillis,
		released: song.releaseDate,
		disc: song.discNumber,
		number: song.trackNumber,
		preview: song.previewUrl
	}))

	album.discs = songs[songs.length - 1].discNumber

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
