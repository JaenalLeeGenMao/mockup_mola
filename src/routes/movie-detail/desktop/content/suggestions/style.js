import { css } from 'react-emotion'

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
  // position: absolute;
  bottom: 0;
  width: 97.5%;
  padding: 0 2.5rem 2.5rem 2.5rem;
  height: 90%;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
  display: inline-block;
  min-width: 15vw;
  width: 18%;
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

export const titleSuggestions = css`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
`
