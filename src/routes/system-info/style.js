import { css } from 'react-emotion';

export const SystemInfoWrapper = css`
   {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../../../global/style/icons/BG-bottomRight.png'), url('../../../global/style/icons//BG-bottomLeft.png'), linear-gradient(#0e1d3d, #000);
    background-position: right bottom, left bottom, left top;
    background-repeat: no-repeat, no-repeat, no-repeat;
    background-size: 50%, 50%, cover;
  }
`;

export const SystemInfoContainer = css`
   {
    color: white;
    opacity: 0.8;
    padding: 2rem 3rem;
    background: rgba(0, 0, 0, 0.75);
    letter-spacing: 0.1rem;
  }

  @media screen and (min-width: 299px) and (max-width: 640px) {
     {
      color: white;
      opacity: 0.8;
      padding: 1rem 2rem;
      background: rgba(0, 0, 0, 0.75);
      letter-spacing: 0.1rem;
    }
  }
`;
