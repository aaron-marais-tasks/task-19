/* This file holds my podcast page styling */

// Import styled component library
import styled from "styled-components"

// Header styling
export const Head = styled.div`
	/* Full width */
	width: 100%;

	/* Display as flex for rowness */
	display: flex;

	/* Bottom padding/margin and border to seperate from episode info */
	padding-bottom: 10px;
	margin-bottom: 10px;
	border-bottom: 1px solid rgba(0,0,0,.2);

	.coverArt {
		/* 320px width cover art, automatic sizing height */
		min-width: 240px;
		height: auto;

		/* Spacing between header image and description */
		padding-right: 15px;
	}

	.info {
		/* Grow to majority space */
		flex-grow: 1;

		.title {
			/* Bold large title */
			font-weight: bold;
			font-size: 32px;
			line-height: 1;

			/* For favorites */
			display: flex;
			justify-content: space-between;
		}

		/* 10px margin above description */
		.description {
			margin-top: 10px;
		}
	}
`

// Episode information
export const EpisodeInfo = styled.div`
	/* Flex display for row */
	display: flex;

	.episodes {
		/* Fixed padding/margin, width and height for episode list */
		margin-right: 10px;
		padding-right: 5px;
		min-width: 240px;
		max-width: 240px;
		max-height: 480px;

		/* Right border to separate from info */
		border-right: 1px solid rgba(0,0,0,.2);

		/* Auto overflow for scroll */
		overflow-y: auto;

		.episode {
			/* Smaller font size for episodes */
			font-size: 16px;

			padding: 2px;

			/* Pointer cursor on hover */
			cursor: pointer;

			&.current {
				background-color: rgba(13,192,241,.4);
			}

			&:hover {
				/* Change background color on hover */
				background-color: rgba(13,192,241,.3);
			}

			/* Add bottom margin if not last child */
			&:not(:last-child) {
				margin-bottom: 2px;
			}
		}
	}

	.episodeInfo {
		/* Grow episode info to take most size available */
		flex-grow: 1;

		/* Remove margin on paragraph tags */
		p {
			margin: 0;
		}

		.runner {
			/* Display as flex for row */
			display: flex;
			align-items: center;
			justify-content: flex-end;

			/* Small space next to svg icon */
			svg {
				margin-right: 5px;
			}

			/* Add right border and margin if not last child */
			> :not(:last-child) {
				border-right: 1px solid rgba(0,0,0,.2);
				margin-right: 6px;
				padding-right: 6px;
			}
		}

		/* Main description content */
		.content {
			padding-top: 5px;
			margin-top: 5px;
			border-top: 1px solid rgba(0,0,0,.2);
		}
	}
`