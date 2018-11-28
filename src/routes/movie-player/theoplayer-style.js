import { css } from 'react-emotion';

export const customTheoplayer = css`{
  &.video-container,
  &.video-container.video-js.vjs-fluid {
    width: 100%;
    height: 100vh !important;
    padding: 0;
    float: left;
  }

  &.video-container .vjs-play-progress {
    color: #0070b2 !important;
  }

  .vjs-menu-item.vjs-selected {
    color: #0070b2 !important;
  }

  &.video-container .vjs-big-play-button {
    width: 6% !important;
  }

  &.video-container .theo-primary-color {
    color: #0070b2 !important;
  }

  &.video-container .vjs-big-play-button::after {
    margin-top: 117% !important;
    height: 30% !important;
  }

  .video-container.video-js.theoplayer-skin {
    padding: 0 !important;
  }

  &.video-container .theo-primary-background {
    color: #fff !important;
    background-color: #0070b2 !important;
  }

  @media (max-width: 640px) {
    &.video-container,
    &.video-container.video-js.vjs-fluid {
      height: 90vh !important;
      width: 100vw;
    }

    .arrow {
      width: 3rem;
      height: 3rem;
      border: 0.16rem solid white;
    }
  }
}`;
