/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import SongList from "./Micro/Results/SongList"
import BookBody from "./Micro/Book"

import * as api from "../queryApi"

export default props => {
	const query = props.match.params.query
	if(query === "") {
		props.history.push("/")
	}

	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)

	React.useEffect(() => {
		if(query === "") return

		api.search(query)
		.then(res => updateResults(res.items))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, [props.match.params.query])

	if(results === null || !query) return null
	if(![-1, 1].includes(status)) {
		return (
			<div>
				{results}
			</div>
		)
	}

	return (
		<React.Fragment>
			<SongList songs={results.song} />
			<BookBody ebooks={results.ebook} />
		</React.Fragment>
	)
}
