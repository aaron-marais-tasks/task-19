const queryString = require("querystring")
const fetch = require("node-fetch")
const fs = require("fs")
const util = require("util")

const writeFile = util.promisify(fs.writeFile)

const { getEntities, requireUncached } = require("./helpers")

const removeFromFavorites = async (req, res) => {
	let favorites = requireUncached("../favorites.json")
	favorites = favorites.filter(id => {
		return id !== req.body.id
	})

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
exports.method = "DELETE"
exports.query = removeFromFavorites
