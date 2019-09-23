import styled from "styled-components"

export const Info = styled.div`
	margin-left: 15px;
`

export const Head = styled.div`
	flex: 1;
	text-align: right;

	.albumTitle {
		font-size: 36px;
	}

	.authorName {
		font-size: 24px;

		&:before {
			content: "by ";
			font-size: 20px;
			font-style: italic;
		}
	}
`

export const Description = styled.div`
	.title {
		font-size: 30px;
		flex: 1;
		border-bottom: dashed 2px rgba(0,0,0,.5);
		margin-bottom: 15px;
	}

	.line:not(:last-child) {
		margin-bottom: 20px;

		&.excerpt {
			padding: 15px 15px 15px 45px;
			background-color: lightgray;
		}
	}
`

export const Reviews = styled.div`
	margin: 25px 0;

	.title {
		font-size: 30px;
		flex: 1;
		border-bottom: dashed 2px rgba(0,0,0,.5)
	}

	.review {
		margin: 15px 0;

		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}

		.content {
			position: relative;
			margin: 0 40px;

			&:before, &:after {
				position: absolute;
				font-size: 76px;
				opacity: .3;
				line-height: 1;
			}

			&:before {
				content: "“";
				transform: translate(-40px, 0);
				top: 0;
				left: 0;
			}

			&:after {
				content: "”";
				transform: translate(40px, 0);
				top: calc(100% - 25px);
				right: 0;
			}
		}
	}
`

export default styled.div`
	display: flex;

	max-height: 95vh;
	width: 80vw;
	margin: 0 10vw;

	> .leftBar {
		width: 320px;

		display: flex;
		flex-direction: column;

		align-items: center;

		.coverArt {
			display: block;
			min-width: 320px;
			height: auto;
			margin-bottom: 20px;
		}

		.genres {
			align-self: flex-start;
			margin: 0 25px;

			> div:before {
				content: "- ";
			}
		}
	}
`
