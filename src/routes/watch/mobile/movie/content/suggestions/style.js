import { css } from 'react-emotion'

export const videoSuggestionContainer = css`
  position: relative;
  height: 12rem;
  background: transparent;
  border-radius: 0.25rem;
  width: calc(100% - 40px);
  margin: 0 20px 20px 20px;
  overflow: hidden;
}
`

export const videoSuggestionWrapper = css`
  bottom: 0;
  width: 100%;
  height: calc(100% + 20px);
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
  display: inline-block;
  width: 200px;
  min-width: 200px;
  height: 100%;
  padding: 0 0.8rem;
}
`

export const videoSuggestionPlayerDetail = css`
  display: inline-block;
  margin-right: 14px;
  width: 200px;
`

export const imageWrapper = css`
  flex: none;
  left: unset;
  display: block;

  img {
    display: block;
    position: absolute;
    width: 100%;
    flex: none !important;
  }
`

export const titleWrapper = css`
  height: 11rem;
`

export const titleSuggestions = css`
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
  bottom: 0;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0;

  max-height: 54px;
  white-space: initial;
  display: -webkit-box;

  /* autoprefixer: off */
  -webkit-box-orient: vertical;

  /* autoprefixer: on */
  -webkit-line-clamp: 2;
`

export const videoSuggestionTitle = css`
  padding: 0px 15px;
  font-size: 14px;
  line-height: 1.35;
  top: 0.5rem;
  color: #969696;
  padding-bottom: 13px;
`
