import React from "react"

import BookBody, * as Book from "../Styled/Micro/Book"

export const Item = props => {
	const artworkUrl = props.artworkUrl100.split("/")
	artworkUrl.pop()
	artworkUrl.push("250x0w.jpg")

	return (
		<Book.Artwork src={artworkUrl.join("/")}>
			<Book.Body>
				<div className="content">
					<div className="title">
						{props.trackName}
					</div>

					<div className="artist">
						{props.artistName}
					</div>
				</div>
			</Book.Body>
		</Book.Artwork>
	)
}

export default props => {
	return (
		<BookBody>
			{props.children}
		</BookBody>
	)
}
