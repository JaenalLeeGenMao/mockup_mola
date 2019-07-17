import { css } from 'react-emotion'

export const bannerContainer = css`
  position: relative;
  border-radius: .25rem;

  .bannerImageWrapper {
    margin: 0 5%;
    background: grey;
  }
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
