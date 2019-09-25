import styled, { css } from 'react-emotion'
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
  overflow-x: hidden;
  overflow-y: scroll;
`

export const movieDetailBottom = css`
  height: 100%;
  max-height: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;

  & > div {
    overflow: auto;
  }

  .recommendationWrapper {
    padding: 1rem 0 0 3rem;

    .title {
      color: #989898;
      font-size: 1.8rem;
      line-height: 2.25rem;
    }
  }
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
  background-color: #000000;

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
  display: flex;
  height: calc(88vh - 6rem - 3.5rem);
  width: 100vw;
  margin: auto;

  @media screen and (min-height: 600px) and (max-height: 768px) {
    display: flex;
    height: 82vh;
  }
`

export const videoPlayerContainer__nobar = css`
  display: flex;
  height: calc(88vh - 6rem);
  width: 100vw;
  margin: auto;

  @media screen and (min-height: 600px) and (max-height: 768px) {
    display: flex;
    height: 82vh;
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

export const videoInnerContainer = css`
  width: 100%;
  height: 100%;
`

export const videoPlayerInfoWrapper = css`
  background: #171717;
  height: 100%;
  width: 30vw;
  min-width: 285px;
  display: grid;
  grid-template-areas:
    'title'
    'desc'
    'cast'
    'chat';
  grid-template-rows: 1fr 5fr 1.5fr 1fr;
  grid-template-columns: 1fr;

  .player__info_grid_title {
    grid-area: title;
    padding: 0px 2rem 1.34rem 2rem;

    h1 {
      line-height: 3rem;
    }

    span {
      color: #989898;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 0.5rem 0.5rem 0.5rem 0;
      margin-right: 0.5rem;
    }

    span.border {
      color: #989898;
      font-size: 1.2rem;
      font-weight: bold;
      border: 0.1rem solid #989898;
      border-radius: 0.2rem;
      padding: 0.25rem;
      margin-right: 0.5rem;
    }
  }

  .player__info_grid_desc {
    grid-area: desc;
    padding: 0.67rem 2rem;
    overflow-y: auto;
    overscroll-behavior-y: auto;

    p {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2rem;
    }
  }

  .player__info_grid_cast {
    grid-area: cast;
    overflow: hidden;

    strong {
      color: #989898;
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
      margin: 0 0 0 2rem;
    }
  }

  .player__info_grid_chat {
    grid-area: chat;
    background: blue;
  }
`

const dummyImage =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6IzlhOWE5YTt9LmJ7Y2xpcC1wYXRoOnVybCgjYSk7fS5je2ZpbGw6I2ZmZjtzdHJva2U6I2ZmZjt9PC9zdHlsZT48Y2xpcFBhdGggaWQ9ImEiPjxjaXJjbGUgY2xhc3M9ImEiIGN4PSI0MCIgY3k9IjQwIiByPSI0MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA5MSA1MjkpIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk4MCAtNTI5KSI+PGNpcmNsZSBjbGFzcz0iYSIgY3g9IjQwIiBjeT0iNDAiIHI9IjQwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5ODAgNTI5KSIvPjxnIGNsYXNzPSJiIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTExKSI+PHBhdGggY2xhc3M9ImMiIGQ9Ik02NS45NDcsNTQuODI2LDU0LjMzOCw0OS44YTIuMzU0LDIuMzU0LDAsMCwxLS44MzYtLjkxNmw3Ljc1MS0uMDA2YTEzLjczNCwxMy43MzQsMCwwLDAsNS44OTMtLjgsMy41MjgsMy41MjgsMCwwLDAsMS40NzctNS4yNjJjLTIuMjE1LTMuMTUzLTcuMzg2LTExLjM5MS03LjU0OC0xOS43NDYsMC0uMTQ0LS40NzItMTQuMzUzLTE0LjUtMTQuNDY4YTE2LjY5LDE2LjY5LDAsMCwwLTUuNzE0LDEuMDEzQTkuODc4LDkuODc4LDAsMCwwLDM5LjA5LDYuN2MtMi40MzktMi43ODQtNi40LTQuMi0xMS43NjgtNC4ycy05LjMzLDEuNDExLTExLjc2OSw0LjE5M2ExMC42NSwxMC42NSwwLDAsMC0yLjQ4NSw3Ljc1MXY2LjMxOGE0LjczNyw0LjczNywwLDAsMC0xLjE4OCwzLjExOHY0Ljc1MmE0LjcyNCw0LjcyNCwwLDAsMCwxLjc3OCwzLjY5MywyNC45MzEsMjQuOTMxLDAsMCwwLDQuMTYxLDguNnYzLjkzMWEzLjEzOSwzLjEzOSwwLDAsMS0xLjYzNiwyLjc1NmwtMTAuNiw1Ljc4QTEwLjcxNSwxMC43MTUsMCwwLDAsMCw2Mi44djkuMDM0SDcxLjI3M1Y2My40NDJBOS41OCw5LjU4LDAsMCwwLDY1Ljk0Nyw1NC44MjZaTTUyLjI2Nyw2OS40NThIMi4zNzZWNjIuOGE4LjMzNSw4LjMzNSwwLDAsMSw0LjM0Ni03LjMyMmwxMC42LTUuNzhhNS41MTYsNS41MTYsMCwwLDAsMi44NzUtNC44NDNWNDAuMDhsLS4yNzctLjMzYTIyLjQyNiwyMi40MjYsMCwwLDEtNC4wNTEtOC4zOTJsLS4xMDgtLjQ3LS40MDUtLjI2MWEyLjM3LDIuMzcsMCwwLDEtMS4xLTEuOTkyVjIzLjg4MmEyLjM0NCwyLjM0NCwwLDAsMSwuOC0xLjc1MmwuMzkyLS4zNTN2LTcuNGwtLjAxMS0uMTU2YTguMjQ4LDguMjQ4LDAsMCwxLDEuOTA3LTUuOTY0YzEuOTY4LTIuMjQ1LDUuMzI4LTMuMzgzLDkuOTgzLTMuMzgzLDQuNjM5LDAsNy45OTEsMS4xMyw5Ljk2MiwzLjM1OUE3LjcxOSw3LjcxOSwwLDAsMSwzOSwxMS42NDFjLjAxOS4wODMuMDM3LjE2NS4wNTMuMjQ3cy4wMzQuMTY5LjA0OC4yNDkuMDI5LjE4MS4wNDIuMjY4Yy4wMS4wNjMuMDE5LjEyNy4wMjYuMTg4LjAxOC4xNDcuMDMyLjI5LjA0Mi40MjJhLjI2OS4yNjksMCwwLDEsMCwuMDMxYy4wMDguMTI4LjAxNC4yNDkuMDE4LjM2LDAsLjAyMSwwLC4wMzksMCwuMDYxLDAsLjEsMCwuMTkyLDAsLjI3NHYuMDM2YzAsLjI3OS0uMDI0LjQ0NS0uMDI0LjQ0OWwtLjAxLDcuNTUxLjM5Mi4zNTRhMi4zNCwyLjM0LDAsMCwxLC44LDEuNzUxdjQuNzUyQTIuMzYyLDIuMzYyLDAsMCwxLDM4LjcsMzAuODg5bC0uNTkyLjE4Mi0uMTkuNTg4YTI0Ljg2OCwyNC44NjgsMCwwLDEtMy4zNjYsNi43ODYsMTUuNjMsMTUuNjMsMCwwLDEtLjk5NCwxLjI4MmwtLjMuMzM3djQuOWE1LjYsNS42LDAsMCwwLC4wNzYuODg1Yy4wMS4wNjIuMDI2LjEyMS4wMzguMTgzYTUuNTcyLDUuNTcyLDAsMCwwLC4xODQuN2MuMDE4LjA1My4wMzcuMS4wNTcuMTU4YTUuNTI0LDUuNTI0LDAsMCwwLC4zMjcuNzE5Yy4wMTQuMDI2LjAyNy4wNTMuMDQyLjA4YTUuNDIyLDUuNDIyLDAsMCwwLC42Ljg1OWwuMjcxLjMzNEgzNC45QTUuNTMyLDUuNTMyLDAsMCwwLDM2LjMwNyw0OS45bDExLjM0OCw1LjY3M2E4LjI5LDguMjksMCwwLDEsNC42MTEsNy40NTlabTE2LjYzLDBINTQuNjQyVjYzLjAzMWExMC42NTcsMTAuNjU3LDAsMCwwLTUuOTIzLTkuNTg0bC04LjE0Ni00LjA3NEEyLjA1NywyLjA1NywwLDAsMCwzOC42ODgsNDYuNUgzNi4wNTRhMy4wMjYsMy4wMjYsMCwwLDEtLjEzNC0uMywyLjU5MywyLjU5MywwLDAsMS0uMjg0LTEuMjM3VjQwLjk0OGMuMjcyLS4zMzMuNTU4LS43MTIuODU0LTEuMTNBMjcuMTg2LDI3LjE4NiwwLDAsMCw0MCwzMi45M2E0LjcxMyw0LjcxMywwLDAsMCwyLjc2NC00LjNWMjMuODgyYTQuNzM3LDQuNzM3LDAsMCwwLTEuMTg4LTMuMTE4VjE0LjQ0NWExMC40NTIsMTAuNDUyLDAsMCwwLS4xLTIuNTQxLDE0LjIxNiwxNC4yMTYsMCwwLDEsNS4xLS45MjdjMTEuNjkuMSwxMi4xMTYsMTEuNjU0LDEyLjEyOCwxMi4xNDEuMTc1LDkuMDA4LDUuNjM4LDE3LjczMSw3Ljk3OSwyMS4wNjNhMS4xNTMsMS4xNTMsMCwwLDEsLjE2NS45ODIsMS4xMSwxLjExLDAsMCwxLS42MzYuNzMxLDExLjY3OSwxMS42NzksMCwwLDEtNC44NDIuNjA5SDUzLjE5MWEyLjE4OSwyLjE4OSwwLDAsMC0xLjk2NSwzLjE1Niw0Ljk1OSw0Ljk1OSwwLDAsMCwyLjEwOCwyLjI4OWwxMS41NzgsNS4wMTVBNy4yMTYsNy4yMTYsMCwwLDEsNjguOSw2My40NDJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDk1LjM2NCA1NDEuMTY3KSIvPjwvZz48L2c+PC9zdmc+'

export const PeopleWrapper = styled('a')`
  display: inline-block;
  position: relative;
  height: ${props => props.height || '6rem'};
  width: ${props => props.width || '6rem'};
  border-radius: ${props => props.width / 2 || '3rem'};
  background: url(${props => props.src || dummyImage}) no-repeat center center;
  background-size: cover;
  margin: 0.5rem 0.5rem 0.5rem 0;
  pointer-events: auto;
  overflow: hidden;

  &:first-child {
    margin: 0.5rem 0.5rem 0.5rem 2rem;
  }

  &:hover {
    cursor: pointer;
  }

  img {
    height: ${props => props.height || '6rem'};
    width: ${props => props.width || '6rem'};
  }
`

export const customTooltipTheme = css`
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    display: none;
  }

  p {
    color: white;
    font-weight: 400;
    font-size: 0.8rem;
  }

  .grey {
    font-size: 0.8rem !important;
    font-weight: 400 !important;
    color: #666666 !important;
    background-color: rgba(102, 102, 102, 1) !important;
    box-shadow: 0 0.8rem 1.6rem rgba(0, 0, 0, 0.16) !important;
    opacity: 1 !important;

    &.place-top {
      &:after {
        border-top-color: rgba(102, 102, 102, 1) !important;
        border-top-style: solid !important;
        border-top-width: 0.6rem !important;
      }
    }

    &.place-bottom {
      &:after {
        border-bottom-color: rgba(102, 102, 102, 1) !important;
        border-bottom-style: solid !important;
        border-bottom-width: 0.6rem !important;
      }
    }

    &.place-right {
      &:after {
        border-right-color: rgba(102, 102, 102, 1) !important;
        border-right-style: solid !important;
        border-right-width: 0.6rem !important;
      }
    }

    &.place-left {
      &:after {
        border-left-color: rgba(102, 102, 102, 1) !important;
        border-left-style: solid !important;
        border-left-width: 0.6rem !important;
      }
    }
  }
`
