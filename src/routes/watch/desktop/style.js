import { css } from 'react-emotion'
import '../../../global/style/css/grainBackground.css'

export const playButton = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyICg2Njg2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCwxLjYwMDE2NDQyIEwwLDE4LjQwMDE2NDQgQzAsMTkuMjY3MTY0NCAwLjk1NzUsMTkuNzkyMTY0NCAxLjY4ODUsMTkuMzI1NjY0NCBMMTQuNTEsMTEuMTQ3MTY0NCBDMTUuMTc3LDEwLjcyMTE2NDQgMTUuMTg4NSw5Ljc1MTE2NDQyIDE0LjUzMTUsOS4zMDk2NjQ0MiBMMS43MTA1LDAuNjg4NjY0NDI0IEMwLjk4MTUsMC4xOTgxNjQ0MjQgMCwwLjcyMTE2NDQyNCAwLDEuNjAwMTY0NDIiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJBcnRib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlBsYXktQnV0dG9uIj4KICAgICAgICAgICAgPHBhdGggZD0iTTI0LDAgTDI0LDAgQzM3LjI1NDgzNCwtMi40MzQ4NzM1ZS0xNSA0OCwxMC43NDUxNjYgNDgsMjQgTDQ4LDI0IEM0OCwzNy4yNTQ4MzQgMzcuMjU0ODM0LDQ4IDI0LDQ4IEwyNCw0OCBDMTAuNzQ1MTY2LDQ4IDEuNjIzMjQ5ZS0xNSwzNy4yNTQ4MzQgMCwyNCBMMCwyNCBDLTEuNjIzMjQ5ZS0xNSwxMC43NDUxNjYgMTAuNzQ1MTY2LDIuNDM0ODczNWUtMTUgMjQsMCBaIiBpZD0iUmVjdGFuZ2xlLTEyIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSJpY29uL3BsYXkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgIDx1c2UgaWQ9IkZpbGwtMiIgZmlsbD0iIzE2MTYxQSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
  background-size: auto 35%;
  background-position: center;
  background-repeat: no-repeat;
`
export const playIcon = css`
  :hover {
    cursor: pointer;
    opacity: 0.5;
  }
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUyICg2Njg2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+QXJ0Ym9hcmQ8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCwxLjYwMDE2NDQyIEwwLDE4LjQwMDE2NDQgQzAsMTkuMjY3MTY0NCAwLjk1NzUsMTkuNzkyMTY0NCAxLjY4ODUsMTkuMzI1NjY0NCBMMTQuNTEsMTEuMTQ3MTY0NCBDMTUuMTc3LDEwLjcyMTE2NDQgMTUuMTg4NSw5Ljc1MTE2NDQyIDE0LjUzMTUsOS4zMDk2NjQ0MiBMMS43MTA1LDAuNjg4NjY0NDI0IEMwLjk4MTUsMC4xOTgxNjQ0MjQgMCwwLjcyMTE2NDQyNCAwLDEuNjAwMTY0NDIiIGlkPSJwYXRoLTEiPjwvcGF0aD4KICAgIDwvZGVmcz4KICAgIDxnIGlkPSJBcnRib2FyZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IlBsYXktQnV0dG9uIj4KICAgICAgICAgICAgPHBhdGggZD0iTTI0LDAgTDI0LDAgQzM3LjI1NDgzNCwtMi40MzQ4NzM1ZS0xNSA0OCwxMC43NDUxNjYgNDgsMjQgTDQ4LDI0IEM0OCwzNy4yNTQ4MzQgMzcuMjU0ODM0LDQ4IDI0LDQ4IEwyNCw0OCBDMTAuNzQ1MTY2LDQ4IDEuNjIzMjQ5ZS0xNSwzNy4yNTQ4MzQgMCwyNCBMMCwyNCBDLTEuNjIzMjQ5ZS0xNSwxMC43NDUxNjYgMTAuNzQ1MTY2LDIuNDM0ODczNWUtMTUgMjQsMCBaIiBpZD0iUmVjdGFuZ2xlLTEyIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+CiAgICAgICAgICAgIDxnIGlkPSJpY29uL3BsYXkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5LjAwMDAwMCwgMTQuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8bWFzayBpZD0ibWFzay0yIiBmaWxsPSJ3aGl0ZSI+CiAgICAgICAgICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgIDwvbWFzaz4KICAgICAgICAgICAgICAgIDx1c2UgaWQ9IkZpbGwtMiIgZmlsbD0iIzE2MTYxQSIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  width: 7rem;
  height: 7rem;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`

export const posterWrapper = css`
  height: 68vh;
  position: relative;
