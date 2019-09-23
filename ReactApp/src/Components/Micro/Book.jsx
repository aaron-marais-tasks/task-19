import React from "react"
import StarRatings from 'react-star-ratings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import BookBody, * as Book from "../Styled/Micro/Book"
import {Link} from "react-router-dom"

import * as api from "../../queryApi.js"

export const Item = props => {
	const [isFavorite, setFavorite] = React.useState(typeof props.favorite === "boolean" ? props.favorite : false)

	const toggleFavorite = e => {
		e.stopPropagation()
		setFavorite(!isFavorite)

		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	return (
		<Book.Artwork src={props.artwork.medium}>
			<Book.Body>
				<FontAwesomeIcon className={isFavorite ? "favorite" : ""} icon="heart"
					onClick={toggleFavorite} />

				<Link to={`/book/${props.id}`}>
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

export default props => {
	if(!props.ebooks) return null

	return (
		<BookBody>
			<div className="buffer" />
			{props.ebooks.map((item, key) =>
				<Item key={key} {...item} />
			)}
			<div className="buffer" />
		</BookBody>
	)
}
