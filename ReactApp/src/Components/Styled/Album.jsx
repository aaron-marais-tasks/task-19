import styled from "styled-components"

export const Info = styled.div`
	display: flex;

	> .albumArt img {
		height: 320px;
		width: auto;
	}
`

Info.Text = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;

	justify-content: center;

	margin-left: 25px;
	text-align: right;
	align-items: flex-end;

	.albumTitle {
		font-size: 36px;
	}

	.artistName {
		font-size: 26px;

		&:before {
			content: "by ";
			font-size: 20px;
			font-style: italic;
		}
	}
`

export const Disc = styled.div`
	width: 60%;
	margin: 0 20%;

	margin-top: 25px;

	> .number {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		cursor: pointer;
		border-bottom: dashed 2px rgba(0,0,0,.4);

		> .disc {
			font-size: 26px;
			&:before {
				content: "Disc #";
				font-size: 22px;
			}
		}

		> .tracks {
			font-size: 26px;

			&:after {
				content: " tracks";
				font-size: 22px;
			}
		}
	}
`

export default styled.div`
	width: 80vw;
	margin: 0 10vw;
	min-height: 95vh;
`
