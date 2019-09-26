/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/*
	This file holds my song result display
*/

// Import React into script scope, as well as font awesome and route link
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

// Import styled components
import * as Song from "../../Styled/Micro/Song"

// Import API helpers
import * as api from "../../../queryApi.js"

export default props => {
	/*
		State variables
	*/

	// Whether or not book is a favorite
	const [isFavorite, setFavorite] = React.useState(props.favorite)
	// Whether or not audio is playing
	const [isPlaying, setIsPlaying] = React.useState(false)

	// Audio ref
	let Audio = null

	// Function to pause all <audio /> tags
	const pauseAllAudio = e => {
		for(const audio of document.getElementsByTagName("audio")) {
			if((e && audio !== e.target && !audio.paused) || (!e && !audio.paused))
				audio.pause()
    	}
	}

	// When playing, pause all others
	const playCallback = e => {
		pauseAllAudio(e)
		setIsPlaying(true)
	}

	const pauseCallback = e => {
		setIsPlaying(false)
	}
	
	// On unload, pause all audio
	React.useEffect(() => pauseAllAudio, [])

	/*
		Callbacks
	*/

	// Toggle if favorite or not
	const toggleFavorite = e => {
		// Stop event bubbling
		e.stopPropagation()

		// Toggle favorite state variable
		setFavorite(!isFavorite)

		// Make call to API to remove or add as favorite
		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	// Generate content items based on props
	const generateUsing = attrList => {
		// If attribute list is empty, use default list
		if(!attrList) {
			attrList = ["art", "title", "artist", "collection"]
		}

		// Intermediate array for items
		const items = []

		// If title is requested, push track name
		if(attrList.includes("title"))
			items.push(
				<Song.Entry key={1}>
					<div className="title">
						Track name
					</div>
					<div>
						{props.title}
					</div>
				</Song.Entry>
			)

		// If artist is requested, push artist name
		if(attrList.includes("artist"))
			items.push(
				<Song.Entry key={2}>
					<div className="title">
						Artist
					</div>
					<div>
						{props.artist.name}
					</div>
				</Song.Entry>
			)

		// If collection is specified, push album name and link
		if(attrList.includes("collection"))
			items.push(
				<Song.Entry key={3}>
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


	/*
		Rendering
	*/
	return (
		<Song.Body>
			{/* Preview song */}
			<audio src={props.preview} ref={comp => {Audio = comp}}
				onPlay={playCallback} onPause={pauseCallback}
			/>
			<Song.Artwork src={props.artwork.extraSmall}
				onClick={() => {
					{/* Pause if playing, or play if paused */}
					if(isPlaying) {
						Audio.pause()
						setIsPlaying(false)
					} else {
						Audio.play()
						setIsPlaying(true)
					}
				}}
			>
				<FontAwesomeIcon icon={isPlaying ? "pause" : "play"} />
			</Song.Artwork>

			{/* Generate content based on request property */}
			{generateUsing(props.request)}

		    {/* Generate song entry for favoriting song */}
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
