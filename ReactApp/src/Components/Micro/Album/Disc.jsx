import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {Disc} from "../../Styled/Album"
import Song from "../Song"

export default props => {
	const [open, setOpen] = React.useState(false)

	return (
		<Disc>
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

			{open && (
				<div className="songList">
					{props.tracks.map((item, key) => 
						<Song key={key} request={["title"]} {...item} />
					)}
				</div>
			)}
		</Disc>
	)
}