import { css } from 'react-emotion'

export const container = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
`

export const bannerContainer = css`
  position: relative;
  border-radius: .25rem;
}
`
export const carouselMargin = css`
  div.slider-frame {
    margin: 0 !important;
  }

  @media screen and (max-width: 960px) {
    div.slider-frame {
      margin: 0 1rem !important;
    }
  }
`
