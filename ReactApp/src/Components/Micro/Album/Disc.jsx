/*
	This file holds my Album Disc component
*/

// Import React into script scope, as well as font awesome
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import Song component
import Song from "../Results/Song"

// Import disc styling
import {Disc} from "../../Styled/Album"

export default props => {
	/*
		State variables
	*/

	// Whether or not the song list is displayed
	const [open, setOpen] = React.useState(false)

	return (
		<Disc>
			{/* Disc information; disc number and track count */}
			{/* When clicked, displays or hides song list */}
			<div className="number" onClick={() => setOpen(!open)}>
				<div className="firstGroup">
					<FontAwesomeIcon className="toggle" icon={open ? "minus" : "plus"} />

					<span className="disc">
						{props.number}
					</span>
				</div>

				<span className="tracks">
					{props.tracks.length}
				</span>
			</div>

			{/* Song list display logic */}
			{open && (
				<div className="songList">
					{props.tracks.map((item, key) => 
						/* Display song and request title only */
						<Song key={key} request={["title"]} {...item} />
					)}
				</div>
			)}
		</Disc>
	)
}