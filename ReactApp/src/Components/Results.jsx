/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import Song from "./Micro/Song"
import BookBody, {Item as BookItem} from "./Micro/Book"

export default props => {
	const query = props.match.params.query
	if(query === "") {
		props.history.push("/")
	}

	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)
	const [songs, setSongs] = React.useState([])
	const [ebooks, setEbooks] = React.useState([])

	React.useEffect(() => {
		if(query === "") return

		fetch("http://localhost:8080/search", {
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

	React.useEffect(() => {
		if(results !== null && typeof results !== "string") {
			setSongs(
				results.song.filter((item, index) => index < 25)
			)
		}
	}, [results])

	if(results === null || !query) return null
	if(![-1, 1].includes(status)) {
		return (
			<div>
				{results}
			</div>
		)
	}

	const showMoreSongs = () => {
		setSongs(
			results.song.filter((item, index) => index < songs.length + 25)
		)
	}

	return (
		<React.Fragment>
			<div>
				{songs.map((item, key) => <Song key={key} {...item} />)}
				{songs.length < results.song.length - 1 && <div onClick={showMoreSongs}>Show More</div>}
			</div>
			{results.ebook && (
				<BookBody>
					<div className="buffer" />
					{results.ebook.map((item, key) => <BookItem {...item} />)}
					<div className="buffer" />
				</BookBody>
			)}
		</React.Fragment>
	)
}
