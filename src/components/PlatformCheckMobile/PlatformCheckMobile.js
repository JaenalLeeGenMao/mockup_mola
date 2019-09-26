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

  // renderCharacter() {
  //   const nameLink = this.state.data.attributes.name
  //   {
  //     nameLink.map((dt, idx) => {
  //       if (nameLink.length > 0) {
  //         if (dt.attributes.name === 1) {
  //           return nameLink
  //         }
  //         if (idx === nameLink.length - 1) {
  //           return '&' + nameLink
  //         }
  //         if (idx === nameLink.length - 2) {
  //           return nameLink
  //         }
  //         return nameLink + ','
  //       }
  //     })
  //   }
  // }

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

  render() {
    const { name, portraitPoster, icon, iconStatus, status, isHeader, partners } = this.props

    return (
      <>
        <BodyClassName className={styles.overflow_hidden} />
        {isHeader && this.renderHeader()}
        {/* <div className={styles.matches_header_bg} /> */}
        <div className={styles.bg}>
          <div className={styles.container} style={{ backgroundImage: `url(${portraitPoster}?w=800)` }}>
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
