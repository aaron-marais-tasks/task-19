const queryString = require("querystring")
const fetch = require("node-fetch")
const search = require("./search")

const { getEntities, requireUncached } = require("./helpers")

const getFavorites = (req, res) => {
	const favorites = requireUncached("../favorites.json")
	res.favorites = favorites

	return true
}

const queryAppleApi = async (req, res) => {
	const request = await fetch(`https://itunes.apple.com/lookup?id=${res.favorites.join(",")}`)
	res.result = await request.json()

	return true
}

exports.path = "/favorite"
exports.method = "GET"
exports.query = [
	getFavorites,
	queryAppleApi,
	search.query[3] // buildResult
]
