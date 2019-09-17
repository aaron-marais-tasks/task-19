import styled from "styled-components"

export const Body = styled.div`
	display: flex;
	align-items: center;
	padding: 5px;
	max-width: calc(100vw - 5px);
	height: 50px;
`

export const Entry = styled.div`
	flex: 0 0 220px;

	> div {
		max-width: 210px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		&.title {
			font-weight: 700;
		}

		&:not(.title) {
			padding: 0 5px;
		}
	}
`

export const Artwork = styled.div`
	height: 50px;
	width: 50px;
	padding-right: 5px;

	background-image: url(${props => props.src});
	background-size: auto 100%;
	background-position: center;
	background-repeat: no-repeat;
`
