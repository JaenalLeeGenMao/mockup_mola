import styled, { css } from 'react-emotion'

export const container = css`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 95vw;

  p {
    color: #ffffff;
    font-size: 1.28rem;
    display: block;
    vertical-align: middle;
    font-weight: 400;
  }

  .article-section-text {
    color: rgb(203, 203, 203);
    font-size: 1.28rem;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
    padding: 0px 0.5rem;
  }

  @media screen and (max-width: 960px) {
    margin: 0;
    max-width: 100vw;

    p {
      color: #ffffff;
      font-size: 12px;
    }
  }
`

export const bannerContainer = css`
  position: relative;
  border-radius: .25rem;
}
`

export const bannerSquareContainer = css`
  position: relative;
`

export const carouselHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  div.mola-ori-header {
    transform: translate(0.5rem, 5rem);
    position: relative;
    z-index: 1;
  }

  div.mola-ori-header > h3 {
    color: #ffffff;
  }

  h3 {
    padding: 0 0.5rem;
    color: #cbcbcb;
    font-size: 1.28rem;
    font-weight: 300;
    display: inline-block;
    vertical-align: middle;
    font-weight: 400;
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8rem;
    height: 1.25rem;
    font-weight: 400;
    color: #969696;
    border: 0.112rem solid #969696;
    border-radius: 3rem;
    padding: 0.5rem;
    transition: all ease 500ms;
  }

  a:hover {
    color: #000000;
    background: white;
    border: 0.112rem solid #ffffff;
  }

  @media screen and (max-width: 960px) {
    div.mola-ori-header {
      transform: translate(5%, 100%);
      position: relative;
      z-index: 1;
    }

    h3 {
      color: #cbcbcb;
      font-size: 15px;
      margin: 0 5px;
    }

    a {
      font-size: 12px;
      margin: 0 5px;
      padding: 0.25rem;
      border-width: 1px;
    }
  }
`

export const CarouselWrapper = styled('div')`
  overflow: hidden;
  margin: 0.5rem;
  padding: 1.5rem 0 !important;
  height: ${props => props.height || '29rem'};

  .slider-frame {
    padding: 0 !important;
    overflow: visible !important;
  }
`

export const Icon = css`
  .molaIcon {
    width: 2.4rem;
    height: 2rem;
    display: inline-block;
    background: url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiB3aWR0aD0iOTYuMDAwMDAwcHQiIGhlaWdodD0iOTYuMDAwMDAwcHQiIHZpZXdCb3g9IjAgMCA5Ni4wMDAwMDAgOTYuMDAwMDAwIg0KIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPg0KDQo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCw5Ni4wMDAwMDApIHNjYWxlKDAuMTAwMDAwLC0wLjEwMDAwMCkiDQpmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiPg0KPHBhdGggZD0iTTM0NSA4NjggYy0zMiAtMjUgLTUwIC02NSAtNjAgLTEzMCAtNSAtMzMgLTEyIC00OCAtMjIgLTQ4IC00MSAwDQotMTAxIC0yOCAtMTM5IC02NSAtMzIgLTMxIC00NCAtNTIgLTUzIC05MiAtMTQgLTY4IDEgLTE0MiAzNyAtMTg1IDI4IC0zMyAxMTMNCi03OCAxNDggLTc4IDE4IDAgMjMgLTggMjkgLTQ4IDE0IC05NyA0NyAtMTQwIDExNCAtMTQ5IDM3IC01IDQxIC0zIDUyIDIzIDYNCjE2IDE0IDU1IDE4IDg2IDQgMzIgOSA1OSAxMiA2MSAyIDIgNTEgOSAxMDggMTYgMTU3IDE3IDIyMCA1MSAyNjcgMTQzIDI4IDU1DQozMiAxMzQgOSAxNzggLTMyIDYyIC0xMzEgMTA0IC0yODUgMTIxIC01MiA2IC05NyAxMyAtOTkgMTUgLTMgMiAtOCAzMyAtMTIgNjkNCi01IDM2IC0xMyA3NCAtMTkgODUgLTE1IDI3IC02OSAyNyAtMTA1IC0yeiBtNDk1IC0yOTggYzAgLTUgLTQgLTEwIC0xMCAtMTANCi01IDAgLTEwIDUgLTEwIDEwIDAgNiA1IDEwIDEwIDEwIDYgMCAxMCAtNCAxMCAtMTB6Ii8+DQo8L2c+DQo8L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }
`
export const CustomContainer = css`
  margin-bottom: 20px;
`
