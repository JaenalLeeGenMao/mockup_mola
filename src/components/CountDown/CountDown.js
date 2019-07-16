/* eslint react/prop-types: 0 */

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Countdown from 'react-countdown-now'

import history from '../../history'
import s from './CountDown.css'

class CountDown extends React.Component {
  handleGoBack = () => {
    const { goBack } = history
    if (goBack) {
      goBack()
    }
  }

  render() {
    const { startTime, hideCountDown, getMovieDetail, videoId, isMobile, className } = this.props
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        getMovieDetail(videoId)
        hideCountDown()
        return null
      }
      // Render a countdown

      return (
        <div className={`${s.countDown__wrapper} ${className}`}>
          {!isMobile && (
            <div className={s.arrow__container} onClick={this.handleGoBack}>
              <span className={s.arrow__icon} />
            </div>
          )}
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
