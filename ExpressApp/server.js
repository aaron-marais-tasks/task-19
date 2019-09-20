const express = require("express")
const bodyParser = require('body-parser')
const fetch = require("node-fetch")

const methods = [
	require("./methods/search.js"),
	require("./methods/album.js"),
	require("./methods/book.js")
]

const app = express()

app.use((err, req, res, next) => {
	res.status(500).json({
		status: 0,
		reason: err.message
	})
})

const route = express.Router()
route.use(bodyParser.json())

app.use("/api", route)

methods.forEach(method => {
	const steps = method.query.map((step, key) => {
		if(key === method.query.length - 1) return step

		return async (req, res, next) => {
			if(await step(req, res) === true)
				next()
		}
	})

	switch(method.method) {
		case "POST":
			route.post(method.path, steps)
			break

		case "GET": default:
			route.get(method.path, steps)
	}
})

app.listen(8080, () => {
	console.log("Started express server on port 8080")
})
