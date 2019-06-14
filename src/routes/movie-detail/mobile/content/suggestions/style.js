import { css } from 'react-emotion'

export const videoSuggestionContainer = css`
position: absolute;
left: 2.5%;
// bottom: 2rem;
height: 16rem;
min-height: height: 10rem;
// width: 100vw;
width: 95%;
background: transparent;
background: rgba(23, 23, 23, 0.9);
border-radius: 0.25rem;
`

export const videoSuggestionWrapper = css`
  // position: absolute;
  bottom: 0;
  width: 95%;
  height: 100%;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
display: inline-block;
min-width: 14.5vw;
width: 22rem;
height: 100%;
padding: 1rem 0.8rem;
}
`

export const videoSuggestionPlayerDetail = css`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    position: absolute;
    width: 100%;
    // height: 100%;
  }
`
export const titleWrapper = css`
  height: 15rem;
`

export const titleSuggestions = css`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
  bottom: 0;
`

export const videoSuggestionTitle = css`
  // position: absolute;
  padding: 0px 15px;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.7;
  letter-spacing: 0.12rem;
  top: 0.5rem;
`
