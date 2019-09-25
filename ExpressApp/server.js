/*
	This file handles my Express API server
*/

// Import express, body parser, and fetch modules
const express = require("express")
const bodyParser = require('body-parser')
const fetch = require("node-fetch")

// List of methods for our API
const methods = [
	require("./methods/favorite.get.js"),
	require("./methods/favorite.post.js"),
	require("./methods/favorite.delete.js"),
	require("./methods/search.js"),
	require("./methods/album.js"),
	require("./methods/book.js")
]

// Create an Express app
const app = express()

// Error handling; sends status of 0 and error message
app.use((err, req, res, next) => {
	res.status(500).json({
		status: 0,
		reason: err.message
	})
})

// Use a router for API
const route = express.Router()

// Allow router to parse JSON from body
route.use(bodyParser.json())

// /api root
app.use("/api", route)

// Loop over all methods
methods.forEach(method => {
	// Steps: If not array, only single step (method.query), else map query array out
	const steps = !Array.isArray(method.query) ?
		method.query :
		method.query.map((step, key) => {
			// If is last item, return unmodified step
			if(key === method.query.length - 1) return step

			// If not last item, return async callback
			return async (req, res, next) => {
				// Steps have to return true; if not true, don't go to next step
				const pass = await step(req, res)
				if(pass === true)
					next()
			}

		})

	// Switch over query's method
	switch(method.method) {
		case "DELETE":
			route.delete(method.path, steps)
			break

		case "POST":
			route.post(method.path, steps)
			break

		case "GET":
			route.get(method.path, steps)
			break

		// Unhandled method
		default:
			throw new Error(`Unable to handle method ${method.method}`)
	}
})

// Start API server
app.listen(8080, () => {
	console.log("Started express server on port 8080")
})
