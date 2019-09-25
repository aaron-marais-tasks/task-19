/*
	This file holds my album styling
*/

// Import styled component library
import styled from "styled-components"

// Information box
export const Info = styled.div`
	/* Display as flexbox */
	display: flex;

	/* Album art has fixed height and auto width */
	> .albumArt img {
		height: 320px;
		width: auto;
	}
`

// Info text container
Info.Text = styled.div`
	/* Displayed as column flexbox, center-justified and end-aligned */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-end;

	/* Flex the haters */
	flex: 1;

	/* 25px left margin */
	margin-left: 25px;

	/* Align text to right */
	text-align: right;

	/* Album title should have large font size */
	.albumTitle {
		font-size: 36px;
	}

	/* Artist name should have large font size, but smaller than album title */
	.artistName {
		font-size: 26px;

		/* Display a "by" before the artist name, in italics */
		&:before {
			content: "by ";
			font-size: 20px;
			font-style: italic;
		}
	}
`

// Disc container
export const Disc = styled.div`
	/* 60% width and 20% left/right margin with 25px top margin */
	width: 60%;
	margin: 25px 20% 0 20%;

	/* Header for disc */
	> .number {
		/* Display as flex item with space-between */
		display: flex;
		justify-content: space-between;

		/* Bold font */
		font-weight: bold;

		/* Pointer on hover */
		cursor: pointer;

		/* Dashed buttom border */
		border-bottom: dashed 2px rgba(0,0,0,.4);

		/* First group of items (FontAwesome/Disc number) */
		.firstGroup {
			/* Display as flex, center-aligned items */
			display: flex;
			align-items: center;

			/* FontAwesome toggle right 10px right margin */
			.toggle {
				margin-right: 10px;
			}

			/* Disc number container; add a description before */
			.disc {
				font-size: 26px;
				&:before {
					content: "Disc #";
					font-size: 22px;
				}
			}
		}

		/* Track count container; add a description after */
		.tracks {
			font-size: 26px;

			&:after {
				content: " tracks";
				font-size: 22px;
			}
		}
	}
`
