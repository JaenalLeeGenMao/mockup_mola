import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { connect } from 'react-redux'
import { compose } from 'redux'

import LazyLoad from '@components/common/Lazyload'

import history from '@source/history'
import config from '@source/config'

import { coronaGuardDesktop, coronaGuardMobile } from '@global/imageUrl'
// import coronaGuardDesktop from '../../global/assets-global/images/corona-guard-d.png'
// import coronaGuardMobile from '../../global/assets-global/images/corona-guard-m.png'

import s from './CoronaPage.css'

class CoronaPage extends Component {
  getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'Windows Phone'
    }

    if (/android/i.test(userAgent)) {
      return 'Android'
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'iOS'
    }

    return 'unknown'
  }

  render() {
    console.log(this.props)
    return (
      <>
        {this.props.configParams && this.props.configParams.data.corona_page_enabled && (
          <LazyLoad
            containerClassName={s.cp__wrapper}
            style={{ display: this.props.coronaPageCount > 5 ? 'block' : 'none' }}
          >
            <>
              <div className={s.cp__image_wrapper}>
                <LazyLoad alt="corona guard" src={this.props.isMobile ? coronaGuardMobile : coronaGuardDesktop} />
              </div>
              <div className={s.cp__description_wrapper}>
                <h1>
                  <strong>Mola TV</strong> Corona Care
                </h1>
                <p>
                  Mari bersama menyumbang ke penanggulangan wabah Corona sambil membantu anak anak belajar di rumah lewat
                  program pendidikan Look Kool dan How Things Work di Mola TV.
                  <br />
                  <br />
                  Dengan berlangganan paket Corona Care Anda langsung membantu mereka yang memerangi wabah Corona di
                  Indonesia. Untuk setiap pembelian paket langganan, Mola TV akan menambahkan sumbangan Anda dengan nilai
                  yang sama.
                  <br />
                  <br />
                  Pilih sendiri nilai paket langganan Anda, 100% dari pendapatan paket langganan Corona Care akan kami
                  salurkan kepada mereka yang sedang berjuang menangani wabah Corona.
                </p>
                <div className={s.cp__button_wrapper}>
                  <button
                    className={s.cp__button_primary}
                    onClick={() => {
                      console.log(this.props.isMobile)
                      history.push(
                        this.props.isMobile ? '/accounts/subscriptionsList' : '/accounts/profile?tab=subscriptionPackage',
                      )
                    }}
                  >
                    Berikan Sumbangan
                  </button>
                  <button
                    className={s.cp__button_primary_outline}
                    onClick={() => {
                      if (this.props.isMobile) {
                        const os = this.getMobileOperatingSystem()
                        switch (os) {
                          case 'iOS':
                            if (this.props.configParams) location.href = this.props.configParams.data.ios_store_url
                            break
                          case 'Android':
                            if (this.props.configParams) location.href = this.props.configParams.data.store_url
                            break
                          default:
                            return this.props.updateCoronaPageCount(this.props.coronaPageCount)
                        }
                      } else {
                        if (this.props.coronaPageCount > 5) {
                          this.props.updateCoronaPageCount(0)
                        } else {
                          this.props.updateCoronaPageCount(this.props.coronaPageCount)
                        }
                      }
                    }}
                  >
                    <span className={s.icon_play} />
                    <p>Lain Waktu</p>
                  </button>
                </div>
              </div>
            </>
          </LazyLoad>
        )}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    configParams: { ...state.configParams },
  }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(CoronaPage)
