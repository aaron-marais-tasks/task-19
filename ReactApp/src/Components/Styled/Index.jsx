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

// Favorites container
export const Favorites = styled.div`
	/* 5px padding for border */
	padding: 5px;

	/* Thin black curved border */
	border: 1px solid rgb(0,0,0);
	border-radius: 15px;

	/* Move up by 20px */
	transform: translateY(-20px);

	/* White background color */
	background-color: rgb(255,255,255);

	/* Replace standard link effects */
	> a {
		text-decoration: none;
		color: rgb(9, 157, 120);

		&:hover {
			color: rgb(9, 120, 142);
		}
	}
`

// Search item container
export const Box = styled.div`
	/* Display as column flexbox, and align items to center */
	display: flex;
	flex-direction: column;
	align-items: center;

	/* Take half width */
	width: 50%;

	/* Thin black curved border */
	border: 1px solid rgb(0,0,0);
	border-radius: 30px;

	/* 15px bottom padding for favorites container */
	padding-bottom: 20px;
`

// Search box container
export const SearchBox = styled.form`
	/* Display as flexbox row */
	display: flex;

	/* Take 100% of parent width */
	width: 100%;

	/* Text input */
	input[type="text"] {
		/* 64px height */
		height: 64px;
		width: calc(100% - 66px - (2 * 10px) + 1px);

		/* 10px left/right padding */
		padding: 0 10px;

		/* 26px font size */
		font-size: 26px;

		/* Move 1px up and scale up by .005x */
		transform: translateY(-1px) scale(1.005);

		/* 1px gray border, curved on top left */
		border: 1px solid grey;
		border-top-left-radius: 20px;
	}

	/* Submit button */
	button[type="submit"] {
		/* Width and height 66px */
		width: 68px;
		height: 66px;

		/* 26px font size */
		font-size: 26px;

		/* 10px padding */
		padding: 10px;
		
		/* Move 1px up, 1px right, and scale up by .005x */
		transform: translate(.8px, -1px) scale(1.01);

		/* 1px gray border, curved on top right */
		border: 1px solid grey;
		border-top-right-radius: 20px;

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

	/* 95% width of parent */
	width: 95%;
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
