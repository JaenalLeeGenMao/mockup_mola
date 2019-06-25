import { css } from 'react-emotion'

export const videoSuggestionContainer = css`
  position: absolute;
  height: 12rem;
  background: transparent;
  border-radius: 0.25rem;
  width: calc(100% - 30px);
  left: 15px;
  margin-bottom: 55px;
}
`

export const videoSuggestionWrapper = css`
  // position: absolute;
  bottom: 0;
  width: 95%;
  height: 100%;
  color: #fff;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
`

export const videoSuggestionPlayer = css`
  display: inline-block;
  width: 200px;
  min-width: 200px;
  height: 100%;
  padding: 0 0.8rem;
}
`

export const videoSuggestionPlayerDetail = css`
  position: relative;
  width: 100%;
  height: 100%;

  div {
    position: absolute;
    width: 100%;
    // height: 100%;
  }
`
export const titleWrapper = css`
  height: 11rem;
`

export const titleSuggestions = css`
  font-weight: 500;
  font-size: 14px;
  margin: 0 0 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #f5f5f5;
  line-height: 1.7;
  bottom: 0;
`

export const videoSuggestionTitle = css`
  padding: 0px 15px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.35;
  top: 0.5rem;
  color: #969696;
  padding-bottom: 13px;
`

export const videoSuggestionIcon = css`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDEwIDEzIj48ZGVmcz48c3R5bGU+LmF7ZmlsbDojOTY5Njk2O308L3N0eWxlPjwvZGVmcz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjUuNSkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1LjUpIj48cGF0aCBjbGFzcz0iYSIgZD0iTTM0LjI1LDBWMS40NDRIMzNWMEgyOFYxLjQ0NEgyNi43NVYwSDI1LjVWMTNoMS4yNVYxMS41NTZIMjhWMTNoNVYxMS41NTZoMS4yNVYxM0gzNS41VjBaTTI4LDEwLjExMUgyNi43NVY4LjY2N0gyOFptMC0yLjg4OUgyNi43NVY1Ljc3OEgyOFptMC0yLjg4OUgyNi43NVYyLjg4OUgyOFptNi4yNSw1Ljc3OEgzM1Y4LjY2N2gxLjI1Wm0wLTIuODg5SDMzVjUuNzc4aDEuMjVabTAtMi44ODlIMzNWMi44ODloMS4yNVoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNS41KSIvPjwvZz48L2c+PC9zdmc+);
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 5px;
`