import { css } from 'react-emotion'

export const customTheoplayer = css`
   {
    &.video-container,
    &.video-container.video-js.vjs-fluid {
      width: 100%;
      height: 100%;
      padding: 0;
      float: left;
    }

    &.theoplayer-skin:not(.theo-seekbar-inside-controls) .theo-button-tooltip {
      left: auto!important;
      right: 0!important;
    }

    &.video-container .theo-primary-color {
      color: #fff !important;
    }

    &.video-container .theoplayer-poster {
      // background-position: center !important;
      background-size: cover !important;
    }

    &.video-container .vjs-play-progress {
      color: #0070b2 !important;
    }

    .vjs-menu-item.vjs-selected {
      color: #0070b2 !important;
    }

    &.video-container .vjs-big-play-button {
      width: 10% !important;
      background: none !important;
      background-color: transparent !important;
      display: none!important;
    }

    &.video-container .vjs-big-play-button::after {
      margin-top: 117% !important;
      height: 50% !important;
    }

    .video-container.video-js.theoplayer-skin {
      padding: 0 !important;
    }

    &.video-container .theo-primary-background {
      color: #fff !important;
      background-color: #0070b2 !important;
    }

    &.video-container .vjs-control-bar {
      z-index: 1;
    }

    @media (max-width: 640px) {
      // &.video-container,
      // &.video-container.video-js.vjs-fluid {
      //   height: 16rem !important;
      //   width: 100vw;
      // }

      .arrow {
        width: 3rem;
        height: 3rem;
        border: 0.16rem solid white;
      }
    }
  }
`
