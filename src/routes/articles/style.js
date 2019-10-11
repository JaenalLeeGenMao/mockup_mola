import styled, { css } from 'react-emotion'

export const CustomBackground = styled('div')`
  position: ${props => props.position || 'fixed'};
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${props => props.backgroundSize || 'cover'};
  background-attachment: ${props => props.backgroundAttachment || 'fixed'};
  height: ${props => props.height || '100vh'};
  width: 100%;
  opacity: ${props => props.opacity || 1};
`

export const playerStyle = css` 
  height: 57rem !important;

  &.vjs-has-started {
    height: 54rem !important;
  }
`

export const articleContainer = css`
  position: relative;
  height: 100%;
  width: 100%;

  .top-section {
    display: flex;
    margin-left: 5rem;
    margin-right: 5rem;
    padding-top: 8rem;
    padding-bottom: 2rem;
  }

  .video-player-wrapper {
    width: 89rem;
    height: 54rem;
  }

  .related-article-section {
    width: 42rem;
    margin-left: 3rem;
  }

  .related-article-title {
    font-size: 2.3rem;
    color: #CBCBCB;
    margin-bottom: 2rem;
  }

  .social-share-section {
    margin-top: 2rem;
  }

  .related-video-section {
    padding: 3rem 5rem;
    background: #292929;
  }

  .mainContent {
    position: relative;
    // margin: 0 auto;
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 3rem;
    // max-width: 1280px;
    background: #212121;
    

    .title {
      color: white;
      font-weight: bold;
      font-size: 4.2rem;
      margin: 0;
    }

    .publishInfo {
      display: block;
      color: #9d9d9d;
      font-size: 1.27rem;
      font-weight: 400;
      margin-top: 1.4rem;
    }

    .caption-wrapper {
      display: flex;
    }

    .caption {
      display: block;
      color: #b9dbff;
      font-size: 2.6rem;
      padding: 0 2.5rem;
      margin-top: 2.8rem;
      // background: #000000;
      border-radius: 0.3rem;
      color: #FFFFFF
    }

    .indicator-caption {
      width: .8rem;
      background: #2C56FF;
      margin-top: 3.3rem;
      margin-bottom: .5rem;
    }

    .detail {
      color: white;
      white-space: pre-wrap;
      font-size: 2.221rem;
      color: white;
      margin: 4rem 0;
    }

    .content-container {
      display: flex;
    }

    .detail-wrapper {
      width: 89rem;
    }

    .markdown-wrapper {
      font-size: 2.4rem;
      color: #CCCCCC;
      margin-top: 2rem;
    }

    .markdown-wrapper p {
      margin-bottom: 2rem;
    }

    .markdown-wrapper a {
      color: #2C56FF;
    }

    .related-article-card {
      width: 40rem;
      height: 15rem;
      border: 1px solid blue
    }

    .latest-wrapper {
      margin-left: 3rem;
      width: 42rem;
    }

    .tag-section {
      display: flex;
      flex-wrap: wrap;
      /* margin-top: 3rem; */
      /* margin-bottom: 3rem; */
      padding-top: 3rem;
      padding-bottom: 3rem;
    }

    .tag-box {
      background: #333333;
      margin-right: 2rem;
      margin-bottom: 2rem;
    }

    .tag-text {
      font-size: 17px;
      color: #fff;
      padding: 1rem 2rem;
    }

    @media screen and (max-width: 960px) {
      padding-top: 0;
      margin: 20px;

      .title {
        font-size: 21px;
      }

      .publishInfo {
        margin-top: 5px;
        font-size: 12px;
      }

      .caption {
        margin-top: 10px;
        padding: 10px;
        background: #2d2d2d;
        border-radius: 2px;
        font-size: 12px;
      }

      .detail {
        font-size: 12px;
        margin: 2rem 0;
      }
    }
  }
`
