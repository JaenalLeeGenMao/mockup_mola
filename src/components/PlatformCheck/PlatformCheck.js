import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig } from '@global/imageUrl'
import styles from './PlatformCheck.css'
import { globalTracker } from '@source/lib/globalTracker'
import config from '@source/config'
import { getPartners } from '@actions/partners'
import _ from 'lodash'

import checkIcon from '../../global/assets-global/images/check.png'
import crossIcon from '../../global/assets-global/images/cross.png'

class PlatformCheck extends Component {
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
  }

  render() {
    const movieDetail = this.props.movieDetail.data[0]
    const name = _.get(movieDetail, 'title', '')
    const poster = this.props.isChannel
      ? _.get(movieDetail, 'background.landscape', '')
      : _.get(movieDetail, 'background.portrait', '')
    const platforms = _.get(movieDetail, 'platforms', [])

    return (
      <>
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
                  return (
                    <div
                      className={styles.detail__desc_img__status__icon}
                      onClick={() => this.onMpsClick(s.id)}
                      key={idx}
                    >
                      <img
                        key={idx}
                        src={`${s.imageUrl}?w=100`}
                        className={`${s.status === 0 ? styles.status__img__false : styles.status__img__true}`}
                      />

                      <div className={styles.flex_column_center}>
                        <p className={styles.detail__desc_img__status__info} key={idx}>
                          {s.name}
                        </p>
                        {s.id === 4 ? <p className={styles.text_info}>Info Selengkapnya</p> : ''}
                      </div>
                      <img
                        className={styles.detail__desc_img__status__color}
                        key={idx}
                        src={s.status === 0 ? crossIcon : checkIcon}
                      />
                    </div>
                  )
                })}
              </div>
              {/* <div className={styles.detail__desc__text__icon__bottom} /> */}
              <div className={styles.detail__desc__text__bottom}>
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  Mola Polytron Streaming &amp; Mola Matrix bisa diperoleh di:
                  <div className={styles.detail__desc__text__icon__bottom__text__up}>Electronic City</div>
                </div>
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  atau, untuk pembelian online silahkan kunjungi:
                  <div className={styles.detail__desc__text__icon__bottom__text}>{this.renderLink()}</div>
                </div>
              </div>
            </div>
          </div>
          <div />
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
  loadPartners: () => dispatch(getPartners()),
})

// export default withStyles(styles)(PlatformCheckMobile)
export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(PlatformCheck)

// export default compose(withStyles(styles, dtPickerStyle), connect(mapStateToProps))(Register)
