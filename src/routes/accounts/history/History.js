import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import HistoryCard from './HistoryCard/HistoryCard'
import HistoryCardLoading from './HistoryCard/HistoryCardLoading'

import { getAllHistory } from '@actions/history'
import Header from '@components/Header'
import Navbar from '@components/Navigation'
import s from './History.css'

class History extends React.Component {
  state = {
    showSearch: false,
    history: [],
    isLoading: true,
  }

  static propTypes = {
    isMobile: PropTypes.bool,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getAllHistory, history, user: { id: userId } } = nextProps

    if (history.meta.status === 'loading' && prevState.history.length <= 0) {
      getAllHistory('kareemlukitomo123')
      // getAllHistory(userId); comment dulu krn no data
    }

    return { ...prevState, history }
  }

  componentDidUpdate(prevProps) {
    const { history } = this.props

    if (prevProps.history.meta.status !== history.meta.status && history.meta.status !== 'loading') {
      this.setState({
        isLoading: false,
      })
    }
  }

  // componentDidMount() {
  //   document.getElementById("history-container").addEventListener('scroll', this.onScroll, false);
  // }

  //will implement infinite scroll later after api supported
  // onScroll = () => {
  //   const historyCont = document.getElementById("history-container");
  //   if (historyCont.scrollTop + historyCont.clientHeight + 100 >= historyCont.scrollHeight) {
  //     //loadmore
  //     if(!this.state.loadingState) {
  //       this.setState({
  //         movieItems: this.state.movieItems.slice().concat(this.props.movieDummy)
  //       })
  //     }
  //     // console.log("LOADMORE")
  //   }
  // }

  render() {
    const { isMobile, history: { data: movieHistory } } = this.props
    const { isLoading } = this.state
    const playlist = [
      {
        id: 1,
        isActive: false,
        title: 'Profile Data',
        href: '/profile',
      },
      {
        id: 2,
        isActive: true,
        title: 'History',
      },
    ]
    return (
      <Fragment>
        {!isMobile && (
          <Fragment>
            <Navbar isDark={false} playlists={playlist} onClick={this.handleScrollToIndex} title="History" />
          </Fragment>
        )}
        <Header isDark={false} isMobile={isMobile} libraryOff searchOff {...this.props} />
        <div className={isMobile ? s.root__mobile : s.root}>
          <div className={s.wrapperBg} />
          <div className={s.containerOuter}>
            <div className={s.containerInner} id="history-container">
              {!isLoading &&
                movieHistory.map(movie => {
                  const playedDuration = movie[0].timePosition / 60 / 100 /*movie[0].duration*/ * 100
                  const barStyle = {
                    width: `${playedDuration}%`,
                  }
                  return <HistoryCard key={movie[0].historyId} videos={movie[0]} barStyle={barStyle} />
                })}
              {isLoading && (
                <Fragment>
                  <HistoryCardLoading />
                  <HistoryCardLoading />
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getAllHistory: userId => dispatch(getAllHistory(userId)),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(History)
