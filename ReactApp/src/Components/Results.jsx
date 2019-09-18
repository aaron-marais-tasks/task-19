/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import Song from "./Micro/Song"
import BookBody, {Item as BookItem} from "./Micro/Book"

export default props => {
	if(props.query === "") {
		props.history.push("/")
	}

	const [status, setStatus] = React.useState(-1)
	const [results, updateResults] = React.useState(null)
	const [songs, setSongs] = React.useState([])
	const [ebooks, setEbooks] = React.useState([])

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

	React.useEffect(() => {
		if(songs.length === 0 && results !== null) {
			setSongs(
				results
				.filter(item => item.kind === "song")
				.filter((item, index) => index < 25)
			)
			setEbooks(results.filter(item => item.kind === "ebook"))
		}
	}, [results])

	if(results === null || !props.query) return null

	if(![-1, 1].includes(status)) {
		return (
			<div>
				{results}
			</div>
		)
	}

	const showMoreSongs = () => {
		setSongs(
			results
			.filter(item => item.kind === "song")
			.filter((item, index) => index < songs.length + 25)
		)
	}

	console.log(results)
	return (
		<React.Fragment>
			<div>
				{songs.map((item, key) => <Song key={key} {...item} />)}
				{songs.length < results.length - ebooks.length - 1 && <div onClick={showMoreSongs}>Show More</div>}
			</div>
			<BookBody>
				<div className="buffer" />
				{ebooks.map((item, key) => <BookItem {...item} />)}
				<div className="buffer" />
			</BookBody>
		</React.Fragment>
	)
}
