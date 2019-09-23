import styled, {createGlobalStyle} from "styled-components"

export const HideHeader = createGlobalStyle`
	header {
		display: none !important;
	}
`

export const Content = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const SearchBox = styled.form`
	input[type="text"] {
		font-size: 26px;
		height: 64px;
		padding: 0 10px;
		transform: translate(1px);

		border: 1px solid grey;
	}

	button[type="submit"] {
		font-size: 26px;
		padding: 10px;
		width: 66px;
		height: 66px;
		transform: translate(-1px);
		border: 1px solid grey;

		.content {
			color: grey;
			transition: color .2s ease-in-out;
			transform: rotate(-45deg) scale(1.7);

			&.submittable {
				color: black;
			}
		}
	}
`
