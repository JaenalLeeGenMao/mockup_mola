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
  background: #000311;
  color: #fff;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
`

export const controllerContainer = css`
  display: block;
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;

  div {
    display: inline-block;
    padding: 2rem 5rem;
    text-transform: uppercase;
    letter-spacing: 0.25rem;
    color: #4a4a4a;
    font-weight: 600;
    cursor: pointer;
  }

  div.active {
    color: #fff;
  }
`
export const videoPlayerContainer = css`
  height: 65.5vh;
  width: 60vw;
  margin: auto;
`

export const videoSuggestionContainer = css`
  position: absolute;
  bottom: 19.5%;
  width: 100vw;
  height: 25vh;
  background: rgba(0, 0, 0, 0.25);
`

export const videoSuggestionWrapper = css`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 20vh;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
  display: inline-block;
  min-width: 30vh;
  width: 20vw;
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
    height: 85%;
    left: 0;
  }
`

export const videoSuggestionTitle = css`
  position: absolute;
  left: 2rem;
  top: 1rem;
`
