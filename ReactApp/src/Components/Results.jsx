/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import SongList from "./Micro/Results/SongList"
import BookBody from "./Micro/Book"

export default props => {
	const query = props.match.params.query
	if(query === "") {
		props.history.push("/")
	}

	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)

	React.useEffect(() => {
		if(query === "") return

		fetch("/api/search", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: query,
				entities: ["song", "ebook"]
			})
		})
		.then(res => res.json())
		.then(res => {
			if(res.status === 1) return res
			throw res
		})
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
