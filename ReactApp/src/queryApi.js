const API_PREFIX = "/api"

const TO_JSON = item => item.json()
const VERIFY_RESULT = item => {
	if(item.status === 1) return item
	throw item
}

export const fetchItem = (apiPath, body, opts={}) =>
	fetch(`${API_PREFIX}/${apiPath}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body),
		...opts
	})

export const search = query =>
	fetchItem("search", {
		query,
		entities: ["song", "ebook"]
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

export const book = id =>
	fetchItem("book", {
		id: id
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

export const album = id => 
	fetchItem("album", {
		id: id,
		entities: ["song"]
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

export const favorite = (id, opts={}) =>
	fetchItem("favorite", {
		id
	}, opts)

favorite.add = id =>
	favorite(id, {
		method: "POST"
	})

favorite.list = () => {
	return favorite(null, {
		method: "GET",
		body: null
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)
}

favorite.remove = id =>
	favorite(id, {
		method: "DELETE"
	})
