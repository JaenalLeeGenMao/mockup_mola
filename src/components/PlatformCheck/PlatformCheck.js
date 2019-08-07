import React, { Component } from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { logoMolaBig } from '@global/imageUrl'
import history from '@source/history'
import styles from './platformCheck.css'
import Header from '@components/Header'

class PlatformCheck extends Component {
  state = {
    result: [],
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
              {/* <div className={styles.detail__title}>
              {<h1 className={`${styles.detail__title__text} ${titleClass}`}>{title}</h1>}
            </div> */}

              <div className={styles.detail__desc__icon}>
                <div className={styles.detail__desc_img}>
                  {icon.map((s, idx) => {
                    // return <img key={idx} src={s} />
                    return (
                      <img
                        key={idx}
                        src={s}
                        className={`${status[idx] ? styles.status__img__true : styles.status__img__false}`}
                      />
                    )
                  })}
                </div>
                <div className={styles.detail__desc_img__status}>
                  {iconStatus.map((i, idx) => {
                    return <img key={idx} src={i} />
                  })}
                </div>
              </div>
              <div className={styles.detail__desc__text__icon}>
                {name.map((n, idx) => {
                  return <p key={idx}>{n}</p>
                })}
              </div>
              <div className={styles.detail__desc__text__icon__bottom} />
              <div className={styles.detail__desc__text__icon__bottom__text}>
                Mola Polytron Streaming &amp; Mola Matrix bisa diperoleh di:
                <div className={styles.detail__desc__text__icon__bottom__text__up}>Electronic City</div>
              </div>
              <div className={styles.detail__desc__text__icon__bottom__text}>
                atau, untuk pembelian online silahkan kunjungi:
                <div className={styles.detail__desc__text__icon__bottom__text}>
                  <a href="https://www.blibli.com/promosi/molatv">Blibli.com </a>
                  <div className={styles.detail__desc__text__icon__bottom__text__and}>&nbsp;&amp;&nbsp;</div>
                  <a href="https://www.matrixshop.co.id/molamatrix"> Mola-Matrix</a>
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
