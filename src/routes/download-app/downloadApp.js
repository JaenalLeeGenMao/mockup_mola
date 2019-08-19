import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import * as movieDetailActions from '@actions/movie-detail'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig, playStoreBadge, appStoreBadge } from '@global/imageUrl'
import history from '@source/history'
import styles from './downloadApp.css'
import { globalTracker } from '@source/lib/globalTracker'

class DownloadApp extends Component {
  state = {
    store_url: '',
    ios_store_url: '',
    badgeUrl: '',
  }
  componentDidMount() {
    const { getMovieDetail, videoId } = this.props
    getMovieDetail(videoId)
    this.getConfig()
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const badgeUrl = isApple ? appStoreBadge : playStoreBadge
    this.setState({
      badgeUrl: badgeUrl,
    })
  }

  handleClose = () => {
    history.goBack()
  }

  handleStoreTracker = () => {
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const payload = {
      window,
      user: this.props.user,
      linkRedirectUrl: isApple ? 'redirect-to-appstore' : 'redirect-to-playstore',
      event: 'event_pages',
    }
    globalTracker(payload)
  }

  getConfig = async () => {
    const { configParams } = this.props
    if (configParams.data) {
      const { store_url, ios_store_url } = configParams.data
      this.setState({
        store_url,
        ios_store_url,
      })
    }
  }

  render() {
    const { store_url, ios_store_url, badgeUrl } = this.state
    const { meta: { status }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const portraitPoster = dataFetched ? dataFetched.background.portrait : ''
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const storeUrl = isApple ? ios_store_url : store_url

    const titleClass = dataFetched && dataFetched.title.length > 35 ? styles.title__text__small : ''
    return (
      <>
        <div className={styles.container__mobile} style={{ backgroundImage: `url(${portraitPoster})` }}>
          {!portraitPoster && (
            <div className={styles.player__container__mobile}>
              <div className={styles.img__wrapper}>
                <img src={logoMolaBig} />
              </div>
            </div>
          )}
          <div className={styles.gradient} />
          <div className={styles.detail__container__mobile}>
            <div className={styles.detail__title}>
              {dataFetched && <h1 className={`${styles.detail__title__text} ${titleClass}`}>{dataFetched.title}</h1>}
            </div>
            <div className={styles.detail__desc}>
              <div className={styles.detail__desc__text}>
                Untuk menyaksikan tayangan ini, silakan unduh Mola TV mobile app melalui tombol di bawah ini
              </div>
            </div>
            <a className={styles.btn_open_app} onClick={this.handleStoreTracker} href={storeUrl}>
              <img src={badgeUrl} />
            </a>
            <div className={styles.detail__desc}>
              <a className={styles.link_back} onClick={this.handleClose}>
                Back to Video Detail
              </a>
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
