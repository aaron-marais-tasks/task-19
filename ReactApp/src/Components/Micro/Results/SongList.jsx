import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AuthorGroup from "./AuthorGroup"

import {SongList} from "../../Styled/Results"

export default props => {
	const [countArtist, updateCountArtist] = React.useState(25)
	
	const songsByArtist = []

	if(!props.songs) return null

	// eslint-disable-next-line
	for(const song of props.songs) {
		let artistList = songsByArtist.filter(artist => artist.name === song.artist.name)
		if(artistList.length === 0) {
			artistList = {
				tracks: [],
				...song.artist
			}
			songsByArtist.push(artistList)
		} else artistList = artistList.pop()

		const track = {...song}
		delete track.artist
		artistList.tracks.push(track)
	}

	return (
		<SongList>
			{songsByArtist.slice(0, countArtist).map((artist, key) =>
				<AuthorGroup key={key} artist={artist} />
			)}

			{countArtist < songsByArtist.length && (
				<div className="showMore" onClick={() => updateCountArtist(countArtist + 25)}>
					<FontAwesomeIcon icon="chevron-down" />
					<div className="text">
						Show 25 more artists
					</div>
					<FontAwesomeIcon icon="chevron-down" />
				</div>
			)}
		</SongList>
	)
}
