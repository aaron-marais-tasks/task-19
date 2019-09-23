import styled from "styled-components"

export const Artwork = styled.div`
	height: 250px;
	width: 150px;
	min-width: 150px;
	overflow: hidden;
	position: relative;

	margin: 0 10px;

	background-image: url(${props => props.src});
	background-size: auto 100%;
	background-position: center;
	background-repeat: no-repeat;

	border-radius: 15px !important;

	> a {
		text-decoration: none !important;
	}

	.fa-heart {
		position: absolute;
		top: 10px;
		right: 10px;
		color: rgb(255,255,255);
		cursor: pointer;
		z-index: 5;

		&:hover, &.favorite {
			color: rgb(255,25,25);
		}
	}
`

export const Body = styled.div`
	width: 100%;
	max-width: 100%;
	height: 100%;
	border-radius: 15px;

	color: rgb(0,0,0);
	opacity: 0;
	transition: opacity .2s ease-in-out;

	&:hover {
		opacity: 1;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		color: white;
		padding: 5px;
		background-color: rgba(0,0,0,.7);
		width: calc(100% - 10px);
		height: calc(100% - 10px);

		.title, .artist {
			text-align: right;
			max-width: calc(150px - 10px);
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
	}
`

export default styled.div`
	display: flex;
	margin: 0 0 25px 0;
	overflow-x: auto;
	
	@media (pointer: coarse) {
		scrollbar-width: none;
		::-webkit-scrollbar {
			display: none;
		}
	}

	.buffer {
		min-width: 10px;
		min-height: 250px;
	}
`
