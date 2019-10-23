/*
	This file holds my styled component for my book component
*/

// Import styled components library
import styled from "styled-components"

// Artwork container
export const Artwork = styled.div`
	/* Fixed height and width */
	height: 250px;
	width: calc((80vw / 6) - 25px);
	min-width: calc((80vw / 6) - 25px);

	/* Hide overflow and set position to relative */
	overflow: hidden;
	position: relative;

	/* 10px margins */
	margin: 10px;

	/* Background image from props, size is auto width 100% height,
		centered with no repeat */
	background-image: url(${props => props.src});
	background-size: auto 100%;
	background-position: center;
	background-repeat: no-repeat;

	/* 15px border radius */
	border-radius: 15px !important;

	/* Remove underline on decoration */
	> a {
		text-decoration: none !important;
	}

	/* Favorite heart */
	.fa-heart {
		/* Positioned absolutely */
		position: absolute;

		/* Anchor 10px away from top right */
		top: 10px;
		right: 10px;

		/* White font color */
		color: rgb(255,255,255);

		/* Pointer cursor on hover */
		cursor: pointer;

		/* Display above other items */
		z-index: 5;

		/* On hover or if already favorite, set color to red */
		&:hover, &.favorite {
			color: rgb(255,25,25);
		}
	}
`

// Body container
export const Body = styled.div`
	/* Anchor size to parent */
	width: 100%;
	max-width: 100%;
	height: 100%;

	/* 15px border radius */
	border-radius: 15px;

	/* No opacity */
	opacity: 0;

	/* Transition opacity only */
	transition: opacity .2s ease-in-out;

	/* On hover, set opacity to 1 */
	&:hover {
		opacity: 1;
	}

	/* Content color */
	.content {
		/* Display as column flexbox, aligned and justified to flex end */
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;

		/* Font color is white */
		color: rgb(255,255,255);

		/* 5px padding to not touch parent borders */
		padding: 5px;

		/* Lightly opaque background color */
		background-color: rgba(0,0,0,.7);

		/* Set width and height to 100% of parent - 10px for padding */
		width: calc(100% - 10px);
		height: calc(100% - 10px);

		/* Title and artist containers */
		.title, .artist {
			/* Align content to right */
			text-align: right;

			/* Set max width to 100% parent - 10px for padding */
			max-width: calc(150px - 10px);

			/* Slice text after width is too long */
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
`

// Book container
export default styled.div`
	/* Display as flexbox */
	display: flex;
	flex-wrap: wrap;

	/* 25px bottom margin */
	margin-bottom: 25px;

	/* If primary cursor is coarse (mobile device) remove scrollbar */
	@media (pointer: coarse) {
		scrollbar-width: none;
		::-webkit-scrollbar {
			display: none;
		}
	}
`
