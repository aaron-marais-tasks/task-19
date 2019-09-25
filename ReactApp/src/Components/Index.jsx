/*
	This component holds my landing/index page
*/

// Import React into scope, as well as router link
import React from "react"
import { Link } from "react-router-dom"

// Import styled components
import * as Index from "./Styled/Index"

// Export functional component
export default props => {
	/*
		State variables
	*/

	// Our search value
	const [value, inputValue] = React.useState("")

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
			props.onSubmit(value)
	}

	// Render index form
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
						<div className={"content" + (
							value !== "" ? " submittable" : ""
						)}>⚲</div>
					</button>
				</Index.SearchBox>

				{/* View favorites if not wanting to search */}
				<div className="favoriteView">
					or <Link to="/favorites">view your favorites</Link>
				</div>
			</Index.Content>
		</React.Fragment>
	)
}
