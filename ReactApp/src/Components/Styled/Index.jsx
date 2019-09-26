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

			/* If submittable, color is black */
			&.submittable {
				color: rgb(0,0,0);
			}
		}
	}
`

// Content search type
export const Selections = styled.div`
	/* Display as flex, wrap items, and have space around items */
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;

	/* Half width of parent */
	width: 45%;
`

// Custom checkbox
export const Selection = styled.div`
	/* Display as flexbox and center items */
	display: flex;
	align-items: center;
	justify-content: center;

	/* Static height */
	height: 30px;

	/* Pointer on hover */
	cursor: pointer;

	/* 10px padding and 5px border curve */
	padding: 10px;
	border-radius: 5px;

	.select {
		/* 5px right padding on checkbox */
		padding-right: 5px;

		/* 24px height on items */
		height: 24px;
	}

	.text {
		/* 24px height on items */
		height: 24px;
	}

	/* When hovering, color is blue-green */
	&:hover .select {
		color: rgb(15, 79, 122);
	}

	/* When selected, color is light blue */
	.fa-check-square {
		color: rgb(10, 139, 230);
	}
`
