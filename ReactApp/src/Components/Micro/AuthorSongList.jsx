/*
	This file holds my author song list, for lazy component loading
*/

// Import React into script scope
import React from "react"

// Import song component
import Song from "./Results/Song"

// Component checks if open, and if is open, renders a div with song list
export default props => props.open && (
	<div>
		{props.tracks.map((track, key) => 
			<Song key={key} request={props.request}
				{...track} />
		)}
	</div>
)
