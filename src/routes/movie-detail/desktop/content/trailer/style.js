import { css } from 'react-emotion'

export const contentTrailerContainer = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 20vh;
`

export const contentNoTrailer = css`
  color: #7f8088;
`

export const trailerContainer = css`
  height: calc(100% - 30px);
  display: block;
  overflow: hidden;
`

export const trailerWrapper = css`
  // position: absolute;
  bottom: 0;
  width: 100vw;
  height: calc(100% + 30px);
  padding: 1.5rem 0 0;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const trailerInnerWrapper = css`
  height: 65%;
`

export const trailerPlayer = css`
  display: inline-block;
  min-width: 15vw;
  width: calc(100% / 7);
  height: 100%;
  padding: 0.8rem;

  &:first-child {
    padding-left: 1.6rem;
  }

  &:last-child {
    padding-right: 1.6rem;
  }
}
`

export const trailerPlayerDetail = css`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    width: 100%;
    height: 100%;
    left: 0;
  }

  &:hover img {
    background-color: transparent !important;
    opacity: 1 !important;
    transition: none !important;
  }
`

export const imageWrapper = css`
  flex: none;
  left: unset;
  display: block;

  & > div {
    bottom: 0;
    height: auto;
  }

  &::before {
    content: '';
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(8, 8, 8, 0.8) 55%, rgb(0, 0, 0) 100%);
    height: 60px;
    width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  img {
    flex: none;
    left: unset;
    display: block;
  }
`

export const playIcon = css`
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MSIgaGVpZ2h0PSI1MSIgdmlld0JveD0iMCAwIDUxIDUxIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojZmZmO30uYntmaWxsOiNmZmY7fTwvc3R5bGU+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05OTkuNSAtOTEyLjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTI1LDBBMjUsMjUsMCwxLDAsNTAsMjUsMjUsMjUsMCwwLDAsMjUsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMDAgOTEzKSIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNjAuNCw0Ny4wNzcsNDkuMzYyLDU1LjAxOGEuNzI5LjcyOSwwLDAsMS0xLjEyNS0uNjc4VjM4LjQ1OGEuNzI5LjcyOSwwLDAsMSwxLjEyNS0uNjc4TDYwLjQsNDUuNzIxQS44NTguODU4LDAsMCwxLDYwLjQsNDcuMDc3WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTcxLjc2MyA4OTEuNjAxKSIvPjwvZz48L3N2Zz4=');
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 1;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 10px;
`

export const titleTrailer = css`
  font-weight: 500;
  font-size: 14px;
  margin: 10px 10px 5px 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
`
