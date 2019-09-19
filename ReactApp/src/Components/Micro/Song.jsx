import React from "react"

import * as Song from "../Styled/Micro/Song"
import { Link } from "react-router-dom"

export default props => {
	const generateUsing = attrList => {
		if(!attrList) {
			attrList = ["art", "title", "artist", "collection"]
		}

		const items = []

		if(attrList.includes("art"))
			items.push(<Song.Artwork src={props.artwork.extraSmall} />)

		if(attrList.includes("title"))
			items.push(
				<Song.Entry>
					<div className="title">
						Track name
					</div>
					<div>
						{props.title}
					</div>
				</Song.Entry>
			)

		if(attrList.includes("artist"))
			items.push(
				<Song.Entry>
					<div className="title">
						Artist
					</div>
					<div>
						{props.artist.name}
					</div>
				</Song.Entry>
			)

		if(attrList.includes("collection"))
			items.push(
				<Song.Entry>
					<div className="title">
						Collection
					</div>
					<div>
						<Link to={`/album/${props.album.id}`}>
							{props.album.name}
						</Link>
					</div>
				</Song.Entry>
			)

		return items
	}

	return (
		<Song.Body>
			{generateUsing(props.request)}
		</Song.Body>
	)
}
