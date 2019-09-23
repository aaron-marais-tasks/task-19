import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom"

import Container, * as Header from "./Styled/Header"

export default props => {
	const [value, inputValue] = React.useState("")

	const updateInput = ({ target: { value } }) => inputValue(value)
	const submitForm = (e) => {
		e.preventDefault()

		if(value !== "")
			props.onSubmit(value)
	}

	React.useEffect(() => {
		if(props.match.params) {
			inputValue(decodeURIComponent(props.match.params.query))
		}
	}, [props.match.params])

	React.useEffect(() => {
		if(props.value) {
			inputValue(props.value)
		}
	}, [props.value])

	React.useEffect(() => {
		if(value === "undefined")
			inputValue("")
	}, [value])

	return (
		<Container>
			<Header.SiteIndex to="/">
				<FontAwesomeIcon icon={["fab", "apple"]} />
				Slice of Apple
			</Header.SiteIndex>

			<Header.SiteSearch>
				<Link className="viewFav" to="/favorites">Favorites</Link>

				<form onSubmit={submitForm}>
					<input type="text" name="search" placeholder="Search"
						value={value} onChange={updateInput} />
					<button type="submit">
						<div className="content">⚲</div>
					</button>
				</form>
			</Header.SiteSearch>
		</Container>
	)
}
