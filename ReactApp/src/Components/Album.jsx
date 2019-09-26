/* eslint-disable react-hooks/exhaustive-deps */

/*
	This file holds my album display
*/

// Import React into script scope, as well as router link and promise tracker
import React from "react"
import { Link } from "react-router-dom"
import { trackPromise } from 'react-promise-tracker'

// Import styled components
import * as Album from "./Styled/Album.jsx"
import Disc from "./Micro/Album/Disc"

// Import API helper
import * as api from "../queryApi"

export default props => {
	/*
		State variables
	*/

	// Album result
	const [album, updateResults] = React.useState(null)
	// API status
	const [status, setStatus] = React.useState(-1)

	// On component mount, call API and get album information. Track
	// promise for loader
	React.useEffect(() => {
		const promise = api.album(props.match.params.id)

		trackPromise(promise)

		promise
			.then(res => updateResults(res.album))
			.catch(err => {
				setStatus(err.status)
				updateResults(err.reason)
			})
	}, [])

	/*
		Rendering
	*/

	// If album is null, render null
	if(album === null) return null

	// If status is not -1 or 1, render error
	if(![-1, 1].includes(status))
		return (
			<React.Fragment>
				{album}
				<Link to="/">Back home</Link>
			</React.Fragment>
		)

	// Holds list of discs, with list of songs filtered by disc number
	const discs = []
	for(let count = 1; count <= album.discs; count++) {
		discs.push(album.songList.filter(song => song.disc === count))
	}

	return (
		<React.Fragment>
			{/* Album info is header; holds album art, album title,
				and artist name */}
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

			{/* Holds list of discs */}
			<div>
				{discs.map((disc, discNumber) => 
					<Disc artwork={album.artwork} number={discNumber + 1}
						tracks={disc}
					/>
				)}
			</div>
		</React.Fragment>
	)
}
