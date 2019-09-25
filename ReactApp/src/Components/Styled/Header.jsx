/*
	This file holds my header styling
*/

// Import styled component library and router link component
import styled from "styled-components"
import { Link } from "react-router-dom"

// Styled link component
export const SiteIndex = styled(Link)`
	/* Display as flex with items end-aligned */
	display: flex;
	align-items: flex-end;
	
	/* Black font color */
	color: black;

	/* .8x line height */
	line-height: .8;

	/* 26px font size with no text decoration */
	font-size: 26px;
	text-decoration: none;

	/* SVG image from fontawesome should have 10px left/5px right padding,
		scaled up to 1.3x */
	svg {
		padding: 0 10px 0 5px;
		transform: scale(1.3);
	}
`

// Site search container
export const SiteSearch = styled.div`
	/* Displayed as flexbox with items center-aligned */
	display: flex;
	align-items: center;

	/* When not direct-last child */
	> :not(:last-child) {
		/* 5px right padding and margin */
		padding-right: 5px;
		margin-right: 5px;

		/* Gray right margin */
		border-right: 1px solid grey;

		/* Pointer cursor on hover */
		cursor: pointer;
	}

	/* Input box */
	input {
		/* Height of box is 25px */
		height: 25px;

		/* 2.5px left/right padding, no margin */
		padding: 0 2.5px;
		margin: 0;

		/* 14px font size */
		font-size: 14px;

		/* Border box sizing */
		box-sizing: border-box;

		/* Move by 2px on X axis */
		transform: translateX(2px);
	}

	/* Search button */
	button {
		/* Displayed as inline flexbox, content centered and aligned center */
		display: inline-flex;
		justify-content: center;
		align-items: center;

		/* Width and height 27px */
		height: 27px;
		width: 27px;

		/* 14px font size */
		font-size: 14px;

		/* The button content should be rotated by -45deg and scaled up 2x */
		.content {
			transform: rotate(-45deg) scale(2);
		}
	}
`

// Header container
export default styled.header`
	/* Displayed as a flexbox, items centered, content spaced */
	display: flex;
	align-items: center;
	justify-content: space-between;

	/* 50px set height */
	height: 50px;

	/* 5px top/bottom padding */
	padding: 5px 0;

	/* Light gray bottom border */
	border-bottom: 1px solid lightgrey;
`
