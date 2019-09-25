/*
	This file holds my index styling
*/

// Import styled component library and ablity to create global style
import styled, {createGlobalStyle} from "styled-components"

// Hide header on index
export const HideHeader = createGlobalStyle`
	header {
		display: none !important;
	}
`

// Content container
export const Content = styled.div`
	/* Display as column flexbox, content centered and items centered */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	flex-grow: 1;
`

// Search box container
export const SearchBox = styled.form`
	/* Text input */
	input[type="text"] {
		/* 64px height */
		height: 64px;

		/* 10px left/right padding */
		padding: 0 10px;

		/* 26px font size */
		font-size: 26px;

		/* Move 1px left */
		transform: translate(1px);

		/* 1px gray border */
		border: 1px solid grey;
	}

	/* Submit button */
	button[type="submit"] {
		/* Width and height 66px */
		width: 66px;
		height: 66px;

		/* 26px font size */
		font-size: 26px;

		/* 10px padding */
		padding: 10px;
		
		/* Move left slightly */
		transform: translate(-1px);

		/* 1px gray border */
		border: 1px solid grey;

		/* Content of button */
		.content {
			/* Gray color */
			color: grey;

			/* Transition color */
			transition: color .2s ease-in-out;

			/* Rotate by -45deg and scale 1.7x */
			transform: rotate(-45deg) scale(1.7);

			/* If submittable, color is black */
			&.submittable {
				color: rgb(0,0,0);
			}
		}
	}
`
