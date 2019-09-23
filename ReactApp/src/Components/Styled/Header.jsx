import styled from "styled-components"

export const SiteIndex = styled.div`
	
`

export const SiteSearch = styled.div`
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
