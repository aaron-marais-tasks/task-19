import React from "react"
import StarRatings from 'react-star-ratings'

import BookBody, * as Book from "../Styled/Micro/Book"
import {Link} from "react-router-dom"

export const Item = props => {
	return (
		<Book.Artwork src={props.artwork.medium}>
			<Link to={`/book/${props.id}`}>
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
			</Link>
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
