import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import * as movieDetailActions from '@actions/movie-detail'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig, playStoreBadge, appStoreBadge } from '@global/imageUrl'
import history from '@source/history'
import styles from './downloadApp.css'

class DownloadApp extends Component {
  componentDidMount() {
    const { getMovieDetail, videoId } = this.props
    getMovieDetail(videoId)
  }

  handleClose = () => {
    history.goBack()
  }

  render() {
    const { meta: { status }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const portraitPoster = dataFetched ? dataFetched.background.portrait : ''
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent)
    const badge = isSafari ? appStoreBadge : playStoreBadge
    return (
      <>
        <div className={styles.container__mobile} style={{ backgroundImage: `url(${portraitPoster})` }}>
          {!portraitPoster &&
            <div className={styles.player__container__mobile}>
              <div className={styles.img__wrapper}><img src={logoMolaBig} /></div>
            </div>
          }
          <div className={styles.detail__container__mobile}>
            <div className={styles.detail__title}>
              {dataFetched && <h1 className={styles.detail__title__text}>{dataFetched.title}</h1>}
            </div>
            <div className={styles.detail__desc}>
              <div>Untuk menyaksikan tayangan ini, silakan unduh Mola TV mobile app di</div>
              <a className={styles.btn_open_app} href="">
                <img src={badge} />
              </a>
              <a className={styles.link_back} onClick={this.handleClose}>Back to Video Detail</a>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(DownloadApp)
