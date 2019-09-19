import React from "react"
import StarRatings from 'react-star-ratings'

import BookBody, * as Book from "../Styled/Micro/Book"
import {Link} from "react-router-dom"

export const Item = props => {
	return (
		<Link to={`/book/${props.id}`}>
			<Book.Artwork src={props.artwork.medium}>
				<Book.Body>
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
				</Book.Body>
			</Book.Artwork>
		</Link>
	)
}

export default props => {
	return (
		<BookBody>
			{props.children}
		</BookBody>
	)
}
