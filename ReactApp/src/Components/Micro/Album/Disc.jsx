import React from "react"

import {Disc} from "../../Styled/Album"
import Song from "../Song"

export default props => {
	const [open, setOpen] = React.useState(false)

	return (
		<Disc>
			<div className="number" onClick={() => setOpen(!open)}>
				<span className="disc">
					{props.number}
				</span>
				<span className="tracks">
					{props.tracks.length}
				</span>
			</div>

			<div className="songList">
				{open && props.tracks.map((item, key) => 
					<Song key={key} request={["title"]} {...item} />
				)}
			</div>
		</Disc>
	)
}