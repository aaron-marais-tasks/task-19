/*
	This file holds my 404 component 
*/

// Import React into script scope
import React from "react"

// Import 404 container
import Container from "./Styled/FourOhFour"

export default props => {
	// Render 404 message
	return (
		<Container>
			<div className="uhOh">
				Whoops!
			</div>

			<div className="reason">
				Looks like
				<span className="location"> {props.location.pathname} </span>
				is not a valid link.
			</div>
		</Container>
	)
}
