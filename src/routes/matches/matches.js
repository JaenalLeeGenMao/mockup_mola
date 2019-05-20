import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import LazyLoad from '@components/common/Lazyload'

import matchListActions from '@actions/matches'

import s from './matches.css'
let sessionId

class Matches extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    playlists: [],
    videos: [],
    data: [],
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { getMatchesList } = this.props
    getMatchesList()
  }

  render() {
    // console.log('az', this.props.matches)
    const matchesList = this.props.matches
    const isDark = false
    return (
      <>
        {/* {matchesList.meta === 'loading' && ()} */}
        {matchesList.meta.status === 'success' && (
          <>
            <div className={s.headerContainer}>
              <Header stickyOff isDark={isDark} activeMenu="sport" logoOff libraryOff {...this.props} />
            </div>
            <div className={s.root}>
              <div className={s.matchlist_container}>
                <div className={s.matchlist_wrappergrid}>
                  <span />
                  <div className={s.matchlist_wrappercontent_center}>
                    <div className={s.matchcard__positiontitle}>{/* <h5 className={s.matchcards__filtertitle}>Filter</h5> */}</div>
                    <div className={s.matchlist_Pagetitle}>
                      <MatchCard playlists={matchesList.data} />
                    </div>
                    <div className={s.matchlist_gridcontainer}>
                      <LazyLoad containerClassName={s.matchlist_valuelistitem}>
                        <div className={s.wrapperData} />
                      </LazyLoad>
                    </div>
                  </div>
                  <div>
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}

function mapStateToProps(state) {
  // console.log('checking data routes', state)
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMatchesList: () => dispatch(matchListActions.getGetMatchesList()),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)
