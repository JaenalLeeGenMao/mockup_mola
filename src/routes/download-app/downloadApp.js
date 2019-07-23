import React, { Component } from 'react'

import { connect } from 'react-redux'
import { compose } from 'redux'
import { get } from 'axios'
import * as movieDetailActions from '@actions/movie-detail'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig, playStoreBadge, appStoreBadge } from '@global/imageUrl'
import history from '@source/history'
import styles from './downloadApp.css'

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

  getConfig = async () => {
    await get('/api/v2/config/app-params').then(result => {
      if (result.data) {
        const { store_url, ios_store_url } = result.data.data.attributes
        this.setState({
          store_url,
          ios_store_url,
        })
      }
    })
  }

  render() {
    const { store_url, ios_store_url, badgeUrl } = this.state
    const { meta: { status }, data } = this.props.movieDetail
    const apiFetched = status === 'success' && data.length > 0
    const dataFetched = apiFetched ? data[0] : undefined

    const portraitPoster = dataFetched ? dataFetched.background.portrait : ''
    const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const badge = isApple ? appStoreBadge : playStoreBadge
    const storeUrl = isApple ? ios_store_url : store_url
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
            <div className={styles.detail__title}>{dataFetched && <h1 className={styles.detail__title__text}>{dataFetched.title}</h1>}</div>
            <div className={styles.detail__desc}>
              <div className={styles.detail__desc__text}>Untuk menyaksikan tayangan ini, silakan unduh Mola TV mobile app di</div>
            </div>
            <a className={styles.btn_open_app} href={storeUrl}>
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
