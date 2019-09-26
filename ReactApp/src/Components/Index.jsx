/*
	This component holds my landing/index page
*/

// Import React into scope, as well as router link
import React from "react"
import { Link } from "react-router-dom"

// Import font awesome library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Selection from "./Micro/Index/Selection"

// Import styled components
import * as Index from "./Styled/Index"

const SELECTIONS = [
	{
		title: "Movies",
		category: "movie"
	}, {
		title: "Podcasts",
		category: "podcast"
	}, {
		title: "Music",
		category: "song"
	}, {
		title: "Audiobooks",
		category: "audiobook"
	}, {
		title: "Short films",
		category: "shortFilm"
	}, {
		title: "TV shows",
		category: "tvShow"
	}, {
		title: "Software",
		category: "software"
	}, {
		title: "eBooks",
		category: "ebook"
	}
]

// Export functional component
export default props => {
	/*
		State variables
	*/

	// Our search value
	const [value, inputValue] = React.useState("")
	// Search queries
	const [queries, setQueries] = React.useState([])

	/*
		Callbacks
	*/

	// Update input from user search
	const updateInput = ({ target: { value } }) => inputValue(value)

	// When form is submitted, prevent default action and call
	// submit property if value not empty
	const submitForm = (e) => {
		e.preventDefault()

		if(value !== "")
			props.onSubmit(value, queries)
	}

	// When selections are made (added, removed)
	const addToQuery = category => {
		const query = [...queries]
		query.push(category)
		setQueries(query)
	}

	const removeFromQuery = category => {
		const query = queries.filter(
			query => query !== category
		)
		setQueries(query)
	}

	/*
		Rendering
	*/
	return (
		<React.Fragment>
			{/* Global style to hide the header */}
			<Index.HideHeader />

		  	{/* Hold index content */}
			<Index.Content>
				{/* Search form */}
				<Index.SearchBox onSubmit={submitForm}>
					{/* User input for search; value set in state */}
					<input type="text" placeholder="Search"
						value={value} onChange={updateInput} />

					{/* Submit button */}
					<button type="submit">
						<FontAwesomeIcon className={"content" + (
							value !== "" ? " submittable" : ""
						)} icon="search" />
					</button>
				</Index.SearchBox>

				{/* Content selection */}
				<Index.Selections>
					{SELECTIONS.map((item, key) => 
						<Selection key={key} {...item}
							add={addToQuery.bind(null, item.category)}
							remove={removeFromQuery.bind(null, item.category)}
						/>
					)}
				</Index.Selections>

				{/* View favorites if not wanting to search */}
				<div className="favoriteView">
					or <Link to="/favorites">view your favorites</Link>
				</div>
			</Index.Content>
		</React.Fragment>
	)
}
