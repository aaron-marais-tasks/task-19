import React from "react"

export default props => {
	const [value, inputValue] = React.useState("")

	const updateInput = ({ target: { value } }) => inputValue(value)
	const submitForm = (e) => {
		e.preventDefault()
		props.onSubmit(value)
	}

	return (
		<header>
			<form onSubmit={submitForm}>
				<input type="text" name="search" placeHolder="Search"
					value={value} onChange={updateInput} />
			</form>
		</header>
	)
}
