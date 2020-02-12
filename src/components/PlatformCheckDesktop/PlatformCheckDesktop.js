import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig, playStoreBadge, appStoreBadge } from '@global/imageUrl'
import styles from './PlatformCheckDesktop.css'
import { globalTracker } from '@source/lib/globalTracker'
import config from '@source/config'
import { getPartners } from '@actions/partners'
import _ from 'lodash'

import { checkIcon, crossIcon } from '@global/imageUrl'

const fixedPlatforms = [
  {
    id: 4,
    name: 'Mola Polytron Streaming',
    imageUrl: 'https://res-mola01.koicdn.com/image/5cecf70b-f0cf-4e54-98e1-8c63ca4d03ff/image.png',
    order: 1,
    status: 1,
    visibility: 1,
    createdAt: '2019-08-01T12:59:00Z',
  },
  {
    id: 5,
    name: 'Mola Polytron Smart TV',
    imageUrl: 'https://res-mola01.koicdn.com/image/dc08c572-4e02-472f-9add-dd4c12037416/image.png',
    order: 3,
    status: 1,
    visibility: 1,
    createdAt: '2019-08-01T12:59:00Z',
  },
  {
    id: 2,
    name: 'Mola Matrix',
    imageUrl: 'https://res-mola01.koicdn.com/image/1ed08980-d0ce-4d64-889e-508930f5a021/image.png',
    order: 2,
    status: 1,
    visibility: 1,
    createdAt: '2019-08-01T12:59:00Z',
  },
]

class PlatformCheckDesktop extends Component {
  state = {
    result: [],
  }

  componentDidMount() {
    const { loadPartners } = this.props
    loadPartners()
  }

  handleRedirectTracker = link => {
    // console.log('linknknkn', link)

    const { user, videoId } = this.props
    let redirect = link.split('/')
    // console.log('reedddddd', redirect[2])

    const path = `${config.endpoints.domain}/blocker/page-redirect/${videoId}/?redirect=${redirect[2]}`
    const link_redirect = `/page-redirect?link_redirect=${link}`
    const payload = {
      window,
      user: user,
      linkRedirectUrl: path,
      event: 'event_pages',
    }
    globalTracker(payload)
    window.open(link_redirect, '_blank')
  }

  renderLink = () => {
    const { partners } = this.props
    const dataFetch = partners.data

    if (partners.meta.status === 'success') {
      return (
        <>
          {dataFetch.map((dt, idx) => {
            return (
              <a key={idx} onClick={() => this.handleRedirectTracker(dt.url || '')}>
                {' '}
                <span>{dt.name}</span>
              </a>
            )
          })}
        </>
      )
    } else if (partners.meta.status === 'error') {
      {
        return (
          <>
            <a onClick={() => this.handleRedirectTracker('https://www.polytronstore.com/video/358', 'polytron.com')}>
              polytron.com
            </a>
          </>
        )
      }
    }
  }

  onMpsClick = id => {
    if (id === 4) {
      const url = _.get(this.props.configParams.data, 'platform_mps_link', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    }

    if (id === 5) {
      const url = _.get(this.props.configParams.data, 'platform_smarttv_link', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    }
  }

  handleClickBadge = platform => {
    if (platform === 'android') {
      const url = _.get(this.props.configParams.data, 'store_url', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    } else {
      const url = _.get(this.props.configParams.data, 'ios_store_url', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    }
  }

  render() {
    const movieDetail = this.props.movieDetail.data[0]
    const status = this.props.movieDetail.meta.status
    const name = _.get(movieDetail, 'title', '')
    const isDesktop = this.props.isDesktopVideoBlocker
    // const poster = this.props.isChannel
    //   ? _.get(movieDetail, 'background.landscape', '')
    //   : _.get(movieDetail, 'background.portrait', '')
    const poster = _.get(movieDetail, 'background.landscape', '')
    let platforms = _.get(movieDetail, 'platforms', [])

    if (isDesktop && platforms == 0) {
      platforms = fixedPlatforms
    } else if (isDesktop) {
      platforms = platforms
    }

    return (
      <>
        {' '}
        {(status == 'success' || status == 'error') && (
          <div className={styles.container} style={{ backgroundImage: `url(${poster}?w=1000)` }}>
            {!poster && (
              <div className={styles.player__container}>
                <div className={styles.img__wrapper}>
                  <img src={logoMolaBig} />
                </div>
              </div>
            )}
            <div className={styles.gradient} />
            <div className={styles.detail__information}>
              <div className={styles.detail__desc}>
                <div className={styles.detail__desc__text}>Tayangan ini hanya dapat disaksikan di:</div>
              </div>
              <div className={styles.detail__container}>
                <div className={styles.detail__desc_img}>
                  {platforms.map((s, idx) => {
                    let visible = s.visibility == 1
                    let hide = s.id == 1
                    return (
                      <>
                        {visible &&
                          !hide && (
                            <div
                              className={styles.detail__desc_img__status__icon}
                              onClick={() => this.onMpsClick(s.id)}
                              key={idx}
                            >
                              <div style={{ position: 'relative' }}>
                                <img
                                  key={idx}
                                  src={`${s.imageUrl}?w=100`}
                                  className={`${s.status === 0 ? styles.status__img__false : styles.status__img__true}`}
                                />
                                <img
                                  className={styles.detail__desc_img__status__color}
                                  key={idx}
                                  src={s.status === 0 ? crossIcon : checkIcon}
                                />
                              </div>

                              <div className={styles.flex_column_center}>
                                <p className={styles.detail__desc_img__status__info} key={idx}>
                                  {s.name}
                                </p>
                                {s.id === 4 || s.id === 5 ? <p className={styles.text_info}>Info Selengkapnya</p> : ''}
                              </div>
                            </div>
                          )}
                      </>
                    )
                  })}
                </div>
                {/* <div className={styles.detail__desc__text__icon__bottom} /> */}
                <div className={styles.detail__information}>
                  <div className={styles.detail__desc}>
                    <div style={{ paddingTop: '2rem' }} className={styles.detail__desc__text}>
                      Atau unduh aplikasi Mola TV di{' '}
                    </div>
                    <div className={styles.images__row}>
                      <img
                        className={styles.image__badges}
                        src={playStoreBadge}
                        onClick={() => {
                          this.handleClickBadge('android')
                        }}
                      />
                      <img
                        className={styles.image__badges}
                        src={appStoreBadge}
                        onClick={() => {
                          this.handleClickBadge('ios')
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.detail__desc__text__bottom}>
                  <div className={styles.detail__desc__text__icon__bottom__text}>
                    Mola Polytron Streaming, Mola Polytron Smart TV, Mola Matrix bisa diperoleh di:
                    <div className={styles.detail__desc__text__icon__bottom__text__sub}>&nbsp; Electronic City</div>
                  </div>
                  <div className={styles.detail__desc__text__icon__bottom__text}>
                    Untuk pembelian online silahkan kunjungi:
                    <div className={styles.detail__desc__text__icon__bottom__text}>&nbsp;{this.renderLink()}</div>
                  </div>
                </div>
              </div>
            </div>
            <div />
          </div>
        )}
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
  loadPartners: () => dispatch(getPartners()),
})

// export default withStyles(styles)(PlatformCheckMobile)
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PlatformCheckDesktop)

// export default compose(withStyles(styles, dtPickerStyle), connect(mapStateToProps))(Register)
