/*
	This file holds stylingg for my 404 page
*/

// Import styled component library
import styled from "styled-components"

// Export 404 container
export default styled.div`
	/* Display as a column flexbox, with centered content and aligned center */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	/* Height set to 100% of parent */
	height: 100%;

	/* Default font size of 20px */
	font-size: 26px;

	/* Title font size of 46px */
	.uhOh {
		font-size: 46px;
	}

	/* Location is bold */
	.location {
		font-weight: 700;
	}
`
