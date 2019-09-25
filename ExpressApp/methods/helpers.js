/*
	This file holds my helpers
*/

// Validate entities from user request
exports.validateEntities = entities => {
	// True if no entities passed
	if(!entities) return true

	// False if not array
	if(!Array.isArray(entities))
		return false

	// False if not all items in array are string
	if(!entities.every(entity => typeof entity === "string"))
		return false

	// True if pass
	return true
}

// Get entity list
exports.getEntities = entities => {
	// If entity list exists, validate entities
	if(entities) {
		if(!exports.validateEntities(entities))
			return false
		
		// If valid list, return entities
		return entities
	}

	// Return empty array if no entities passed
	return []
}

// requireUncached helper deletes the require cache for the module and
// returns the fresh required items
exports.requireUncached = module => {
    delete require.cache[require.resolve(module)]
    return require(module)
}
