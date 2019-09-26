/*
	This file holds my proxy setup for development
*/

// Import proxy handler
const proxy = require("http-proxy-middleware")

// Export function to handle proxying
module.exports = app => {
	if(process.env.NODE_ENV === "development") {
		// Proxy /api/* to http://localhost:8080
		app.use(proxy("/api/*", {
			target: "http://localhost:8080/",
		}))
	}
}
