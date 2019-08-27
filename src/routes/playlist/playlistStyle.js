import styled, { css } from 'react-emotion'

export const DesktopBackgroundStyle = styled('div')`
  content: '';
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${props => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  -webkit-filter: blur(12px) brightness(0.5);
  -moz-filter: blur(12px) brightness(0.5);
  -ms-filter: blur(12px) brightness(0.5);
  -o-filter: blur(12px) brightness(0.5);
  filter: blur(12px) brightness(0.5);
`

export const MobileBackgroundStyle = styled('div')`
  content: '';
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${props => props.url});
  background-repeat: no-repeat;
  // background-attachment: fixed;
  background-size: contain;
  background-position: top;
  position: absolute;
  top: 8vh;
  left: 0;
  width: 100%;
  height: 30vh;
`

export const playlistHeadDesktop = css`
  max-width: 45rem;
  color: white;
  margin: 1rem;

  .title {
    line-height: 4rem;
    font-size: 1.8rem;
    font-weight: 300;

    @media screen and (max-width: 960px) {
      margin-bottom: 0.5rem;
      font-size: 17px;
    }
  }

  .description {
    height: 3.65rem;
    line-height: 1.825rem;
    font-size: 1.2rem;
    text-transform: lowercase;
    overflow: hidden;
    margin-bottom: 6rem;

    @media screen and (max-width: 960px) {
      margin-bottom: 3rem;
      font-size: 11px;
    }
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
    padding: 1rem 0.5rem 0.5rem;
    margin: 1rem 0.5rem;
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
    font-weight: 300;

    @media screen and (max-width: 960px) {
      line-height: 3rem;
      margin-bottom: 0.5rem;
      font-size: 17px;
    }
  }

  .description {
    color: white;
    height: 3rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
    text-transform: lowercase;
    overflow: hidden;
    margin-bottom: 3rem;

    @media screen and (max-width: 960px) {
      margin-bottom: 3rem;
      font-size: 11px;
    }
  }
`

export const playlistList = css`
  min-width: 100%;
  margin-bottom: 1.2rem;

  @media screen and (max-width: 960px) {
    margin-bottom: 25px;
  }

  .season_text {
    color: #6f6f6f;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 0 0.75rem;
    margin-bottom: 0.725rem;

    @media screen and (max-width: 960px) {
      font-size: 13px;
      padding: 0 0.75rem;
      margin-bottom: 10px;
    }
  }

  .seasonListWrapper {
    display: flex;
    flex-wrap: wrap;
    // margin: 0px 1%;

    @media screen and (max-width: 960px) {
      display: flex;
      flex-wrap: wrap;
      margin: 0px 5px;
    }
  }
`
export const playlistContainer = css`
  background: #000;
  min-height: 100%;
  width: 100%;
  padding-top: 8vh;
  position: absolute;
  top: 0;
`

export const playlistWrapper = css`
  position: relative;
  max-width: 95vw;
  margin: 0 auto;
  padding-top: 10vh;

  @media screen and (max-width: 960px) {
    max-width: 100vw;
    margin: 0;
    padding-top: 0;
  }
`

export const portraitCardWrapper = css`
  display: inline-block;
  vertical-align: middle;
  width: 9.75vw;
  // width: 16rem;
  margin: 0.5rem;
  // overflow: hidden;

  @media screen and (max-width: 960px) {
    width: 29.75vw;
    margin: 0.35rem;
  }

  /* khusus iPhone SE */
  @media screen and (max-width: 330px) {
    width: 44vw;
    margin: 0.5rem;
  }
`

export const landscapeCardWrapper = css`
  display: inline-block;
  vertical-align: middle;
  width: 15vw;
  // width: 16rem;
  margin: 0.5rem;
  // overflow: hidden;

  @media screen and (max-width: 960px) {
    width: 46.5vw;
    margin: 0.25rem;
  }

  /* khusus iPhone SE */
  @media screen and (max-width: 330px) {
    width: 46vw;
    margin: 0.25rem;
  }
`

// .playlist_head p {
//   line-height: 1.5rem;
//   font-size: 1.2rem;
// }

// .playlist_head h1 {
//   margin-bottom: 20px;
// }
