/*
	This file holds my author groups for search and favorites results
*/

// Import React into script scope, as well as font awesome
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import styled component
import {AuthorGroup} from "../../Styled/Results"

// Import author song list as a lazy component
const AuthorSongList = React.lazy(() => import("../AuthorSongList"))

export default props => {
	/*
		State variables
	*/

	// Whether or not the song list is displayed
	const [open, setOpen] = React.useState(false)

	/*
		Rendering
	*/
	return (
		<AuthorGroup>
			{/* Author information; naame of author. */}
			{/* If clicked, toggles song list */}
			<div className="head" onClick={() => setOpen(!open)}>
				<FontAwesomeIcon className="toggle" icon={open ? "minus" : "plus"} />

				<div className="author">
					{props.artist.name}
				</div>
			</div>

			{/* The suspense is real, waiting for the song list component
				to be loaded through network ... */}
			<React.Suspense fallback={null}>
				<AuthorSongList open={open} tracks={props.artist.tracks}
					request={["art", "title", "collection"]} />
			</React.Suspense>
		</AuthorGroup>
	)
}
