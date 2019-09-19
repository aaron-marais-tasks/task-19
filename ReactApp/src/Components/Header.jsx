import React from "react"

import Container from "./Styled/Header"

export default props => {
	const [value, inputValue] = React.useState("")

	const updateInput = ({ target: { value } }) => inputValue(value)
	const submitForm = (e) => {
		e.preventDefault()
		props.onSubmit(value)
	}

	return (
		<Container>
			<form onSubmit={submitForm}>
				<input type="text" name="search" placeholder="Search"
					value={value} onChange={updateInput} />
			</form>
		</Container>
	)
}
