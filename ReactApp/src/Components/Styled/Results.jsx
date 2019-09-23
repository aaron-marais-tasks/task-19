import styled, {keyframes} from "styled-components"

const HoverFrames = keyframes`
	50% {
		transform: translateY(5px) scale(1.3);
	}
`

export const SongList = styled.div`
	> :last-child {
		margin-bottom: 25px;
	}

	.showMore {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		margin: 35px 0;
		font-size: 26px;

		svg {
			transition: all .25s ease-in-out;
		}

		&:hover svg {
			animation: ${HoverFrames} 1s linear infinite;
		}

		.text {
			margin: 0 25px;
		}
	}
`

export const AuthorGroup = styled.div`
	&:not(:first-child) {
		margin-top: 25px;
	}

	> .head {
		display: flex;
		align-items: center;
		font-weight: bold;
		cursor: pointer;
		border-bottom: dashed 2px rgba(0,0,0,.4);

		.toggle {
			margin-right: 10px;
		}

		.author {
			font-size: 26px;
			max-width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			&:before {
				content: "by ";
				font-size: 22px;
			}
		}
	}
`
