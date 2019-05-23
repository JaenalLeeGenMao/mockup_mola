import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { sportsImg, entertainmentsImg, seriesImg, movieImg } from '@global/imageUrl'

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
                <div className={s.swicth_channels_image}>
                  <img alt="movieImg" src={movieImg} className={s.switch_channels__movies_img} />
                </div>
                <span className={s.switch_channels_label}>Movies</span>
              </div>
              <div className={s.swicth_channels__grid_item_sport}>
                <div className={s.swicth_channels_image}>
                  <img alt="sportsImg" src={sportsImg} className={s.switch_channels__sports_img} />
                </div>
                <span className={s.switch_channels_label}>Sports</span>
              </div>
              <div className={s.swicth_channels__grid_item_entertainments}>
                <div className={s.swicth_channels_image}>
                  <img alt="entertainmentsImg" src={entertainmentsImg} className={s.switch_channels__entertainments_img} />
                </div>
                <span className={s.switch_channels_label}>Entertainments</span>
              </div>
              <div className={s.swicth_channels__grid_item_series}>
                <div className={s.swicth_channels_image}>
                  <img alt="seriesImg" src={seriesImg} className={s.switch_channels__series_img} />
                </div>
                <span className={s.switch_channels_label}>Series</span>
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
