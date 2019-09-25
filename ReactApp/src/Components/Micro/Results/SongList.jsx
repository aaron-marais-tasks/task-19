/*
	This file holds my song list
*/

// Import React into script scope, as well as font awesome
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import author group component
import AuthorGroup from "./AuthorGroup"

// Import styled component
import {SongList} from "../../Styled/Results"

export default props => {
	/*
		State variables
	*/

	// Amount of artists being displayed
	const [countArtist, updateCountArtist] = React.useState(25)
	
	/*
		Callbacks, logic
	*/

	// Array to hold list of songs by a artist
	const songsByArtist = []

	// If no songs returned, render null
	if(!props.songs) return null

	// Loop over all songs, filter songs by artist, and add into artist array
	// eslint-disable-next-line
	for(const song of props.songs) {
		// Filter out songs based on artists already popluated
		let artistList = songsByArtist.filter(artist => artist.name === song.artist.name)
		
		// If no artists in array, push artist and their tracks into the array
		// Tracks are initially empty
		// If artistList has an item in, pop it out to be modified
		if(artistList.length === 0) {
			artistList = {
				tracks: [],
				...song.artist
			}
			songsByArtist.push(artistList)
		} else artistList = artistList.pop()

		// Unpack track into a new variable to be modified
		const track = {...song}

		// Delete artist (already populated in artist list)
		delete track.artist

		// Push new track into track array
		artistList.tracks.push(track)
	}

	/*
		Rendering
	*/
	return (
		<SongList>
			{/* Slice-copy songs by artist into sections of 25 */}
			{/* Map over sliced array andd assign into author groups */}
			{songsByArtist.slice(0, countArtist).map((artist, key) =>
				<AuthorGroup key={key} artist={artist} />
			)}

			{/* Display a "show more" if count of artist is less than amount of
				artists found */}
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
