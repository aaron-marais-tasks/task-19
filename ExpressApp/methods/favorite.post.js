const queryString = require("querystring")
const fetch = require("node-fetch")
const fs = require("fs")
const util = require("util")

const writeFile = util.promisify(fs.writeFile)

const { getEntities, requireUncached } = require("./helpers")

const addToFavorites = async (req, res) => {
	const favorites = requireUncached("../favorites.json")
	favorites.push(req.body.id)

	try {
		await writeFile(__dirname + "/../favorites.json", JSON.stringify(favorites))
		res.json({
			status: 1
		})
	} catch(err) {
		throw new Error(err.message)
	}
}

exports.path = "/favorite"
exports.method = "POST"
exports.query = addToFavorites
