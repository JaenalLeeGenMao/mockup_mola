import { css } from 'react-emotion'

export const articleContainer = css`
  position: relative;
  display: inline-block;
  border-radius: .25rem;
  transition: all ease 500ms;
  height: 12vh;
  margin: 1rem auto;

  @media screen and (max-width: 960px) {
    height: 14.5vh;
  }

  :hover {
    pointer-events: auto;
    cursor: pointer;
    transform: scale(1.025);
  }

  h3 {
    color: #DDDDDD !important;
    font-size: 1rem !important;
    font-weight: 300 !important;
    display: inline-block !important;
    vertical-align: middle !important;
  }

  p {
    position: relative;
    line-height: 1.25rem !important;
    height: 2.5rem !important;
    font-size: 1rem !important;
    padding: .2rem 0 !important;
    max-width: 100%;
    text-overflow: clip;
    overflow: hidden;
    padding: 0 0.5rem;
    color: white;
    // opacity: 0;
    opacity: 1;
    transition: all ease 500ms;

    @media screen and (max-width: 960px) {
      opacity: 1;
      max-width: 7.5rem;
      font-size: 11px;
      max-height: 24px;
      text-overflow: clip;
    }
  }

  // :hover * {
  //   opacity: 1;
  // }


  img {
    max-height: 100%;
  }

  .bannerImage {
    position: relative;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }

  .imageWrapper {
    position: relative;
    max-height: 100%;
    overflow: hidden;
  }

  .bannerImage.hide {
    position: absolute;
    z-index: 0;
  }

  .bannerImage3d {

    position: relative;
    object-fit: cover;
    object-position: center;
    z-index: 1;
    width: 40vw;

    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }

  .bannerImage3d.hide {
    position: absolute;
    max-height: 100%;
    z-index: 0;
  }
}
`

export const articleGradient = css`
  display: block;
  position: absolute;
  bottom: 0;
  height: 12vh;
  width: 100%;
  z-index: 1;
  background: linear-gradient(to top, rgba(0, 0, 0, 1.5) -20%, rgba(0, 0, 0, 0));
  transform: scale(1.015);

  @media screen and (max-width: 960px) {
    height: 14.5vh;
  }
`

