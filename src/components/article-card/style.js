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
  opacity: 1;
  transition: all ease 500ms;
  overflow: hidden;
  text-overflow: clip;
  width: 90%;

  .playIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojYmUyMGIxO3N0cm9rZTpyZ2JhKDI1NSwyNTUsMjU1LDAuNCk7fS5ie2ZpbGw6I2ZmZjt9LmN7c3Ryb2tlOm5vbmU7fS5ke2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1IC0xMDk2KSI+PGcgY2xhc3M9ImEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDEwOTYpIj48Y2lyY2xlIGNsYXNzPSJjIiBjeD0iOSIgY3k9IjkiIHI9IjkiLz48Y2lyY2xlIGNsYXNzPSJkIiBjeD0iOSIgY3k9IjkiIHI9IjguNSIvPjwvZz48cGF0aCBjbGFzcz0iYiIgZD0iTS02MC43ODksMzIuNGwtNS40NzMtMy4yYS43NjUuNzY1LDAsMCwwLTEuMTM0Ljd2Ni4zOTNhLjc2NC43NjQsMCwwLDAsMS4xMzQuN2w1LjQ3My0zLjJBLjgyMy44MjMsMCwwLDAtNjAuNzg5LDMyLjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OC4zOTYgMTA3MS45MDMpIi8+PC9nPjwvc3ZnPg==);
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
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojODZhMjI4O3N0cm9rZTpyZ2JhKDI1NSwyNTUsMjU1LDAuNCk7fS5ie2ZpbGw6I2ZmZjt9LmN7c3Ryb2tlOm5vbmU7fS5ke2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1IC0xMDk2KSI+PGcgY2xhc3M9ImEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDEwOTYpIj48Y2lyY2xlIGNsYXNzPSJjIiBjeD0iOSIgY3k9IjkiIHI9IjkiLz48Y2lyY2xlIGNsYXNzPSJkIiBjeD0iOSIgY3k9IjkiIHI9IjguNSIvPjwvZz48cGF0aCBjbGFzcz0iYiIgZD0iTTI2LjkxNywyNi44MzNWMjZIMjEuMDgzdi44MzNIMTlWMjguNWEyLjkxNiwyLjkxNiwwLDAsMCwyLjEsMi44LDIuOTE2LDIuOTE2LDAsMCwwLDIuMzkzLDIuNTcxbC0uMzI0LDEuM2gtLjgzNGEuNDE3LjQxNywwLDAsMCwwLC44MzNoMy4zMzRhLjQxNy40MTcsMCwwLDAsMC0uODMzaC0uODM0bC0uMzI0LTEuM0EyLjkxNiwyLjkxNiwwLDAsMCwyNi45LDMxLjMsMi45MTYsMi45MTYsMCwwLDAsMjksMjguNVYyNi44MzNaTTE5LjgzMywyOC41di0uODMzaDEuMjV2Mi43NDJBMi4wODYsMi4wODYsMCwwLDEsMTkuODMzLDI4LjVaTTI0LDMzLjA4M0EyLjA4NSwyLjA4NSwwLDAsMSwyMS45MTcsMzFWMjYuODMzaDQuMTY2VjMxQTIuMDg1LDIuMDg1LDAsMCwxLDI0LDMzLjA4M1pNMjguMTY3LDI4LjVhMi4wODYsMi4wODYsMCwwLDEtMS4yNSwxLjkwOVYyNy42NjdoMS4yNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgMTA3NCkiLz48L2c+PC9zdmc+);
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
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojMmM1NmZmO3N0cm9rZTpyZ2JhKDI1NSwyNTUsMjU1LDAuNCk7fS5ie2ZpbGw6I2ZmZjt9LmN7c3Ryb2tlOm5vbmU7fS5ke2ZpbGw6bm9uZTt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMxOCAtODExKSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYgNzEpIj48ZyBjbGFzcz0iYSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAyIDc0MCkiPjxjaXJjbGUgY2xhc3M9ImMiIGN4PSI5IiBjeT0iOSIgcj0iOSIvPjxjaXJjbGUgY2xhc3M9ImQiIGN4PSI5IiBjeT0iOSIgcj0iOC41Ii8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDMgNzg2KSI+PHBhdGggY2xhc3M9ImIiIGQ9Ik0yNS4zMzMsMjlIMjAuNjY3YS42NjkuNjY5LDAsMCwwLS42NjcuNjY3djguNjY2YS42NjkuNjY5LDAsMCwwLC42NjcuNjY3aDYuNjY2QS42NjkuNjY5LDAsMCwwLDI4LDM4LjMzM1YzMS42NjdabTIsOS4zMzNIMjAuNjY3VjI5LjY2N0gyNXYxLjY2NmEuNjY5LjY2OSwwLDAsMCwuNjY3LjY2N2gxLjY2NloiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTIyLjMzMywzMy4zMzNhLjMzNC4zMzQsMCwwLDAsMCwuNjY3aDMuMzM0YS4zMzQuMzM0LDAsMCwwLDAtLjY2N1oiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTI1LjY2NywzNUgyMi4zMzNhLjMzNC4zMzQsMCwwLDAsMCwuNjY3aDMuMzM0YS4zMzQuMzM0LDAsMCwwLDAtLjY2N1oiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTI1LjY2NywzNi42NjdIMjIuMzMzYS4zMzMuMzMzLDAsMCwwLDAsLjY2NmgzLjMzNGEuMzMzLjMzMywwLDAsMCwwLS42NjZaIi8+PC9nPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }
`
