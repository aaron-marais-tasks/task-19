/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"
import parseHtml from 'html-react-parser'
import StarRatings from 'react-star-ratings'
import {Link} from "react-router-dom"

import Container, * as Book from "./Styled/Book"

import * as api from "../queryApi"

export default props => {
	const [results, updateResults] = React.useState(null)
	const [status, setStatus] = React.useState(-1)

	React.useEffect(() => {
		if(!props.match.params.id) return

		api.book(props.match.params.id)
		.then(res => updateResults(res.book))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, [])

	if(results === null) return null
	if(![-1, 1].includes(status))
		return (
			<div>
				{results}
				<Link to="/">Back home</Link>
			</div>
		)

	const book = results
	const released = new Date(book.released)
	return (
		<Container>
			<div className="leftBar">
				<img className="coverArt" src={book.artwork.medium} alt="Book artwork" />

				<StarRatings 
					rating={book.rating.average}
					starRatedColor="gold"
					starEmptyColor="lightblue"
					numberOfStars={5}
			        starDimension="30px"
        			starSpacing="5px"
				/>

				<div>
					{released.toDateString()}
				</div>

				<div className="genres">
					Genres:
					{book.genres.map((genre, id) =>
						<div>
							{genre.name}
						</div>
					)}
				</div>
			</div>

			<Book.Info>
				<Book.Head>
					<div className="albumTitle">
						{book.title}
					</div>

					<div className="authorName">
						{book.author.name}
					</div>
				</Book.Head>

				<Book.Description>
					{parseHtml(book.description)}
				</Book.Description>
			</Book.Info>
		</Container>
	)
}
