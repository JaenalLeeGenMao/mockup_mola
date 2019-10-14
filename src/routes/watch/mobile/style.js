import { css } from 'react-emotion'

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

export const movieDetailContainer = css`
  color: #fff;
  background: #000311;
  width: 100vw;
  min-height: 100vh;
  margin-bottom: 20px;
`
export const movieDetailNotAllowed = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 1rem;
  background: black;
`

export const movieDetailNotAvailableContainer = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fontsize: 1rem;
`

export const videoPlayerContainer = css`
  height: 56.25vw;
`

export const videoTitle = css`
  font-size: 22px;
  line-height: 1.35;
  font-weight: normal;
  padding: 0 15px;
`

export const playMovieButton = css`
  background-color: #ffffff;
  color: #414141;
  font-size: 14px;
  font-weight: bold;
  position: fixed;
  bottom: 30px;
  text-align: center;
  left: 50%;
  transform: translateX(-50%);
  width: 152px;
  padding: 10px 0;
  border-radius: 200px;
  line-height: 1.2;

  span {
    vertical-align: middle;
    display: inline-block;
  }
`

export const playMovieIcon = css`
  display: inline-block;
  border-style: solid;
  box-sizing: border-box;
  border-color: transparent transparent transparent #202020;
  width: 13px;
  height: 12px;
  border-width: 8px 0 8px 12px;
  vertical-align: middle;
  margin-right: 5px;
`

export const posterWrapper = css`
  position: relative;
  min-height: 56.25vw;
`

export const playIcon = css`
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MSIgaGVpZ2h0PSI1MSIgdmlld0JveD0iMCAwIDUxIDUxIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojZmZmO30uYntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05OTkuNSAtOTEyLjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTI1LDBBMjUsMjUsMCwxLDAsNTAsMjUsMjUsMjUsMCwwLDAsMjUsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMDAgOTEzKSIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNjAuNCw0Ny4wNzcsNDkuMzYyLDU1LjAxOGEuNzI5LjcyOSwwLDAsMS0xLjEyNS0uNjc4VjM4LjQ1OGEuNzI5LjcyOSwwLDAsMSwxLjEyNS0uNjc4TDYwLjQsNDUuNzIxQS44NTguODU4LDAsMCwxLDYwLjQsNDcuMDc3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcxLjc2MyA4OTEuNjAxKSIvPjwvZz48L3N2Zz4=');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  width: 40px;
  height: 40px;
  display: block;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`
export const countdownWinfobar = css`
  height: calc(56.25vw - 38px) !important;
`

export const countdownWOinfobar = css`
  height: 56.25vw !important;
`

export const infoBar = css`
  position: relative;
  top: 0;
  left: 0;
  width: 100vw;
  height: 35px;
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
    width: 14px;
    height: 14px;
    background-image: url(data:image/svg+xml;charset=utf-8;base64,PCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIg0KICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIg0KICAgICB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDMwIDMwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMCAzMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCiAgICAuc3Qwe2ZpbGw6I0ZGRkZGRjt9DQo8L3N0eWxlPg0KPGRlZnM+DQo8L2RlZnM+DQo8Zz4NCiAgICA8Zz4NCiAgICAgICAgPGc+DQogICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjkuNiwwLjRjLTAuNS0wLjUtMS4yLTAuNS0xLjcsMEwwLjQsMjcuOWMtMC41LDAuNS0wLjUsMS4yLDAsMS43QzAuNiwyOS45LDAuOSwzMCwxLjIsMzBzMC42LTAuMSwwLjktMC40DQogICAgICAgICAgICAgICAgTDI5LjYsMi4xQzMwLjEsMS42LDMwLjEsMC44LDI5LjYsMC40eiIvPg0KICAgICAgICA8L2c+DQogICAgPC9nPg0KICAgIDxnPg0KICAgICAgICA8Zz4NCiAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0yOS42LDI3LjlMMi4xLDAuNGMtMC41LTAuNS0xLjItMC41LTEuNywwYy0wLjUsMC41LTAuNSwxLjIsMCwxLjdsMjcuNiwyNy42YzAuMiwwLjIsMC41LDAuNCwwLjksMC40DQogICAgICAgICAgICAgICAgczAuNi0wLjEsMC45LTAuNEMzMC4xLDI5LjIsMzAuMSwyOC40LDI5LjYsMjcuOXoiLz4NCiAgICAgICAgPC9nPg0KICAgIDwvZz4NCjwvZz4NCjwvc3ZnPg==);
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
  }
`

export const infoBarContainer = css`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  margin: 0 30px 0 40px;
`

export const infoBarText = css`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`

export const headerContainer = css`
  height: 60px;
`

export const videoInnerContainer = css`
  width: 100%;
  height: 100%;
`

export const videoBlockerPlatform = css`
  background: transparent linear-gradient(180deg, #00000000 0%, #000000 40%) 0% 0% no-repeat padding-box;
  opacity: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 35%;
  width: 100%;
  pointer-events: none;

  .wrap__info {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    width: 100%;
    flex-direction: column;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .text__info {
    text-align: center;
    font: 25px;
    letter-spacing: 0;
    color: #ffffff;
    opacity: 1;
    margin: 0 10px;
  }

  .img__info {
    width: 130px;
    margin-top: 15px;
    pointer-events: auto;
  }
`
