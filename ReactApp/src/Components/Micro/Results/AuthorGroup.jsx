import React from "react"

import Song from "../Song"
import {AuthorGroup} from "../../Styled/Results"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => {
	const [open, setOpen] = React.useState(false)

	return (
		<AuthorGroup>
			<div className="head" onClick={() => setOpen(!open)}>
				<FontAwesomeIcon className="toggle" icon={open ? "minus" : "plus"} />

				<div className="author">
					{props.artist.name}
				</div>
			</div>

			{open && (
				<div>
					{props.artist.tracks.map((track, key) => 
						<Song key={key} request={["art", "title", "collection"]}
							{...track} />
					)}
				</div>
			)}
		</AuthorGroup>
	)
}
