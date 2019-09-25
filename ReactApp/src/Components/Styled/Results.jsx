/*
	This file holds my results (search, favorites) styling
*/

// Import styled component library + keyframes for animations
import styled, {keyframes} from "styled-components"

// Keyframes for hover effect
const HoverFrames = keyframes`
	50% {
		transform: translateY(5px) scale(1.3);
	}
`

// Song list container
export const SongList = styled.div`
	/* Last direct child should have bottom margin of 25px */
	> :last-child {
		margin-bottom: 25px;
	}

	/* Show more button */
	.showMore {
		/* Display as a flexbox with items and content centered */
		display: flex;
		align-items: center;
		justify-content: center;

		/* Cursor pointer on hover */
		cursor: pointer;

		/* 35px top and bottom margin */
		margin: 35px 0;

		/* 26px font size */
		font-size: 26px;

		/* SVG transitions all items over .25 seconds */
		svg {
			transition: all .25s ease-in-out;
		}

		/* On hover, animate SVGs for 1 second */
		&:hover svg {
			animation: ${HoverFrames} 1s linear infinite;
		}

		/* Text (show more) should have 25px left/right margin */
		.text {
			margin: 0 25px;
		}
	}
`

// Author group container
export const AuthorGroup = styled.div`
	/* If not the first child, add a 25px top margin */
	&:not(:first-child) {
		margin-top: 25px;
	}

	/* Title (head) of author group */
	> .head {
		/* Displayed as flex, with items centered */
		display: flex;
		align-items: center;

		/* Bold text */
		font-weight: bold;

		/* Pointer cursor on hover */
		cursor: pointer;

		/* Dashed bottom border */
		border-bottom: dashed 2px rgba(0,0,0,.4);

		/* The toggle icon should have 10px right margin */
		.toggle {
			margin-right: 10px;
		}

		/* Author content ("by ...") */
		.author {
			/* Font size should be 26px */
			font-size: 26px;

			/* Max width of 100% of parent, and wrap text with ellipsis */
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			/* Add "by" before content */
			&:before {
				content: "by ";
				font-size: 22px;
			}
		}
	}
`
