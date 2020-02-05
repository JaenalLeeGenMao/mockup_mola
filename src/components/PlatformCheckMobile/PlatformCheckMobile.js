import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig } from '@global/imageUrl'
import styles from './PlatformCheckMobile.css'
import Header from '@components/Header'
import { globalTracker } from '@source/lib/globalTracker'
import BodyClassName from 'react-body-classname'
import config from '@source/config'
import { getPartners } from '@actions/partners'
import { checkIcon, crossIcon } from '@global/imageUrl'

import _ from 'lodash'

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
class PlatformCheckMobile extends Component {
  state = {
    result: [],
  }

  componentDidMount() {
    const { loadPartners } = this.props
    loadPartners()
  }

  renderHeader() {
    return (
      <div style={{ height: '60px' }}>
        <Header isDark={0} isMobile {...this.props} />
      </div>
    )
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
    } else if (id === 5) {
      const url = _.get(this.props.configParams.data, 'platform_smarttv_link', 'https://www.mola.tv/not-found')
      window.open(url, '_blank')
    }
  }

  render() {
    const movieDetail = this.props.movieDetail.data[0]
    const status = this.props.movieDetail.meta.status
    const isDesktop = this.props.isDesktopVideoBlocker
    const name = _.get(movieDetail, 'title', '')
    const landscapePoster = _.get(movieDetail, 'background.landscape', '')
    let platforms = _.get(movieDetail, 'platforms', [])

    if (isDesktop && platforms == 0) {
      platforms = fixedPlatforms
    } else if (isDesktop) {
      platforms = platforms
    }

    return (
      <>
        <BodyClassName className={styles.overflow_hidden} />
        {this.props.showHeader && this.renderHeader()}
        {/* <div className={styles.matches_header_bg} /> */}
        {(status == 'success' || status == 'error') && (
          <div className={styles.bg}>
            <div className={styles.container} style={{ backgroundImage: `url(${landscapePoster}?w=800)` }}>
              {!landscapePoster && (
                <div className={styles.player__container}>
                  <div className={styles.img__wrapper}>
                    <img src={logoMolaBig} />
                  </div>
                </div>
              )}
            </div>

            {/* <div className={styles.gradient} /> */}
            <div className={styles.detail__container}>
              <div className={styles.detail__desc}>
                <div className={styles.detail__desc__text}>Tayangan ini dapat disaksikan di:</div>
              </div>
              <div className={styles.detail__desc__icon}>
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
                            <img
                              key={idx}
                              src={`${s.imageUrl}?w=60`}
                              className={`${s.status === 0 ? styles.status__img__false : styles.status__img__true}`}
                            />
                            <div className={styles.flex_column_center}>
                              <p
                                className={`${
                                  s.status === 0
                                    ? styles.detail__desc_img__status__info__true
                                    : styles.detail__desc_img__status__info__false
                                }`}
                                key={idx}
                              >
                                {s.name}
                              </p>
                              {s.id === 4 || s.id === 5 ? <p className={styles.text_info}>Info Selengkapnya</p> : ''}
                            </div>
                            <img
                              className={styles.detail__desc_img__status__color}
                              key={idx}
                              src={s.status === 0 ? crossIcon : checkIcon}
                            />
                          </div>
                        )}
                    </>
                  )
                })}
              </div>

              <div className={styles.detail__desc__text__icon__bottom}>
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  Mola Polytron Streaming &amp; Mola Matrix bisa diperoleh di:
                  <div className={styles.detail__desc__text__icon__bottom__text__up}>Electronic City</div>
                </div>
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  atau, untuk pembelian online silahkan kunjungi:
                  <div className={styles.detail__desc__text__icon__bottom__text}>
                    {this.renderLink()}
                    {/* {dataFetch.map((dt, idx) => {
                    // console.log('data', data)
                    // console.log('link', dt.attributes.link)

                    return (
                      <a key={idx} onClick={() => this.handleRedirectTracker(dt.url || '')}>
                        {' '}
                        <span>{dt.name}</span>
                      </a>
                    )
                  })} */}
                    {/* <a onClick={() => this.handleRedirectTracker('https://www.blibli.com/promosi/molatv', 'blibli.com')}>
                    Blibli.com
                  </a> */}

                    {/* <div className={styles.detail__desc__text__icon__bottom__text__and}>&nbsp;&amp;&nbsp;</div>
                  <a
                    onClick={() =>
                      this.handleRedirectTracker('https://www.matrixshop.co.id/molamatrix', 'matrixshop.co.id')
                    }
                  >
                    Mola-Matrix
                  </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* </div> */}
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
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PlatformCheckMobile)

// export default compose(withStyles(styles, dtPickerStyle), connect(mapStateToProps))(Register)
