import React from "react"
import { Link } from "react-router-dom"

import * as Index from "./Styled/Index"

export default props => {
	const [value, inputValue] = React.useState("")

	const updateInput = ({ target: { value } }) => inputValue(value)
	const submitForm = (e) => {
		e.preventDefault()

		if(value !== "")
			props.onSubmit(value)
	}

	return (
		<React.Fragment>
			<Index.HideHeader />
			<Index.Content>
				<Index.SearchBox onSubmit={submitForm}>
					<input type="text" placeholder="Search"
						value={value} onChange={updateInput} />
					<button type="submit">
						<div className={"content" + (
							value !== "" ? " submittable" : ""
						)}>⚲</div>
					</button>
				</Index.SearchBox>

				<div className="favoriteView">
					or <Link to="/favorites">view your favorites</Link>
				</div>
			</Index.Content>
		</React.Fragment>
	)
}
