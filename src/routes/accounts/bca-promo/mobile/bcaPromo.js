import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { logoHorizontal } from '@global/imageUrl'
import Link from '@components/Link'
import LazyLoad from '@components/common/Lazyload'
import Header from '@components/Header'
import s from './bcaPromo.css'
import { bcaButton } from '@global/imageUrl'
import { globalTracker } from '@source/lib/globalTracker'

import { getLocale } from '../locale'

class BcaPromo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: getLocale(),
      voucher_code: 'MOLATV',
      copied: false,
      bannerUrl: 'https://res-mola01.koicdn.com/image/bee0657a-b792-4e02-b609-db50a6b6e9f7/image.jpeg',
      bcaRedirectLink:
        'https://www.bca.co.id/molatv?utm_campaign=Mola%20TV&utm_source=Mola%20TV%20App&utm_medium=CTW&utm_term=Promo%20BCA&utm_content=Buka%20Tabungan',
    }
  }

  renderHeader() {
    return (
      <div className={s.mola_logo}>
        <Link to="/">
          <img alt="molatv" src={logoHorizontal} />
        </Link>
      </div>
    )
  }

  handleRedirectTracker = link => {
    const { user } = this.props
    const payload = {
      window,
      user: user,
      linkRedirectUrl: link,
      event: 'event_pages',
    }
    globalTracker(payload)
    window.open(link, '_blank')
  }

  render() {
    return (
      <>
        {/* {this.renderHeader()} */}
        <Header isMobile title="Promo Detail" />
        <div className={s.wrapper}>
          <LazyLoad>
            <div className={s.root}>
              <div className={s.header_text}>
                <h1>Selamat Datang di MOLA TV</h1>
              </div>
              <div className={s.banner}>
                <img src={this.state.bannerUrl} />
              </div>
              <div className={s.paragraph_bold}>
                <h2>Ingin bisa bebas streaming seluruh pertandingan Liga Inggris di MOLA TV selama sebulan?</h2>
              </div>
              <div className={s.paragraph}>
                <p>
                  Anda hanya perlu membuka tabungan baru di BCA mobile untuk mengaktifkan paket Premium MOLA TV, dimana
                  Anda bisa menyaksikan 10 Pertandingan Liga Inggris di aplikasi MOLA TV setiap minggunya
                </p>
              </div>

              <div className={s.code}>
                <div style={{ display: 'inline' }}>
                  <div className={s.voucher_code}>
                    <h2>{this.state.voucher_code}</h2>
                  </div>
                  <CopyToClipboard text={this.state.voucher_code} onCopy={() => alert('Copied the text: MOLATV')}>
                    <div className={s.copy_button}>
                      <p>GUNAKAN</p>
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
              <div className={s.paragraph}>
                <p> Jangan lupa masukkan kode promo saat melakukan pengisian data untuk mengaktifkan penawaran ini</p>
              </div>
              <div className={s.bca_link}>
                <img src={bcaButton} onClick={() => this.handleRedirectTracker(this.state.bcaRedirectLink || '')} />
              </div>
            </div>
          </LazyLoad>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(s), connect(mapStateToProps, null))(BcaPromo)
