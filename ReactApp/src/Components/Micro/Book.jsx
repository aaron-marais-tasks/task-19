import React from "react"

import * as Book from "../Styled/Micro/Book"

export default props => {
	const artworkUrl = props.artworkUrl100.split("/")
	artworkUrl.pop()
	artworkUrl.push("250x0w.jpg")

	return (
		<Book.Body>
			<Book.Artwork src={artworkUrl.join("/")} />

			<Book.Entry>
				<div className="title">
					Book title
				</div>
				<div>
					{props.trackName}
				</div>
			</Book.Entry>

			<Book.Entry>
				<div className="title">
					Author
				</div>
				<div>
					{props.artistName}
				</div>
			</Book.Entry>

			<Book.Entry>
				<div className="title">
					Genre
				</div>
				<div>
					{props.genres[0]}
				</div>
			</Book.Entry>
		</Book.Body>
	)
}
