import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as Song from "../Styled/Micro/Song"
import { Link } from "react-router-dom"

import * as api from "../../queryApi.js"

export default props => {
	const [isFavorite, setFavorite] = React.useState(props.favorite)
	const toggleFavorite = e => {
		e.stopPropagation()
		setFavorite(!isFavorite)

		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	const generateUsing = attrList => {
		if(!attrList) {
			attrList = ["art", "title", "artist", "collection"]
		}

		const items = []

		if(attrList.includes("art"))
			items.push(<Song.Artwork key={1} src={props.artwork.extraSmall} />)

		if(attrList.includes("title"))
			items.push(
				<Song.Entry key={2}>
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
				<Song.Entry key={3}>
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
				<Song.Entry key={4}>
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

			<Song.Entry>
				<div className="title">
					Favorite song
				</div>
				<div>
					<FontAwesomeIcon icon="heart" onClick={toggleFavorite}
						className={isFavorite ? "favorite" : ""} />
				</div>
			</Song.Entry>
		</Song.Body>
	)
}
