import React from "react"

export default props => {
	return (
		<div className="artist">
			<a href={props.artistViewUrl}>{props.artistName}</a>
		</div>
	)
}
