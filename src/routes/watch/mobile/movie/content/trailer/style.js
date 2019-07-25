import { css } from 'react-emotion'

export const trailerContainer = css`
  position: relative;
  height: 12rem;
  background: transparent;
  border-radius: 0.25rem;
  width: calc(100% - 40px);
  margin: 0 20px;
  overflow: hidden;
}
`

export const trailerWrapper = css`
  bottom: 0;
  width: 100%;
  height: calc(100% + 20px);
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const trailerPlayer = css`
  display: inline-block;
  width: 200px;
  min-width: 200px;
  height: 100%;
  padding: 0 0.8rem;
}
`

export const trailerPlayerDetail = css`
  display: inline-block;
  margin-right: 14px;
  width: 200px;
`

export const imageWrapper = css`
  flex: none;
  left: unset;
  display: block;

  img {
    display: block;
    position: absolute;
    width: 100%;
    flex: none !important;
  }
`

export const titleWrapper = css`
  height: 11rem;
`

export const titleTrailer = css`
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
  bottom: 0;
  font-size: 12px;
  font-weight: bold;
  margin: 5px 0;

  max-height: 54px;
  white-space: initial;
  display: -webkit-box;

  /* autoprefixer: off */
  -webkit-box-orient: vertical;

  /* autoprefixer: on */
  -webkit-line-clamp: 2;
`

export const trailerTitle = css`
  padding: 0px 15px;
  font-size: 14px;
  font-weight: light;
  line-height: 1.35;
  top: 0.5rem;
  color: #969696;
  padding-bottom: 13px;
`

export const trailerIcon = css`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDEwIDEzIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojOTY5Njk2O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUuNSkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTM0LjI1LDBWMS40NDRIMzNWMEgyOFYxLjQ0NEgyNi43NVYwSDI1LjVWMTNoMS4yNVYxMS41NTZIMjhWMTNoNVYxMS41NTZoMS4yNVYxM0gzNS41VjBaTTI4LDEwLjExMUgyNi43NVY4LjY2N0gyOFptMC0yLjg4OUgyNi43NVY1Ljc3OEgyOFptMC0yLjg4OUgyNi43NVYyLjg4OUgyOFptNi4yNSw1Ljc3OEgzM1Y4LjY2N2gxLjI1Wm0wLTIuODg5SDMzVjUuNzc4aDEuMjVabTAtMi44ODlIMzNWMi44ODloMS4yNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNS41KSIvPjwvZz48L2c+PC9zdmc+);
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 5px;
`
