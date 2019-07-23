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
    z-index: 1;
  }

  .imageWrapper {
    position: relative;
  }

  .bannerImage.hide {
    position: absolute;
    z-index: 0;
  }

  .bannerImage3d {
    position: relative;
    z-index: 1;
    width: 45vw;
  }

  .bannerImage3d.hide {
    position: absolute;
    z-index: 0;
  }
}
`

export const icons = css`
  position: absolute;
  z-index: 2;
  bottom: 0.75rem;
  left: 0.75rem;

  .playIcon {
    width: 3.2rem;
    height: 2rem;
    display: inline-block;
    // background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDMwIDI2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZmO308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg3IC04MjkpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTAsMFY3TDYsMy40ODNaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDAgODM2KSIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI4NyA3OTMpIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDM2KSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNi40ODQsMzZIMy41MTZBMy41MzUsMy41MzUsMCwwLDAsMCwzOS41NDVWNTMuNzI3YTMuNTM1LDMuNTM1LDAsMCwwLDMuNTE2LDMuNTQ1SDEzLjgyOHYyLjM2NEg3LjczNFY2MkgyMi4yNjZWNTkuNjM2SDE2LjE3MlY1Ny4yNzNIMjYuNDg0QTMuNTM1LDMuNTM1LDAsMCwwLDMwLDUzLjcyN1YzOS41NDVBMy41MzUsMy41MzUsMCwwLDAsMjYuNDg0LDM2Wm0xLjE3MiwxNy43MjdhMS4xNzgsMS4xNzgsMCwwLDEtMS4xNzIsMS4xODJIMy41MTZhMS4xNzgsMS4xNzgsMCwwLDEtMS4xNzItMS4xODJWMzkuNTQ1YTEuMTc4LDEuMTc4LDAsMCwxLDEuMTcyLTEuMTgySDI2LjQ4NGExLjE3OCwxLjE3OCwwLDAsMSwxLjE3MiwxLjE4MloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTM2KSIvPjwvZz48L2c+PC9nPjwvc3ZnPg==);
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NyIgaGVpZ2h0PSI1NyIgdmlld0JveD0iMCAwIDU3IDU3Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS13aWR0aDoycHg7fS5ie2ZpbGw6I2ZmZjt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMSAxKSI+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNy41LDBBMjcuNSwyNy41LDAsMSwwLDU1LDI3LjUsMjcuNSwyNy41LDAsMCwwLDI3LjUsMFoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDApIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik02MS42MjIsNDguMDIsNDkuNDc0LDU2Ljc1NGEuOC44LDAsMCwxLTEuMjM3LS43NDZWMzguNTM5YS44LjgsMCwwLDEsMS4yMzctLjc0NmwxMi4xNDcsOC43MzVBLjk0NC45NDQsMCwwLDEsNjEuNjIyLDQ4LjAyWiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI2LjIzNyAtMTkuNzc0KSIvPjwvZz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
  }
`
