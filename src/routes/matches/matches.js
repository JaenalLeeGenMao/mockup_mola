import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import MatchCard from '@components/MatchCard'
import LazyLoad from '@components/common/Lazyload'

import s from './matches.css'
let sessionId

class Matches extends React.Component {
  constructor(props) {
    super(props)
    this.inputSearch = React.createRef()
  }

  state = {
    result: [],
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { user: { sid }, search: { result: { meta: { status: resultStatus } } }, searchKeyword } = this.props
    const isDark = false
    return (
      <Fragment>
        <div className={s.headerContainer}>
          <Header stickyOff isDark={isDark} logoOff libraryOff {...this.props} />
        </div>
        <div className={s.root}>
          <div className={s.matchlist_container}>
            <div className={s.matchlist_wrappergrid}>
              <span />
              <div className={s.matchlist_wrappercontent_center}>
                <div className={s.matchlist_Pagetitle}>
                  <MatchCard />
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
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state,
  }
}

export default compose(withStyles(s), connect(mapStateToProps))(Matches)
