import React from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Container from "./Styled/Footer"

export default props => {
	return (
		<Container>
			<div>
				Content provided by <span style={{
					fontWeight: "700"
				}}>
					<FontAwesomeIcon icon={["fab", "apple"]} /> Apple Inc. &copy;
				</span>
			</div>

			<div>
				This website was created with <FontAwesomeIcon icon="heart" />
			</div>
		</Container>
	)
}
