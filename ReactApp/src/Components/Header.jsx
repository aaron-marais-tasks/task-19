import React from "react"

import Container, * as Header from "./Styled/Header"

export default props => {
	const [value, inputValue] = React.useState("")

	const updateInput = ({ target: { value } }) => inputValue(value)
	const submitForm = (e) => {
		e.preventDefault()
		props.onSubmit(value)
	}

	return (
		<Container>
			<Header.SiteIndex>

			</Header.SiteIndex>

			<Header.SiteSearch>
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
