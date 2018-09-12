/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'

import HistoryCard from './HistoryCard/HistoryCard'

import { getAllHistory } from '../../actions/history'
import Header from '@components/header'
import Navbar from '@components/navigation'
import s from './History.css'

class History extends React.Component {
  state = {
      showSearch: false,
      isMobile: true,
  }

  componentWillMount() {
      this.props.getAllHistory()
  }

  componentDidMount() {
      this.setState({
          isMobile: window.innerWidth <= 960 ? true : false,
      })

      // this.isMobile = window.innerWidth <= 960 ? true : false;
  }

  render() {
      const { movieDummy, movieHistory } = this.props
      const { isMobile } = this.state
      console.log('movieHistory', movieHistory)
      const isDark = false
      const playlist = [
          {
              id: 1,
              isActive: false,
              title: 'Profile Data',
          },
          {
              id: 2,
              isActive: true,
              title: 'History',
          },
      ]
      return (
          <Fragment>
              <div className={classNames(s.headerNone, !isMobile ? s.headerDisplay : '')}>
                  <Fragment>
                      <Navbar
                          isDark={isDark}
                          playlists={playlist}
                          onClick={this.handleScrollToIndex}
                          title='History'
                      />
                  </Fragment>
              </div>
              <Header isDark={isDark} libraryOff={isMobile} rightMenuOff={isMobile}/>
              <div className={s.wrapper}>
                  <div className={s.containerOuter}>
                      <div className={s.containerInner}>
                          {movieDummy.map((movie) => {
                              const videosAttr = movie.attributes.videos[0].attributes
                              if (
                                  !movie.attributes.videos[0].videos ||
                movie.attributes.videos[0].videos !== 'not_found'
                              ) {
                                  const playedDuration =
                  movie.attributes.timePosition / videosAttr.duration * 100
                                  const barStyle = {
                                      width: `${playedDuration}%`,
                                  }
                                  return (
                                      <HistoryCard
                                          key={movie.id}
                                          videos={videosAttr}
                                          barStyle={barStyle}
                                      />
                                  )
                              }
                          })}
                      </div>
                  </div>
              </div>
          </Fragment>
      )
  }
}

function mapStateToProps(state, ownProps) {
    console.log('stateeee', state)
    return {
        movieHistory: state.history.data,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllHistory: () => dispatch(getAllHistory()),
})

export default compose(
    withStyles(s),
    connect(mapStateToProps, mapDispatchToProps),
)(History)
