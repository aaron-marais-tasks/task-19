import React from "react"

import Container from "./Styled/FourOhFour"

export default props => {
	return (
		<Container>
			Whoops! Looks like {props.location.pathname} is not a valid link.
		</Container>
	)
}
