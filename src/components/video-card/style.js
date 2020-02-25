import { css } from 'react-emotion'

export const videoContainer = css`
  position: relative;
  display: inline-block;
  border-radius: .25rem;
  transition: all ease 500ms;
  width: 100%;
  overflow: hidden;

  :hover {
    pointer-events: auto;
    cursor: pointer;
    transform: scale(1.05);
  }

  p {
    position: relative;
    font-size: 1.2rem !important;
    max-width: 100%;
    line-height: 1.525rem !important;
    height: 2.9rem;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    padding: 0 0.15rem;
    color: white;
    font-weight: 600;
    // opacity: 0;
    transition: all ease 500ms;

    @media screen and (max-width: 960px) {
      opacity: 1;
      max-width: 100%;
      // margin: 0 .5rem;
      font-size: 1rem !important;
      line-height: 14px !important;
      height: 28px !important;
      overflow: hidden;
      display: -webkit-box !important;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  :hover p {
    opacity: 1;
  }

  .imageWrapper {
    position: relative;
    display: inline-block;
    text-align: left;
    width: 100.5%;
    overflow: hidden;
  }

  .bannerImage {
    display: inline-block;
    border-radius: .25rem;
    position: relative;
    z-index: 1;
  }

  .bannerImage.hide,
  .bannerPlaceholder {
    position: absolute;
    z-index: 0;
  }

  .bannerImage3d {
    display: inline-block;
    border-radius: .25rem;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .bannerImage3d.hide {
    position: absolute;
    z-index: 0;
  }

  .title {
    margin-bottom: 5px;
  }

  .time {
    color: #fff;
    font-weight: normal;
    height: 1.65rem !important;
    font-size: 1.1rem !important;
    @media screen and (max-width: 960px) {
      height: 1.22rem !important;
      font-size: smaller !important;
    }
  }

  .league {
    color: #b1b1b1;
    height: 1.65rem !important;
    @media screen and (max-width: 960px) {
      height: 1.22rem !important;
      font-size: smaller !important;
    }
  }

  .free {
    color: #609dff;
    height: 1.65rem !important;
    font-size: 1.1rem !important;
    @media screen and (max-width: 960px) {
      height: 1.22rem !important;
      font-size: smaller !important;
    }
    @media (min-width: 350px) and (max-width: 600px) {
      font-size: 10px !important;
    }
  }

  .platform {
    color: #f8ac00;
    height: 1.65rem !important;
    font-size: 1.1rem !important;
    @media screen and (max-width: 960px) {
      height: 1.22rem !important;
      font-size: smaller !important;
    }
    @media (min-width: 350px) and (max-width: 600px) {
      font-size: 10px !important;
    }
  }

  .premiumIcon {
    height: 1.1rem;
    width: 1.5rem;
    margin-left: 4px;
    margin-bottom: 4px;
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAoCAYAAACrUDmFAAAACXBIWXMAACxKAAAsSgF3enRNAAACWUlEQVRoge1ZwU0DMRDcICQ/4e1P0gGhAqACkNxA6IAOSAdcB4QCLEEFQAUkFZD7+J08/QqyNEQhsc/rcD5dopun7bNnvOvdta+3Wq3omHFy1Oo6gUeA0yYkWC2HRFQQ0RWaZkQ0EspMc6/dlAVfN8Q5XKAtO7ILtFpeE1Hf09VHX1Z0UbQGuHO29EyzRF9WZBcolFkQ0YOn6wF9hy0QOGe21Y7spZrVcgBXPNvqci46FMrMc67fhAULjzhCW5F78awWRBp4jwy7Ecp85OLgFWi1dOdjhLPzuk/FgTmmgRy4iRKumhxwUCHdEdECPHfcfcdF8ZEb+EREj0T0ZbWcpC6OyBkTRxjji7KVAKcvcHRcp+D+BzsWtFrOA8TYroTA8p3I+ZLrKRWuXwplBpsNviAT2vWUsmofi6cEnBCXPo7GGilRlJW3rJajrcKaiyt8WxsXCrioq/JvA+M/cc3x5i7s3jyQFjhwuXEQCjhw/UnFBr4JZe42G3wWdLv4EpjATfxttSy2XQEI5TwuvLnRreXWxLkOiXsB9z+ozIMRa7rdHgtlCuLnPC7WAc1q6SLsuGLjdqyWItDtyHOEVImdK3CRrQMzpI4JI9XcC2WCQS32ZMFJC/0aLfeLi4Q5KzlWRlEEk1kquwYxixXrnDSRrU6sAVFuHIGNPA7tiSg31m3Carn4Z/jPgaVQJprwuZVMG92UxakTCLTxHLI4sQQiFJf/51QbSu5bTsptok1WZHNJEdimc8jmkvToZLVsxe9goUyPOzb12fAtnU7tSOLQ/aM/dHQCDxpE9AO3ktWHATVM2QAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;
    @media (min-width: 350px) and (max-width: 600px) {
      width: 14px;
      height: 10px;
    }
  }
}
`

