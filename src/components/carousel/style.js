import { css } from 'react-emotion'

export const carouselContainer = css`
  position: relative;
  display: inline-block;
  max-width: 100vw !important;

  div.slider-control-centerleft,
  div.slider-control-centerright {
    height: 100% !important;
    display: flex;
    justify-content: center;
  }

  div.slider-frame {
    padding: 1rem 0 !important;
  }
}
`

export const arrowButtons = css`
  display: block;
  border: 0;
  background: rgba(0,0,0,0.4);
  color: white;
  padding: 0 2.5rem;
  opacity: 1;
  height: 100% !important;
  width: 2vw;
  opacity: 1;
  position: relative;
  cursor: pointer;

  :hover {
    cursor: pointer;
    background: rgba(0,0,0,0.8);
  }

  @media screen and (max-width: 960px) {
    display: none;
    padding: .5rem;
  }
}
`

export const hiddenButtons = css`
  border: 0;
  background: rgba(0,0,0,0.4);
  color: white;
  padding: 1rem;
  opacity: 1;
  height: 100% !important;
  width: 35vw;
  max-width: 370px;
  opacity: 0;
  position: relative;
  cursor: pointer;
}
`

export const destroyButtons = css`
  display: none;
  position: relative;
  cursor: pointer;
}
`

export const chevronLeft = css`
    width: 2.4rem;
    height: 2.4rem;
    display: block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNi45NCAyNy4wNiI+PHRpdGxlPmFycm93PC90aXRsZT48cGF0aCBkPSJNMjAuNDIsMjYuNzJhMSwxLDAsMCwwLDAtMS4zNUw4LjUyLDEzLjUxLDIwLjQyLDEuNjNBMSwxLDAsMSwwLDE5LjA3LjI4TDYuNTIsMTIuODJhLjg5Ljg5LDAsMCwwLS4yOC42Ny45NC45NCwwLDAsMCwuMjguNjdMMTkuMDcsMjYuN0EuOTMuOTMsMCwwLDAsMjAuNDIsMjYuNzJaIiBmaWxsPSIjZmZmIi8+PC9zdmc+);
    background-repeat: no-repeat;
    background-position: center;
}
`

export const chevronRight = css`
    width: 2.4rem;
    height: 2.4rem;
    display: block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHRpdGxlPmljX3doaXRlLWFycm93PC90aXRsZT48cGF0aCBkPSJNNy43OSwxLjI5YTEsMSwwLDAsMCwwLDEuNEwyMC4xMywxNSw3Ljc5LDI3LjMxYTEsMSwwLDAsMCwxLjQsMS40bDEzLTEzYTEsMSwwLDAsMCwuMjktLjcsMSwxLDAsMCwwLS4yOS0uN2wtMTMtMTNBMSwxLDAsMCwwLDcuNzksMS4yOVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: center;
}
`
