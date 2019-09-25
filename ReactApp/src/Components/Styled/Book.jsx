/*
	This file holds my styling for book view component
*/

// Import styled component library
import styled from "styled-components"

// Book info has a 15px left margin
export const Info = styled.div`
	margin-left: 15px;
`

// Head content container
export const Head = styled.div`
	/* Flex grow as much as it wants */
	flex-grow: 1;

	/* Align text to right */
	text-align: right;

	/* Book title with a higher font size */
	.albumTitle {
		font-size: 36px;
	}

	/* Author name with a larger font size, and a "by" prefix */
	.authorName {
		font-size: 24px;

		&:before {
			content: "by ";
			font-size: 20px;
			font-style: italic;
		}
	}

	/* Favorite heart */
	.fa-heart {
		cursor: pointer;

		/* On hover or if favorited, color is red */
		&:hover, &.favorite {
			color: rgb(255,25,25);
		}
	}
`

// Book container
export default styled.div`
	/* Display as flex row */
	display: flex;

	/* Left bar (cover art, stars, genres, released) */
	> .leftBar {
		/* Set width */
		width: 320px;

		/* Displayed as a column flexbox, with centered items */
		display: flex;
		flex-direction: column;
		align-items: center;

		/* Cover art */
		.coverArt {
			/* Displayed as block */
			display: block;

			/* Lowest width is 100% of parent with auto height */
			min-width: 100%;
			height: auto;

			/* 20px bottom margin for stars */
			margin-bottom: 20px;
		}

		/* Genre list */
		.genres {
			/* Align self to start of flex */
			align-self: flex-start;

			/* 25px left and right margin */
			margin: 0 25px;

			/* Each child div has dash before content */
			> div:before {
				content: "- ";
			}
		}
	}
`
