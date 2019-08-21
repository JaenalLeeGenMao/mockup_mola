import { css } from 'react-emotion'

export const container = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 95vw;

  h3 {
    padding: 0 0.5rem;
    color: #6f6f6f;
    font-size: 1.28rem;
    font-weight: 300;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
  }

  p {
    color: #ffffff;
    font-size: 1.28rem;
    display: block;
    vertical-align: middle;
    font-weight: 400;
  }

  @media screen and (max-width: 960px) {
    margin: 0;
    max-width: 100vw;

    h3 {
      color: #6f6f6f;
      font-size: 15px;
      margin: 0 5px;
    }

    p {
      color: #ffffff;
      font-size: 11px;
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

export const carouselHeader = css`
  display: flex;
  justify-content: space-between;

  a {
    color: #969696;
    border: 0.112rem solid #969696;
    border-radius: 3rem;
    padding: 0.25rem 1rem 0.35rem 1rem;
    transition: all ease 500ms;
  }

  a:hover {
    color: #000000;
    background: white;
    border: 0.112rem solid #ffffff;
  }
`
