import styled from "styled-components"
import { Link } from "react-router-dom"

export const SiteIndex = styled(Link)`
	font-size: 26px;
	display: flex;
	align-items: flex-end;
	line-height: .8;
	color: black;
	text-decoration: none;

	svg {
		padding: 0 10px 0 5px;
		transform: scale(1.3);
	}
`

export const SiteSearch = styled.div`
	display: flex;
	align-items: center;

	> :not(:last-child) {
		padding-right: 5px;
		border-right: 1px solid grey;
		margin-right: 5px;
		cursor: pointer;
	}

	input {
		height: 25px;
		padding: 0 2.5px;
		margin: 0;
		font-size: 14px;
		box-sizing: border-box;
		transform: translateX(2px);
	}

	button {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: 27px;
		width: 27px;
		font-size: 14px;

		.content {
			transform: rotate(-45deg) scale(2);
		}
	}
`

export default styled.header`
	height: 5vh;
	padding: 5px 0;
	border-bottom: 1px solid lightgrey;
	display: flex;
	align-items: center;
	justify-content: space-between;
`
