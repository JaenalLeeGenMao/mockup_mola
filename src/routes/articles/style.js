import styled, { css } from 'react-emotion'

export const CustomBackground = styled('div')`
  position: ${props => props.position || 'fixed'};
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
    url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: ${props => props.backgroundSize || 'cover'};
  background-attachment: ${props => props.backgroundAttachment || 'fixed'};
  height: ${props => props.height || '100vh'};
  width: 100%;
  opacity: ${props => props.opacity || 1};
`

export const articleContainer = css`
  position: relative;
  height: 100%;
  width: 100%;

  .mainContent {
    position: relative;
    margin: 0 auto;
    max-width: 1280px;
    padding-top: 50vh;

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

    .caption {
      display: block;
      color: #b9dbff;
      font-size: 1.56rem;
      padding: 2.5rem;
      margin-top: 3.8rem;
      background: #000000;
      border-radius: 0.3rem;
    }

    .detail {
      color: white;
      white-space: pre-wrap;
      font-size: 2.221rem;
      color: white;
      margin: 4rem 0;
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
