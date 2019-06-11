import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import LazyLoad from '@components/common/Lazyload'

import matchListActions from '@actions/matches'

import s from './matches.css';

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
    this.props.getMatches()
  }

  onHandleLoadMore = () => { };

  render() {
    const matchesList = this.props.matches
    // console.log('call data 2', matchesList.data[0].awayTeam.name)
    const isDark = false
    return (
      <>
        {/* {matchesList.meta === 'loading' && ()} */}
        {matchesList.meta.status === 'success' && (
          <>
            <div className={s.headerContainer}>
              <Header stickyOff searchOff isDark={isDark} activeMenu="matches" libraryOff {...this.props} />
            </div>
            <div className={s.root}>
              <div className={s.matchlist_container}>
                <div className={s.matchlist_wrappergrid}>
                  <span />
                  <div className={s.matchlist_wrappercontent_center}>
                    <div className={s.matchcard__positiontitle}>{/* <h5 className={s.matchcards__filtertitle}>Filter</h5> */}</div>
                    <div className={s.matchlist_Pagetitle}>
                      <LazyLoad containerClassName={s.matchesCardList__container}>
                        {matchesList.data.map((matchDt) => (
                          <MatchCard key={matchDt.id} matchData={matchDt} />
                        ))
                        }
                      </LazyLoad>
                      <div className={s.matches__loadmorecontent}>
                        <span className={s.matches__loadmore}>Load More</span>
                      </div>
                      <div className={s.matches__contentabtn}>
                        <span className={s.matches__loadmoreaction}>^</span>
                      </div>
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
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMatches: () => dispatch(matchListActions.getSportList()),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Matches)
