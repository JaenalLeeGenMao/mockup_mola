import { css } from 'react-emotion'

export const videoContainer = css`
  position: relative;
  display: inline-block;
  border-radius: .25rem;
  transition: all ease 500ms;

  :hover {
    pointer-events: auto;
    cursor: pointer;
    transform: scaleY(1.05);
  }

  p {
    position: relative;
    max-width: 100%;
    max-height: 2.25rem;
    text-overflow: clip;
    overflow: hidden;
    padding: 0 0.5rem;
    color: white;
    opacity: 0;
    transition: all ease 500ms;

    @media screen and (max-width: 960px) {
      opacity: 1;
      max-width: 7.5rem;
      font-size: 11px;
      max-height: 24px;
      text-overflow: clip;
    }
  }

  :hover p {
    opacity: 1;
  }

  .bannerImage {
    position: relative;
    z-index: 0;
  }
}
`
export const imageStyle = css`
  width: 16rem;
  @media screen and (min-width: 1900px) {
    width: 14.5rem;
  }
`
