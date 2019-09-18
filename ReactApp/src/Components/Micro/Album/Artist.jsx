import React from "react"

export default props => {
	const artworkUrl = props.artworkUrl100.split("/")
	artworkUrl.pop()
	artworkUrl.push("320x0w.jpg")

	return (
		<div>
			<img src={props.artworkUrl100} />
		</div>
	)
}
