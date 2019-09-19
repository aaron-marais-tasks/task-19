/* eslint-disable react-hooks/exhaustive-deps */

import React from "react"

import Container, * as Album from "./Styled/Album.jsx"

import Disc from "./Micro/Album/Disc"

export default props => {
	const [album, updateResults] = React.useState(null)
	const [status, setStatus] = React.useState(-1)

	React.useEffect(() => {
		if(!props.match.params.id) return

		fetch("http://localhost:8080/album", {
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: props.match.params.id,
				entities: ["song"]
			})
		})
		.then(res => res.json())
		.then(res => {
			if(res.status === 1) return res
			throw res
		})
		.then(res => updateResults(res.album))
		.catch(err => {
			setStatus(err.status)
			updateResults(err.reason)
		})
	}, [])

	if(!props.match.params.id)
		props.history.push("/")

	if(album === null) return null
	if(![-1, 1].includes(status))
		return (
			<div>
				{album}
			</div>
		)

	const discs = []
	for(let count = 1; count <= album.discs; count++) {
		discs.push(album.songList.filter(song => song.disc === count))
	}

	return (
		<Container>
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
		</Container>
	)
}
