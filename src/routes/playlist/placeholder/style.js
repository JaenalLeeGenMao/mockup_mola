import styled, { css } from 'react-emotion'

export const container = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  border-radius: 5px;
`

export const fixedContainer = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  padding-top: 8vh;
  min-width: 100%;
  // max-width: 1280px;

 h3 {
  color: #6f6f6f;
  font-size: 1.42rem;
  }

  @media screen and (max-width: 960px) {
    h3 {
      color: #6f6f6f;
      font-size: 15px;
      margin: 0;
    }
  }
}
`

export const mainContent = css`
  display: block;
  margin: 0 auto;
  max-width: 95vw;

  @media screen and (max-width: 960px) {
    max-width: 100vw;
    margin: 0 0 0 1rem;
    padding-top: 16vh;
  }
`

export const carouselMargin = css`
  div.slider-frame {
    margin: 0 !important;
  }

  @media screen and (max-width: 960px) {
    div.slider-frame {
      margin: 0 !important;
      padding: 1rem 0 !important;
    }
  }
`

export const DummyPlaceholder = styled('div')`
  height: auto;

  /* width: 40vw; */
  border-radius: 0.25rem;
  // animation: pulse ${props => props.num + 1}s infinite ease-in-out;
  animation: pulse 2s infinite ease-in-out;

  img.bannerImage {
    position: relative;
    z-index: 1;
    opacity: 0;
  }

  imgbannerImage3d {
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

export const DummyWithoutAnimationPlaceholder = styled('div')`
  height: auto;

  /* width: 40vw; */
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
    width: 40vw;
    opacity: 0;
  }
`

export const DummyLinePlaceholder = styled('div')`
  height: ${props => props.height || '1.2rem'};
  width: ${props => props.width || '4rem'};
  margin: 1rem 0;
  animation: pulse 2s infinite ease-in-out;
`
