import React from "react"

import Song from "./Micro/Song"
import Book from "./Micro/Book"

export default props => {
	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)

	React.useEffect(() => {
		if(props.query === "") return

		fetch("http://localhost:8080/search", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: props.query,
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
	}, [props.query])

	if(results === null || !props.query) return null

	if(![-1, 1].includes(status)) {
		return (
			<div>
				{results}
			</div>
		)
	}

	const ebooks = results.filter(item => item.kind === "ebook")
	const songs = results.filter(item => item.kind === "song")

	console.log(results)
	return (
		<React.Fragment>
			<div>
				{songs.map((item, key) => <Song key={key} {...item} />)}
			</div>
			<div>
				{ebooks.map((item, key) => <Book {...item} />)}
			</div>
		</React.Fragment>
	)
}
