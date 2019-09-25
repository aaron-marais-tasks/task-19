/*
	This file holds my footer component
*/

// Import React into script scope, as well as font awesome
import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Import footer container
import Container from "./Styled/Footer"

export default props => {
	// Render footer
	return (
		<Container>
			{/* Left-side; display provider or content */}
			<div>
				Content provided by <span style={{
					fontWeight: "700"
				}}>
					<FontAwesomeIcon icon={["fab", "apple"]} /> Apple Inc. &copy;
				</span>
			</div>

			{/* <3 */}
			<div>
				This website was created with <FontAwesomeIcon icon="heart" />
			</div>
		</Container>
	)
}
