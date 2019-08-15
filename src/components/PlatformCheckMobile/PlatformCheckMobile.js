import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig } from '@global/imageUrl'
import styles from './PlatformCheckMobile.css'
import Header from '@components/Header'
import { globalTracker } from '@source/lib/globalTracker'
import BodyClassName from 'react-body-classname'
import config from '@source/config'

class PlatformCheckMobile extends Component {
  state = {
    result: [],
  }
  renderHeader() {
    return (
      <div style={{ height: '60px' }}>
        <Header isDark={0} isMobile {...this.props} />
      </div>
    )
  }
  handleRedirectTracker = (link, redirect) => {
    window.open(link, '_blank')
    const { user, videoId } = this.props
    const path = `${config.endpoints.domain}/blocker/page-redirect/${videoId}/?redirect=${redirect}`
    const payload = {
      window,
      user: user,
      linkRedirectUrl: path,
      event: 'event_pages',
    }
    globalTracker(payload)
  }
  render() {
    const { name, portraitPoster, title, titleClass, icon, iconStatus, status, isHeader } = this.props

    return (
      <>
        <BodyClassName className={styles.overflow_hidden} />
        {isHeader && this.renderHeader()}
        {/* <div className={styles.matches_header_bg} /> */}
        <div className={styles.bg}>
          <div className={styles.container} style={{ backgroundImage: `url(${portraitPoster})` }}>
            {!portraitPoster && (
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
              {icon.map((s, idx) => {
                return (
                  <div className={styles.detail__desc_img__status__icon} key={idx}>
                    <img
                      key={idx}
                      src={s}
                      className={`${status[idx] ? styles.status__img__true : styles.status__img__false}`}
                    />
                    <p
                      className={`${
                        status[idx]
                          ? styles.detail__desc_img__status__info__true
                          : styles.detail__desc_img__status__info__false
                      }`}
                      key={idx}
                    >
                      {name[idx]}
                    </p>
                    <img className={styles.detail__desc_img__status__color} key={idx} src={iconStatus[idx]} />
                  </div>
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
                  <a onClick={() => this.handleRedirectTracker('https://www.blibli.com/promosi/molatv', 'blibli.com')}>
                    Blibli.com
                  </a>
                  <div className={styles.detail__desc__text__icon__bottom__text__and}>&nbsp;&amp;&nbsp;</div>
                  <a
                    onClick={() =>
                      this.handleRedirectTracker('https://www.matrixshop.co.id/molamatrix', 'matrixshop.co.id')
                    }
                  >
                    Mola-Matrix
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
      </>
    )
  }
}

export default withStyles(styles)(PlatformCheckMobile)
