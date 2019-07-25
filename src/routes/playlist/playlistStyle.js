import styled, { css } from 'react-emotion'

export const DesktopBackgroundStyle = styled('div')`
  min-height: 100%;
  &::before {
    content: '';
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: top;
    background-image: url(${props => props.url});
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-filter: blur(8px) brightness(0.8);
    -moz-filter: blur(8px) brightness(0.8);
    -ms-filter: blur(8px) brightness(0.8);
    -o-filter: blur(8px) brightness(0.8);
    filter: blur(8px) brightness(0.8);
  }
`

export const MobileBackgroundStyle = styled('div')`
  &::before {
    content: '';
    background-repeat: no-repeat;
    // background-attachment: fixed;
    background-size: contain;
    background-position: top;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${props => props.url});
    position: absolute;
    top: 8vh;
    left: 0;
    width: 100%;
    height: 30vh;
  }
`

export const playlistHeadDesktop = css`
  max-width: 45rem;
  color: white;
  margin: 2rem;

  .title {
    line-height: 4rem;
    font-size: 1.8rem;
    font-weight: 600;
  }

  .description {
    line-height: 1.825rem;
    font-size: 1.2rem;
  }
`

export const playlistHeadMobile = css`
  color: white;
  margin: 2rem;
  display: flex;
  height: 25vh;
  flex-direction: column;
  justify-content: flex-end;

  @media screen and (max-width: 960px) {
    margin: 1rem;
  }

  .line {
    content: '';
    position: absolute;
    background-color: #d1d1d1;
    width: 14px;
    height: 1px;
    top: 50%;
    left: -20px;
  }

  .title {
    line-height: 4rem;
    font-size: 1.8rem;
    font-weight: 600;
  }
  .description {
    color: white;
    line-height: 1.825rem;
    font-size: 1.2rem;
  }
`

export const playlistList = css`
  // margin-bottom: 1.5rem;
  min-width: 100%;
  .season_text {
    color: #6f6f6f;
    font-size: 1.3rem;
    padding: 0 2rem;
    margin-bottom: 5px;
  }
`
export const playlistContainer = css`
  background: #000;
  width: 100%;
  padding-top: 8vh;
  position: absolute;
  top: 0;
`

// .playlist_head p {
//   line-height: 1.5rem;
//   font-size: 1.2rem;
// }

// .playlist_head h1 {
//   margin-bottom: 20px;
// }
