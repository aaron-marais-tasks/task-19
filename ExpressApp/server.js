const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const fetch = require("node-fetch")

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post("/search", (req, res) => {
	if(!req.body.query)
		return res.json({
			status: 0,
			reason: "Query missing"
		})

	const query = encodeURIComponent(req.body.query)
	fetch(`https://itunes.apple.com/search?term=${query}`)
		.then(returned => returned.json())
		.then(result => res.json(result))
})

app.post("/album", (req, res) => {
	if(!req.body.id)
		return res.json({
			status: 0,
			reason: "Album ID missing"
		})

	console.log(req.headers)

	const entity = req.body.entity || ""
	fetch(`https://itunes.apple.com/lookup?id=${req.body.id}&entity=${entity}`)
		.then(returned => returned.json())
		.then(({results}) => {
			let album = {}
			const songs = []

			results.forEach(result => {
				if(result.wrapperType === "collection")
					return album = {...result}

				songs.push(result)
			})

			album.songList = songs
			res.json(album)
		})
})

app.listen(8080, () => {
	console.log("Started express server on port 8080")
})
