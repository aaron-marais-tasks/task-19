/*
	This file holds my header component
*/

// Import React into script scope. Also import font awesome and link
// components
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

// Import styleed components
import Container, * as Header from "./Styled/Header"

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

	/*
		Functional hooks
	*/

	// Update input value if params exist/change and if query is not undefined
	// or if value property exists
	React.useEffect(() => {
		if(props.match.params && props.match.params.query) {
			inputValue(decodeURIComponent(props.match.params.query))
		} else if(props.value) {
			inputValue(props.value)
		}
	}, [props.match.params, props.value])

	// Render header
	return (
		<Container>
			{/* Link to index page */}
			<Header.SiteIndex to="/">
				<FontAwesomeIcon icon={["fab", "apple"]} />
				Slice of Apple
			</Header.SiteIndex>

			{/* Search bar in header */}
			<Header.SiteSearch>
				{/* View your favorites */}
				<Link className="viewFav" to="/favorites">Favorites</Link>

				{/* Search form */}
				<form onSubmit={submitForm}>
					{/* User input for search; value set in state */}
					<input type="text" name="search" placeholder="Search"
						value={value} onChange={updateInput} />

					{/* Submit button */}
					<button type="submit">
						<div className="content">⚲</div>
					</button>
				</form>
			</Header.SiteSearch>
		</Container>
	)
}
