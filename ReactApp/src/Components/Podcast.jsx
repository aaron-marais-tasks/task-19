// Import React, promise tracker, html parser and font awesome
import React from "react"
import { trackPromise } from 'react-promise-tracker'
import parseHtml from 'html-react-parser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Podcast page styling
import * as Podcast from "./Styled/Podcast"

// Import API helper
import * as api from "../queryApi"

export default props => {
	/*
		State variables
	*/

	// Initial status from API is -1
	const [status, setStatus] = React.useState(-1)
	// Holds podcast result
	const [channel, setChannel] = React.useState(null)
	// Holds currently selected episode
	const [currentEpisode, setEpisode] = React.useState(0)
	// Whether or not is a favorite
	const [isFavorite, setFavorite] = React.useState(props.favorite)

	/*
		Functional hooks
	*/

	// On component mount, get item using ID in URL
	React.useEffect(() => {
		const promise = api.podcast(props.match.params.id)

		trackPromise(promise)

		promise
			.then(res => {
				res.channel.episodes = res.channel.episodes.reverse()
				setChannel(res.channel)
			})
			.catch(err => {
				if(!err.status) {
					setStatus(0)
					setChannel("Looks like something went wrong...")
					return
				}
				setStatus(err.status)
				setChannel(err.reason)
			})
	}, [])

	/*
		Render callbacks
	*/

	// Toggle favorite
	const toggleFavorite = e => {
		// Stop bubbling
		e.stopPropagation()

		// Toggle state variable
		setFavorite(!isFavorite)

		// If already favorite, remove as favorite, else add
		if(isFavorite) {
			api.favorite.remove(props.id)
		} else {
			api.favorite.add(props.id)
		}
	}

	if(!channel) return null

	// Render error if status not -1 or 1
	if(![-1, 1].includes(status))
		return (
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				flex: 1,
				alignSelf: "center"
			}}>
				<div style={{
					fontSize: "36px"
				}}>
					Oh no...
				</div>

				<div style={{
					fontSize: "28px"
				}}>
					{channel}
				</div>

				<span>
					Why don't you <a href="#" onClick={
						e => {
							e.preventDefault()
							props.history.goBack()
						}
					}>try again</a>?
				</span>
			</div>
		)

	const episode = channel.episodes[currentEpisode]
	const published = new Date(episode.published)

	return (
		<React.Fragment>
			<Podcast.Head>
				<img className="coverArt" src={channel.artwork.medium} alt="Book artwork" />

				<div className="info">
					<div className="title">
						<span>
							{channel.title}
						</span>

						<FontAwesomeIcon icon="heart" onClick={toggleFavorite}
							className={isFavorite ? "" : "favorite"} />
					</div>

					<div className="description">
						{channel.description}
					</div>
				</div>
			</Podcast.Head>

			<Podcast.EpisodeInfo>
				<div className="episodes">
					{channel.episodes.map((episode, key) => 
						<div key={key} onClick={() => {
							setEpisode(key)
						}} className={"episode" + (
							currentEpisode === key ? " current" : ""
						)}>
							{episode.title}
						</div>
					)}
				</div>

				<div className="episodeInfo">
					<div className="runner">
						<div className="recorded">
							<FontAwesomeIcon icon={["far", "calendar-plus"]} />
							{published.toDateString()}
						</div>

						<div className="runTime">
							<FontAwesomeIcon icon={["far", "clock"]} />
							{episode.length}
						</div>
					</div>

					<div className="content">
						{parseHtml(channel.episodes[currentEpisode].description)}
					</div>
				</div>
			</Podcast.EpisodeInfo>
		</React.Fragment>
	)
}
