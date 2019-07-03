/* eslint react/prop-types: 0 */

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Countdown from 'react-countdown-now'
import s from './CountDown.css'

class CountDown extends React.Component {
  render() {
    const { startTime, hideCountDown, getMovieDetail, videoId, isMobile } = this.props
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        getMovieDetail(videoId)
        hideCountDown()
        return null
      }
      // Render a countdown

      return (
        <div className={s.countDown__wrapper}>
          <div className={s.countDown}>
            <div className={s.startText}>Tayangan akan dimulai dalam: </div>
            {days > 0 ? `${days} hari ` : ''}
            {hours < 10 ? `0${hours}` : hours}
            :{minutes < 10 ? `0${minutes}` : minutes}
            :{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>
      )
    }

    return (
      <Countdown
        date={startTime * 1000}
        // date = {Date.now() + 5000}
        renderer={renderer}
      />
    )
  }
}

export default withStyles(s)(CountDown)
