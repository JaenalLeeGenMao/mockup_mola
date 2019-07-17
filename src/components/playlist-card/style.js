import { css } from 'react-emotion'

export const playlistContainer = css`
  position: relative;
  display: inline-block;
  border-radius: .25rem;
  transition: all ease 500ms;

  :hover {
    pointer-events: auto;
    cursor: pointer;
    transform: scale(1.05);
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
