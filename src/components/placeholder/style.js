import styled, { css } from 'react-emotion'

export const container = css`
  // position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100;
  min-height: 100vh;
  border-radius: 5px;
  margin: 0 auto;
`

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
      // padding: 0 1rem !important;
      margin: 0 !important;
    }
  }
`

export const DummyPlaceholder = styled('div')`
  height: auto;

  /* width: 40vw; */
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

export const DummyWithoutAnimationPlaceholder = styled('div')`
  height: auto;

  width: 40vw;
  position: relative;
  display: inline-block;
  border-radius: 0.25rem;
  transition: all ease 500ms;
  // background-color: rgba(68, 68, 68, 1);

  @media screen and (max-width: 960px) {
    width: ${props => (props.width ? props.width : '77.5vw')};
  }

  .bannerImage {
    position: relative;
    z-index: 1;
    opacity: 1;
  }

  .bannerImage3d {
    position: relative;
    z-index: 1;
    width: 40vw;
    opacity: 1;

    @media screen and (max-width: 960px) {
      width: 77.5vw;
    }
  }
`