`

export const movieDetailContainer = css`
  background: #000311;
  color: #fff;
  width: 100vw;
  height: calc(100vh - 6rem);
  max-width: 100vw;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
`

export const movieDetailBottom = css`
  height: 100%;
  overflow: auto;
  max-height: calc(100% - 5.5rem);
  margin-top: 1.5rem;
`

export const movieDetailNotAvailableContainer = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 2rem;
  }
`
export const movieDetailNotAllowed = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 2rem;
  background: black;
`

export const controllerContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;

  div {
    display: inline-block;
    padding: 0 5rem;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    color: #a9a9a9;
    font-weight: 600;
    cursor: pointer;
    font-size: 1.4rem;
  }

  div.active {
    color: #fff;
  }
`

export const videoPlayerContainer = css`
  height: calc(74vh - 6rem - 3.5rem);
  width: 100vw;
  margin: auto;

  @media screen and (min-height: 600px) and (max-height: 768px) {
    height: 68vh;
  }
`

export const videoPlayerContainer__nobar = css`
  height: calc(74vh - 6rem);
  width: 100vw;
  margin: auto;

  @media screen and (min-height: 600px) and (max-height: 768px) {
    height: 68vh;
  }
`

export const videoSuggestionContainer = css`
  position: absolute;
  bottom: 9.5%;
  left: 5%;
  width: 90%;
  height: 25vh;
  background: rgba(23, 23, 23, 0.9);
  border-radius: 0.25rem;
  // background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0));
`

export const videoSuggestionWrapper = css`
  position: absolute;
  bottom: 0;
  width: 97.5%;
  padding: 0 2.5rem 2.5rem 2.5rem;
  height: 20vh;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
  display: inline-block;
  min-width: 30vh;
  width: 20%;
  height: 100%;
  padding: 0.8rem;
}
`

export const videoSuggestionPlayerDetail = css`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 100%;
    left: 0;
  }
`

export const videoSuggestionTitle = css`
  position: absolute;
  font-size: 1.8rem;
  font-weight: 500;
  left: 2.5rem;
  top: 1rem;
`

export const infoBar = css`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 3.5rem;
  z-index: 88;
  background-color: #0862a6;
  display: inline-block;
`

export const infoBarClose = css`
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  span {
    width: 1.4rem;
    height: 1.4rem;
    background-image: url(data:image/svg+xml;charset=utf-8;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIg0KICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDMwIDMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMCAzMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCiAgICAuc3Qwe2ZpbGw6I0ZGRkZGRjt9DQo8L3N0eWxlPg0KPGRlZnM+DQo8L2RlZnM+DQo8Zz4NCiAgICA8Zz4NCiAgICAgICAgPGc+DQogICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNiwwLjRjLTAuNS0wLjUtMS4yLTAuNS0xLjcsMEwwLjQsMjcuOWMtMC41LDAuNS0wLjUsMS4yLDAsMS43QzAuNiwyOS45LDAuOSwzMCwxLjIsMzBzMC42LTAuMSwwLjktMC40DQogICAgICAgICAgICAgICAgTDI5LjYsMi4xQzMwLjEsMS42LDMwLjEsMC44LDI5LjYsMC40eiIvPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KICAgIDxnPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yOS42LDI3LjlMMi4xLDAuNGMtMC41LTAuNS0xLjItMC41LTEuNywwYy0wLjUsMC41LTAuNSwxLjIsMCwxLjdsMjcuNiwyNy42YzAuMiwwLjIsMC41LDAuNCwwLjksMC40DQogICAgICAgICAgICAgICAgczAuNi0wLjEsMC45LTAuNEMzMC4xLDI5LjIsMzAuMSwyOC40LDI5LjYsMjcuOXoiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvZz4NCjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
  }
`

export const infoBarContainer = css`
  margin: 0 10rem;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`

export const infoBarText = css`
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
`

export const headerContainer = css`
  height: 6rem;
  position: relative;
  display: block;
`

export const videoPlayerWrapper = css`
  width: 100vw;
  background: #000;
`

export const countdownWinfobar = css`
  height: calc(100% - 6.5rem - 3.8rem) !important;
`
