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
	res.json({
		status: 1,
		items: res.result.results
	})
}

exports.path = "/search"
exports.method = "POST"
exports.query = [
	checkup,
	queryAppleApi,
	buildResult
]
