import styled, { css } from 'react-emotion'

export const container = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  border-radius: 5px;
  margin: 0 auto;
`

export const fixedContainer = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;

 h3 {
  color: #6f6f6f;
  font-size: 1.42rem;
  }

  @media screen and (max-width: 960px) {
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
      margin: 0 1rem !important;
    }
  }
`

export const DummyPlaceholder = styled('div')`
  height: auto;

  /* width: 45vw; */
  border-radius: 0.25rem;
  animation: pulse ${props => props.num + 1}s infinite ease-in-out;

  img.bannerImage {
    position: relative;
    z-index: 1;
    opacity: 0;
  }

  imgbannerImage3d {
    position: relative;
    z-index: 1;
    width: 45vw;
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

export const DummyWithoutAnimationPlaceholder = styled('div')`
  height: auto;

  /* width: 45vw; */
  border-radius: 0.25rem;
  background-color: rgba(165, 165, 165, 0.3);

  img.bannerImage {
    position: relative;
    z-index: 1;
    opacity: 0;
  }

  imgbannerImage3d {
    position: relative;
    z-index: 1;
    width: 45vw;
    opacity: 0;
  }
`
