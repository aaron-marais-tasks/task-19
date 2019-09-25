/*
	This file holds my local API helpers
*/

// API path prefix
const API_PREFIX = "/api"

/*
	Functions that will be frequently used lower
	TO_JSON: Convert item to JSON
	VERIFY_RESULT: Verify status is equal to 1
*/
const TO_JSON = item => item.json()
const VERIFY_RESULT = item => {
	if(item.status === 1) return item
	throw item
}

// Expose fetchItem
// Fetches from API using PREFIX and apiPath; sets body to body argument and overrides opts optionally
export const fetchItem = (apiPath, body, opts={}) =>
	fetch(`${API_PREFIX}/${apiPath}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body),
		...opts
	})

// Export search
// Uses fetchItem to fetch /api/search, queries for music and ebooks, then converts to json and verifies
// Returns a promise
export const search = query =>
	fetchItem("search", {
		query,
		entities: ["music", "ebook"]
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

// Export book
// Uses fetchItem to fetch /api/book, queries using book ID, then converts to json and verifies
// Returns a promise
export const book = id =>
	fetchItem("book", {
		id: id
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

// Export album
// Uses fetchItem to fetch /api/album, queries using album ID for songs, then converts to json and verifies
// Returns a promise
export const album = id => 
	fetchItem("album", {
		id: id,
		entities: ["song"]
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

// Export search
// Uses fetchItem to fetch /api/favorite, then converts to json and verifies
// Returns a promise
export const favorite = (id, opts={}) =>
	fetchItem("favorite", {
		id
	}, opts)

// Export favorite.add
// Uses favorite to post to /api/favorite, which adds to favorites list
// Returns a promise
favorite.add = id =>
	favorite(id)

// Export favorite.list
// Uses favorite to get from /api/favorite, which returns the favorites list. converts to json and verifies response
// Returns a promise
favorite.list = () =>
	favorite(null, {
		method: "GET",
		body: null
	})
	.then(TO_JSON)
	.then(VERIFY_RESULT)

// Export favorite.remove
// Uses favorite to delete from /api/favorite, which removed an id from favorites list
// Returns a promise
favorite.remove = id =>
	favorite(id, {
		method: "DELETE"
	})
