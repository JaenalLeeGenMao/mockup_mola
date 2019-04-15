import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
import LazyLoad from '@components/common/Lazyload'
import movieImg from './assets/sc_movies.png'
import sportsImg from './assets/sc_sports.png'
import entertainmentsImg from './assets/sc_entertainments.png'
import seriesImg from './assets/sc_series.png'

import s from './switch-channels.css'
let sessionId

class SwitchChannels extends React.Component {
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
    return (
      <Fragment>
        <div className={s.root}>
          <div className={s.swicth_channels__container}>
            <div className={s.swicth_channels__grid}>
              <div className={s.swicth_channels__grid_item_movie}>
                <div>
                  <img alt="movieImg" src={movieImg} className={s.switch_channels__movies_img} />
                </div>
                <span>Movies</span>
              </div>
              <div className={s.swicth_channels__grid_item_sport}>
                <div>
                  <img alt="sportsImg" src={sportsImg} className={s.switch_channels__sports_img} />
                </div>
                <span>Sports</span>
              </div>
              <div className={s.swicth_channels__grid_item_entertainments}>
                <div>
                  <img alt="entertainmentsImg" src={entertainmentsImg} className={s.switch_channels__entertainments_img} />
                </div>
                <span>Entertainments</span>
              </div>
              <div className={s.swicth_channels__grid_item_series}>
                <div>
                  <img alt="seriesImg" src={seriesImg} className={s.switch_channels__series_img} />
                </div>
                <span>Series</span>
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

export default compose(withStyles(s), connect(mapStateToProps))(SwitchChannels)
