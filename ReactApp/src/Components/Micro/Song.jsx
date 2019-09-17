import React from "react"

import * as Song from "../Styled/Micro/Song"

export default props => {
	return (
		<Song.Body>
			<Song.Artwork src={props.artworkUrl100} />

			<Song.Entry>
				<div className="title">
					Track name
				</div>
				<div>
					{props.trackName}
				</div>
			</Song.Entry>

			<Song.Entry>
				<div className="title">
					Artist
				</div>
				<div>
					{props.artistName}
				</div>
			</Song.Entry>

			<Song.Entry>
				<div className="title">
					Collection
				</div>
				<div>
					{props.collectionName}
				</div>
			</Song.Entry>
		</Song.Body>
	)
}
