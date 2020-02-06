import { css } from 'react-emotion'

export const carouselContainer = css`
  position: relative;
  display: inline-block;
  max-width: 100vw !important;

  & .slider-control-centerleft,
  & .slider-control-centerright {
    height: 100% !important;
    display: flex;
    justify-content: center;
  }

  & .slider-frame {
    padding: 1.5rem 0.5rem !important;
  }

  // li.slide-visible {
  //   padding: 80px !important;
  // }

  li.slide-current {
    // margin: auto 1.15% !important;
    padding: 0px !important;
  }


  button {
    transition: all ease 500ms;
  }

  :hover button {
    // display: block;
    opacity: 1; /* nanti di hilangin, tergantung kebutuhan */
  }

  @media screen and (max-width: 960px) {
    button,
    :hover button.default {
      display: none;
    }
  }
}
`

export const arrowButtons = css`
  display: block;
  border: 0;
  background: rgba(0,0,0,0.4);
  color: white;
  opacity: 1;
  height: 95% !important;
  width: 3vw;
  position: relative;
  cursor: pointer;
  opacity: 0; /* nanti di hilangin, tergantung kebutuhan */
  // display: none; /* nanti di hilangin, tergantung kebutuhan */

  :hover {
    cursor: pointer;
    background: rgba(0,0,0,0.8);
  }

  @media screen and (max-width: 960px) {
    // display: none;
    padding: .5rem;
  }
}
`

export const hiddenButtons = css`
  border: 0;
  background: rgba(0,0,0,0);
  color: white;
  padding: 1rem;
  opacity: 1;
  height: 95% !important;
  width: 30vw;
  // max-width: 370px;
  opacity: 0;
  position: relative;
  cursor: pointer;
}
`

export const destroyButtons = css`
  // display: none !important;
  border: 0;
  background: rgba(0,0,0,0);
  color: white;
  padding: 1rem;
  opacity: 1;
  height: 95% !important;
  width: 3vw;
  // max-width: 370px;
  opacity: 0 !important; /* nanti di hilangin, tergantung kebutuhan */
  position: relative;
  cursor: pointer;
}
`

export const chevronLeft = css`
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;
    display: block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNi45NCAyNy4wNiI+PHRpdGxlPmFycm93PC90aXRsZT48cGF0aCBkPSJNMjAuNDIsMjYuNzJhMSwxLDAsMCwwLDAtMS4zNUw4LjUyLDEzLjUxLDIwLjQyLDEuNjNBMSwxLDAsMSwwLDE5LjA3LjI4TDYuNTIsMTIuODJhLjg5Ljg5LDAsMCwwLS4yOC42Ny45NC45NCwwLDAsMCwuMjguNjdMMTkuMDcsMjYuN0EuOTMuOTMsMCwwLDAsMjAuNDIsMjYuNzJaIiBmaWxsPSIjZmZmIi8+PC9zdmc+);
    background-repeat: no-repeat;
    background-position: center;
}
`

export const chevronRight = css`
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 auto;
    display: block;
    background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHRpdGxlPmljX3doaXRlLWFycm93PC90aXRsZT48cGF0aCBkPSJNNy43OSwxLjI5YTEsMSwwLDAsMCwwLDEuNEwyMC4xMywxNSw3Ljc5LDI3LjMxYTEsMSwwLDAsMCwxLjQsMS40bDEzLTEzYTEsMSwwLDAsMCwuMjktLjcsMSwxLDAsMCwwLS4yOS0uN2wtMTMtMTNBMSwxLDAsMCwwLDcuNzksMS4yOVoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: center;
}
`
