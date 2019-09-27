/* eslint-disable react-hooks/exhaustive-deps */

/*
	This file holds my search and favorite results
*/

// Import React into script scope, as well as promise tracker and router link
import React from "react"
import { trackPromise } from 'react-promise-tracker'
import { Link } from "react-router-dom"

// Import query string parser
import queryString from "querystring"

// Import my song list and book components
import PodcastList from "./Micro/Results/Podcast"
import SongList from "./Micro/Results/SongList"
import BookList from "./Micro/Results/Book"

// Import API methods
import * as api from "../queryApi"

// Export functional component
export default props => {
	/*
		State variables
	*/

	// Status is -1 by default, if set to 1, is success; if set to 0, failure
	const [status, setStatus] = React.useState(-1)
	// Holds results from API
	const [results, updateResults] = React.useState(null)

	/*
		Functional hooks
	*/

	// useEffect to simulate componentDidMount or componentDidUpdate
	React.useEffect(() => {
		// Hold API fetch promise
		let promise

		// If favorites, get list; if not favorites, get by search query
		if(props.favorites)
			promise = api.favorite.list()
		else {
			// Slice search query
			const slicedQuery = props.location.search.slice(1)
			const query = queryString.parse(slicedQuery)

			// Query search API
			promise = api.search(props.match.params.query, query.query.split(","))
		}

		trackPromise(promise)

		// Update results when promise is successful.
		// If not successful, set status to error status, and
		// update results to hold error message
		promise.then(res => updateResults(res.items))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, [props.match.params.query])

	/*
		Rendering
	*/

	// If is favorites, check if results is null
	// If not favorites, check if results is null and if no query given
	// If either is true, return null
	if(props.favorites ? results === null : (
		results === null || (!props.match.params.query)
	)) return null

	// If status is not -1 or 1, display the error message
	if(![-1, 1].includes(status)) {
		return (
			<React.Fragment>
				{results}
				<Link to="/">Back home</Link>
			</React.Fragment>
		)
	}

	// If neither song nor ebook exist in results, display no results found
	if(!results.song && !results.ebook && !results.podcast) {
		return (
			<React.Fragment>
				No results found
			</React.Fragment>
		)
	}

	console.log(results)

	// Render song list and ebook list
	return (
		<React.Fragment>
			<BookList ebooks={results.ebook} />
			<SongList songs={results.song} />
			<PodcastList podcasts={results.podcast} />
		</React.Fragment>
	)
}
