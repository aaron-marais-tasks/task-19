import React from "react"

import Song from "./Micro/Song"

export default props => {
	const [results, updateResults] = React.useState(null)
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

	if(results === null) return null
	if(![-1, 1].includes(status))
		return (
			<div>
				{results}
			</div>
		)

	const artworkUrl = results.artworkUrl100.split("/")
	artworkUrl.pop()
	artworkUrl.push("320x0w.jpg")

	console.log(results)

	return (
		<div>
			<div>
				<img src={artworkUrl.join("/")} />
				
				<div className="albumTitle">
					{results.collectionName}
				</div>

				<div className="artistName">
					{results.artistName}
				</div>
			</div>

			<div>
				{results.songList.map((item, key) => 
					<Song key={key} request={["title"]} {...item} />
				)}
			</div>
		</div>
	)
}
