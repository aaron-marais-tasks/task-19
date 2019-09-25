/* eslint-disable react-hooks/exhaustive-deps */

// Import React into script scope, as well as promise tracker,
// font awesome, router link, react html parser, and star ratings libraries
import React from "react"
import { trackPromise } from 'react-promise-tracker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"
import parseHtml from 'html-react-parser'
import StarRatings from 'react-star-ratings'

// Import styled components
import Container, * as Book from "./Styled/Book"

// Import API helper
import * as api from "../queryApi"

export default props => {
	/*
		State variables
	*/

	// Results is null by default; holds API return
	const [results, updateResults] = React.useState(null)

	// Status is -1 by default; used for errors
	const [status, setStatus] = React.useState(-1)

	// Whether or not is a favorite
	const [isFavorite, setFavorite] = React.useState(props.favorite)

	/*
		Functional hooks
	*/

	// On component mount, get book by ID, then update results.
	// If error happens, set status and error reason. Track
	// promise for loader
	React.useEffect(() => {
		const promise = api.book(props.match.params.id)

		trackPromise(promise)

		promise
			.then(res => updateResults(res.book))
			.catch(err => {
				setStatus(err.status)
				updateResults(err.reason)
			})
	}, [])

	/*
		Render callbacks
	*/

	// Toggle favorite
	const toggleFavorite = e => {
		// Stop bubbling
		e.stopPropagation()

		// Toggle state variable
		setFavorite(!isFavorite)

		// If already favorite, remove as favorite, else add
		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	/*
		Rendering
	*/

	// Render null if no results
	if(results === null) return null

	// Render error and l ink to home if status not -1 or 1
	if(![-1, 1].includes(status))
		return (
			<React.Fragment>
				{results}
				<Link to="/">Back home</Link>
			</React.Fragment>
		)

	// Rename results to book
	const book = results
	// Calculate released date
	const released = new Date(book.released)

	// Render book
	return (
		<Container>
			{/* Left bar holds cover art, star rating, released date, and genre list */}
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

			{/* Info is the main content header;
				holds book title, author name, and favorite heart */}
			<Book.Info>
				<Book.Head>
					<div className="albumTitle">
						{book.title}
					</div>

					<div className="authorName">
						{book.author.name}
					</div>

					<FontAwesomeIcon icon="heart" onClick={toggleFavorite}
						className={isFavorite ? "" : "favorite"} />
				</Book.Head>

				{/* Description is main content; simply parse HTML from API */}
				<div>
					{parseHtml(book.description)}
				</div>
			</Book.Info>
		</Container>
	)
}
