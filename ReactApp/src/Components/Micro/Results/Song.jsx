/*
	This file holds my song result display
*/

// Import React into script scope, as well as font awesome and route link
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

// Import styled components
import * as Song from "../../Styled/Micro/Song"

// Import API helpers
import * as api from "../../../queryApi.js"

export default props => {
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

	// Generate content items based on props
	const generateUsing = attrList => {
		// If attribute list is empty, use default list
		if(!attrList) {
			attrList = ["art", "title", "artist", "collection"]
		}

		// Intermediate array for items
		const items = []

		// If art is requested, push artwork
		if(attrList.includes("art"))
			items.push(<Song.Artwork key={1} src={props.artwork.extraSmall} />)

		// If title is requested, push track name
		if(attrList.includes("title"))
			items.push(
				<Song.Entry key={2}>
					<div className="title">
						Track name
					</div>
					<div>
						{props.title}
					</div>
				</Song.Entry>
			)

		// If artist is requested, push artist name
		if(attrList.includes("artist"))
			items.push(
				<Song.Entry key={3}>
					<div className="title">
						Artist
					</div>
					<div>
						{props.artist.name}
					</div>
				</Song.Entry>
			)

		// If collection is specified, push album name and link
		if(attrList.includes("collection"))
			items.push(
				<Song.Entry key={4}>
					<div className="title">
						Collection
					</div>
					<div>
						<Link to={`/album/${props.album.id}`}>
							{props.album.name}
						</Link>
					</div>
				</Song.Entry>
			)

		return items
	}

	/*
		Rendering
	*/
	return (
		<Song.Body>
			{/* Generate content based on request property */}
			{generateUsing(props.request)}

		    {/* Generate song entry for favoriting song */}
			<Song.Entry>
				<div className="title">
					Favorite song
				</div>
				<div>
					<FontAwesomeIcon icon="heart" onClick={toggleFavorite}
						className={isFavorite ? "favorite" : ""} />
				</div>
			</Song.Entry>
		</Song.Body>
	)
}
