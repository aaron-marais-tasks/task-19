/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/*
	This file holds my song result display
*/

// Import React into script scope, as well as font awesome and route link
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

// Re-use song styling
import * as Song from "../../Styled/Micro/Song"

// Import API helpers
import * as api from "../../../queryApi.js"

export const Item = props => {
	/*
		State variables
	*/

	// Whether or not book is a favorite
	const [isFavorite, setFavorite] = React.useState(props.favorite)

	/*
		Callbacks
	*/

	// Toggle if favorite or not
	const toggleFavorite = e => {
		// Stop event bubbling
		e.stopPropagation()

		// Toggle favorite state variable
		setFavorite(!isFavorite)

		// Make call to API to remove or add as favorite
		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	/*
		Rendering
	*/
	return (
		<Song.Body>
			<Song.Artwork src={props.artwork.extraSmall} />

			{/* Podcast title */}
			<Song.Entry>
				<div className="title">
					Podcast name
				</div>
				<div>
					{props.title}
				</div>
			</Song.Entry>

			{/* Podcast artist */}
			<Song.Entry>
				<div className="title">
					Artist
				</div>
				<div>
					{props.artist.name}
				</div>
			</Song.Entry>

			{/* Link to podcasts */}
			<Song.Entry>
				<div className="title">
					Collection
				</div>
				<div>
					<Link to={`/podcast/${props.id}`}>
						{props.title}
					</Link>
				</div>
			</Song.Entry>

		    {/* Generate song entry for favoriting song */}
			<Song.Entry>
				<div className="title">
					Favorite podcast
				</div>
				<div>
					<FontAwesomeIcon icon="heart" onClick={toggleFavorite}
						className={isFavorite ? "favorite" : ""} />
				</div>
			</Song.Entry>
		</Song.Body>
	)
}

// Parent container
export default props => {
	// If no podcasts, render null
	if(!props.podcasts) return null

	return (
		<div>
			{/* Using 2 buffers to provide spacing on left and right of scroll */}
			<div className="buffer" />

			{/* Loop over podcasts and map them to components */}
			{props.podcasts.map((item, key) =>
				<Item key={key} {...item} />
			)}
			
			<div className="buffer" />
		</div>
	)
}