export const icons = css`
  position: absolute;
  z-index: 2;
  bottom: 7.5%;
  left: 0.75rem;
  padding: 0.1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  // opacity: 0;
  // transition: all ease 500ms;

  .playIcon {
    width: 3.2rem;
    height: 2.5rem;
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
    width: 3.2rem;
    height: 2.5rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRpdGxlPkFydGJvYXJkIDc8L3RpdGxlPjxjaXJjbGUgY3g9IjgiIGN5PSI4IiByPSI3IiBmaWxsPSIjZDMxYTFhIi8+PHBhdGggZD0iTTEyLjI5LDQuNzNWOS44MkgzLjcxVjQuNzNoOC41OE0xMyw0SDN2Ni41NUg3LjY0di43Mkg1Ljg2YS4zNy4zNywwLDAsMC0uMzYuMzcuMzYuMzYsMCwwLDAsLjM2LjM2aDQuMjhhLjM2LjM2LDAsMCwwLC4zNi0uMzYuMzcuMzcsMCwwLDAtLjM2LS4zN0g4LjM2di0uNzJIMTNWNFoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }

  .matchIcon {
    width: 3.2rem;
    height: 2.5rem;
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

  .liveIcon {
    width: 3.2rem;
    height: 2.5rem;
    display: inline-block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PHRpdGxlPkFydGJvYXJkIDEwPC90aXRsZT48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iNyIgZmlsbD0iI2QzMWExYSIvPjxwYXRoIGQ9Ik0xMi40OSw4Ljg4bC0uNjEtM2ExLjcsMS43LDAsMCwxLS41MS4wNywxLjg2LDEuODYsMCwwLDEtMS44LTEuMzVsLS40LjEzYTEuOCwxLjgsMCwwLDEtMS4zMy0uMWwtLjE3LS4wOGEyLjY5LDIuNjksMCwwLDAtMi0uMTRMMy44MSw1YS40My40MywwLDAsMC0uMjkuNTRsMi4xNyw3LjEyYS40NS40NSwwLDAsMCwuNDMuMzJsLjEzLDBhLjQ1LjQ1LDAsMCwwLC4zMS0uNTVMNS45LDEwLjI3bDAsMCwuODItLjQxYTEuODUsMS44NSwwLDAsMSwxLjU2LDAsMi43LDIuNywwLDAsMCwyLC4xNWwxLjgzLS42QS40NC40NCwwLDAsMCwxMi40OSw4Ljg4Wm0tMi40Mi4yNWExLjc3LDEuNzcsMCwwLDEtMS4yOC0uMDdMOC4yMiw3LjI0bC0uNDMsMGE0Ljg4LDQuODgsMCwwLDAtMi4wNy40NWwtLjU0LjIzTDQuNTEsNS42Nyw1LjkzLDUuMmExLjgxLDEuODEsMCwwLDEsMS4zMy4xbC4xNy4wOGExLjc4LDEuNzgsMCwwLDAsLjM2LjE0bC40MywxLjcyLjQ0LDBBNS41Niw1LjU2LDAsMCwwLDEwLjU1LDdsLjYtLjIxLjM4LDEuODhaIiBmaWxsPSIjZmZmIi8+PGVsbGlwc2UgY3g9IjExLjM3IiBjeT0iNC4xMSIgcng9IjEuMTIiIHJ5PSIxLjExIiBmaWxsPSIjZmZmIi8+PC9zdmc+);
    background-repeat: no-repeat;
    background-size: contain;
    vertical-align: middle;

    @media screen and (max-width: 960px) {
      width: 18px;
      height: 18px;
    }
  }

  .articleIcon {
    width: 3.2rem;
    height: 2.5rem;
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
