import { css } from 'react-emotion'

export const desktopBackgroundStyle = url => css`
min-height: 100%;
&::before {
  content: '';
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-image: url(${url});
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
}
`
export const mobileBackgroundStyle = url => css`
content: '';
  background-repeat: no-repeat;
  // background-attachment: fixed;
  background-position: top;
  background-image: url(${url});
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
`

export const playlistHeadDesktop = css`
  max-width: 45rem;
  color: white;
  margin-bottom: 50px;
  .title {
    line-height: 1.5rem;
    font-size: 1.2rem;
  }
  .description {
    line-height: 1.5rem;
    font-size: 1.2rem;
  }
`

export const playlistHeadMobile = css`
  max-width: 45rem;
  color: white;
  margin-bottom: 50px;

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
    color: #d1d1d1;
  }
  .description {
    color: white;
  }
`

export const playlistList = css`
  margin-bottom: 1.5rem;
  min-width: 100%;
  .season_text {
    color: #6f6f6f;
    font-size: 1.3rem;
    padding: 0 2rem;
    margin-bottom: 5px;
  }
`
export const playlistContainer = css`
  width: 100%;
  padding-top: 100px;
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
