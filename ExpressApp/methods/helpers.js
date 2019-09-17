exports.validateEntities = entities => {
	if(!entities) return true

	if(!Array.isArray(entities))
		return false

	if(!entities.every(entity => typeof entity === "string"))
		return false

	return true
}

exports.getEntities = entities => {
	if(entities) {
		if(!exports.validateEntities(entities))
			return false
		
		return entities
	}

	return []
}
