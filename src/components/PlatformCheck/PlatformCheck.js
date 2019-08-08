import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig } from '@global/imageUrl'
import styles from './PlatformCheck.css'
import { globalTracker } from '@source/lib/globalTracker'

class PlatformCheck extends Component {
  state = {
    result: [],
  }
  handleRedirectTracker = (link, redirect) => {
    window.open(link, '_blank')
    const { user, videoId } = this.props
    const path = `https://mola.tv/blocker/page-redirect/${videoId}/?redirect=${redirect}`
    const payload = {
      window,
      user: user,
      linkRedirectUrl: path,
      event: 'event_pages',
    }
    globalTracker(payload)
  }
  render() {
    const { name, portraitPoster, title, titleClass, icon, iconStatus, status } = this.props
    return (
      <>
        <div className={styles.container} style={{ backgroundImage: `url(${portraitPoster})` }}>
          {!portraitPoster && (
            <div className={styles.player__container}>
              <div className={styles.img__wrapper}>
                <img src={logoMolaBig} />
              </div>
            </div>
          )}
          <div className={styles.gradient} />
          <div className={styles.detail__information}>
            <div className={styles.detail__desc}>
              <div className={styles.detail__desc__text}>Tayangan ini dapat disaksikan di:</div>
            </div>
            <div className={styles.detail__container}>
              <div className={styles.detail__desc__icon}>
                <div className={styles.detail__desc_img}>
                  {icon.map((s, idx) => {
                    return (
                      <div className={styles.detail__desc_img__status__icon} key={idx}>
                        <img
                          key={idx}
                          src={s}
                          className={`${status[idx] ? styles.status__img__true : styles.status__img__false}`}
                        />
                        <img className={styles.detail__desc_img__status__color} key={idx} src={iconStatus[idx]} />
                        <p className={styles.detail__desc_img__status__info} key={idx}>
                          {name[idx]}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={styles.detail__desc__text__icon__bottom} />
              <div className={styles.detail__desc__text__icon__bottom__text}>
                Mola Polytron Streaming &amp; Mola Matrix bisa diperoleh di:
                <div className={styles.detail__desc__text__icon__bottom__text__up}>Electronic City</div>
              </div>
              <div className={styles.detail__desc__text__icon__bottom__text}>
                atau, untuk pembelian online silahkan kunjungi:
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  <a
                    onClick={() =>
                      this.handleRedirectTracker('https://www.blibli.com/promosi/launching-mola-polytron', 'blibli.com')
                    }
                  >
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
          <div />
        </div>
      </>
    )
  }
}

export default withStyles(styles)(PlatformCheck)
