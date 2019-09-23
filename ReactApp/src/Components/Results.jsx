/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import SongList from "./Micro/Results/SongList"
import BookBody from "./Micro/Book"

import * as api from "../queryApi"

export default props => {
	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)

	React.useEffect(() => {
		let promise
		if(props.favorites)
			promise = api.favorite.list()
		else
			promise = api.search(props.match.params.query)

		promise.then(res => updateResults(res.items))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, props.favorites ? [] : [props.match.params.query])

	if(props.favorites ? results === null : (
		results === null || (!props.match.params.query)
	)) return null
	if(![-1, 1].includes(status)) {
		return (
			<div>
				{results}
			</div>
		)
	}

	if(!results.song && !results.ebook) {
		return (
			<React.Fragment>
				No results found
			</React.Fragment>
		)
	}

	return (
		<React.Fragment>
			<SongList songs={results.song} />
			<BookBody ebooks={results.ebook} />
		</React.Fragment>
	)
}
