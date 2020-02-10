import styled, { css } from 'react-emotion'

export const fixedContainer = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 95vw;

 h3 {
  color: #6f6f6f;
  font-size: 1.42rem;
  }

  @media screen and (max-width: 960px) {
    max-width: 100vw;
    margin: 0 0 0 1rem;

    h3 {
      color: #6f6f6f;
      font-size: 15px;
      margin: 0 1rem;
    }
  }
}
`

export const carouselMargin = css`
  div.slider-frame {
    margin: 0 !important;
  }

  @media screen and (max-width: 960px) {
    div.slider-frame {
      margin: 0 !important;
    }
  }
`

export const DummyPlaceholder = styled('div')`
  height: auto;
  border-radius: 0.25rem;
  animation: pulse ${props => props.num + 1}s infinite ease-in-out;

  img.bannerImage {
    position: relative;
    z-index: 1;
    opacity: 0;
  }

  img.bannerImage3d {
    position: relative;
    z-index: 1;
    width: 40vw;
    opacity: 0;
  }

  @keyframes pulse {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`
