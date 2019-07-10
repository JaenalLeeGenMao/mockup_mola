import { css } from 'react-emotion'

export const contentOverviewContainer = css`
  display: flex;
  min-height: 20vh;
`

export const contentOverviewSectionLeft = css`
  display: inline-block;
  width: 27.5%;
  vertical-align: top;

  div {
    width: 70%;
    height: 100%;
    margin: auto;
  }
`

export const contentOverviewSectionMiddle = css`
  display: inline-block;
  width: 45%;
  vertical-align: top;
  margin-top: 1rem;
  colro: #fff;
  font-size: 1.6rem;

  div {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`

export const contentOverviewSectionRight = css`
  display: inline-block;
  width: 27.5%;
  vertical-align: top;
  margin-top: 1rem;

  & > div {
    width: 70%;
    height: 100%;
    margin: auto;
  }

  p {
    display: inline;
  }

  span:after {
    content: ',';
    margin-right: 0.5rem;
  }

  span:last-of-type:after {
    content: '';
  }
`

export const peopleWrapper = css`
  margin-bottom: 1rem;
`

export const sectionLeftTitle = css`
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  color: #fff;
  font-size: 2.8rem;
`

export const sectionLeftText = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #ababab;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  span:after {
    content: ',';
    margin-right: 0.5rem;
  }

  span:last-of-type:after {
    content: '';
  }
`

export const sectionLeftDuration = css`
  margin-bottom: 1.2rem;
  color: #a9a9a9;
  font-size: 1.4rem;

  span {
    margin: 0 5px;
    border: 1px solid #a9a9a9;
    padding: 2px;
  }
`

export const sectionMiddleTitle = css`
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  color: #fff;
`

export const sectionMiddleText = css`
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  color: #fff;
  line-height: 1.3;
  text-align: justify;
`

export const sectionRightTitle = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #a9a9a9;
`

export const sectionRightText = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #ababab;
`
