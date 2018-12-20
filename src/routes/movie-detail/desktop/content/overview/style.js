import { css } from 'react-emotion'

export const contentOverviewContainer = css`
  display: flex;
  min-height: 20vh;
  padding-top: 1.5%;
`

export const contentOverviewSectionLeft = css`
  display: inline-block;
  width: 20%;
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

  div {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`

export const contentOverviewSectionRight = css`
  display: inline-block;
  width: 35%;
  vertical-align: top;

  div {
    width: 70%;
    height: 100%;
    margin: auto;
  }
`

export const sectionLeftTitle = css`
  margin-bottom: 1.2rem;
  color: #fff;
`

export const sectionLeftText = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #ababab;
`

export const sectionLeftDuration = css`
  margin-bottom: 1.2rem;
  color: #0552d7;
`

export const sectionMiddleTitle = css`
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  color: #fff;
`

export const sectionMiddleText = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #ababab;
  text-align: justify;
`

export const sectionRightTitle = css`
  text-transform: uppercase;
  margin-bottom: 1.2rem;
  color: #fff;
`

export const sectionRightText = css`
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
  color: #ababab;
`
