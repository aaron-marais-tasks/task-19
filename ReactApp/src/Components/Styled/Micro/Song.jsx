/*
	This file holds my song component styling
*/

// Import styled component library
import styled from "styled-components"

// Body styling
export const Body = styled.div`
	/* Display as a flexbox, and align items to center */
	display: flex;
	align-items: center;

	/* 5px padding */
	padding: 5px;

	/* Set height */
	height: 50px;
`

// Each song entry (column of information)
export const Entry = styled.div`
	/* No grow or shrink, with 220px basis */
	flex: 0 0 220px;

	/* Favorite heart */
	.fa-heart {
		/* Pointer cursor when hovering */
		cursor: pointer;

		/* When hover or already favorite, set color to red */
		&:hover, &.favorite {
			color: rgb(255,25,25);
		}
	}

	/* Each div in entry has 210px max width, and wrapped text content */
	> div {
		max-width: 210px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		/* Title is bolded */
		&.title {
			font-weight: 700;
		}

		/* Not title? Left padding */
		&:not(.title) {
			padding: 0 5px;
		}
	}
`

// Song artwork
export const Artwork = styled.div`
	/* Set width and height to 50px */
	height: 50px;
	width: 50px;

	/* 5px right padding */
	padding-right: 5px;

	/* Background image from props, size is auto width 100% height,
		centered with no repeat */
	background-image: url(${props => props.src});
	background-size: auto 100%;
	background-position: center;
	background-repeat: no-repeat;
`
