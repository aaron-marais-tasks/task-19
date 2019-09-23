/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import * as Album from "./Styled/Album.jsx"
import Disc from "./Micro/Album/Disc"

import {Link} from "react-router-dom"

import * as api from "../queryApi"

export default props => {
	const [album, updateResults] = React.useState(null)
	const [status, setStatus] = React.useState(-1)

	React.useEffect(() => {
		if(!props.match.params.id) return

		api.album(props.match.params.id)
		.then(res => updateResults(res.album))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, [])

	if(album === null) return null
	if(![-1, 1].includes(status))
		return (
			<div>
				{album}
				<Link to="/">Back home</Link>
			</div>
		)

	const discs = []
	for(let count = 1; count <= album.discs; count++) {
		discs.push(album.songList.filter(song => song.disc === count))
	}

	return (
		<React.Fragment>
			<Album.Info>
				<div className="albumArt">
					<img src={album.artwork.medium} alt="Album artwork" />
				</div>
				
				<Album.Info.Text>
					<div className="albumTitle">
						{album.title}
					</div>

					<div className="artistName">
						{album.artist.name}
					</div>
				</Album.Info.Text>
			</Album.Info>

			<div>
				{discs.map((disc, discNumber) => 
					<Disc number={discNumber + 1} tracks={disc} />
				)}
			</div>
		</React.Fragment>
	)
}
