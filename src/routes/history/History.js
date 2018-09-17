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

import HistoryCard from './HistoryCard/HistoryCard'

import { getAllHistory } from '../../actions/history'
import Header from '@components/header'
import Navbar from '@components/navigation'
import s from './History.css'

class History extends React.Component {
  state = {
    showSearch: false,
    movieItems: this.props.movieDummy,
    loadingState: false,
  }

  static propTypes = {
    isMobile: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getAllHistory()
  }

  componentDidMount() {
    document.getElementById("history-container").addEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    const historyCont = document.getElementById("history-container");
    if (historyCont.scrollTop + historyCont.clientHeight + 100 >= historyCont.scrollHeight) {
      //loadmore
      if(!this.state.loadingState) {
        this.setState({
          movieItems: this.state.movieItems.slice().concat(this.props.movieDummy)
        })
      }
      // console.log("LOADMORE")
    }
  }

  render() {
    const { movieHistory, isMobile } = this.props;
    const { movieItems } = this.state;

    // console.log('movieHistory', movieHistory);
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
        { !isMobile &&
          <Fragment>
            <Navbar
              isDark={false}
              playlists={playlist}
              onClick={this.handleScrollToIndex}
              title='History'
            />
          </Fragment>
        }
        <Header isDark={false} libraryOff={isMobile} searchOff={isMobile}/>
        <div className={s.wrapper}>
          <div className={s.wrapperBg}></div>
          <div className={s.containerOuter}>
            <div className={s.containerInner} id='history-container'>
              {movieItems.map((movie, index) => {
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
                      key={index} //nanti ganti id ya kalau idnya uda unique
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

function mapStateToProps(state) {
  // console.log('stateeee', state)
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