export const icons = css`
  position: absolute;
  z-index: 2;
  bottom: 0.75rem;
  left: 0.75rem;
  padding: 0.1rem;
  opacity: 1;
  transition: all ease 500ms;
  overflow: hidden;
  text-overflow: clip;
  width: 90%;

  .playIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRpdGxlPkFydGJvYXJkIDEwIGNvcHkgNTwvdGl0bGU+PGNpcmNsZSBjeD0iOCIgY3k9IjgiIHI9IjciIGZpbGw9IiNiZTIwYjEiLz48cGF0aCBkPSJNMTEuNTQsNy42bC01LTNhLjQ3LjQ3LDAsMCwwLS43Mi40VjExYS40Ny40NywwLDAsMCwuNzIuNGw1LTNBLjQ2LjQ2LDAsMCwwLDExLjU0LDcuNloiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }

  .tvIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZDMxYTFhO30uYntmaWxsOiNmZmY7fS5jLC5ke3N0cm9rZTpub25lO30uZHtmaWxsOnJnYmEoMjU1LDI1NSwyNTUsMC40KTt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMDEgLTkxNCkiPjxnIGNsYXNzPSJhIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAxIDkxNCkiPjxwYXRoIGNsYXNzPSJjIiBkPSJNOSwwYTksOSwwLDEsMCw5LDlBOSw5LDAsMCwwLDksMFoiLz48cGF0aCBjbGFzcz0iZCIgZD0iTSA5IDEgQyA0LjU4ODc4OTkzOTg4MDM3MSAxIDEgNC41ODg3ODk5Mzk4ODAzNzEgMSA5IEMgMSAxMy40MTEyMTAwNjAxMTk2MyA0LjU4ODc4OTkzOTg4MDM3MSAxNyA5IDE3IEMgMTMuNDExMjEwMDYwMTE5NjMgMTcgMTcgMTMuNDExMjEwMDYwMTE5NjMgMTcgOSBDIDE3IDQuNTg4Nzg5OTM5ODgwMzcxIDEzLjQxMTIxMDA2MDExOTYzIDEgOSAxIE0gOSAwIEMgMTMuOTcwNTI5NTU2Mjc0NDEgMCAxOCA0LjAyOTQ3MDQ0MzcyNTU4NiAxOCA5IEMgMTggMTMuOTcwNTI5NTU2Mjc0NDEgMTMuOTcwNTI5NTU2Mjc0NDEgMTggOSAxOCBDIDQuMDI5NDcwNDQzNzI1NTg2IDE4IDAgMTMuOTcwNTI5NTU2Mjc0NDEgMCA5IEMgMCA0LjAyOTQ3MDQ0MzcyNTU4NiA0LjAyOTQ3MDQ0MzcyNTU4NiAwIDkgMCBaIi8+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDk4NiA4OTIpIj48cGF0aCBjbGFzcz0iYiIgZD0iTTI4LjE2NywyNkgxOS44MzNhLjgzMy44MzMsMCwwLDAtLjgzMy44MzN2Ny4zMzRhLjgzMy44MzMsMCwwLDAsLjgzMy44MzNIMjFsLTEsMWg4bC0xLTFoMS4xNjVBLjgzMy44MzMsMCwwLDAsMjksMzQuMTY3VjI2LjgzM0EuODMzLjgzMywwLDAsMCwyOC4xNjcsMjZaTTI4LDMyLjIxOWExLDEsMCwwLDEtLjc1Ny45NywxMy4zNTQsMTMuMzU0LDAsMCwxLTYuNDg2LDAsMSwxLDAsMCwxLS43NTctLjk3VjI4Ljc4MWExLDEsMCwwLDEsLjc1Ny0uOTcsMTMuMzU0LDEzLjM1NCwwLDAsMSw2LjQ4NiwwLDEsMSwwLDAsMSwuNzU3Ljk3WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNMjUuNTg5LDMwLjE5NWwtMi4wNzEtMS4xNTFhLjM0OS4zNDksMCwwLDAtLjUxOC4zMDV2Mi4zYS4zNDkuMzQ5LDAsMCwwLC41MTguMzA1bDIuMDcxLTEuMTUxQS4zNDguMzQ4LDAsMCwwLDI1LjU4OSwzMC4xOTVaIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }

  .matchIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRpdGxlPkFydGJvYXJkIDg8L3RpdGxlPjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI3IiBmaWxsPSIjODZhMjI4Ii8+PHBhdGggZD0iTTEzLDguMzdsLTEtNWEuNDguNDgsMCwwLDAtLjI0LS4zMy40OS40OSwwLDAsMC0uNDEsMGwtMiwuNjdhMiwyLDAsMCwxLTEuNDgtLjFsLS4xOS0uMWEzLDMsMCwwLDAtMi4yNS0uMTVMMy4zNCw0QS40OS40OSwwLDAsMCwzLDQuNjNsMi40MSw4YS41MS41MSwwLDAsMCwuNDkuMzZsLjEzLDBhLjUxLjUxLDAsMCwwLC4zNS0uNjJMNS42Niw5LjkyaC4wNmwuOTEtLjQ2YTIsMiwwLDAsMSwxLjc0LDAsMi45MywyLjkzLDAsMCwwLDIuMjUuMTZsMi0uNjhBLjQ4LjQ4LDAsMCwwLDEzLDguMzdabS0yLjY5LjI4YTIsMiwwLDAsMS0xLjQyLS4wOEw4LjI0LDYuNTJsLS40OCwwYTUuNTQsNS41NCwwLDAsMC0yLjMuNWwtLjU5LjI3TDQuMTIsNC43Niw1LjcsNC4yM2EyLDIsMCwwLDEsMS40OC4xMWwuMTkuMDlhMi4xNCwyLjE0LDAsMCwwLC4zOS4xNmwuNDgsMS45My40OSwwYTUuNzksNS43OSwwLDAsMCwyLjEtLjMxTDExLjUsNmwuNDIsMi4xMloiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }

  .articleIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRpdGxlPkFydGJvYXJkIDk8L3RpdGxlPjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI3IiBmaWxsPSIjMmM1NmZmIi8+PHBhdGggZD0iTTExLjY4LDMuNUE1LjE5LDUuMTksMCwwLDAsOC40NCw0LjY1TDgsNWwtLjQ0LS4zNUE1LjE5LDUuMTksMCwwLDAsNC4zMiwzLjUsNS4zMSw1LjMxLDAsMCwwLDMsMy42N3Y3LjUxYTQuNyw0LjcsMCwwLDEsLjYzLS4xM2wuMjEsMCwuNDIsMGE0LjYxLDQuNjEsMCwwLDEsLjUyLDBoLjA5YTMuNjQsMy42NCwwLDAsMSwuNDQuMDdsLjE1LDBhMywzLDAsMCwxLC40My4xMmwuMSwwYTMuMzcsMy4zNywwLDAsMSwuNDkuMmwuMTIuMDYuMzguMi4xMy4wOGMuMTUuMS4zMS4yMS40NS4zMkw4LDEyLjVsLjQ0LS4zNUE1LjE5LDUuMTksMCwwLDEsMTEuNjgsMTFhNC44OSw0Ljg5LDAsMCwxLDEuMzIuMThWMy42N0E1LjM3LDUuMzcsMCwwLDAsMTEuNjgsMy41Wm0uNDksNi42NC0uNDksMEE2LDYsMCwwLDAsOCwxMS40SDhWNi4xbC41LS40LjQ0LS4zNWE0LjQ1LDQuNDUsMCwwLDEsMi43NC0xLDMuOTEsMy45MSwwLDAsMSwuNDksMFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }
`
