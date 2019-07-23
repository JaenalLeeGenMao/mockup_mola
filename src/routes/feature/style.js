import { css } from 'react-emotion'

export const container = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;

  h3 {
    color: #ffffff;
    font-size: 1.28rem;
    display: inline-block;
    vertical-align: middle;
    color: white;
    font-weight: 400;
  }

  p {
    color: #ffffff;
    font-size: 1.28rem;
    display: block;
    vertical-align: middle;
    color: white;
    font-weight: 400;
  }

  @media screen and (max-width: 960px) {
    h3 {
      color: #ffffff;
      font-size: 15px;
      margin: 0 1rem;
    }

    p {
      color: #ffffff;
      font-size: 11px;
      margin: 0 1rem;
    }
  }
`

export const bannerContainer = css`
  position: relative;
  border-radius: .25rem;
}
`
export const carouselMargin = css`
  // div.slider-frame {
  //   margin: 0 !important;
  // }

  // @media screen and (max-width: 960px) {
  //   div.slider-frame {
  //     margin: 0 1rem !important;
  //   }
  // }
`
