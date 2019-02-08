import { css } from 'react-emotion'

export const reviewSliderContainer = css`
  overflow: hidden;
  position: relative;
  max-width: 100vw;
  max-height: 30vh;
  height: 30vh;
  margin: 0;
  padding: 0;

  .slick-dark::before {
    color: #000;
    border-color: #000;
  }

  .slick-white::before {
    color: #fff;
    border-color: #fff;
  }

  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }

  .slick-slider {
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .slick-track {
    top: 0;
    left: 0;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }

  .slick-slider .slick-list,
  .slick-slider .slick-track {
    transform: translate3d(0, 0, 0);
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-active img {
    transform: scale(1);
  }

  * {
    outline: 0;
  }
`

export const reviewSliderWrapper = css`
  text-align: center;
  height: 30vh;
`

export const reviewSliderDetail = css`
  padding: 5rem;
`

export const reviewSliderProfile = css`
  width: 8rem;
  height: 8rem;
  display: inline-block;
  border: 0.2rem solid #fff;
  outline: 0.2rem solid #fff;
  vertical-align: middle;

  /* Big TV Styles */
  @media screen and (min-height: 1801px) {
    width: 10rem;
    height: 10rem;
  }
`

export const reviewSliderQuotes = css`
  display: inline-block;
  width: 30vw;
  font-size: 1.2rem;
  text-align: left;
  margin-left: 2rem;
  vertical-align: middle;

  h1 {
    color: #fff;
  }

  p {
    color: #ababab;
  }
`
