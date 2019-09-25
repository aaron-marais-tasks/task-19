/*
	This file holds my book scroller item and container
*/

// Import React into script scope, as well as font awesome, router link,
// and star ratings
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom"
import StarRatings from 'react-star-ratings'

// Import component styling
import BookBody, * as Book from "../../Styled/Micro/Book"

// Import API helper
import * as api from "../../../queryApi.js"

// Export named component
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
		<Book.Artwork src={props.artwork.medium}>
			<Book.Body>
				{/* Heart for favorite. Will be red if already favorited */}
				<FontAwesomeIcon className={isFavorite ? "favorite" : ""} icon="heart"
					onClick={toggleFavorite} />

				{/* Book body wrapped in link, for onclick */}
				<Link to={`/book/${props.id}`}>
					{/* Content is star rating, title, and author name */}
					<div className="content">
						<StarRatings 
							rating={props.rating.average}
							starRatedColor="gold"
							numberOfStars={5}
						    starDimension="15px"
							starSpacing="2px"
						/>

						<div className="title">
							{props.title}
						</div>

						<div className="artist">
							{props.author.name}
						</div>
					</div>
				</Link>
			</Book.Body>
		</Book.Artwork>
	)
}

// Parent container
export default props => {
	// If no ebooks, render null
	if(!props.ebooks) return null

	return (
		<BookBody>
			{/* Using 2 buffers to provide spacing on left and right of scroll */}
			<div className="buffer" />

			{/* Loop over ebooks and map them to components */}
			{props.ebooks.map((item, key) =>
				<Item key={key} {...item} />
			)}
			
			<div className="buffer" />
		</BookBody>
	)
}
