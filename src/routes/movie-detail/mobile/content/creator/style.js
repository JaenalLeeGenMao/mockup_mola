import { css } from 'react-emotion'

export const creatorContainer = css`
  color: #b5b5b5;
  font-size: 1rem;
  line-height: 1.6rem;
  text-transform: capitalize;
  padding: 15px;

  div {
    padding-bottom: 1rem;
  }

  p {
    color: #fff;
  }

  span:after {
    content: ',';
    margin-right: 0.5rem;
  }

  span:last-of-type:after {
    content: '';
  }
`
